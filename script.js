const dialogLoads = new Map();

document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', async () => {
    const dialog = document.getElementById(button.dataset.dialog);
    if (!dialog) return;

    if (!dialogLoads.has(dialog.id)) {
      const content = dialog.querySelector('.about-dialog__content');
      const load = fetch(dialog.dataset.contentUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then(html => {
          content.innerHTML = html;
        })
        .catch(error => {
          console.error('Failed to load About dialog:', error);
          content.innerHTML = '<p>Could not load this text. Please try again.</p>';
          dialogLoads.delete(dialog.id);
        });
      dialogLoads.set(dialog.id, load);
    }

    await dialogLoads.get(dialog.id);
    if (!dialog.open) dialog.showModal();
  });
});

document.querySelectorAll('.about-dialog').forEach(dialog => {
  dialog.querySelector('.dialog-ok')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right ||
        event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
});
