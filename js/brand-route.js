'use strict';
(() => {
 const route=document.querySelector('.header-route'),button=route?.querySelector('button');
 if(!route||!button)return;
 let paused=false;
 try{paused=sessionStorage.getItem('wosol-motion-paused')==='true'}catch{}
 function paint(){
  route.classList.toggle('is-paused',paused||document.hidden);
  document.documentElement.classList.toggle('motion-paused',paused||document.hidden);
  button.setAttribute('aria-pressed',String(paused));
  button.setAttribute('aria-label',paused?button.dataset.resume:button.dataset.pause);
  button.textContent=paused?'▶':'Ⅱ';
 }
 button.addEventListener('click',()=>{paused=!paused;try{sessionStorage.setItem('wosol-motion-paused',String(paused))}catch{}paint()});
 document.addEventListener('visibilitychange',paint);paint();
})();
