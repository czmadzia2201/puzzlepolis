// Shared cookie preferences for Puzzlepolis and its games.
const cookieConsentKey = 'puzzlepolis-analytics-consent';

const googleAnalyticsId = 'G-7PSJYD7JBE';
const googleAnalyticsDisabledKey = `ga-disable-${googleAnalyticsId}`;
let googleAnalyticsLoaded = false;

function startGoogleAnalytics() {
  window[googleAnalyticsDisabledKey] = false;

  if (googleAnalyticsLoaded) return;

  // Initialize the Google tag only after analytics consent.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', googleAnalyticsId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
  document.head.append(script);
  googleAnalyticsLoaded = true;
}

function stopGoogleAnalytics() {
  // Also disables an already loaded tag if the visitor withdraws consent.
  window[googleAnalyticsDisabledKey] = true;
}


function getCookieConsent() {
  try {
    const value = localStorage.getItem(cookieConsentKey);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
}

function saveCookieConsent(value) {
  try {
    localStorage.setItem(cookieConsentKey, value);
  } catch {
    // The banner can still be dismissed if storage is unavailable.
  }
}

// Resolve the Privacy Policy relative to this script, not the current game route.
const cookiePrivacyUrl = new URL('privacy-policy.html', document.currentScript.src).href;

const cookieBanner = document.createElement('aside');
cookieBanner.className = 'cookie-banner';
cookieBanner.setAttribute('aria-label', 'Cookie preferences');
cookieBanner.hidden = true;
cookieBanner.innerHTML = `
  <p>We use Google Analytics to understand how visitors use Puzzlepolis. Analytics cookies are optional. You can change your choice at any time using the Cookie Settings link in the footer.</p>
  <p>For more information, see our <a href="${cookiePrivacyUrl}">Privacy Policy</a>.</p>
  <div class="cookie-banner__actions">
    <button type="button" class="cookie-banner__button" data-cookie-choice="rejected">Reject</button>
    <button type="button" class="cookie-banner__button cookie-banner__button--accept" data-cookie-choice="accepted">Accept</button>
  </div>
`;
document.body.append(cookieBanner);

const initialConsent = getCookieConsent();
if (initialConsent === 'accepted') {
  startGoogleAnalytics();
} else {
  stopGoogleAnalytics();
  if (!initialConsent) {
    cookieBanner.hidden = false;
  }
}

cookieBanner.querySelectorAll('[data-cookie-choice]').forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.dataset.cookieChoice;
    saveCookieConsent(choice);
    if (choice === 'accepted') {
      startGoogleAnalytics();
    } else {
      stopGoogleAnalytics();
    }
    cookieBanner.hidden = true;
  });
});

// Event delegation also works for footer links rendered later by Angular.
document.addEventListener('click', event => {
  if (event.target.closest('#cookie-settings')) {
    cookieBanner.hidden = false;
    cookieBanner.querySelector('[data-cookie-choice="rejected"]').focus();
  }
});
