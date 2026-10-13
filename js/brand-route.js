'use strict';
(() => {
 const route=document.querySelector('.header-route'),button=route?.querySelector('button');
 button?.addEventListener('click',()=>{
  const paused=route.classList.toggle('is-paused');
  button.setAttribute('aria-pressed',String(paused));
  button.setAttribute('aria-label',paused?button.dataset.resume:button.dataset.pause);
  button.textContent=paused?'▶':'Ⅱ';
 });
})();
