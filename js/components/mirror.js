// SCROLL COURT - Signature Feature: The Attention Mirror
import { store } from '../state.js';
import { sound } from '../audio.js';
import { countUp, initMagneticCards } from '../animations.js';

let radarAnimationId = null;

export function renderMirror(container) {
  const state = store.getState();
  const breakdown = state.mirrorBreakdown;
  const totalMinutes = breakdown.reduce((sum, item) => sum + item.minutes, 0);

  container.innerHTML = `
    <section class="py-8 px-4 sm:px-8 max-w-6xl mx-auto space-y-12 animate-fade-in">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div class="space-y-2">
          <div class="case-label text-sky-400 font-mono">SIGNATURE EXHIBIT</div>
          <h2 class="text-4xl sm:text-6xl editorial-title text-zinc-100">
            THE ATTENTION MIRROR
          </h2>
          <p class="text-zinc-400 text-sm max-w-xl font-light">
            A precise proportional reflection of your 24 hours on earth. Where did your finite consciousness actually reside today?
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span class="court-seal">
            <span class="status-dot bg-sky-400"></span>
            24-HOUR ATTENTION LEDGER
          </span>
        </div>
      </div>

      <!-- Provocative Philosophical Centerpiece Banner with Shimmer -->
      <div class="glass-panel-elevated p-8 sm:p-12 text-center relative overflow-hidden space-y-6">
        <div class="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>

        <span class="case-label text-indigo-400 font-mono tracking-widest">THE MIRROR INQUIRY</span>
        
        <h3 class="text-3xl sm:text-5xl lg:text-6xl editorial-title text-zinc-100 max-w-3xl mx-auto leading-tight">
          “If your attention were money,<br />
          <span class="editorial-italic shimmer-text font-serif">
            would you spend it this way again?
          </span>”
        </h3>

        <p class="text-zinc-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Every second spent scrolling was a conscious trade: trading irreplaceable moments of your life for someone else's ad revenue.
        </p>
      </div>

      <!-- Segmented Spectrum Visualization & Radial Radar Clock -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <!-- Left: Horizontal Multi-segment Spectrum Bar & Cards -->
        <div class="lg:col-span-8 space-y-6">
          <div class="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>THE 24-HOUR ATTENTION SPECTRUM (1,440 MINUTES)</span>
            <span>HOVER SEGMENT TO INSPECT VALUE</span>
          </div>

          <!-- Horizontal Multi-segment Bar -->
          <div class="w-full h-14 rounded-2xl bg-zinc-950 p-1.5 flex items-center gap-1 border border-white/10 shadow-2xl overflow-hidden">
            ${breakdown.map((item) => {
              const percent = ((item.minutes / totalMinutes) * 100).toFixed(1);
              return `
                <div 
                  class="mirror-segment h-full rounded-xl transition-all group flex items-center justify-center font-mono text-xs font-bold text-black" 
                  style="width: ${percent}%; background-color: ${item.color};"
                  data-key="${item.key}"
                  title="${item.label}: ${item.minutes}m (${percent}%)"
                >
                  ${percent > 8 ? `<span class="opacity-80 group-hover:opacity-100 text-[11px] truncate px-1 text-black font-semibold">${item.minutes}m</span>` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Legend & Category Breakdown Cards with Magnetic Tilt -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            ${breakdown.map(item => {
              const hrs = Math.floor(item.minutes / 60);
              const mins = item.minutes % 60;
              const percent = ((item.minutes / totalMinutes) * 100).toFixed(1);
              return `
                <div class="glass-panel magnetic-card p-4 space-y-2 border-t-2" style="border-top-color: ${item.color};">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${item.color};"></span>
                    <span class="text-[11px] font-mono text-zinc-400 truncate uppercase">${item.category}</span>
                  </div>
                  <div class="text-xl font-serif text-white">${hrs > 0 ? `${hrs}h ` : ''}${mins > 0 ? `${mins}m` : ''}</div>
                  <div class="text-[11px] text-zinc-500 font-mono">${percent}% of day</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Right: Animated 24-Hour Attention Radar Canvas -->
        <div class="lg:col-span-4 flex flex-col items-center">
          <div class="glass-panel p-6 w-full flex flex-col items-center space-y-4">
            <div class="flex items-center justify-between w-full text-xs font-mono text-zinc-400">
              <span>24H RADIAL MIRROR</span>
              <span class="text-sky-400">SWEEP: ACTIVE</span>
            </div>
            
            <div class="relative w-64 h-64 flex items-center justify-center">
              <canvas id="radialRadarCanvas" width="260" height="260" class="w-full h-full"></canvas>
            </div>

            <div class="text-center font-mono text-[10px] text-zinc-500 uppercase">
              Continuous Circadian Awareness Radar
            </div>
          </div>
        </div>

      </div>

      <!-- Interactive Attention Currency Calculator & Life Reclaim Projection -->
      <div class="glass-panel-elevated p-6 sm:p-10 space-y-8 border border-indigo-500/20">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span class="case-label text-indigo-400 font-mono">FINANCIAL ANALOGY SIMULATOR</span>
            <h4 class="text-2xl font-serif text-white">Attention As Currency Simulator</h4>
          </div>
          <span class="text-xs font-mono text-zinc-400">COMPOUNDING VALUE OF RECLAIMED TIME</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Slider Controls -->
          <div class="lg:col-span-6 space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-zinc-300 font-medium">Reclaim Daily Scrolling:</span>
                <span id="sliderValueText" class="font-mono text-emerald-400 font-bold text-base">45 minutes / day</span>
              </div>
              <input 
                type="range" 
                id="reclaimSlider" 
                min="10" 
                max="120" 
                step="5" 
                value="45" 
                class="w-full accent-emerald-400 bg-zinc-800 rounded-lg cursor-pointer h-2"
              />
              <div class="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>10 min</span>
                <span>45 min</span>
                <span>2 hours</span>
              </div>
            </div>

            <p class="text-xs text-zinc-400 font-light leading-relaxed">
              If you pause when Scroll Court detects a drift and redirect just these minutes into living, here is the compound dividend:
            </p>
          </div>

          <!-- Compound Returns Display -->
          <div class="lg:col-span-6 grid grid-cols-2 gap-4">
            
            <div class="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Annual Reclaimed Time</span>
              <div id="annualHoursDisplay" class="text-3xl font-serif text-emerald-300">273 Hours</div>
              <div id="annualDaysDisplay" class="text-xs text-zinc-400 font-mono">= 11.4 full waking days</div>
            </div>

            <div class="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Tangible Equivalent</span>
              <div id="tangibleEquivalentDisplay" class="text-xl font-serif text-sky-200">27 Books Read</div>
              <div class="text-xs text-zinc-400 font-mono">or conversational fluency</div>
            </div>

          </div>

        </div>

        <div class="flex justify-end pt-2">
          <button id="btnIssueCourtOrderFromMirror" class="btn-primary text-xs font-mono py-2.5 px-6">
            ISSUE COURT ORDER TO RECLAIM THIS →
          </button>
        </div>

      </div>

    </section>
  `;

  // Initialize magnetic tilt cards
  initMagneticCards(container);

  // Initialize Animated 24H Radar Clock
  initRadarCanvas(container, breakdown, totalMinutes);

  // Initial count-up
  countUp(container.querySelector('#annualHoursDisplay'), 273, 1100, v => `${Math.round(v)} Hours`);

  // Attach Slider Dynamics
  const slider = container.querySelector('#reclaimSlider');
  const sliderText = container.querySelector('#sliderValueText');
  const annualHours = container.querySelector('#annualHoursDisplay');
  const annualDays = container.querySelector('#annualDaysDisplay');
  const tangible = container.querySelector('#tangibleEquivalentDisplay');

  if (slider) {
    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      sound.playClick();
      sliderText.textContent = `${val} minutes / day`;

      const yearlyHours = Math.round((val * 365) / 60);
      const yearlyDays = (yearlyHours / 24).toFixed(1);
      
      countUp(annualHours, yearlyHours, 400, v => `${Math.round(v)} Hours`);
      annualDays.textContent = `= ${yearlyDays} full waking days`;

      if (val < 25) {
        tangible.textContent = '12 Books Read';
      } else if (val < 50) {
        tangible.textContent = '27 Books Read';
      } else if (val < 80) {
        tangible.textContent = 'Learn Italian or Piano';
      } else {
        tangible.textContent = 'Write a Complete Novel';
      }
    });
  }

  // Issue court order CTA
  container.querySelector('#btnIssueCourtOrderFromMirror')?.addEventListener('click', () => {
    sound.playGavel();
    store.setState({ activeTab: 'focus' });
  });
}

function initRadarCanvas(container, breakdown, totalMinutes) {
  const canvas = container.querySelector('#radialRadarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = 100;
  let angle = 0;

  cancelAnimationFrame(radarAnimationId);

  function renderRadar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background dial rings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.65, 0, Math.PI * 2);
    ctx.stroke();

    // 24 Hour hour ticks
    for (let h = 0; h < 24; h += 3) {
      const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + Math.cos(a) * (radius - 5);
      const y1 = cy + Math.sin(a) * (radius - 5);
      const x2 = cx + Math.cos(a) * (radius + 5);
      const y2 = cy + Math.sin(a) * (radius + 5);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Hour number
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const tx = cx + Math.cos(a) * (radius + 14);
      const ty = cy + Math.sin(a) * (radius + 14);
      ctx.fillText(`${h}h`, tx, ty);
    }

    // Draw proportional colored arc wedges
    let startAngle = -Math.PI / 2;
    for (let item of breakdown) {
      const sliceAngle = (item.minutes / totalMinutes) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.85, startAngle, startAngle + sliceAngle);
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 8;
      ctx.shadowBlur = 10;
      ctx.shadowColor = item.color;
      ctx.stroke();
      ctx.shadowBlur = 0;

      startAngle += sliceAngle;
    }

    // Sweeping Radar Line with Glowing Tail
    angle += 0.025;
    const rx = cx + Math.cos(angle) * (radius * 0.95);
    const ry = cy + Math.sin(angle) * (radius * 0.95);

    // Radar cone gradient
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    grad.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius * 0.95, angle - 0.35, angle);
    ctx.closePath();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.fill();

    // Radar Arm
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(rx, ry);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#38bdf8';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Center pivot
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f4f4f7';
    ctx.fill();

    radarAnimationId = requestAnimationFrame(renderRadar);
  }

  renderRadar();
}
