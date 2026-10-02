// SCROLL COURT - Scroll Interruption System ("COURT INTERRUPTION")
import { store } from '../state.js';
import { sound } from '../audio.js';

let resetInterval = null;

export function triggerCourtInterruption(minutes = 30) {
  const modal = document.getElementById('globalModalBackdrop');
  const modalBody = document.getElementById('globalModalBody');
  if (!modal || !modalBody) return;

  const tasks = store.getState().tasks;
  const pendingTask = tasks.find(t => !t.completed) || { title: 'Study for 1 hour', estMinutes: 60 };

  sound.playGavel();

  modalBody.innerHTML = `
    <div class="space-y-6 text-center max-w-lg mx-auto py-2 animate-fade-in">
      
      <!-- Judicial Interruption Seal -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs tracking-widest uppercase">
        <span class="status-dot bg-rose-500"></span>
        COURT INTERRUPTION · ${minutes} MINUTE THRESHOLD
      </div>

      <!-- Main Interruption Typography -->
      <div class="space-y-2">
        <h3 class="text-3xl sm:text-4xl font-serif text-white">
          “You've been scrolling for ${minutes} minutes.”
        </h3>
        <p class="text-zinc-400 text-sm font-light">
          The court has paused your feed to give you a moment of stillness and conscious choice.
        </p>
      </div>

      <!-- Contextual Pending Task Anchor -->
      <div class="p-4 rounded-xl bg-white/[0.03] border border-amber-500/25 text-left space-y-1.5 shadow-lg">
        <div class="flex items-center justify-between text-[11px] font-mono">
          <span class="text-amber-300 font-medium">UNFULFILLED CASE ON DOCKET</span>
          <span class="text-zinc-400">EST: ${pendingTask.estMinutes} MIN</span>
        </div>
        <div class="text-base font-serif text-zinc-100 italic">
          “${pendingTask.title}”
        </div>
        <div class="text-[11px] text-zinc-400 font-light">
          You made this commitment to yourself before opening the screen.
        </div>
      </div>

      <!-- Core Question -->
      <div class="py-2 border-y border-white/10">
        <div class="font-serif italic text-2xl text-indigo-200">
          “Was this intentional?”
        </div>
      </div>

      <!-- Empowering Choice Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button id="btnInterruptionYes" class="btn-secondary py-3 px-4 text-xs font-mono text-zinc-300 hover:text-white border-white/10 hover:border-white/30">
          YES — I CHOSE THIS
        </button>
        <button id="btnInterruptionNo" class="btn-primary py-3 px-4 text-xs font-mono bg-gradient-to-r from-indigo-500 to-sky-400 text-white border-none shadow-indigo-500/25">
          NO — I GOT LOST
        </button>
      </div>

      <div class="text-[11px] font-mono text-zinc-500 pt-1">
        NO PENALTIES · NO SHAME · RESTORING YOUR AGENCY
      </div>

    </div>
  `;

  modal.classList.add('active');

  const btnYes = modalBody.querySelector('#btnInterruptionYes');
  const btnNo = modalBody.querySelector('#btnInterruptionNo');

  if (btnYes) {
    btnYes.addEventListener('click', () => {
      sound.playClick();
      modal.classList.remove('active');
      // Log as intentional session
      const cur = store.getState().todayMetrics.intentionalSessionsCount;
      store.setState({
        todayMetrics: { ...store.getState().todayMetrics, intentionalSessionsCount: cur + 1 }
      });
    });
  }

  if (btnNo) {
    btnNo.addEventListener('click', () => {
      sound.playChime(528, 2.5);
      showEmpowermentStep(modalBody, modal, pendingTask);
    });
  }
}

function showEmpowermentStep(modalBody, modal, pendingTask) {
  modalBody.innerHTML = `
    <div class="space-y-6 text-center max-w-lg mx-auto py-2 animate-fade-in">
      
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs tracking-widest uppercase">
        <span class="status-dot bg-emerald-400"></span>
        RECLAIM ATTENTION
      </div>

      <div class="space-y-2">
        <h3 class="text-3xl sm:text-4xl font-serif text-white">
          “Then let's give your attention back to you.”
        </h3>
        <p class="text-zinc-400 text-sm font-light">
          You caught yourself. That is where sovereignty begins. Where would you like your next minute to go?
        </p>
      </div>

      <div class="space-y-3 pt-2 text-left">
        
        <button id="optReturnToTaskDirect" class="w-full p-4 rounded-xl bg-white/[0.04] hover:bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400/60 transition-all flex items-center justify-between group">
          <div class="space-y-0.5">
            <div class="text-sm font-medium text-white group-hover:text-emerald-300 flex items-center gap-2">
              <span>Return to “${pendingTask.title}”</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">RECOMMENDED</span>
            </div>
            <div class="text-xs text-zinc-400 font-light">Switch immediately to Focus Mode and finish this case.</div>
          </div>
          <span class="text-emerald-400 font-mono text-xs font-semibold">FOCUS →</span>
        </button>

        <button id="optTwoMinuteReset" class="w-full p-4 rounded-xl bg-white/[0.04] hover:bg-sky-500/10 border border-white/10 hover:border-sky-400/40 transition-all flex items-center justify-between group">
          <div class="space-y-0.5">
            <div class="text-sm font-medium text-white group-hover:text-sky-300">Take a 2-minute somatic reset</div>
            <div class="text-xs text-zinc-400 font-light">Gentle guided box-breathing to calm the nervous system.</div>
          </div>
          <span class="text-sky-400 font-mono text-xs">2 MIN →</span>
        </button>

        <button id="optKeepScrolling" class="w-full p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
          <div class="space-y-0.5">
            <div class="text-sm font-medium text-zinc-300 group-hover:text-white">Keep scrolling intentionally</div>
            <div class="text-xs text-zinc-400 font-light">Set a conscious 10-minute stopping boundary.</div>
          </div>
          <span class="text-zinc-400 font-mono text-xs">10 MIN →</span>
        </button>

      </div>

    </div>
  `;

  // Return directly to pending task in focus mode
  modalBody.querySelector('#optReturnToTaskDirect')?.addEventListener('click', () => {
    sound.playGavel();
    modal.classList.remove('active');
    store.reclaimMinutes(25);
    store.setState({
      activeTab: 'focus',
      activeFocusSession: {
        title: pendingTask.title,
        minutes: pendingTask.estMinutes || 30,
        totalSeconds: (pendingTask.estMinutes || 30) * 60,
        remainingSeconds: (pendingTask.estMinutes || 30) * 60,
        startTime: Date.now()
      }
    });
  });

  // Attach options
  modalBody.querySelector('#optTwoMinuteReset')?.addEventListener('click', () => {
    sound.playClick();
    startTwoMinuteReset(modalBody, modal);
  });

  modalBody.querySelector('#optKeepScrolling')?.addEventListener('click', () => {
    sound.playClick();
    modal.classList.remove('active');
  });
}

function startTwoMinuteReset(modalBody, modal) {
  let secondsRemaining = 120;
  sound.playChime(432, 4.0);

  modalBody.innerHTML = `
    <div class="space-y-6 text-center max-w-md mx-auto py-2 animate-fade-in">
      
      <div class="case-label text-sky-400 font-mono">SOMATIC ATTENTION RESET</div>
      
      <h3 class="text-2xl sm:text-3xl font-serif text-white">
        “Breathe. You are here.”
      </h3>

      <!-- Animated Breathing Visual -->
      <div class="py-6">
        <div class="breath-circle">
          <div class="breath-circle-inner"></div>
          <div class="relative z-10 flex flex-col items-center">
            <span id="resetTimerDigits" class="font-mono text-2xl font-bold text-sky-200">02:00</span>
            <span id="breathPhaseText" class="text-[11px] font-mono tracking-widest text-sky-400 uppercase mt-1">INHALE (4s)</span>
          </div>
        </div>
      </div>

      <p class="text-xs text-zinc-400 font-light max-w-xs mx-auto">
        Feel the weight of your feet against the floor. Unclench your jaw. Your attention is returning to your body.
      </p>

      <div class="flex justify-center gap-3 pt-2">
        <button id="btnCompleteResetEarly" class="btn-primary text-xs py-2 px-6">
          I FEEL CENTERED · RESUME LIFE
        </button>
      </div>

    </div>
  `;

  const timerEl = modalBody.querySelector('#resetTimerDigits');
  const phaseEl = modalBody.querySelector('#breathPhaseText');

  clearInterval(resetInterval);
  resetInterval = setInterval(() => {
    secondsRemaining--;
    const mins = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
    const secs = String(secondsRemaining % 60).padStart(2, '0');
    if (timerEl) timerEl.textContent = `${mins}:${secs}`;

    // 16s cycle: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s
    const cyclePos = (120 - secondsRemaining) % 16;
    if (phaseEl) {
      if (cyclePos < 4) {
        phaseEl.textContent = 'INHALE (4s)';
      } else if (cyclePos < 8) {
        phaseEl.textContent = 'HOLD BREATH (4s)';
      } else if (cyclePos < 12) {
        phaseEl.textContent = 'EXHALE SLOWLY (4s)';
      } else {
        phaseEl.textContent = 'REST IN STILLNESS (4s)';
      }
    }

    if (secondsRemaining <= 0) {
      clearInterval(resetInterval);
      sound.playChime(528, 4.0);
      store.reclaimMinutes(25);
      modal.classList.remove('active');
    }
  }, 1000);

  modalBody.querySelector('#btnCompleteResetEarly')?.addEventListener('click', () => {
    clearInterval(resetInterval);
    sound.playChime(528, 3.0);
    store.reclaimMinutes(15);
    modal.classList.remove('active');
  });
}
