'use strict';

(() => {
  const tabs         = [...document.querySelectorAll('.plans-tab')];
  const termBtns     = [...document.querySelectorAll('[data-term]')];
  const paymentBtns  = [...document.querySelectorAll('[data-payment]')];
  const grids        = [...document.querySelectorAll('[data-uni-grid]')];
  if (!tabs.length || !grids.length) return;

  const cardsByGrid = new Map(
    grids.map(g => [g, [...g.querySelectorAll('.plan-card')]])
  );

  let currentUni      = tabs.find(t => t.classList.contains('active'))?.dataset.uni || 'kau';
  let currentTerm     = termBtns.find(b => b.classList.contains('active'))?.dataset.term || 'term1';
  let currentPayment  = paymentBtns.find(b => b.classList.contains('active'))?.dataset.payment || 'month';

  function applyFilters() {
    for (const [grid, cards] of cardsByGrid) {
      const isActive = grid.dataset.uniGrid === currentUni;
      grid.hidden = !isActive;
      if (!isActive) continue;
      for (const card of cards) {
        let shouldShow = false;
        if (currentPayment === 'month') {
          shouldShow = card.dataset.duration === 'month' && card.dataset.termMonth === currentTerm;
        } else {
          shouldShow = card.dataset.duration === currentTerm;
        }
        if (card.hidden !== !shouldShow) card.hidden = !shouldShow;
      }
    }
  }

  function selectIn(group, target) {
    group.forEach(el => {
      const isActive = el === target;
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-selected', String(isActive));
      el.tabIndex = isActive ? 0 : -1;
    });
  }

  function bindGroup(group, attrName, onChange) {
    group.forEach((el, i) => {
      el.addEventListener('click', () => {
        selectIn(group, el);
        onChange(el.dataset[attrName]);
        applyFilters();
      });
      el.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
        e.preventDefault();
        let nextIdx;
        if (e.key === 'Home') {
          nextIdx = 0;
        } else if (e.key === 'End') {
          nextIdx = group.length - 1;
        } else {
          // RTL-aware: in RTL, ArrowLeft moves to the next (visually right→left = forward), ArrowRight moves back
          const isRTL = document.documentElement.dir === 'rtl';
          const forward = isRTL ? (e.key === 'ArrowLeft') : (e.key === 'ArrowRight');
          const dir = forward ? 1 : -1;
          nextIdx = (i + dir + group.length) % group.length;
        }
        const next = group[nextIdx];
        next.focus();
        selectIn(group, next);
        onChange(next.dataset[attrName]);
        applyFilters();
      });
    });
  }

  bindGroup(tabs,        'uni',      v => { currentUni = v; });
  bindGroup(termBtns,    'term',     v => { currentTerm = v; });
  bindGroup(paymentBtns, 'payment',  v => { currentPayment = v; });

  applyFilters();
})();
