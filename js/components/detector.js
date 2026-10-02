// SCROLL COURT - The Scroll Detector & Timeline Analysis
import { store } from '../state.js';
import { sound } from '../audio.js';
import { triggerCourtInterruption } from './interruptionOverlay.js';
import { initMagneticCards } from '../animations.js';

export function renderDetector(container) {
  const state = store.getState();
  const events = state.timelineEvents;

  container.innerHTML = `
    <section class="py-8 px-4 sm:px-8 max-w-6xl mx-auto space-y-10 animate-fade-in">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div class="space-y-2">
          <div class="case-label text-indigo-400 font-mono">NEURAL HEURISTIC ANALYSIS</div>
          <h2 class="text-4xl sm:text-5xl editorial-title text-zinc-100">
            THE SCROLL DETECTOR
          </h2>
          <p class="text-zinc-400 text-sm max-w-xl font-light">
            Continuous algorithmic observation of velocity, switching frequency, and circadian drift. Identifying where attention slips into involuntary momentum.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span class="court-seal">
            <span class="status-dot bg-indigo-400"></span>
            7 BEHAVIOR PATTERNS MONITORED
          </span>
        </div>
      </div>

      <!-- Live Pattern Detected Non-Judgmental Intervention Banner -->
      <div class="glass-panel-elevated p-6 sm:p-8 border-l-4 border-l-rose-500 relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <div class="flex items-center gap-2">
              <span class="status-dot bg-rose-500"></span>
              <span class="case-label text-rose-400 font-mono">PATTERN DETECTED — EXHIBIT D</span>
            </div>
            <h3 class="text-2xl font-serif text-white">
              “You appear to have entered a 42-minute unplanned scrolling session.”
            </h3>
            <p class="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              No shame. The interface was engineered to keep you here. This prompt exists simply to return the steering wheel to your hands.
            </p>
          </div>

          <!-- The Three Non-Judgmental Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button id="detectorPauseBtn" class="btn-primary text-xs font-mono py-2.5 px-5">
              <span>PAUSE</span>
            </button>
            <button id="detectorContinueBtn" class="btn-secondary text-xs font-mono py-2.5 px-5">
              <span>CONTINUE</span>
            </button>
            <button id="detectorWhyBtn" class="btn-secondary text-xs font-mono py-2.5 px-5 border-indigo-400/40 text-indigo-300 hover:text-white">
              <span>WHY AM I HERE?</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 7 Pattern Recognition Matrix -->
      <div class="space-y-4">
        <div class="case-label text-zinc-400 font-mono">RECOGNIZED ATTENTION ANOMALIES</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div class="glass-panel p-4 space-y-1.5 border-l-2 border-l-indigo-400">
            <div class="font-mono text-indigo-300 font-medium">Unusually Long Sessions</div>
            <div class="text-zinc-400 text-[11px]">Continuous scrolling exceeding 30 consecutive minutes.</div>
          </div>
          <div class="glass-panel p-4 space-y-1.5 border-l-2 border-l-sky-400">
            <div class="font-mono text-sky-300 font-medium">Rapid App Switching</div>
            <div class="text-zinc-400 text-[11px]">Jumping across 3+ social apps within 180 seconds.</div>
          </div>
          <div class="glass-panel p-4 space-y-1.5 border-l-2 border-l-rose-400">
            <div class="font-mono text-rose-300 font-medium">Late-Night Scrolling</div>
            <div class="text-zinc-400 text-[11px]">Unconscious usage past 11:30 PM circadian boundary.</div>
          </div>
          <div class="glass-panel p-4 space-y-1.5 border-l-2 border-l-amber-400">
            <div class="font-mono text-amber-300 font-medium">Repetitive Checking</div>
            <div class="text-zinc-400 text-[11px]">Re-opening the same feed within 5 minutes of closing.</div>
          </div>
        </div>
      </div>

      <!-- 24-Hour Visual Timeline of the User's Day -->
      <div class="glass-panel p-6 sm:p-8 space-y-6 relative overflow-hidden" id="timelineSection">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span class="case-label text-zinc-400 font-mono">CHRONOLOGICAL DOCKET</span>
            <h3 class="text-2xl font-serif text-white">Visual Timeline of Today</h3>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button id="btnPlayDaySimulation" class="px-3.5 py-1.5 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
              <span id="playSimIcon">▶</span>
              <span id="playSimLabel">PLAY DAY TIMELINE (10s)</span>
            </button>
            <div class="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Focus</span>
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-rose-500"></span> Doom</span>
            </div>
          </div>
        </div>

        <!-- Interactive Scrub Timeline List -->
        <div class="space-y-3 font-mono text-xs">
          ${events.map(ev => {
            let badgeClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
            let dotColor = 'bg-emerald-400';
            let label = 'Intentional Focus';

            if (ev.type === 'doom') {
              badgeClass = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
              dotColor = 'bg-rose-500';
              label = 'Doom Scroll';
            } else if (ev.type === 'social') {
              badgeClass = 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
              dotColor = 'bg-indigo-400';
              label = 'Social Communication';
            }

            return `
              <div class="timeline-row flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all gap-3 cursor-pointer group" data-id="${ev.id}">
                <div class="flex items-center gap-4">
                  <div class="text-zinc-300 font-bold text-sm tracking-wider w-16">${ev.time}</div>
                  <div class="hidden sm:block text-zinc-600">─────</div>
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full ${dotColor}"></span>
                    <span class="font-sans font-medium text-white group-hover:text-indigo-300 transition-colors">${ev.title}</span>
                  </div>
                </div>

                <div class="flex items-center gap-4 text-xs">
                  <span class="text-zinc-500">${ev.category}</span>
                  <span class="text-zinc-400">${ev.duration}</span>
                  <span class="text-[11px] text-zinc-500 font-mono">HR: ${ev.hr} BPM</span>
                  <span class="px-2.5 py-1 rounded-full border ${badgeClass} text-[10px] uppercase font-semibold">
                    ${label}
                  </span>
                </div>

                ${ev.flag && ev.note ? `
                  <div class="sm:hidden text-[11px] text-rose-300/80 font-sans italic pt-1">
                    ⚠ ${ev.note}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Interactive Live Feed Trap Simulator (Test the Detector) -->
      <div class="glass-panel p-6 sm:p-8 space-y-6 border border-indigo-500/20">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <span class="case-label text-indigo-400 font-mono">EXPERIMENTAL SANDBOX</span>
            <h3 class="text-xl sm:text-2xl font-serif text-white">Live Infinite Feed Simulator</h3>
            <p class="text-xs text-zinc-400 max-w-lg">
              Test how the Scroll Court Detector responds in real-time. Scroll rapidly below to observe algorithmic velocity tracking and trigger an interruption.
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="p-3 rounded-xl bg-black/40 border border-white/5 text-right font-mono">
              <div class="text-[10px] text-zinc-500 uppercase">Scroll Velocity</div>
              <div id="simScrollVelocity" class="text-lg font-bold text-sky-400">0 px/s</div>
            </div>
            <button id="btnTriggerInterruptionManual" class="btn-emergency text-xs">
              ⚡ TEST COURT INTERRUPTION
            </button>
          </div>
        </div>

        <!-- Simulated Feed Box -->
        <div id="feedTrapSimulator" class="feed-trap-container p-4 space-y-4">
          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <div class="flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>@algorithmic_feed · 2m</span>
              <span>Trending</span>
            </div>
            <p class="text-sm text-zinc-300">
              “The most addictive product design feature isn’t notification badges; it is the infinite scroll invented by Aza Raskin in 2006, which removed the natural human stopping cue.”
            </p>
            <div class="text-xs text-indigo-400 font-mono">#DigitalWellness #AttentionEconomy</div>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <div class="flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>@neural_pulse · 6m</span>
              <span>Video Loop</span>
            </div>
            <p class="text-sm text-zinc-300">
              [Simulated Short Video Auto-playing] 15-second hyper-dopamine cooking sequence that loops infinitely without a finish screen.
            </p>
            <div class="text-xs text-zinc-500 text-[11px]">842k views · 1.2k comments</div>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <div class="flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>@curiosity_spark · 14m</span>
              <span>Discussion</span>
            </div>
            <p class="text-sm text-zinc-300">
              “Notice how your thumb wants to make one more flick. Why? What are you expecting to find on the very next screen?”
            </p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <div class="flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>@time_architect · 22m</span>
              <span>Philosophy</span>
            </div>
            <p class="text-sm text-zinc-300">
              “Every hour you give to an algorithmic feed is an hour you did not spend with the book on your nightstand, or sleeping peacefully.”
            </p>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <div class="flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>@deep_craft · 35m</span>
              <span>Insight</span>
            </div>
            <p class="text-sm text-zinc-300">
              You've scrolled past 5 simulated items. You are inside the observation chamber. Notice how effortless it is to keep pulling down.
            </p>
          </div>
        </div>

      </div>

    </section>
  `;

  // Attach button events
  const pauseBtn = container.querySelector('#detectorPauseBtn');
  const continueBtn = container.querySelector('#detectorContinueBtn');
  const whyBtn = container.querySelector('#detectorWhyBtn');
  const manualInterruptionBtn = container.querySelector('#btnTriggerInterruptionManual');

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      sound.playChime(432, 2.0);
      store.reclaimMinutes(15);
      alert("Court paused. 15 minutes restored to your intentional balance.");
    });
  }

  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      sound.playClick();
      alert("Session logged as intentional continuation. Safe travels.");
    });
  }

  if (whyBtn) {
    whyBtn.addEventListener('click', () => {
      sound.playClick();
      openWhyAmIHereModal();
    });
  }

  if (manualInterruptionBtn) {
    manualInterruptionBtn.addEventListener('click', () => {
      sound.playGavel();
      triggerCourtInterruption(30);
    });
  }

  // Live scroll velocity tracker on feed trap simulator
  const sim = container.querySelector('#feedTrapSimulator');
  const veloEl = container.querySelector('#simScrollVelocity');
  if (sim && veloEl) {
    let lastTop = sim.scrollTop;
    let lastTime = Date.now();
    let scrollAccumulator = 0;

    sim.addEventListener('scroll', () => {
      const now = Date.now();
      const dt = Math.max(1, now - lastTime);
      const dy = Math.abs(sim.scrollTop - lastTop);
      const velocity = Math.round((dy / dt) * 1000);
      
      veloEl.textContent = `${velocity} px/s`;
      lastTop = sim.scrollTop;
      lastTime = now;
      scrollAccumulator += dy;

      // If user scrolls heavily through the feed trap, trigger Court Interruption naturally!
      if (scrollAccumulator > 700) {
        scrollAccumulator = 0;
        sound.playGavel();
        triggerCourtInterruption(30);
      }
    });
  }

  // Initialize magnetic cards on detector
  initMagneticCards(container);

  // Play Day in 10 Seconds timeline scanner
  const playBtn = container.querySelector('#btnPlayDaySimulation');
  const playIcon = container.querySelector('#playSimIcon');
  const playLabel = container.querySelector('#playSimLabel');
  let isPlayingSim = false;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlayingSim) return;
      isPlayingSim = true;
      playIcon.textContent = '⏸';
      playLabel.textContent = 'SCANNING 24-HOUR DOCKET...';
      sound.playGavel();

      const rows = container.querySelectorAll('.timeline-row');
      let idx = 0;

      const interval = setInterval(() => {
        rows.forEach(r => {
          r.classList.remove('bg-indigo-600/30', 'scale-[1.02]', 'border-indigo-400', 'border-rose-400', 'bg-rose-500/25');
        });

        if (idx < rows.length) {
          const row = rows[idx];
          const isDoom = row.querySelector('.bg-rose-500');
          if (isDoom) {
            row.classList.add('bg-rose-500/25', 'border-rose-400', 'scale-[1.02]');
            sound.playChime(320, 0.8);
          } else {
            row.classList.add('bg-indigo-600/30', 'border-indigo-400', 'scale-[1.02]');
            sound.playClick();
          }
          row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          idx++;
        } else {
          clearInterval(interval);
          isPlayingSim = false;
          playIcon.textContent = '▶';
          playLabel.textContent = 'PLAY DAY TIMELINE (10s)';
          sound.playChime(528, 2.0);
          rows.forEach(r => r.classList.remove('bg-indigo-600/30', 'scale-[1.02]', 'border-indigo-400', 'border-rose-400', 'bg-rose-500/25'));
        }
      }, 950);
    });
  }

  // Row click to inspect event
  container.querySelectorAll('.timeline-row').forEach(row => {
    row.addEventListener('click', () => {
      sound.playClick();
      const id = row.getAttribute('data-id');
      const ev = events.find(e => e.id == id);
      if (ev) {
        alert(`${ev.time} — ${ev.title}\nDuration: ${ev.duration}\nCategory: ${ev.category}\nHeart Rate: ${ev.hr} BPM\n${ev.note ? 'Anomaly Note: ' + ev.note : 'Status: Intentional block'}`);
      }
    });
  });
}

function openWhyAmIHereModal() {
  const modal = document.getElementById('globalModalBackdrop');
  const modalBody = document.getElementById('globalModalBody');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between border-b border-white/10 pb-4">
        <span class="case-label text-indigo-400 font-mono">COURT INQUIRY</span>
        <button id="closeWhyModalBtn" class="text-zinc-400 hover:text-white text-lg cursor-pointer">✕</button>
      </div>

      <div class="space-y-2">
        <h3 class="text-3xl font-serif text-white">“Why did you open this screen?”</h3>
        <p class="text-zinc-400 text-sm font-light">
          Attention drift is almost always a reaction to a subconscious emotional state. Select the signal your mind is sending:
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button class="why-option-btn p-4 rounded-xl bg-white/[0.03] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-400/50 text-left transition-all" data-reason="fatigue">
          <div class="text-sm font-medium text-white">Mental Fatigue</div>
          <div class="text-xs text-zinc-400 mt-1">My brain is overloaded and searching for effortless stimulation.</div>
        </button>

        <button class="why-option-btn p-4 rounded-xl bg-white/[0.03] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-400/50 text-left transition-all" data-reason="avoidance">
          <div class="text-sm font-medium text-white">Task Avoidance</div>
          <div class="text-xs text-zinc-400 mt-1">I have a difficult or ambiguous task I feel resistant to starting.</div>
        </button>

        <button class="why-option-btn p-4 rounded-xl bg-white/[0.03] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-400/50 text-left transition-all" data-reason="connection">
          <div class="text-sm font-medium text-white">Need for Connection</div>
          <div class="text-xs text-zinc-400 mt-1">I feel isolated or bored and am seeking human resonance.</div>
        </button>

        <button class="why-option-btn p-4 rounded-xl bg-white/[0.03] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-400/50 text-left transition-all" data-reason="habit">
          <div class="text-sm font-medium text-white">Pure Muscle Memory</div>
          <div class="text-xs text-zinc-400 mt-1">My thumb unlocked the phone without conscious permission.</div>
        </button>
      </div>

      <div class="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-zinc-500 font-mono">
        <span>AWARENESS PRECEDES CHOICE</span>
        <button id="whyDismissBtn" class="btn-secondary py-1.5 px-4 text-xs font-mono">DISMISS INQUIRY</button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');
  modalBody.querySelector('#closeWhyModalBtn')?.addEventListener('click', close);
  modalBody.querySelector('#whyDismissBtn')?.addEventListener('click', close);

  modalBody.querySelectorAll('.why-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playChime(528, 2.5);
      const reason = btn.getAttribute('data-reason');
      close();
      if (reason === 'avoidance') {
        store.setState({ activeTab: 'casefile' });
      } else if (reason === 'fatigue') {
        store.setState({ activeTab: 'focus' });
      } else {
        alert("Awareness noted. Take one slow breath before deciding your next move.");
      }
    });
  });
}
