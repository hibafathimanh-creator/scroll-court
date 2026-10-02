// SCROLL COURT - Weekly Attention Trial ("THE WEEKLY CASE")
import { store } from '../state.js';
import { sound } from '../audio.js';

export function renderWeeklyCase(container) {
  const state = store.getState();
  const wc = state.weeklyCase;

  container.innerHTML = `
    <section class="py-8 px-4 sm:px-8 max-w-6xl mx-auto space-y-10 animate-fade-in">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div class="space-y-2">
          <div class="case-label text-indigo-400 font-mono flex items-center gap-2">
            <span>SEVEN-DAY TRIAL DOSSIER</span>
            <span class="text-zinc-600">/</span>
            <span>CASE RECORD #W39</span>
          </div>
          <h2 class="text-4xl sm:text-5xl editorial-title text-zinc-100">
            THE WEEKLY CASE
          </h2>
          <p class="text-zinc-400 text-sm max-w-xl font-light">
            A macroscopic audit of your digital sovereignty. Unpacking habitual cycles and reclaiming agency across days.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span class="court-seal">
            <span class="status-dot bg-indigo-400"></span>
            7-DAY VERDICT: RECOVERING
          </span>
        </div>
      </div>

      <!-- Weekly Key Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="glass-panel p-6 space-y-2">
          <span class="case-label text-zinc-400 font-mono">TOTAL SCROLLING TIME</span>
          <div class="text-3xl font-serif text-white">${wc.totalScrollingHours}</div>
          <div class="text-xs text-zinc-400 font-sans">Across 7 recorded days</div>
          <div class="w-full h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div class="h-full bg-indigo-500 rounded-full" style="width: 72%;"></div>
          </div>
        </div>

        <div class="glass-panel p-6 space-y-2">
          <span class="case-label text-emerald-400 font-mono">INTENTIONAL VS UNPLANNED</span>
          <div class="text-3xl font-serif text-emerald-300">${wc.intentionalPercentage}% <span class="text-base text-zinc-400 font-sans font-light">/ ${wc.unplannedPercentage}%</span></div>
          <div class="text-xs text-zinc-400 font-sans">Deliberate choice majority</div>
          <div class="flex h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div class="bg-emerald-400 h-full" style="width: ${wc.intentionalPercentage}%;"></div>
            <div class="bg-rose-500 h-full" style="width: ${wc.unplannedPercentage}%;"></div>
          </div>
        </div>

        <div class="glass-panel p-6 space-y-2">
          <span class="case-label text-amber-300 font-mono">VULNERABILITY WINDOW</span>
          <div class="text-xl font-serif text-amber-200 mt-1">${wc.peakVulnerableHours}</div>
          <div class="text-xs text-zinc-400 font-sans">Circadian dips & post-work lull</div>
          <div class="text-[11px] text-zinc-500 font-mono mt-3">Target for Court Orders</div>
        </div>

        <div class="glass-panel p-6 space-y-2">
          <span class="case-label text-sky-400 font-mono">TIME RECLAIMED</span>
          <div class="text-3xl font-serif text-sky-300">${wc.reclaimedTime}</div>
          <div class="text-xs text-zinc-400 font-sans">Saved via Court Interruptions</div>
          <div class="text-[11px] text-emerald-400 font-mono mt-3">↑ +45m vs previous week</div>
        </div>

      </div>

      <!-- Secondary Weekly Vitals -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div class="glass-panel p-5 flex items-center justify-between">
          <span class="text-zinc-400">LONGEST SINGLE SESSION:</span>
          <span class="text-rose-300 font-semibold">${wc.longestSession}</span>
        </div>
        <div class="glass-panel p-5 flex items-center justify-between">
          <span class="text-zinc-400">AVERAGE SESSION LENGTH:</span>
          <span class="text-indigo-300 font-semibold">${wc.avgSessionLength}</span>
        </div>
        <div class="glass-panel p-5 flex items-center justify-between">
          <span class="text-zinc-400">TOTAL DEEP FOCUS LOGGED:</span>
          <span class="text-emerald-300 font-semibold">${wc.focusTimeTotal}</span>
        </div>
      </div>

      <!-- Reflective Socratic Questions Section -->
      <div class="glass-panel-elevated p-6 sm:p-10 space-y-8 border border-white/10">
        <div class="space-y-2 border-b border-white/10 pb-4">
          <span class="case-label text-indigo-400 font-mono">SOCRATIC INQUIRY</span>
          <h3 class="text-2xl sm:text-3xl font-serif text-white">
            Judicial Deposition: 4 Thoughtful Inquiries
          </h3>
          <p class="text-xs sm:text-sm text-zinc-400 font-light">
            These questions are designed for honesty, not condemnation. Take your time to reflect and record your answers.
          </p>
        </div>

        <div class="space-y-6">
          ${wc.questions.map((q, idx) => `
            <div class="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-mono text-xs font-bold">
                  0${idx + 1}
                </span>
                <h4 class="text-lg font-serif text-zinc-100">
                  “${q.prompt}”
                </h4>
              </div>

              <textarea 
                rows="2" 
                class="weekly-answer-input w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-zinc-200 text-sm font-sans focus:outline-none focus:border-indigo-400 leading-relaxed resize-none" 
                data-qid="${q.id}"
                placeholder="Type your reflection..."
              >${q.answer}</textarea>

              <div class="flex justify-end">
                <span class="text-[10px] font-mono text-zinc-500">AUTO-SAVED TO ON-DEVICE CASE DOSSIER</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Closing Judicial Summation -->
        <div class="pt-6 border-t border-white/10 text-center space-y-2">
          <p class="font-serif italic text-base text-zinc-300">
            “The court isn't here to judge you. It's here to give your attention back.”
          </p>
        </div>

      </div>

    </section>
  `;

  // Attach auto-save to weekly questions
  container.querySelectorAll('.weekly-answer-input').forEach(textarea => {
    textarea.addEventListener('input', (e) => {
      const qid = textarea.getAttribute('data-qid');
      store.updateWeeklyAnswer(qid, e.target.value);
    });
  });
}
