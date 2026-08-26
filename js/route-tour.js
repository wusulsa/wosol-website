/* ============================================================
   وُسُل — Route Tour (route-tour.js)
   Automatic bus tour along the coverage route.
   ‣ Auto tour: drive → pause at each city → return home, loop
   ‣ Hover/focus a city: the bus drives TO that city and waits
     there; on leave, the tour resumes from that city onward.
   Uses SVG getPointAtLength() — works in every browser.
   ============================================================ */

'use strict';

(() => {
  const path  = document.getElementById('routePath');
  const bus   = document.getElementById('routeBus');
  const trail = document.getElementById('routeTrail');
  if (!path || !bus) return;

  const total  = path.getTotalLength();
  const STOPS  = [0.06, 0.20, 0.34, 0.48, 0.62, 0.76, 0.90].map(f => f * total);
  const SPEED  = 210;    // px per second
  const PAUSE  = 800;    // ms at each city during the auto tour

  const cities = [...document.querySelectorAll('.route .city')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pointAt = l => path.getPointAtLength(Math.max(0, Math.min(total, l)));
  const norm    = a => ((a + 180) % 360 + 360) % 360 - 180;

  let posL = 0;             // current position along the path (px)
  let rot  = 0;             // current applied rotation (deg) — 0 = facing left
  let prev = pointAt(0);

  function render() {
    bus.setAttribute('transform',
      `translate(${prev.x.toFixed(1)} ${prev.y.toFixed(1)}) rotate(${rot.toFixed(1)})`);
    if (trail) trail.setAttribute('stroke-dasharray', `${posL.toFixed(1)} ${total.toFixed(1)}`);
  }

  /* Move toward path position l. Rotation follows the path's forward
     tangent only — the bus ALWAYS faces the cities, even on the way
     back home (it reverses without ever turning around). */
  function stepTo(l, dt) {
    const p  = pointAt(l);
    const p2 = pointAt(l + 2);        // forward tangent (toward the cities)
    const target = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI - 180;
    rot += norm(target - rot) * Math.min(1, dt * 10);
    prev = p;
    render();
  }

  /* ── Reduced motion: jump instantly on hover/focus ────────── */
  if (reduceMotion) {
    const jump = l => {
      posL = l;
      const p  = pointAt(l);
      const p2 = pointAt(l + 2);
      rot  = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI - 180;
      prev = p;
      render();
    };
    cities.forEach((c, i) => {
      c.addEventListener('mouseenter', () => jump(STOPS[i]));
      c.addEventListener('focus',      () => jump(STOPS[i]));
      c.addEventListener('mouseleave', () => jump(0));
      c.addEventListener('blur',       () => jump(0));
    });
    render();
    return;
  }

  /* ── Full engine: auto tour + drive-to-city on hover ──────── */
  let state    = 'drive';           // 'drive' | 'pause' | 'hold'
  let afterLeg = 'pause';           // what to do when the current leg ends
  let tourIdx  = 0;                 // next tour stop index (STOPS.length = home)
  let fromL = 0, toL = STOPS[0];
  let dur = Math.abs(toL - fromL) / SPEED * 1000;
  let t0  = performance.now(), lastNow = t0;

  const tourTarget = i => (i < STOPS.length ? STOPS[i] : 0);
  const easeInOut  = k => k < 0.5 ? 2 * k * k : 1 - ((-2 * k + 2) ** 2) / 2;

  function startLeg(target, then) {
    fromL = posL;
    toL   = target;
    dur   = Math.abs(toL - fromL) / SPEED * 1000;
    t0    = performance.now();
    afterLeg = then;
    state = 'drive';
  }

  cities.forEach((c, i) => {
    const goCity = () => startLeg(STOPS[i], 'hold');
    const leave  = () => {
      tourIdx = (i + 1) % (STOPS.length + 1);
      startLeg(tourTarget(tourIdx), 'pause');
    };
    c.addEventListener('mouseenter', goCity);
    c.addEventListener('focus',      goCity);
    c.addEventListener('mouseleave', leave);
    c.addEventListener('blur',       leave);
  });

  let rafId = null;

  function frame(now) {
    const dt = Math.min(0.05, (now - lastNow) / 1000);
    lastNow  = now;

    if (state === 'drive') {
      const k = dur === 0 ? 1 : Math.min(1, (now - t0) / dur);
      posL = fromL + (toL - fromL) * easeInOut(k);
      if (k >= 1) {
        if (afterLeg === 'hold') {
          state = 'hold';                     // wait at the hovered city
        } else {
          state = 'pause';
          t0 = now;
        }
      }
    } else if (state === 'pause' && now - t0 >= PAUSE) {
      tourIdx = (tourIdx + 1) % (STOPS.length + 1);
      startLeg(tourTarget(tourIdx), 'pause');
    }

    stepTo(posL, dt);
    rafId = requestAnimationFrame(frame);
  }

  function startLoop() {
    if (rafId == null) {
      lastNow = performance.now();
      rafId = requestAnimationFrame(frame);
    }
  }
  function stopLoop() {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  render();

  const routeEl = document.querySelector('.route');
  if (routeEl && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? startLoop() : stopLoop());
    }, { threshold: 0 });
    io.observe(routeEl);
  } else {
    startLoop();
  }
})();
