const dialogLoads = new Map();

document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', async () => {
    const dialog = document.getElementById(button.dataset.dialog);
    if (!dialog) return;

    if (!dialogLoads.has(dialog.id)) {
      const load = fetch(dialog.dataset.contentUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then(html => {
          dialog.innerHTML = html;
        })
        .catch(error => {
          console.error('Failed to load About dialog:', error);
          dialog.innerHTML = `<h2 id="${dialog.getAttribute('aria-labelledby')}">About</h2><p>Could not load this text. Please try again.</p><button type="button" class="dialog-ok">OK</button>`;
          dialogLoads.delete(dialog.id);
        });
      dialogLoads.set(dialog.id, load);
    }

    await dialogLoads.get(dialog.id);
    if (!dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    }
  });
});

document.querySelectorAll('.about-dialog').forEach(dialog => {

  dialog.addEventListener('click', event => {
    if (event.target.closest('.dialog-ok')) {
      dialog.close();
    }
  });
});

const backLink = document.getElementById('back-link');
if (backLink) {
  backLink.addEventListener('click', event => {
    if (document.referrer && history.length > 1) {
      const previousUrl = new URL(document.referrer);
      if (previousUrl.origin === location.origin && previousUrl.href !== location.href) {
        event.preventDefault();
        history.back();
      }
    }
  });
}


// Cookie preferences are shared by pages served from puzzlepolis.net.
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

const cookieBanner = document.createElement('aside');
cookieBanner.className = 'cookie-banner';
cookieBanner.setAttribute('aria-label', 'Cookie preferences');
cookieBanner.hidden = true;
cookieBanner.innerHTML = `
  <p>We use Google Analytics to understand how visitors use Puzzlepolis. Analytics cookies are optional. You can change your choice at any time using the Cookie Settings link in the footer.</p>
  <p>For more information, see our <a href="privacy-policy.html">Privacy Policy</a>.</p>
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

document.querySelectorAll('.cookie-settings-link').forEach(button => {
  button.addEventListener('click', () => {
    cookieBanner.hidden = false;
    cookieBanner.querySelector('[data-cookie-choice="rejected"]').focus();
  });
});
