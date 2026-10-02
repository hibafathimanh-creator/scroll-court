// SCROLL COURT - Digital Detox / Focus Mode ("COURT ORDERS")
import { store } from '../state.js';
import { sound } from '../audio.js';
import { initMagneticCards } from '../animations.js';

let focusTimerInterval = null;

export function renderFocusMode(container) {
  const state = store.getState();
  const orders = state.courtOrders;
  const active = state.activeFocusSession;

  if (active) {
    renderActiveCourtOrderScreen(container, active);
    return;
  }

  // Orders Directory
  container.innerHTML = `
    <section class="py-8 px-4 sm:px-8 max-w-5xl mx-auto space-y-10 animate-fade-in">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div class="space-y-2">
          <div class="case-label text-indigo-400 font-mono">BINDING RESTRAINT ORDERS</div>
          <h2 class="text-4xl sm:text-5xl editorial-title text-zinc-100">
            COURT ORDERS
          </h2>
          <p class="text-zinc-400 text-sm max-w-xl font-light">
            Self-imposed judicial decrees. Establish sacred boundaries around deep work, sleep, and meals.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button id="btnCreateCustomOrder" class="btn-primary text-xs font-mono py-2.5 px-4">
            + ISSUE CUSTOM ORDER
          </button>
        </div>
      </div>

      <!-- Pre-configured Court Orders Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${orders.map(order => `
          <div class="glass-panel magnetic-card p-6 flex flex-col justify-between space-y-4 hover:border-indigo-400/40 transition-all group">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="case-label text-indigo-400 font-mono">${order.tag}</span>
                <span class="font-mono text-xs text-zinc-400 font-semibold">${order.durationMinutes} MINUTES</span>
              </div>
              <h3 class="text-xl font-serif text-white group-hover:text-indigo-200 transition-colors">
                “${order.title}”
              </h3>
            </div>

            <div class="pt-4 border-t border-white/5 flex items-center justify-between">
              <span class="text-xs text-zinc-400 font-mono">DOCKET RULE #${order.id}</span>
              <button class="btn-activate-order btn-secondary text-xs font-mono py-2 px-5 group-hover:bg-white group-hover:text-black transition-all" data-id="${order.id}" data-title="${order.title}" data-mins="${order.durationMinutes}">
                ENFORCE ORDER ⚖️
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Judicial Philosophy Callout -->
      <div class="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-2">
        <span class="case-label text-zinc-400 font-mono">COURT JURISPRUDENCE</span>
        <p class="text-xs sm:text-sm text-zinc-300 font-serif italic leading-relaxed">
          “A court order is not a punishment handed down from an external power. It is an agreement made by your highest conscious self to protect your future from your momentary impulses.”
        </p>
      </div>

    </section>
  `;

  // Initialize magnetic cards on court orders
  initMagneticCards(container);

  // Attach enforcement clicks
  container.querySelectorAll('.btn-activate-order').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playGavel();
      const title = btn.getAttribute('data-title');
      const mins = parseInt(btn.getAttribute('data-mins')) || 30;
      startFocusSession(title, mins, container);
    });
  });

  // Custom Order
  container.querySelector('#btnCreateCustomOrder')?.addEventListener('click', () => {
    sound.playClick();
    const customTitle = prompt("Enter your Custom Court Order rule (e.g., 'Writing sanctuary until 5:00 PM'):");
    if (customTitle && customTitle.trim()) {
      const customMins = parseInt(prompt("Duration in minutes (e.g. 25, 45, 60):", "45")) || 45;
      sound.playGavel();
      startFocusSession(customTitle.trim(), customMins, container);
    }
  });
}

function startFocusSession(title, minutes, container) {
  const totalSeconds = minutes * 60;
  const activeSession = {
    title,
    minutes,
    totalSeconds,
    remainingSeconds: totalSeconds,
    startTime: Date.now()
  };

  store.setState({ activeFocusSession: activeSession });
  sound.startAmbientDrone();
  renderActiveCourtOrderScreen(container, activeSession);
}

function renderActiveCourtOrderScreen(container, active) {
  let rem = active.remainingSeconds;

  container.innerHTML = `
    <div class="focus-active-aura"></div>

    <section class="min-h-[82vh] flex flex-col justify-between py-6 px-4 sm:px-8 max-w-4xl mx-auto relative z-20 animate-fade-in text-center">
      
      <!-- Top Order Bar -->
      <div class="flex items-center justify-between border-b border-white/10 pb-4">
        <div class="flex items-center gap-2">
          <span class="status-dot bg-indigo-400"></span>
          <span class="case-label text-indigo-400 font-mono tracking-widest font-semibold">COURT ORDER ACTIVE</span>
        </div>

        <div class="flex items-center gap-3">
          <!-- Ambient Audio Toggle -->
          <button id="btnFocusAmbientToggle" class="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-indigo-400 text-xs font-mono text-zinc-300">
            🔊 AMBIENT SANCTUARY: ON
          </button>
        </div>
      </div>

      <!-- Centerpiece Countdown & Task Affirmation -->
      <div class="my-auto py-10 space-y-6">
        <div class="space-y-2 max-w-xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-serif text-white">
            “Your attention belongs to the task.”
          </h2>
          <p class="font-mono text-sm text-indigo-300/90 font-medium">
            ORDER: ${active.title}
          </p>
        </div>

        <!-- SVG Circular Countdown Progress -->
        <div class="relative w-72 h-72 mx-auto flex items-center justify-center">
          <svg class="w-full h-full -rotate-90" viewBox="0 0 240 240">
            <!-- Background circle -->
            <circle cx="120" cy="120" r="100" stroke="rgba(255,255,255,0.06)" stroke-width="6" fill="transparent" />
            <!-- Animated progress ring -->
            <circle 
              id="focusProgressRing" 
              cx="120" 
              cy="120" 
              r="100" 
              stroke="#6366f1" 
              stroke-width="6" 
              fill="transparent" 
              stroke-dasharray="628" 
              stroke-dashoffset="0" 
              stroke-linecap="round"
              style="transition: stroke-dashoffset 1s linear;"
            />
          </svg>

          <!-- Inside digits -->
          <div class="absolute inset-0 flex flex-col items-center justify-center space-y-1">
            <span id="focusTimeDigits" class="text-5xl font-serif text-white font-medium tracking-tight">
              ${formatTime(rem)}
            </span>
            <span class="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">REMAINING FOCUS</span>
          </div>
        </div>

        <!-- Mindful Breathing Button -->
        <div class="pt-2">
          <button id="btnFocusBreathe" class="btn-secondary text-xs font-mono py-2 px-5 border-sky-400/30 text-sky-300 hover:text-white">
            🌬️ TAKE A MINDFUL BREATH (30s)
          </button>
        </div>
      </div>

      <!-- Bottom Exit Without Coercion -->
      <div class="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-3">
        <span>NO DARK PATTERNS · YOU ARE ALWAYS IN CONTROL</span>
        <button id="btnExitFocusOrder" class="text-zinc-400 hover:text-rose-400 underline underline-offset-4 cursor-pointer">
          Conclude Court Order Early ✕
        </button>
      </div>

    </section>
  `;

  const timeEl = container.querySelector('#focusTimeDigits');
  const ring = container.querySelector('#focusProgressRing');
  const ambientBtn = container.querySelector('#btnFocusAmbientToggle');
  const breatheBtn = container.querySelector('#btnFocusBreathe');
  const exitBtn = container.querySelector('#btnExitFocusOrder');

  let ambientPlaying = true;

  if (ambientBtn) {
    ambientBtn.addEventListener('click', () => {
      sound.playClick();
      ambientPlaying = !ambientPlaying;
      if (ambientPlaying) {
        sound.startAmbientDrone();
        ambientBtn.textContent = '🔊 AMBIENT SANCTUARY: ON';
      } else {
        sound.stopAmbientDrone();
        ambientBtn.textContent = '🔇 AMBIENT SANCTUARY: MUTED';
      }
    });
  }

  if (breatheBtn) {
    breatheBtn.addEventListener('click', () => {
      sound.playChime(528, 2.5);
      alert("Inhale slowly for 4 seconds... Hold for 4 seconds... Exhale for 4 seconds... You are right here.");
    });
  }

  // Interval timer tick
  clearInterval(focusTimerInterval);
  focusTimerInterval = setInterval(() => {
    rem--;
    if (timeEl) timeEl.textContent = formatTime(rem);

    // Update ring offset: circumference = 2 * PI * 100 ≈ 628
    if (ring && active.totalSeconds > 0) {
      const frac = rem / active.totalSeconds;
      const offset = 628 * (1 - frac);
      ring.style.strokeDashoffset = offset;
    }

    if (rem <= 0) {
      clearInterval(focusTimerInterval);
      sound.stopAmbientDrone();
      sound.playChime(528, 5.0);
      alert("COURT ORDER FULFILLED! Your attention stayed sovereign. Time logged to intentional focus.");
      store.reclaimMinutes(active.minutes);
      store.setState({ activeFocusSession: null });
      renderFocusMode(container);
    }
  }, 1000);

  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      sound.playClick();
      sound.stopAmbientDrone();
      clearInterval(focusTimerInterval);
      store.setState({ activeFocusSession: null });
      renderFocusMode(container);
    });
  }
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
