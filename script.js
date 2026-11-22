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

