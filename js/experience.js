'use strict';
(() => {
  const motionToggle = document.querySelector('.route-motion-toggle');
  motionToggle?.addEventListener('click', () => {
    const paused = document.querySelector('.fleet-route').classList.toggle('fleet-route--paused');
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? motionToggle.dataset.resume : motionToggle.dataset.pause;
  });
  const selector = document.getElementById('journey-choice');
  const target = document.querySelector('.journey-finder__link');
  selector?.addEventListener('change', () => {
    if (target) target.setAttribute('href', selector.value);
  });
  const tabs = [...document.querySelectorAll('[data-fleet]')];
  const panels = [...document.querySelectorAll('.fleet-panel')];
  function activate(tab, focus = false) {
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    panels.forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      const direction = document.documentElement.dir === 'rtl' ? -1 : 1;
      let next;
      if (event.key === 'ArrowRight') next = (index + direction + tabs.length) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - direction + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
    });
  });
})();
