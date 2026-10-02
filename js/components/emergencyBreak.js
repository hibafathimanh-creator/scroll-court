// SCROLL COURT - Emergency Scroll Break ("I'M STUCK SCROLLING")
import { store } from '../state.js';
import { sound } from '../audio.js';

let emergencyInterval = null;

export function triggerEmergencyBreak() {
  const modal = document.getElementById('globalModalBackdrop');
  const modalBody = document.getElementById('globalModalBody');
  if (!modal || !modalBody) return;

  // Immediate freeze of feed, chime chime chime
  sound.playChime(432, 3.0);

  let seconds = 10;

  modalBody.innerHTML = `
    <div class="space-y-6 text-center max-w-md mx-auto py-2 animate-fade-in">
      
      <!-- Top Emergency Seal -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs tracking-widest uppercase">
        <span class="status-dot bg-rose-500"></span>
        EMERGENCY SCROLL INTERVENTION
      </div>

      <div class="space-y-2">
        <h3 class="text-3xl font-serif text-white">
          “Pause. Take a real breath.”
        </h3>
        <p class="text-xs text-zinc-400 font-light">
          Visual feed suspended. Allowing your autonomic nervous system to disengage from algorithmic momentum.
        </p>
      </div>

      <!-- 10-Second Reset Animation -->
      <div class="py-6 flex flex-col items-center">
        <div class="relative w-32 h-32 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border border-rose-500/30 animate-ping opacity-25"></div>
          <div class="w-28 h-28 rounded-full border-2 border-rose-500/60 flex items-center justify-center bg-rose-950/20">
            <span id="emergencyCountdown" class="font-mono text-4xl font-bold text-white">${seconds}</span>
          </div>
        </div>
        <span class="text-[11px] font-mono text-zinc-400 tracking-wider mt-3 uppercase">CALMING DOPAMINE VELOCITY</span>
      </div>

      <div class="text-[11px] text-zinc-400 font-serif italic">
        “You don't have to finish this scroll. The feed never ends.”
      </div>

    </div>
  `;

  modal.classList.add('active');

  const countEl = modalBody.querySelector('#emergencyCountdown');

  clearInterval(emergencyInterval);
  emergencyInterval = setInterval(() => {
    seconds--;
    if (countEl) countEl.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(emergencyInterval);
      sound.playChime(528, 3.5);
      showEmergencyInquiry(modalBody, modal);
    }
  }, 1000);
}

function showEmergencyInquiry(modalBody, modal) {
  modalBody.innerHTML = `
    <div class="space-y-6 text-center max-w-lg mx-auto py-2 animate-fade-in">
      
      <div class="case-label text-indigo-400 font-mono">COURT CLARITY</div>

      <div class="space-y-2">
        <h3 class="text-3xl sm:text-4xl font-serif text-white">
          “What did you come here to do?”
        </h3>
        <p class="text-zinc-400 text-sm font-light">
          Notice the gap between your original intention and where the algorithm led you.
        </p>
      </div>

      <!-- 3 Empowering Offers -->
      <div class="space-y-3 pt-3 text-left">
        
        <button id="emgReturnToTask" class="w-full p-4 rounded-xl bg-white/[0.04] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-400/40 transition-all flex items-center justify-between group">
          <div>
            <div class="text-sm font-medium text-white group-hover:text-emerald-300">Return to my task</div>
            <div class="text-xs text-zinc-400 mt-0.5">Step back to your commitments in Today's Case File.</div>
          </div>
          <span class="text-emerald-400 font-mono text-xs">GO →</span>
        </button>

        <button id="emgTakeRealBreak" class="w-full p-4 rounded-xl bg-white/[0.04] hover:bg-sky-500/10 border border-white/10 hover:border-sky-400/40 transition-all flex items-center justify-between group">
          <div>
            <div class="text-sm font-medium text-white group-hover:text-sky-300">Take a real break</div>
            <div class="text-xs text-zinc-400 mt-0.5">Look at the horizon, drink cold water, or stretch without screens.</div>
          </div>
          <span class="text-sky-400 font-mono text-xs">OFF-SCREEN →</span>
        </button>

        <button id="emgContinueIntentionally" class="w-full p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
          <div>
            <div class="text-sm font-medium text-zinc-300 group-hover:text-white">Continue intentionally</div>
            <div class="text-xs text-zinc-400 mt-0.5">I have a specific reason to stay; logging as conscious time.</div>
          </div>
          <span class="text-zinc-400 font-mono text-xs">LOGGED →</span>
        </button>

      </div>

    </div>
  `;

  modalBody.querySelector('#emgReturnToTask')?.addEventListener('click', () => {
    sound.playClick();
    store.reclaimMinutes(20);
    modal.classList.remove('active');
    store.setState({ activeTab: 'casefile' });
  });

  modalBody.querySelector('#emgTakeRealBreak')?.addEventListener('click', () => {
    sound.playChime(528, 3.0);
    store.reclaimMinutes(30);
    modal.classList.remove('active');
    alert("Stepping away. Your attention is restored to the physical world.");
  });

  modalBody.querySelector('#emgContinueIntentionally')?.addEventListener('click', () => {
    sound.playClick();
    modal.classList.remove('active');
  });
}
