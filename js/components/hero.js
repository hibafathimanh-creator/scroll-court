// SCROLL COURT - Hero Component
import { store } from '../state.js';
import { sound } from '../audio.js';
import { countUp, initMagneticCards } from '../animations.js';

export function renderHero(container) {
  const state = store.getState();
  const metrics = state.todayMetrics;

  container.innerHTML = `
    <section class="relative min-h-[92vh] flex flex-col justify-between py-12 px-4 sm:px-8 max-w-6xl mx-auto">
      
      <!-- Top Micro Brand Status -->
      <div class="flex items-center justify-between pt-2 pb-6 border-b border-white/5 animate-fade-in">
        <div class="flex items-center gap-3">
          <span class="court-seal">
            <span class="status-dot bg-emerald-400"></span>
            SESSION NO. 142 — IN PURSUIT OF AWARENESS
          </span>
        </div>
        <div class="hidden sm:flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span>COURT IS NOW IN SESSION</span>
          <span class="text-zinc-600">/</span>
          <span class="text-indigo-400 font-semibold">STATUS: ACTIVE TRIAL</span>
        </div>
      </div>

      <!-- Main Editorial Hero Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8">
        
        <!-- Left: Dramatic Editorial Copy -->
        <div class="lg:col-span-7 space-y-8 animate-fade-in">
          <div class="space-y-3">
            <div class="case-label text-indigo-400/90 font-mono flex items-center gap-2">
              <span class="inline-block w-8 h-[1px] bg-indigo-500/60"></span>
              THE CENTRAL TRIAL OF OUR GENERATION
            </div>
            <h1 class="text-5xl sm:text-7xl lg:text-8xl editorial-title text-zinc-100 tracking-tight leading-[0.95]">
              YOUR ATTENTION<br />
              <span class="editorial-italic shimmer-text font-serif">IS ON TRIAL.</span>
            </h1>
          </div>

          <p class="text-lg sm:text-xl text-zinc-400 font-light max-w-xl leading-relaxed">
            Scroll Court helps you see where your attention goes, understand when scrolling takes control, and make the next choice consciously.
          </p>

          <!-- Core Call to Actions -->
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <button id="heroEnterCourtBtn" class="btn-primary group">
              <span>ENTER THE COURT</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
            <button id="heroSeeScrollingBtn" class="btn-secondary">
              <span>SEE MY SCROLLING</span>
              <span class="font-mono text-xs text-indigo-300">#EXHIBIT-A</span>
            </button>
          </div>

          <!-- Provocative Micro-Inquiry -->
          <div class="pt-6 border-t border-white/5 max-w-xl">
            <p class="text-sm sm:text-base font-serif italic text-zinc-300 leading-snug">
              “You opened your phone for one thing.<br class="hidden sm:inline" />
              How many minutes did you actually give it?”
            </p>
          </div>
        </div>

        <!-- Right: Animated Courtroom Attention Meter & Scale Visual -->
        <div class="lg:col-span-5 flex flex-col items-center">
          <div class="glass-panel p-6 sm:p-8 w-full max-w-md relative overflow-hidden group">
            
            <!-- Background glow accent -->
            <div class="absolute -top-20 -right-20 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div class="flex items-center justify-between mb-6">
              <span class="case-label text-zinc-400">ATTENTION BALANCE</span>
              <div class="flex items-center gap-2">
                <span class="status-dot bg-emerald-400" id="heroStatusDot"></span>
                <span id="heroStatusText" class="font-mono text-xs text-emerald-400 tracking-wider font-medium">UNDER YOUR CONTROL</span>
              </div>
            </div>

            <!-- Animated Interactive Scale of Justice & Attention -->
            <div class="relative py-4 flex flex-col items-center">
              <svg class="scales-svg w-64 h-48" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Center Base and Pillar -->
                <line x1="150" y1="40" x2="150" y2="190" stroke="rgba(255,255,255,0.25)" stroke-width="3" stroke-linecap="round" />
                <path d="M120 190 H180" stroke="rgba(255,255,255,0.3)" stroke-width="4" stroke-linecap="round" />
                <path d="M130 198 H170" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-linecap="round" />
                
                <!-- Fulcrum Pivot Diamond -->
                <polygon points="150,30 156,40 150,50 144,40" fill="#38BDF8" />
                <circle cx="150" cy="40" r="3" fill="#07080b" />

                <!-- Tilting Beam (Group) -->
                <g id="scaleBeamGroup" class="scales-beam" style="transform: rotate(-6deg);">
                  <!-- Crossbeam -->
                  <line x1="50" y1="40" x2="250" y2="40" stroke="#f4f4f7" stroke-width="3" stroke-linecap="round" />
                  
                  <!-- Left Scale: Consciousness / Agency -->
                  <g id="scaleLeftPan">
                    <line x1="50" y1="40" x2="35" y2="90" stroke="rgba(99, 102, 241, 0.5)" stroke-width="1.5" />
                    <line x1="50" y1="40" x2="65" y2="90" stroke="rgba(99, 102, 241, 0.5)" stroke-width="1.5" />
                    <path d="M25 90 C25 110, 75 110, 75 90 Z" fill="rgba(99, 102, 241, 0.25)" stroke="#818CF8" stroke-width="1.5" />
                    <!-- Weight Orb: Intentional -->
                    <circle cx="50" cy="85" r="10" fill="#38BDF8" opacity="0.9" />
                  </g>

                  <!-- Right Scale: Drift / Dopamine Loop -->
                  <g id="scaleRightPan">
                    <line x1="250" y1="40" x2="235" y2="90" stroke="rgba(244, 63, 94, 0.4)" stroke-width="1.5" />
                    <line x1="250" y1="40" x2="265" y2="90" stroke="rgba(244, 63, 94, 0.4)" stroke-width="1.5" />
                    <path d="M225 90 C225 110, 275 110, 275 90 Z" fill="rgba(244, 63, 94, 0.15)" stroke="#F43F5E" stroke-width="1.5" />
                    <!-- Weight Orb: Unplanned -->
                    <circle cx="250" cy="88" r="8" fill="#F43F5E" opacity="0.8" />
                  </g>
                </g>
              </svg>

              <!-- Scale Weight Metric Labels -->
              <div class="grid grid-cols-2 w-full gap-4 mt-2 pt-3 border-t border-white/5 font-mono text-xs">
                <div class="text-left cursor-pointer group" id="hoverLeftPanTrigger">
                  <div class="text-zinc-500 uppercase tracking-widest text-[10px]">Intentional</div>
                  <div id="heroAgencyPercent" class="text-sky-300 font-semibold text-sm group-hover:text-white transition-colors">68% Agency</div>
                  <div class="text-[11px] text-zinc-500">2h 45m reclaimed</div>
                </div>
                <div class="text-right cursor-pointer group" id="hoverRightPanTrigger">
                  <div class="text-zinc-500 uppercase tracking-widest text-[10px]">Digital Drift</div>
                  <div id="heroDriftPercent" class="text-rose-400 font-semibold text-sm group-hover:text-white transition-colors">32% Captured</div>
                  <div class="text-[11px] text-zinc-500">1h 47m doom-scroll</div>
                </div>
              </div>
            </div>

            <!-- Live Status Simulation Toggle -->
            <div class="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span class="font-sans text-[11px] text-zinc-400">Court Telemetry:</span>
              <button id="toggleHeroStateBtn" class="font-mono text-[11px] text-indigo-400 hover:text-indigo-300 underline underline-offset-4 cursor-pointer">
                Simulate Drift Event ⚡
              </button>
            </div>

          </div>

          <!-- Micro Motto -->
          <div class="mt-6 flex items-center justify-center gap-6 text-xs font-mono text-zinc-400">
            <span>SCROLL.</span>
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
            <span>PAUSE.</span>
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
            <span>DECIDE.</span>
          </div>
        </div>

      </div>

      <!-- Bottom Prompts & Smooth Indicator -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 border-t border-white/5 gap-3">
        <div class="flex items-center gap-2">
          <span class="text-zinc-400">“Every scroll leaves a trace.”</span>
          <span class="text-zinc-700">—</span>
          <span class="text-zinc-400">Who gets your next minute?</span>
        </div>
        <button id="heroScrollDownIndicator" class="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer py-1">
          <span>PROCEED TO EVIDENCE</span>
          <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </button>
      </div>

    </section>
  `;

  // Initialize magnetic cards on hero
  initMagneticCards(container);

  // Smooth number counting
  countUp(container.querySelector('#heroAgencyPercent'), 68, 1200, v => `${Math.round(v)}% Agency`);
  countUp(container.querySelector('#heroDriftPercent'), 32, 1200, v => `${Math.round(v)}% Captured`);

  // Attach interactive events
  const enterBtn = container.querySelector('#heroEnterCourtBtn');
  const seeBtn = container.querySelector('#heroSeeScrollingBtn');
  const scrollIndicator = container.querySelector('#heroScrollDownIndicator');
  const toggleBtn = container.querySelector('#toggleHeroStateBtn');
  const beam = container.querySelector('#scaleBeamGroup');
  const statusDot = container.querySelector('#heroStatusDot');
  const statusText = container.querySelector('#heroStatusText');

  // Interactive scale physics on hover
  const leftTrigger = container.querySelector('#hoverLeftPanTrigger');
  const rightTrigger = container.querySelector('#hoverRightPanTrigger');

  if (leftTrigger && beam) {
    leftTrigger.addEventListener('mouseenter', () => {
      beam.style.transform = 'rotate(-14deg)';
      sound.playClick();
    });
    leftTrigger.addEventListener('mouseleave', () => {
      beam.style.transform = isSimulatedDrift ? 'rotate(10deg)' : 'rotate(-6deg)';
    });
  }

  if (rightTrigger && beam) {
    rightTrigger.addEventListener('mouseenter', () => {
      beam.style.transform = 'rotate(14deg)';
      sound.playClick();
    });
    rightTrigger.addEventListener('mouseleave', () => {
      beam.style.transform = isSimulatedDrift ? 'rotate(10deg)' : 'rotate(-6deg)';
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      sound.playGavel();
      store.setState({ activeTab: 'court' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (seeBtn) {
    seeBtn.addEventListener('click', () => {
      sound.playClick();
      store.setState({ activeTab: 'court' });
      const el = document.getElementById('courtroomSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      sound.playClick();
      store.setState({ activeTab: 'court' });
      const el = document.getElementById('courtroomSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Interactive toggle between "Under Control" and "Drifting"
  let isSimulatedDrift = false;
  if (toggleBtn && beam && statusDot && statusText) {
    toggleBtn.addEventListener('click', () => {
      isSimulatedDrift = !isSimulatedDrift;
      sound.playClick();
      if (isSimulatedDrift) {
        beam.style.transform = 'rotate(10deg)';
        statusDot.className = 'status-dot bg-rose-500';
        statusText.className = 'font-mono text-xs text-rose-400 tracking-wider font-medium';
        statusText.textContent = 'DRIFTING DETECTED';
        toggleBtn.textContent = 'Restore Agency ↺';
      } else {
        beam.style.transform = 'rotate(-6deg)';
        statusDot.className = 'status-dot bg-emerald-400';
        statusText.className = 'font-mono text-xs text-emerald-400 tracking-wider font-medium';
        statusText.textContent = 'UNDER YOUR CONTROL';
        toggleBtn.textContent = 'Simulate Drift Event ⚡';
      }
    });
  }
}
