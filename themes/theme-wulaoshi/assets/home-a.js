/* Progressive enhancement: the server-rendered homepage remains readable without JS. */
(() => {
  'use strict';
  const root=document.querySelector('.home-a');
  if(!root) return;
  root.classList.add('ha-enhanced');
  root.querySelectorAll('[data-slip-switch]').forEach(button=>button.addEventListener('click',()=>{
    const image=root.querySelector('[data-slip-image]');
    const link=root.querySelector('[data-slip-link]');
    const title=root.querySelector('[data-slip-title]');
    if(!image||!link||!title) return;
    image.src=button.dataset.src; image.alt=button.dataset.title;
    link.href=button.dataset.link; title.textContent=button.dataset.title;
    root.querySelectorAll('[data-slip-switch]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));
  // Keep homepage copy and work visible immediately. Native card and image interactions
  // provide feedback without hiding content behind a scroll animation.
})();
