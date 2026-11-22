// Shared cookie preferences for Puzzlepolis and its games.
const cookieConsentKey = 'puzzlepolis-analytics-consent';

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

if (!getCookieConsent()) {
  cookieBanner.hidden = false;
}

cookieBanner.querySelectorAll('[data-cookie-choice]').forEach(button => {
  button.addEventListener('click', () => {
    saveCookieConsent(button.dataset.cookieChoice);
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
