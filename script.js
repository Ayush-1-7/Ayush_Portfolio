/* ===== PRELOADER (Max Level Blackhole) ===== */
(function () {
  const canvas = document.getElementById('pre-canvas'), ctx = canvas.getContext('2d');
  const counter = document.getElementById('pre-counter'), fill = document.getElementById('pre-fill'), pre = document.getElementById('preloader');
  const ring = document.getElementById('pre-ring-fill');
  const terminalInner = document.getElementById('pre-terminal-inner');
  let w, h, particles = [], burstParticles = [], v = 0, frame = 0, done = false;
  let logIndex = 0;

  // Terminal system messages
  const termLogs = [
    "> CHECKING MEMORY INTEGRITY... OK",
    "> LOADING KERNEL MODULES...",
    "> MOUNTING VIRTUAL FILE SYSTEM...",
    "> INITIALIZING GPU PIPELINE...",
    "> LOADING NEURAL NETWORK WEIGHTS...",
    "> ESTABLISHING SECURE LINK... OK",
    "> DECRYPTING ASSET BUNDLE...",
    "> PREFETCHING PROJECT DATA...",
    "> CALIBRATING DISPLAY OUTPUT...",
    "> OPTIMIZING RENDER PIPELINE...",
    "> FINALIZING BOOT SEQUENCE...",
    "> SYSTEM READY"
  ];
  const logThresholds = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88];

  function addLog(msg) {
    const line = document.createElement('div');
    line.className = 'pre-terminal-line';
    line.textContent = msg;
    terminalInner.appendChild(line);
    terminalInner.parentElement.scrollTop = terminalInner.parentElement.scrollHeight;
  }

  const statusLabels = [
    "INITIALIZING CORE", "QUANTUM SYNC", "NEURAL LINK ESTABLISHED",
    "SINGULARITY STABLE", "CALIBRATING SPACE-TIME", "DATA STREAM ACTIVE",
    "EVENT HORIZON MAPPED", "PHOTON SPHERE SYNC", "DECRYPTING ASSETS",
    "SYSTEM READY"
  ];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 600; i++) {
    particles.push({
      r: Math.random() * Math.max(w, h) * 0.45 + 50,
      angle: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.012,
      size: 0.4 + Math.random() * 1.8,
      color: Math.random() > 0.85 ? '#3b82f6' : '#ffffff',
      dist: Math.random(),
      life: Math.random()
    });
  }

  // Initial boot message
  addLog("> BOOT SEQUENCE v3.0.0 INITIATED");

  function draw() {
    if (pre.classList.contains('done') && burstParticles.length === 0) return;
    frame++;

    if (burstParticles.length > 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    }
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const pulse = Math.sin(frame * 0.05) * 5;

    if (burstParticles.length === 0) {
      const voidRadius = 60 + (v * 0.2) + pulse;

      const gradient = ctx.createRadialGradient(cx, cy, voidRadius, cx, cy, voidRadius * 2.5);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(cx - voidRadius * 3, cy - voidRadius * 3, voidRadius * 6, voidRadius * 6);

      ctx.beginPath();
      ctx.arc(cx, cy, voidRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.shadowBlur = 40 + pulse * 2;
      ctx.shadowColor = '#3b82f6';
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(cx, cy, voidRadius + 1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 4]);
      ctx.lineDashOffset = frame * 0.5;
      ctx.stroke();
      ctx.setLineDash([]);

      particles.forEach(p => {
        const speedMult = 1 + (v / 100) * 1.5;
        p.angle += p.speed * speedMult;
        const currentR = p.r * (1 - p.dist * 0.2);
        const x = cx + Math.cos(p.angle) * currentR;
        const y = cy + Math.sin(p.angle) * currentR * 0.3;
        const stretch = 1 + (p.speed * 100 * speedMult);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.angle + Math.PI / 2);
        ctx.globalAlpha = (0.2 + (1 - p.dist) * 0.6) * (Math.sin(frame * 0.1 + p.life * 10) * 0.2 + 0.8);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * stretch, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    // Burst particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const p = burstParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.life -= 0.006;
      p.size *= 0.995;
      if (p.life <= 0 || p.size < 0.1) {
        burstParticles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 25;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }
  draw();

  function spawnBurst() {
    const cx = w / 2, cy = h / 2;
    const colors = ['#3b82f6', '#60a5fa', '#ffffff', '#93c5fd', '#1d4ed8'];
    for (let i = 0; i < 250; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 10;
      burstParticles.push({
        x: cx + (Math.random() - 0.5) * 100,
        y: cy + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0.8 + Math.random() * 0.4
      });
    }
  }

  const statusLabel = document.querySelector('.pre-label');

  function updateStatus(val) {
    const index = Math.floor((val / 100) * (statusLabels.length - 1));
    if (statusLabel && statusLabel.innerText !== statusLabels[index]) {
      statusLabel.innerHTML = `<span>${statusLabels[index]}</span>`;
    }
  }

  !function tick() {
    if (v >= 100) {
      if (!done) {
        done = true;
        counter.textContent = '100%';
        fill.style.width = '100%';
        ring.style.strokeDashoffset = '0';
        updateStatus(100);
        spawnBurst();
        addLog("> BOOT SEQUENCE COMPLETE");
        setTimeout(() => {
          pre.classList.add('done');
          document.body.style.overflow = '';
          initAll();
          setTimeout(() => {
            pre.style.display = 'none';
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          }, 800);
        }, 600);
      }
      return;
    }

    let increment = Math.random() * 1.5;
    if (v < 20) increment *= 1.2;
    else if (v > 40 && v < 60) increment *= 0.5;
    else if (v > 80) increment *= 2.5;

    v += increment;
    if (v > 100) v = 100;

    const val = Math.floor(v);
    counter.textContent = val.toString().padStart(2, '0') + '%';
    fill.style.width = v + '%';

    // Update ring
    const circumference = 263.89;
    ring.style.strokeDashoffset = circumference - (v / 100) * circumference;

    // Add terminal logs at thresholds
    for (let i = logIndex; i < logThresholds.length; i++) {
      if (v >= logThresholds[i]) {
        addLog(termLogs[i]);
        logIndex = i + 1;
      }
    }

    updateStatus(v);

    const delay = v > 80 ? 20 : (Math.random() * 50 + 20);
    setTimeout(tick, delay);
  }();
})();

let lenis;
function initAll() {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2 });
  lenis.on('scroll', ScrollTrigger.update);
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  initCursor(); initNav(); initSpace(); initHeroAnim(); initCycle(); initTyping(); initScrollAnims(); initSkillsNetwork(); initCounters(); initWave(); initDash(); initGlobe(); initAudio()
}
/* ===== CURSOR & TRAILS ===== */
function initCursor() {
  const dot = document.getElementById('cursor-dot'); if (!dot || matchMedia('(max-width:768px)').matches) return;
  let mx = 0, my = 0, dx = 0, dy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY });

  const trails = [];
  for (let i = 0; i < 8; i++) {
    let t = document.createElement('div');
    t.className = 'cursor-trail';
    t.style.cssText = `position:fixed;width:${8 - i}px;height:${8 - i}px;background:rgba(79,142,247,${0.5 - i * 0.05});border-radius:50%;pointer-events:none;z-index:10000;transform:translate(-50%,-50%);`;
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0 });
  }

  !function loop() {
    dx += (mx - dx) * .15; dy += (my - dy) * .15;
    dot.style.left = dx + 'px'; dot.style.top = dy + 'px';

    let tx = mx, ty = my;
    trails.forEach((t, i) => {
      t.x += (tx - t.x) * (0.3 - i * 0.02);
      t.y += (ty - t.y) * (0.3 - i * 0.02);
      t.el.style.left = t.x + 'px';
      t.el.style.top = t.y + 'px';
      tx = t.x; ty = t.y;
    });

    requestAnimationFrame(loop)
  }();
  document.querySelectorAll('[data-hover], a, button').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hover'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hover'))
  });
}

/* ===== NAV ===== */
function initNav() {
  const ham = document.getElementById('ham'), mob = document.getElementById('mob-menu');
  ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '' });
  document.querySelectorAll('.mob-menu a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow = '' }));
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if (t) gsap.to(window, { duration: 1, scrollTo: { y: t, offsetY: 60 }, ease: 'power3.inOut' }) }));

  // Glass nav on scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  }, { passive: true });
}

/* ===== SPACE BACKGROUND ===== */
function initSpace() {
  const cv = document.getElementById('space-canvas'); if (!cv) return;
  const ctx = cv.getContext('2d'); let W, H;
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight } resize();
  window.addEventListener('resize', resize);

  // STARS
  const stars = []; const STAR_COUNT = 800;
  for (let i = 0; i < STAR_COUNT; i++) {
    const tier = Math.random();
    stars.push({
      x: Math.random() * W, y: Math.random() * H * 3, r: Math.random() * 2 + .5,
      baseA: tier < .4 ? .2 : tier < .75 ? .5 : .9, a: 0, phase: Math.random() * Math.PI * 2, speed: .5 + Math.random() * 1.5
    })
  }

  // NEBULA
  const nebulae = [
    { x: W * .2, y: H * .3, r: 300, c: 'rgba(10,22,40,0.15)', dx: .1, dy: .05 },
    { x: W * .7, y: H * .6, r: 250, c: 'rgba(13,10,30,0.15)', dx: -.08, dy: .06 },
    { x: W * .5, y: H * 1.5, r: 350, c: 'rgba(5,20,25,0.12)', dx: .06, dy: -.04 },
    { x: W * .8, y: H * 2, r: 280, c: 'rgba(10,22,40,0.1)', dx: -.05, dy: .07 }
  ];

  // SHOOTING STARS
  let shooters = []; let lastShoot = 0; const SHOOT_INTERVAL = 3000 + Math.random() * 4000;
  function spawnShooter() {
    const angle = (20 + Math.random() * 25) * Math.PI / 180; const speed = 12 + Math.random() * 8;
    shooters.push({
      x: Math.random() * W, y: Math.random() * H * .4, angle, speed, life: 0, maxLife: .6 + Math.random() * .6,
      len: 80 + Math.random() * 60, w: 1.5 + Math.random()
    })
  }

  // COMETS
  let comets = []; let lastComet = Date.now() - 10000;
  function spawnComet() {
    const angle = (15 + Math.random() * 20) * Math.PI / 180;
    comets.push({
      x: -100, y: Math.random() * H * .5, angle, speed: 3 + Math.random() * 2, life: 0, maxLife: 4 + Math.random() * 3,
      particles: []
    })
  }

  let scrollY = 0; window.addEventListener('scroll', () => scrollY = window.pageYOffset);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now();

    // Nebulae
    nebulae.forEach(n => {
      n.x += n.dx; n.y += n.dy;
      if (n.x < -n.r) n.x = W + n.r; if (n.x > W + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = H * 3 + n.r; if (n.y > H * 3 + n.r) n.y = -n.r;
      const g = ctx.createRadialGradient(n.x, n.y - scrollY * .02, 0, n.x, n.y - scrollY * .02, n.r);
      g.addColorStop(0, n.c); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.fillRect(n.x - n.r, n.y - scrollY * .02 - n.r, n.r * 2, n.r * 2);
    });

    // Stars with parallax and twinkle
    stars.forEach(s => {
      const sy = ((s.y - scrollY * .1) % (H * 3) + H * 3) % (H * 3);
      if (sy > H + 10) return;
      s.a = s.baseA * (.6 + .4 * Math.sin(s.phase + t * s.speed * .001));
      ctx.beginPath(); ctx.arc(s.x, sy, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`; ctx.fill();
    });

    // Shooting stars
    if (t - lastShoot > SHOOT_INTERVAL) { spawnShooter(); lastShoot = t }
    shooters = shooters.filter(s => {
      s.life += .016; if (s.life > s.maxLife) return false;
      const progress = s.life / s.maxLife; const alpha = progress < .3 ? progress / .3 : 1 - (progress - .3) / .7;
      const hx = s.x + Math.cos(s.angle) * s.speed * s.life * 60;
      const hy = s.y + Math.sin(s.angle) * s.speed * s.life * 60;
      const tx = hx - Math.cos(s.angle) * s.len; const ty = hy - Math.sin(s.angle) * s.len;
      const grad = ctx.createLinearGradient(hx, hy, tx, ty);
      grad.addColorStop(0, `rgba(79,142,247,${alpha})`); grad.addColorStop(.3, `rgba(255,255,255,${alpha * .6})`);
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(tx, ty); ctx.strokeStyle = grad; ctx.lineWidth = s.w; ctx.stroke();
      // head glow
      ctx.beginPath(); ctx.arc(hx, hy, 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(79,142,247,${alpha})`; ctx.fill();
      return true;
    });

    // Comets
    if (t - lastComet > 15000 + Math.random() * 10000) { spawnComet(); lastComet = t }
    comets = comets.filter(c => {
      c.life += .016; if (c.life > c.maxLife) return false;
      const progress = c.life / c.maxLife; const alpha = progress < .2 ? progress / .2 : Math.max(0, 1 - (progress - .6) / .4);
      const cx = c.x + Math.cos(c.angle) * c.speed * c.life * 60;
      const cy = c.y + Math.sin(c.angle) * c.speed * c.life * 60 + Math.sin(c.life * 2) * 20;
      // tail
      const tailLen = 200; const tx = cx - Math.cos(c.angle) * tailLen; const ty = cy - Math.sin(c.angle) * tailLen;
      const grad = ctx.createLinearGradient(cx, cy, tx, ty);
      grad.addColorStop(0, `rgba(79,142,247,${alpha})`); grad.addColorStop(.2, `rgba(255,255,255,${alpha * .4})`);
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tx, ty); ctx.strokeStyle = grad; ctx.lineWidth = 3; ctx.stroke();
      // head glow
      ctx.save(); ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(79,142,247,0.6)';
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
      ctx.restore();
      // particles
      if (Math.random() > .5) c.particles.push({ x: cx, y: cy, a: alpha * .5, life: 0 });
      c.particles = c.particles.filter(p => {
        p.life += .03; p.a -= .015; if (p.a <= 0) return false;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI * 2); ctx.fillStyle = `rgba(79,142,247,${p.a})`; ctx.fill(); return true
      });
      return true;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ===== HERO ANIMATION ===== */
function initHeroAnim() {
  const tl = gsap.timeline({ delay: .1 });
  tl.from('.hero-label', { opacity: 0, y: 20, duration: .7, ease: 'power3.out' })
    .from('.hero-line', { opacity: 0, y: 60, duration: 1, ease: 'power4.out', stagger: .15 }, '<.2')
    .from('.hero-col-left', { opacity: 0, y: 30, duration: .7 }, '<.5')
    .from('.hero-col-right', { opacity: 0, y: 30, duration: .7 }, '<.2');
}

/* ===== WORD CYCLE ===== */
function initCycle() {
  const words = ['talk', 'move', 'matter']; const el = document.getElementById('hero-cycle'); if (!el) return; let i = 0;
  setInterval(() => {
    gsap.to(el, {
      opacity: 0, y: -20, duration: .3, ease: 'power2.in', onComplete: () => {
        i = (i + 1) % words.length; el.textContent = words[i];
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .3, ease: 'power2.out' })
      }
    })
  }, 2400);
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnims() {
  gsap.registerPlugin(ScrollTrigger);

  // Reveal elements
  gsap.utils.toArray('.rv').forEach(el => gsap.to(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, opacity: 1, y: 0, duration: .9, ease: 'power3.out' }));
  gsap.utils.toArray('.sec-num,.sec-label').forEach(el => gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, opacity: 0, x: -15, duration: .6, ease: 'power3.out' }));

  // Horizontal Timeline Scroll
  const tlWrapper = document.querySelector('.tl-scroll-container');
  const tlTrack = document.querySelector('.tl-track');
  if (tlWrapper && tlTrack) {
    let getScrollAmount = () => -(tlTrack.scrollWidth - window.innerWidth + 100);
    gsap.to(tlTrack, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: ".tl-wrapper",
        start: "top top",
        end: () => `+=${tlTrack.scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  }

  // Horizontal Projects Scroll
  const projWrapper = document.querySelector('.proj-scroll-wrapper');
  const projTrack = document.querySelector('.proj-track');
  if (projWrapper && projTrack) {
    let getProjScroll = () => -(projTrack.scrollWidth - window.innerWidth + 100);
    gsap.to(projTrack, {
      x: getProjScroll,
      ease: "none",
      scrollTrigger: {
        trigger: ".proj-scroll-wrapper",
        start: "top top",
        end: () => `+=${projTrack.scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  }
}

/* ===== TYPING ANIMATION ===== */
function initTyping() {
  const t1 = "Hi, I'm Ayush.";
  const t2 = "I turn messy data into meaningful systems.";
  const el1 = document.getElementById('type-1');
  const el2 = document.getElementById('type-2');
  if (!el1 || !el2) return;

  function typeText(el, text, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        let i = 0;
        let interval = setInterval(() => {
          el.textContent += text.charAt(i);
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      }, delay);
    });
  }

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 75%',
    once: true,
    onEnter: async () => {
      await typeText(el1, t1, 0);
      await typeText(el2, t2, 300);
    }
  });
}

/* ===== SKILLS NETWORK GRAPH ===== */
/* ===== SKILLS NETWORK GRAPH (GALAXY / RADAR) ===== */
function initSkillsNetwork() {
  const canvas = document.getElementById('skills-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // UI Elements
  const tooltip = document.getElementById('skill-tooltip');
  const ttName = document.getElementById('st-name');
  const ttDesc = document.getElementById('st-desc');

  const sidePanel = document.getElementById('skill-sidepanel');
  const spClose = document.getElementById('sp-close');
  const spName = document.getElementById('sp-name');
  const spRole = document.getElementById('sp-role');
  const spExp = document.getElementById('sp-exp');
  const spUsage = document.getElementById('sp-usage');

  const btnNetwork = document.getElementById('btn-network');
  const btnRadar = document.getElementById('btn-radar');

  let w = canvas.parentElement.offsetWidth;
  let h = canvas.parentElement.offsetHeight;
  canvas.width = w * devicePixelRatio;
  canvas.height = h * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    w = canvas.parentElement.offsetWidth;
    h = canvas.parentElement.offsetHeight;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  });

  // State
  let mode = 'network'; // 'network' | 'radar'
  let mouse = { x: -1000, y: -1000, isDown: false, vx: 0, vy: 0 };
  let draggedNode = null;
  let hoveredNode = null;
  let selectedNode = null;
  let particles = [];

  // Nodes Definition
  const nodes = [
    { id: "DATA ENGINEERING CORE", desc: "My primary strength", usage: "End-to-end data pipelines, architecture, scaling.", role: "Core Foundation", exp: "3+ Years", orbitLevel: 0, speed: 0, angle: 0, size: 22, isCore: true, score: 100 },
    { id: "Python", desc: "Automation, ETL pipelines, data processing", usage: "Pandas, PySpark, API integration, Task Automation.", role: "Backend / Data", exp: "3 Years", orbitLevel: 1, speed: 0.004, size: 13, score: 95 },
    { id: "SQL", desc: "Joins, aggregations, DB optimization", usage: "Complex queries, window functions, indexing.", role: "Database", exp: "3 Years", orbitLevel: 1, speed: 0.004, size: 13, score: 90 },
    { id: "AWS", desc: "EC2, S3, RDS, Lambda", usage: "Cloud architecture, serverless pipelines.", role: "Cloud", exp: "2 Years", orbitLevel: 1, speed: 0.004, size: 13, score: 75 },
    { id: "Power BI", desc: "Dashboards, DAX, data modeling", usage: "Executive dashboards, KPI tracking, reports.", role: "Analytics", exp: "2.5 Years", orbitLevel: 1, speed: 0.004, size: 13, score: 85 },
    { id: "Docker", desc: "Containerized deployments", usage: "Consistent environments, microservices.", role: "DevOps", exp: "2 Years", orbitLevel: 2, speed: 0.0025, size: 10, score: 70 },
    { id: "React", desc: "Interactive UI, components", usage: "Frontend logic, hooks, state management.", role: "Frontend", exp: "2 Years", orbitLevel: 2, speed: 0.0025, size: 10, score: 85 },
    { id: "Next.js", desc: "Full-stack web apps", usage: "Server actions, SSR, API routes.", role: "Fullstack", exp: "1.5 Years", orbitLevel: 2, speed: 0.0025, size: 10, score: 80 },
    { id: "TypeScript", desc: "Type-safe robust web apps", usage: "Interfaces, generics, strict typing.", role: "Language", exp: "2 Years", orbitLevel: 2, speed: 0.0025, size: 10, score: 85 },
    { id: "Git", desc: "Version control, CI/CD workflows", usage: "Branching strategies, GitHub Actions.", role: "DevOps", exp: "3 Years", orbitLevel: 2, speed: 0.0025, size: 9, score: 80 },
    { id: "MongoDB", desc: "NoSQL document databases", usage: "Schema design, aggregation pipelines.", role: "Database", exp: "1.5 Years", orbitLevel: 2, speed: 0.0025, size: 9, score: 65 }
  ];

  // Distribute initial angles evenly per orbit
  const o1 = nodes.filter(n => n.orbitLevel === 1);
  const o2 = nodes.filter(n => n.orbitLevel === 2);
  o1.forEach((n, i) => { n.angle = (Math.PI * 2 / o1.length) * i; });
  o2.forEach((n, i) => { n.angle = (Math.PI * 2 / o2.length) * i + 0.3; });
  nodes.forEach(n => { n.x = w / 2; n.y = h * 0.55; });

  // Init Particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      size: Math.random() * 1.5,
      speedY: (Math.random() - 0.5) * 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5
    });
  }

  // Toggles
  btnNetwork.addEventListener('click', () => { mode = 'network'; btnNetwork.classList.add('active'); btnRadar.classList.remove('active'); closePanel(); });
  btnRadar.addEventListener('click', () => { mode = 'radar'; btnRadar.classList.add('active'); btnNetwork.classList.remove('active'); closePanel(); });

  // Side Panel
  function openPanel(node) {
    selectedNode = node;
    spName.textContent = node.id;
    spRole.textContent = node.role;
    spExp.textContent = node.exp;
    spUsage.textContent = node.usage;
    sidePanel.classList.add('open');
  }
  function closePanel() {
    selectedNode = null;
    sidePanel.classList.remove('open');
  }
  spClose.addEventListener('click', closePanel);

  // Interaction
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    mouse.vx = mx - mouse.x;
    mouse.vy = my - mouse.y;
    mouse.x = mx; mouse.y = my;

    if (draggedNode) {
      // Elastic drag logic applied later
    } else {
      let found = null;
      for (let i = nodes.length - 1; i >= 0; i--) {
        let n = nodes[i];
        let dx = mouse.x - n.x, dy = mouse.y - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.size * 2) { found = n; break; }
      }
      if (found !== hoveredNode) {
        hoveredNode = found;
        if (found && !draggedNode && !selectedNode) {
          document.body.style.cursor = 'pointer';
          ttName.textContent = found.id;
          ttDesc.textContent = found.desc;
          tooltip.classList.add('visible');
        } else {
          document.body.style.cursor = 'grab';
          tooltip.classList.remove('visible');
        }
      }
      if (found) {
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY + 15) + 'px';
      }
    }
  });

  canvas.addEventListener('mousedown', () => {
    mouse.isDown = true;
    if (hoveredNode) {
      draggedNode = hoveredNode;
      canvas.style.cursor = 'grabbing';
      tooltip.classList.remove('visible');
    } else {
      closePanel();
    }
  });

  canvas.addEventListener('mouseup', () => {
    mouse.isDown = false;
    if (draggedNode && Math.abs(mouse.vx) < 5 && Math.abs(mouse.vy) < 5) { // Click detection
      openPanel(draggedNode);
    }
    draggedNode = null;
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.isDown = false; draggedNode = null; hoveredNode = null;
    tooltip.classList.remove('visible');
  });

  // Allow wheel events on canvas to scroll the page (don't trap scroll inside the skills section)
  canvas.addEventListener('wheel', (e) => {
    // Only let page scroll if not actively dragging a node
    if (!draggedNode) {
      // Don't preventDefault — let the event bubble to Lenis/browser
    }
  }, { passive: true });

  // Render Loop
  let radarProgress = 0;

  function draw() {
    // Automatically resize if parent container changes after initial load
    if (canvas.parentElement) {
      let currentW = canvas.parentElement.offsetWidth;
      let currentH = canvas.parentElement.offsetHeight;
      if (w !== currentW || h !== currentH) {
        w = currentW;
        h = currentH;
        canvas.width = w * devicePixelRatio;
        canvas.height = h * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    }

    ctx.clearRect(0, 0, w, h);

    // Calculate dynamic positioning — slight offset for header
    let cx = w / 2;
    let cy = h * 0.52;

    // Responsive radii — use more of available space
    let baseR = Math.min(w, h * 0.85);
    let orbit1R = baseR * 0.22;
    let orbit2R = baseR * 0.38;
    const dynamicRadarRadius = Math.min(baseR * 0.38, w * 0.32);

    // Assign calculated 'r' to nodes
    nodes.forEach(n => {
      if (n.orbitLevel === 0) n.r = 0;
      else if (n.orbitLevel === 1) n.r = orbit1R;
      else if (n.orbitLevel === 2) n.r = orbit2R;
    });

    // Draw faint orbit rings in network mode
    if (radarProgress < 1) {
      ctx.globalAlpha = 0.08 * (1 - radarProgress);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      [orbit1R, orbit2R].forEach(r => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    let isFrozen = hoveredNode || selectedNode || draggedNode;

    // Mode transition progress
    radarProgress += (mode === 'radar' ? 0.05 : -0.05);
    radarProgress = Math.max(0, Math.min(1, radarProgress));

    // Draw Particles
    ctx.fillStyle = '#4F8EF7';
    particles.forEach(p => {
      p.x += p.speedX; p.y += p.speedY;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.globalAlpha = p.opacity * (1 - radarProgress * 0.8); // Fade particles in radar mode
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Draw Radar Background
    if (radarProgress > 0) {
      const nonCoreNodes = nodes.filter(n => !n.isCore);
      const angles = nonCoreNodes.map((_, i) => (Math.PI * 2 / nonCoreNodes.length) * i - Math.PI / 2);

      ctx.globalAlpha = radarProgress * 0.3;
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 1;

      // Web rings
      for (let level = 1; level <= 5; level++) {
        let r = dynamicRadarRadius * (level / 5);
        ctx.beginPath();
        angles.forEach((a, i) => {
          let px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.stroke();
      }

      // Axes
      angles.forEach(a => {
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * dynamicRadarRadius, cy + Math.sin(a) * dynamicRadarRadius);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Draw Radar Polygon
      if (radarProgress > 0.5) {
        ctx.beginPath();
        nonCoreNodes.forEach((n, i) => {
          let a = angles[i];
          let r = dynamicRadarRadius * (n.score / 100);
          let px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = `rgba(59,130,246, ${0.15 * radarProgress})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(59,130,246, ${radarProgress})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Radar axis labels
      ctx.globalAlpha = radarProgress;
      ctx.fillStyle = '#3B82F6';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      nonCoreNodes.forEach((n, i) => {
        let a = angles[i];
        let labelR = dynamicRadarRadius + 28;
        let lx = cx + Math.cos(a) * labelR;
        let ly = cy + Math.sin(a) * labelR;
        ctx.shadowColor = 'rgba(59,130,246,0.4)';
        ctx.shadowBlur = 6;
        ctx.fillText(n.id, lx, ly);
        // Score below
        ctx.font = '500 9px Space Mono, monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText(n.score + '%', lx, ly + 14);
        ctx.fillStyle = '#3B82F6';
        ctx.font = '600 11px Inter, sans-serif';
      });
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    // Update and Draw Nodes
    const nonCoreNodes = nodes.filter(n => !n.isCore);

    nodes.forEach((n, idx) => {
      // Calculate target positions
      let tx, ty, tSize = n.size, tAlpha = 1;

      if (mode === 'network') {
        if (!isFrozen) n.angle += n.speed;
        let tiltY = 0.35; // Oval shape
        tx = cx + Math.cos(n.angle) * n.r;
        ty = cy + Math.sin(n.angle) * n.r * tiltY;

        let depth = Math.sin(n.angle); // -1 (back) to 1 (front)
        if (!n.isCore) {
          tSize = n.size * (1 + depth * 0.3);
          tAlpha = 0.4 + (depth + 1) * 0.3; // 0.4 to 1.0
        }

        // Mouse Repel
        if (!draggedNode && !selectedNode) {
          let dx = tx - mouse.x, dy = ty - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            tx += (dx / dist) * (100 - dist) * 0.3;
            ty += (dy / dist) * (100 - dist) * 0.3;
          }
        }
      } else {
        // Radar Mode Targets
        if (n.isCore) {
          tx = cx; ty = cy; tSize = 0; tAlpha = 0; // Hide core
        } else {
          let radarAngle = (Math.PI * 2 / nonCoreNodes.length) * nonCoreNodes.indexOf(n) - Math.PI / 2;
          let r = dynamicRadarRadius * (n.score / 100);
          tx = cx + Math.cos(radarAngle) * r;
          ty = cy + Math.sin(radarAngle) * r;
          tSize = 8;
          tAlpha = 1;
        }
      }

      if (n === draggedNode) {
        tx = mouse.x; ty = mouse.y;
      }

      if (n === hoveredNode || n === selectedNode) {
        tSize *= 1.3;
        tAlpha = 1;
      }

      // Interpolate actual positions
      let lerpSpeed = draggedNode === n ? 0.4 : 0.08;
      n.x += (tx - n.x) * lerpSpeed;
      n.y += (ty - n.y) * lerpSpeed;
      n.currentSize = n.currentSize || n.size;
      n.currentSize += (tSize - n.currentSize) * 0.1;
      n.currentAlpha = n.currentAlpha || 1;
      n.currentAlpha += (tAlpha - n.currentAlpha) * 0.1;
      n.depth = Math.sin(n.angle); // Save for sorting
    });

    // Draw connecting lines (Elastic/Hover in Network mode)
    if (mode === 'network' && (hoveredNode || draggedNode || selectedNode)) {
      let activeNode = draggedNode || selectedNode || hoveredNode;
      if (activeNode && !activeNode.isCore) {
        ctx.beginPath();
        ctx.moveTo(activeNode.x, activeNode.y);
        ctx.lineTo(nodes[0].x, nodes[0].y); // to core
        ctx.strokeStyle = `rgba(59,130,246, ${activeNode.currentAlpha * (1 - radarProgress)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Sort by depth to draw back-to-front in network mode
    let sortedNodes = [...nodes].sort((a, b) => a.depth - b.depth);

    sortedNodes.forEach(n => {
      if (n.currentAlpha <= 0.05) return;

      ctx.globalAlpha = n.currentAlpha;
      ctx.shadowBlur = (n === hoveredNode || n === selectedNode) ? 25 : 10;
      ctx.shadowColor = '#3B82F6';

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.currentSize, 0, Math.PI * 2);
      ctx.fillStyle = (n === hoveredNode || n === selectedNode) ? '#fff' : '#0a0a0c';
      ctx.fill();

      ctx.lineWidth = n.isCore ? 3 : 2;
      ctx.strokeStyle = n.isCore ? '#fff' : '#3B82F6';
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Text
      ctx.fillStyle = (n === hoveredNode || n === selectedNode) ? '#000' : '#f0f0f0';
      if (!n.isCore || (n.isCore && radarProgress < 0.5)) {
        ctx.fillStyle = '#f0f0f0';
        ctx.font = n.isCore ? 'bold 12px Space Mono' : '11px Space Mono';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let tyOffset = n.isCore ? 0 : n.currentSize + 12;
        if (n.isCore) {
          ctx.fillText("DATA ENG", n.x, n.y - 6);
          ctx.fillText("CORE", n.x, n.y + 6);
        } else {
          ctx.fillText(n.id, n.x, n.y + tyOffset);
        }
      }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();

  // Resize already handled in draw loop and line 307 listener — no duplicate needed
}

/* ===== COUNTERS ===== */
function initCounters() {
  document.querySelectorAll('.num-val').forEach(el => {
    const t = parseFloat(el.dataset.t), p = el.dataset.p || '', s = el.dataset.s || '', dec = el.dataset.d;
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true, onEnter: () => {
        gsap.to({ v: 0 }, {
          v: t, duration: 2, ease: 'power2.out', onUpdate: function () {
            const v = this.targets()[0].v; el.textContent = p + (dec ? v.toFixed(parseInt(dec)) : Math.floor(v).toLocaleString()) + s
          }
        })
      }
    });
  });
}

/* ===== WAVE VISUAL ===== */
function initWave() {
  const w = document.getElementById('pv-wave'); if (!w) return;
  for (let i = 0; i < 35; i++) { const b = document.createElement('div'); b.className = 'bar'; b.style.animationDelay = (i * .05) + 's'; w.appendChild(b) }
}

/* ===== DASH VISUAL ===== */
function initDash() {
  const d = document.getElementById('pv-dash'); if (!d) return;
  for (let i = 0; i < 9; i++) { const c = document.createElement('div'); c.className = 'd'; c.style.animationDelay = (i * .2) + 's'; d.appendChild(c) }
}

/* ===== PHOTOREALISTIC GLOBE ===== */
function initGlobe() {
  const cv = document.getElementById('globe'); if (!cv || typeof THREE === 'undefined') return;
  const w = cv.clientWidth || 500, h = cv.clientHeight || 500;
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, w / h, .1, 1000); cam.position.z = 5.5;
  const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
  renderer.setSize(w, h); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const loader = new THREE.TextureLoader();
  const BASE = 'https://unpkg.com/three-globe/example/img/';

  // Earth
  const earthGeo = new THREE.SphereGeometry(2, 64, 64);
  const earthMat = new THREE.MeshPhongMaterial({
    shininess: 25,
    map: loader.load(BASE + 'earth-blue-marble.jpg'),
    bumpMap: loader.load(BASE + 'earth-topology.png'),
    bumpScale: .05,
    specularMap: loader.load(BASE + 'earth-water.png'),
    specular: new THREE.Color('#333')
  });
  const earth = new THREE.Mesh(earthGeo, earthMat); scene.add(earth);

  // Clouds
  const cloudGeo = new THREE.SphereGeometry(2.02, 64, 64);
  const cloudMat = new THREE.MeshPhongMaterial({
    map: loader.load(BASE + 'earth-clouds.png'), transparent: true, opacity: .35, depthWrite: false
  });
  const clouds = new THREE.Mesh(cloudGeo, cloudMat); scene.add(clouds);

  // Atmosphere glow
  const atmoGeo = new THREE.SphereGeometry(2.25, 64, 64);
  const atmoMat = new THREE.ShaderMaterial({
    vertexShader: `varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec3 vN;void main(){float i=pow(0.55-dot(vN,vec3(0,0,1.0)),2.0);gl_FragColor=vec4(0.31,0.56,0.97,1.0)*i;}`,
    blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true
  });
  scene.add(new THREE.Mesh(atmoGeo, atmoMat));

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5); sun.position.set(5, 3, 5); scene.add(sun);
  const fillLight = new THREE.DirectionalLight(0x4F8EF7, 0.5); fillLight.position.set(-5, 3, -5); scene.add(fillLight);

  // Pune marker
  const phi = (90 - 18.5204) * Math.PI / 180, theta = (73.8567 + 180) * Math.PI / 180;
  const px = -(2.03) * Math.sin(phi) * Math.cos(theta), py = (2.03) * Math.cos(phi), pz = (2.03) * Math.sin(phi) * Math.sin(theta);
  const markerGeo = new THREE.SphereGeometry(.05, 16, 16);
  const markerMat = new THREE.MeshBasicMaterial({ color: 0x4F8EF7 });
  const marker = new THREE.Mesh(markerGeo, markerMat); marker.position.set(px, py, pz); earth.add(marker);

  // Pulse ring
  const ringGeo = new THREE.RingGeometry(.06, .11, 24);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x4F8EF7, transparent: true, opacity: .6, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(ringGeo, ringMat); ring.position.copy(marker.position); ring.lookAt(0, 0, 0); earth.add(ring);

  // Interactive Raycaster for marker
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const tooltip = document.getElementById('globe-tooltip');

  cv.addEventListener('mousemove', (e) => {
    const rect = cv.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / w) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / h) * 2 + 1;

    raycaster.setFromCamera(mouse, cam);
    const intersects = raycaster.intersectObject(marker);
    if (intersects.length > 0) {
      document.body.style.cursor = 'pointer';
      tooltip.innerHTML = `<ul><li>Based somewhere on Earth</li></ul>`;
      tooltip.classList.add('visible');
      tooltip.style.left = (e.clientX) + 'px';
      tooltip.style.top = (e.clientY - 20) + 'px';
    } else {
      document.body.style.cursor = 'grab';
      tooltip.classList.remove('visible');
    }
  });

  // OrbitControls
  let controls;
  try {
    controls = new THREE.OrbitControls(cam, cv);
    controls.enableDamping = true;
    controls.dampingFactor = .05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = .6;
  } catch (e) { }

  let hovered = false;
  cv.addEventListener('mouseenter', () => { hovered = true; if (controls) controls.autoRotateSpeed = .2 });
  cv.addEventListener('mouseleave', () => { hovered = false; if (controls) controls.autoRotateSpeed = .6; tooltip.classList.remove('visible') });

  // Zoom on scroll - throttled via rAF to avoid firing gsap.to on every pixel
  let globeScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!globeScrollTicking) {
      globeScrollTicking = true;
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const targetZ = 5.5 - (scrollY * 0.001);
        gsap.to(cam.position, { z: Math.max(targetZ, 3), duration: 0.5, ease: "power2.out", overwrite: 'auto' });
        globeScrollTicking = false;
      });
    }
  }, { passive: true });

  // Resize handler
  window.addEventListener('resize', () => {
    const nw = cv.clientWidth || window.innerWidth;
    const nh = cv.clientHeight || window.innerHeight;
    renderer.setSize(nw, nh);
    cam.aspect = nw / nh;
    cam.updateProjectionMatrix();
  });

  // Pulse animation
  let pulsePhase = 0;
  !function animate() {
    requestAnimationFrame(animate);
    if (!controls) { earth.rotation.y += hovered ? .0003 : .001; clouds.rotation.y += hovered ? .0005 : .0015 }
    else { controls.update() }
    clouds.rotation.y += .0003;

    // Ring pulse
    pulsePhase += .04; const scale = 1 + Math.sin(pulsePhase) * .8;
    ring.scale.set(scale, scale, 1); ring.material.opacity = .6 * (1 - Math.abs(Math.sin(pulsePhase)));

    renderer.render(scene, cam);
  }();
}

/* ===== AUDIO (Cinematic Ambient Synth) ===== */
function initAudio() {
  const btn = document.getElementById('sound-toggle');
  let ctx, masterGain, playing = false;
  let oscillators = [];

  function createAmbient() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Master Gain for smooth fade in/out
    masterGain = ctx.createGain();
    masterGain.gain.value = 0;

    // Compressor for that "rich" cinematic feel
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-24, ctx.currentTime);
    compressor.knee.setValueAtTime(40, ctx.currentTime);
    compressor.ratio.setValueAtTime(12, ctx.currentTime);
    compressor.attack.setValueAtTime(0, ctx.currentTime);
    compressor.release.setValueAtTime(0.25, ctx.currentTime);

    masterGain.connect(compressor);
    compressor.connect(ctx.destination);

    // 1. Deep Bass Drone (The Void)
    const createDrone = (freq, vol, type = 'sine') => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.value = vol;
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      oscillators.push(osc);

      // LFO for "breathing" effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.1; // Very slow
      lfoGain.gain.value = vol * 0.5;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfo.start();
    };

    // Low drones
    createDrone(55, 0.15); // A1
    createDrone(110, 0.1, 'triangle'); // A2

    // 2. Shimmering "Stars" (Higher harmonics)
    const createShimmer = (freq, vol) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      filter.type = 'lowpass';
      filter.frequency.value = 400;
      filter.Q.value = 10;

      g.gain.value = 0; // Start silent
      osc.connect(filter);
      filter.connect(g);
      g.connect(masterGain);
      osc.start();

      // Slow fade in/out shimmer
      const pulse = () => {
        const now = ctx.currentTime;
        g.gain.setTargetAtTime(vol, now, 4);
        g.gain.setTargetAtTime(0, now + 5, 4);
        setTimeout(pulse, 12000 + Math.random() * 8000);
      };
      pulse();
    };

    createShimmer(220, 0.05);
    createShimmer(330, 0.03); // Perfect fifth

    // 3. Organ Pulse (Interstellar Vibe)
    const createOrgan = () => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 440; // A4
      g.gain.value = 0;
      osc.connect(g);
      g.connect(masterGain);
      osc.start();

      const sequence = [440, 329.63, 261.63, 196.00]; // A4, E4, C4, G3
      let step = 0;

      const playStep = () => {
        if (!playing) return;
        const now = ctx.currentTime;
        osc.frequency.setTargetAtTime(sequence[step], now, 0.5);
        g.gain.setTargetAtTime(0.02, now, 1);
        g.gain.setTargetAtTime(0, now + 2, 2);
        step = (step + 1) % sequence.length;
        setTimeout(playStep, 6000);
      };
      setTimeout(playStep, 2000);
    };
    createOrgan();
  }

  btn.addEventListener('click', () => {
    if (!ctx) createAmbient();

    if (playing) {
      masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
      playing = false;
      btn.textContent = 'Sound Off';
      btn.style.color = 'var(--mt)';
    } else {
      if (ctx.state === 'suspended') ctx.resume();
      masterGain.gain.setTargetAtTime(1, ctx.currentTime, 1);
      playing = true;
      btn.textContent = 'Sound On';
      btn.style.color = '#fff';
    }
  });
}
