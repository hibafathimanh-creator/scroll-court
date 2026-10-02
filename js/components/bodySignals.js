// SCROLL COURT - Body Signals & Attention × Heart Rate Correlation
import { store } from '../state.js';
import { sound } from '../audio.js';

let ecgAnimationId = null;

export function renderBodySignals(container) {
  const state = store.getState();
  const bs = state.bodySignals;
  const corr = state.correlationData;

  const isBluetoothSupported = typeof navigator !== 'undefined' && 'bluetooth' in navigator;

  container.innerHTML = `
    <section class="py-8 px-4 sm:px-8 max-w-6xl mx-auto space-y-10 animate-fade-in">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div class="space-y-2">
          <div class="case-label text-rose-400 font-mono flex items-center gap-2">
            <span>SOMATIC EXHIBIT</span>
            <span class="text-zinc-600">/</span>
            <span>PHYSIOLOGICAL CORRELATION</span>
          </div>
          <h2 class="text-4xl sm:text-5xl editorial-title text-zinc-100">
            BODY SIGNALS
          </h2>
          <p class="text-zinc-400 text-sm max-w-xl font-light">
            Observing how your cardiovascular rhythms shift when your attention is captured by algorithmic feeds.
          </p>
        </div>

        <!-- Mode & Status Indicator -->
        <div class="flex flex-wrap items-center gap-3">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium ${bs.mode === 'live_bluetooth' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}">
            <span class="status-dot ${bs.mode === 'live_bluetooth' ? 'bg-emerald-400' : 'bg-amber-400'}"></span>
            ${bs.mode === 'live_bluetooth' ? 'LIVE WEARABLE CONNECTED (BLUETOOTH 0x180D)' : 'DEMO DATA — SIMULATED FOR ILLUSTRATION'}
          </span>
        </div>
      </div>

      <!-- Legal & Medical Transparency Banner -->
      <div class="glass-panel p-6 border-l-4 border-l-indigo-400 space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-indigo-300 text-xs font-mono font-semibold">
            <span>⚖️ HARDWARE PERMISSION & SCIENTIFIC TRANSPARENCY</span>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 uppercase">Non-Diagnostic</span>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed font-light">
          Scroll Court can only access real physiological metrics when you grant explicit hardware permissions through browser APIs (such as the standard <strong>Web Bluetooth Heart Rate GATT Service 0x180D</strong>) or export from Apple Health / Google Health Connect. We <strong>never fabricate metrics as real</strong>. No medical diagnosis, treatment, or psychiatric assessment is provided.
        </p>
      </div>

      <!-- Main Heart Rate Dashboard & Real-Time ECG Waveform -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Left: Real-time ECG Pulse & Current BPM -->
        <div class="lg:col-span-6 glass-panel-elevated p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <span class="case-label text-zinc-400 font-mono">CURRENT CARDIAC RHYTHM</span>
              <div class="flex items-baseline gap-3">
                <span id="liveBpmDisplay" class="text-5xl sm:text-6xl font-serif text-white font-medium">${bs.currentBpm}</span>
                <span class="font-mono text-sm text-rose-400 font-semibold">BPM</span>
              </div>
            </div>

            <!-- Pulsing Heart Icon -->
            <div class="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/20">
              <svg class="w-7 h-7 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>

          <!-- Dynamic SVG/Canvas ECG Waveform -->
          <div class="relative py-2 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
            <canvas id="ecgCanvas" width="500" height="110"></canvas>
            <div class="absolute bottom-2 right-3 font-mono text-[10px] text-zinc-500">P-Q-R-S-T WAVEFORM SYNC</div>
          </div>

          <!-- Simulation State Buttons -->
          <div class="space-y-2">
            <span class="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">Simulate Bodily State (Demo Mode):</span>
            <div class="grid grid-cols-3 gap-2">
              <button class="btn-bpm-preset btn-secondary text-[11px] py-1.5 font-mono ${bs.currentBpm === 61 ? 'border-sky-400 text-sky-300' : ''}" data-bpm="61" data-label="Resting">
                Resting (61)
              </button>
              <button class="btn-bpm-preset btn-secondary text-[11px] py-1.5 font-mono ${bs.currentBpm === 78 ? 'border-amber-400 text-amber-300' : ''}" data-bpm="78" data-label="Doom Scroll">
                Scroll Surge (78)
              </button>
              <button class="btn-bpm-preset btn-secondary text-[11px] py-1.5 font-mono ${bs.currentBpm === 105 ? 'border-rose-400 text-rose-300' : ''}" data-bpm="105" data-label="Active">
                Active (105)
              </button>
            </div>
          </div>

          <!-- Observation Insight -->
          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-zinc-400">DURING LONGEST SCROLLING SESSION</span>
              <span class="text-amber-300 font-semibold">HEART RATE: 78 BPM</span>
            </div>
            <p class="text-sm font-serif italic text-zinc-200">
              “Your heart-rate pattern changed during this period. Your body changed while your attention stayed online.”
            </p>
          </div>

          <!-- Connect Wearable CTA -->
          <div class="pt-2 flex flex-col sm:flex-row gap-3">
            <button id="btnConnectBluetooth" class="btn-primary text-xs font-mono py-2.5 flex-1">
              <span>${bs.mode === 'live_bluetooth' ? 'DISCONNECT WEARABLE' : 'CONNECT REAL BLUETOOTH SENSOR'}</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </button>
          </div>
        </div>

        <!-- Right: Comprehensive Somatic Vitals Grid -->
        <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div class="glass-panel p-6 space-y-3">
            <div class="flex items-center justify-between">
              <span class="case-label text-zinc-400 font-mono">RESTING HEART RATE</span>
              <span class="text-[10px] font-mono text-zinc-500">[DEMO]</span>
            </div>
            <div class="text-3xl font-serif text-white">${bs.restingBpm} <span class="text-sm font-mono text-zinc-400">BPM</span></div>
            <p class="text-xs text-zinc-400 leading-relaxed font-light">
              Baseline cardiovascular rhythm measured during slow-wave sleep and conscious stillness.
            </p>
          </div>

          <div class="glass-panel p-6 space-y-3">
            <div class="flex items-center justify-between">
              <span class="case-label text-zinc-400 font-mono">PHYSICAL STEPS</span>
              <span class="text-[10px] font-mono text-zinc-500">[DEMO]</span>
            </div>
            <div class="text-3xl font-serif text-white">${bs.steps.toLocaleString()}</div>
            <p class="text-xs text-zinc-400 leading-relaxed font-light">
              Movement recorded in the physical world. Off-screen navigation counterweight.
            </p>
          </div>

          <div class="glass-panel p-6 space-y-3">
            <div class="flex items-center justify-between">
              <span class="case-label text-zinc-400 font-mono">SLEEP DURATION</span>
              <span class="text-[10px] font-mono text-zinc-500">[DEMO]</span>
            </div>
            <div class="text-3xl font-serif text-white">${bs.sleepDuration}</div>
            <p class="text-xs text-zinc-400 leading-relaxed font-light">
              Biological reset. Late night scrolling encroached on 42 minutes of sleep latency.
            </p>
          </div>

          <div class="glass-panel p-6 space-y-3">
            <div class="flex items-center justify-between">
              <span class="case-label text-zinc-400 font-mono">ACTIVE MINUTES</span>
              <span class="text-[10px] font-mono text-zinc-500">[DEMO]</span>
            </div>
            <div class="text-3xl font-serif text-emerald-300">${bs.activeMinutes}m</div>
            <p class="text-xs text-zinc-400 leading-relaxed font-light">
              Dedicated aerobic exertion and deliberate recovery without screen proximity.
            </p>
          </div>

        </div>

      </div>

      <!-- Feature: ATTENTION × BODY CORRELATION -->
      <div class="glass-panel-elevated p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span class="case-label text-indigo-400 font-mono">CROSS-VARIABLE DELIBERATION</span>
            <h3 class="text-2xl font-serif text-white">ATTENTION × BODY</h3>
            <p class="text-xs text-zinc-400 mt-1">
              Visual dual-axis correlation: Scrolling Duration (bars) vs Heart Rate (curve) across 24 hours.
            </p>
          </div>

          <div class="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span class="flex items-center gap-1.5"><span class="w-3 h-[2px] bg-rose-400 inline-block"></span> Heart Rate (BPM)</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 bg-indigo-500/80 rounded-sm inline-block"></span> Doom-Scroll Time</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 bg-emerald-500/80 rounded-sm inline-block"></span> Intentional Focus</span>
          </div>
        </div>

        <!-- Custom Dual-Axis Interactive Chart Container -->
        <div class="relative py-4">
          <div class="h-64 flex items-end gap-2 sm:gap-4 px-2 border-b border-white/10">
            ${corr.map((pt, idx) => {
              const maxScrollHeight = 160; // px
              const doomHeight = Math.min(maxScrollHeight, (pt.scrollMin / 60) * maxScrollHeight);
              const focusHeight = Math.min(maxScrollHeight, (pt.intentionalMin / 60) * maxScrollHeight);

              // BPM curve point offset: 50 bpm = 20px, 90 bpm = 220px
              const bpmOffset = Math.round(((pt.bpm - 50) / 40) * 180);

              return `
                <div class="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer" data-idx="${idx}">
                  
                  <!-- Floating BPM Dot -->
                  <div class="absolute w-3 h-3 rounded-full bg-rose-400 border border-white shadow-sm shadow-rose-500/50 z-20 group-hover:scale-150 transition-transform" style="bottom: ${bpmOffset}px;"></div>

                  <!-- Stacked Bar for Screen Time -->
                  <div class="w-full max-w-[28px] flex flex-col items-center">
                    ${pt.scrollMin > 0 ? `
                      <div class="w-full bg-gradient-to-t from-rose-600 to-rose-400/80 rounded-t-sm transition-all group-hover:brightness-125" style="height: ${doomHeight}px;"></div>
                    ` : ''}
                    ${pt.intentionalMin > 0 ? `
                      <div class="w-full bg-gradient-to-t from-emerald-600 to-emerald-400/80 rounded-t-sm transition-all group-hover:brightness-125" style="height: ${focusHeight}px;"></div>
                    ` : ''}
                  </div>

                  <!-- X-Axis Label -->
                  <div class="text-[10px] font-mono text-zinc-500 mt-2 rotate-45 sm:rotate-0">${pt.hour}</div>

                  <!-- Hover Tooltip -->
                  <div class="absolute -top-14 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center bg-black/95 border border-white/20 px-3 py-1.5 rounded-lg text-[10px] font-mono whitespace-nowrap z-30 pointer-events-none shadow-xl">
                    <span class="text-rose-300 font-bold">${pt.bpm} BPM</span>
                    <span class="text-zinc-400">Scroll: ${pt.scrollMin}m | Focus: ${pt.intentionalMin}m</span>
                  </div>

                </div>
              `;
            }).join('')}
          </div>

          <!-- Bottom Caution & Insight -->
          <div class="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-400 font-sans gap-3">
            <span class="font-serif italic text-zinc-300 text-sm">
              “Explore your patterns.”
            </span>
            <div class="font-mono text-[11px] text-zinc-500">
              IMPORTANT: CORRELATION DOES NOT AUTOMATICALLY MEAN CAUSATION.
            </div>
          </div>
        </div>

      </div>

    </section>
  `;

  // Initialize and run real-time ECG Canvas
  initEcgCanvas(container);

  // BPM preset buttons
  container.querySelectorAll('.btn-bpm-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const newBpm = parseInt(btn.getAttribute('data-bpm')) || 72;
      store.setState({
        bodySignals: { ...store.getState().bodySignals, currentBpm: newBpm }
      });
      renderBodySignals(container);
    });
  });

  // Bluetooth connection handler
  const btnConnect = container.querySelector('#btnConnectBluetooth');
  if (btnConnect) {
    btnConnect.addEventListener('click', async () => {
      sound.playClick();
      if (bs.mode === 'live_bluetooth') {
        store.setState({
          bodySignals: { ...bs, mode: 'demo', connected: false, deviceName: null }
        });
        renderBodySignals(container);
        return;
      }

      if (!isBluetoothSupported) {
        alert("Web Bluetooth API is not supported in this browser. To connect a physical Polar/Garmin/Apple Watch sensor, please use Chrome, Edge, or a Web Bluetooth compatible browser.");
        return;
      }

      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ['heart_rate'] }]
        });
        
        sound.playGavel();
        store.setState({
          bodySignals: {
            ...bs,
            connected: true,
            mode: 'live_bluetooth',
            deviceName: device.name || 'Bluetooth Heart Rate Sensor',
            currentBpm: 74
          }
        });
        renderBodySignals(container);
      } catch (err) {
        console.log("Bluetooth request dismissed or failed:", err);
        alert("Bluetooth connection request was dismissed. Demo telemetry remains active.");
      }
    });
  }
}

function initEcgCanvas(container) {
  const canvas = container.querySelector('#ecgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  let x = 0;
  let points = new Array(width).fill(height / 2);
  let pulseTimer = 0;

  cancelAnimationFrame(ecgAnimationId);

  function draw() {
    pulseTimer++;

    let y = height / 2;
    const bpm = store.getState().bodySignals.currentBpm || 72;
    const pulseInterval = Math.round(3600 / bpm);

    const cycle = pulseTimer % pulseInterval;
    if (cycle === 0) {
      y -= 6;
    } else if (cycle === 4) {
      y += 8;
    } else if (cycle === 7) {
      y -= 38;
    } else if (cycle === 10) {
      y += 18;
    } else if (cycle === 16) {
      y -= 10;
    } else {
      y += (Math.random() - 0.5) * 1.5;
    }

    points[x] = y;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < width; gx += 25) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, height);
      ctx.stroke();
    }
    for (let gy = 0; gy < height; gy += 25) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 10;

    for (let i = 0; i < width; i++) {
      if (i === 0) ctx.moveTo(i, points[i]);
      else ctx.lineTo(i, points[i]);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, points[x], 3, 0, Math.PI * 2);
    ctx.fill();

    x = (x + 2) % width;
    ecgAnimationId = requestAnimationFrame(draw);
  }

  draw();
}
