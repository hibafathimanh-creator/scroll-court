// SCROLL COURT - Full-Screen Reflection Sanctuary
import { store } from '../state.js';
import { sound } from '../audio.js';

export function renderReflection(container) {
  const state = store.getState();
  const reflections = state.reflections;

  container.innerHTML = `
    <section class="min-h-[88vh] py-10 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col justify-between space-y-12 animate-fade-in">
      
      <!-- Top Court Bar -->
      <div class="flex items-center justify-between border-b border-white/10 pb-4">
        <span class="court-seal">
          <span class="status-dot bg-indigo-400"></span>
          REFLECTIVE CHAMBERS
        </span>
        <button id="btnReturnToCourtFromReflect" class="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer">
          ← RETURN TO COURTROOM
        </button>
      </div>

      <!-- Cinematic Gradual Reveal Typography Statements -->
      <div class="my-auto py-8 space-y-8 text-center">
        
        <div class="space-y-4">
          <p class="text-3xl sm:text-5xl lg:text-6xl editorial-title text-zinc-300 leading-tight">
            “You don't need more discipline.”
          </p>
          <p class="text-3xl sm:text-5xl lg:text-6xl editorial-italic text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-indigo-200 to-white leading-tight">
            “Sometimes you just need to notice.”
          </p>
        </div>

        <div class="pt-6 border-t border-white/5 max-w-xl mx-auto space-y-3">
          <span class="case-label text-indigo-400 font-mono">THE SOVEREIGN TRUTH</span>
          <h3 class="text-2xl sm:text-3xl font-serif text-white">
            “Your attention is finite. Where do you want it to go?”
          </h3>
        </div>

        <!-- Reflection Input Box -->
        <div class="max-w-xl mx-auto pt-4 text-left">
          <form id="reflectionForm" class="glass-panel p-6 space-y-4 border border-white/10">
            <label class="case-label text-zinc-400 font-mono block">RECORD TODAY'S OBSERVATION</label>
            <textarea 
              id="reflectionInput" 
              rows="3" 
              placeholder="What did you notice about your attention today? What triggered the urge to scroll?" 
              class="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-indigo-400 leading-relaxed resize-none"
              required
            ></textarea>

            <div class="flex items-center justify-between pt-2">
              <span class="text-xs font-mono text-zinc-500">SAVED PRIVATELY TO ON-DEVICE ARCHIVE</span>
              <button type="submit" class="btn-primary py-2 px-6 text-xs font-mono">
                RECORD INSIGHT ✍
              </button>
            </div>
          </form>
        </div>

      </div>

      <!-- Past Recorded Reflections History -->
      <div class="space-y-4 pt-6 border-t border-white/10">
        <div class="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>PAST JUDICIAL OBSERVATIONS (${reflections.length})</span>
          <span>AUTONOMY IN ARCHIVE</span>
        </div>

        <div class="space-y-3 max-w-xl mx-auto">
          ${reflections.map(ref => `
            <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div class="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>${ref.date}</span>
                <span class="text-emerald-400">+${ref.reclaimedMinutes}m reclaimed</span>
              </div>
              <p class="text-sm font-serif italic text-zinc-200 leading-relaxed">
                “${ref.text}”
              </p>
            </div>
          `).join('')}
        </div>
      </div>

    </section>
  `;

  // Attach submit handler
  const form = container.querySelector('#reflectionForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = container.querySelector('#reflectionInput');
      if (input && input.value.trim()) {
        sound.playChime(528, 3.5);
        store.addReflection(input.value.trim(), 20);
        store.reclaimMinutes(20);
        renderReflection(container);
      }
    });
  }

  container.querySelector('#btnReturnToCourtFromReflect')?.addEventListener('click', () => {
    sound.playClick();
    store.setState({ activeTab: 'court' });
  });
}
