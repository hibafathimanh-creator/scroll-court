// SCROLL COURT - Advanced Animation & Physics Engine
import { sound } from './audio.js';

let dustAnimationId = null;

// 1. Ambient Ethereal Dust Canvas Particle System
export function initAmbientDust() {
  let canvas = document.getElementById('ambientDustCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ambientDustCanvas';
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25 - 0.1, // gentle upward drift
      hue: Math.random() > 0.6 ? 230 : (Math.random() > 0.3 ? 200 : 45) // subtle indigo, cyan, or warm gold
    });
  }

  cancelAnimationFrame(dustAnimationId);

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.dx;
      p.y += p.dy;

      // Wrap edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${p.hue}, 80%, 75%, 0.8)`;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    dustAnimationId = requestAnimationFrame(render);
  }

  render();
}

// 2. Smooth Number Counter with Cubic Easing
export function countUp(element, endVal, duration = 1200, formatFn = val => Math.round(val)) {
  if (!element) return;
  const startVal = 0;
  const startTime = performance.now();

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function frame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeOutExpo(progress);
    const current = startVal + (endVal - startVal) * eased;

    element.textContent = formatFn(current);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      element.textContent = formatFn(endVal);
    }
  }

  requestAnimationFrame(frame);
}

// 3. Cinematic Gavel Strike & Shockwave Ripple
export function triggerGavelStrikeVisual(originElement) {
  sound.playGavel();

  // Screen shake
  document.body.classList.remove('shockwave-active');
  void document.body.offsetWidth; // Force reflow
  document.body.classList.add('shockwave-active');
  setTimeout(() => document.body.classList.remove('shockwave-active'), 450);

  // Fullscreen ambient gold flash ripple
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.inset = '0';
  flash.style.pointerEvents = 'none';
  flash.style.zIndex = '9998';
  flash.style.background = 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.35) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%)';
  flash.style.animation = 'gavelShockwave 0.6s ease-out forwards';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 650);

  // Spark burst if origin element provided
  if (originElement) {
    const rect = originElement.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 16; i++) {
      const spark = document.createElement('div');
      const angle = (i / 16) * Math.PI * 2;
      const dist = Math.random() * 80 + 40;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      spark.style.position = 'fixed';
      spark.style.left = `${cx}px`;
      spark.style.top = `${cy}px`;
      spark.style.width = '4px';
      spark.style.height = '4px';
      spark.style.borderRadius = '50%';
      spark.style.backgroundColor = i % 2 === 0 ? '#FCD34D' : '#38BDF8';
      spark.style.boxShadow = '0 0 10px #FCD34D';
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '9999';
      spark.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

      document.body.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 550);
    }
  }
}

// 4. Magnetic 3D Tilt & Cursor Spotlight
export function initMagneticCards(container = document) {
  const cards = container.querySelectorAll('.magnetic-card, .evidence-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Gentle 3D perspective tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}
