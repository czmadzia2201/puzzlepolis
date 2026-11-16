document.querySelectorAll('[data-dialog]').forEach(button=>{button.addEventListener('click',()=>document.getElementById(button.dataset.dialog)?.showModal());});
document.querySelectorAll('.about-dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
});