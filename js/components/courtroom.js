// SCROLL COURT - The Courtroom Dashboard
import { store } from '../state.js';
import { sound } from '../audio.js';
import { countUp, triggerGavelStrikeVisual, initMagneticCards } from '../animations.js';

export function renderCourtroom(container) {
  const state = store.getState();
  const m = state.todayMetrics;

  container.innerHTML = `
    <section id="courtroomSection" class="py-8 px-4 sm:px-8 max-w-6xl mx-auto space-y-10 animate-fade-in">
      
      <!-- Courtroom Header & Date Switcher -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div class="space-y-2">
          <div class="case-label text-indigo-400 font-mono flex items-center gap-2">
            <span>DOCKET NO. 2026-SC-081</span>
            <span class="text-zinc-600">/</span>
            <span class="text-zinc-400">TODAY'S EVIDENCE</span>
          </div>
          <h2 class="text-4xl sm:text-5xl editorial-title text-zinc-100 tracking-tight">
            THE COURTROOM
          </h2>
          <p class="text-zinc-400 text-sm max-w-lg font-light">
            Your attention is on trial. Examine today's recorded evidence without shame or judgment — only clarity.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="inline-flex p-1 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono">
            <button class="px-4 py-1.5 rounded-full bg-indigo-600/30 text-indigo-200 border border-indigo-500/40">TODAY</button>
            <button class="px-4 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors" id="btnDateYesterday">YESTERDAY</button>
            <button class="px-4 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors" id="btnDateWeek">7-DAY CASE</button>
          </div>
          
          <button id="btnGavelSound" class="court-seal hover:border-amber-400 transition-all cursor-pointer hover:scale-105 active:scale-95" title="Strike the Gavel">
            <span>⚖️ STRIKE GAVEL</span>
          </button>
        </div>
      </div>

      <!-- The Daily Verdict Exhibit Banner with Rotating Border Beam -->
      <div class="glass-panel-elevated border-beam-card p-8 sm:p-10 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="flex items-center gap-3">
              <span id="judicialVerdictStamp" class="verdict-stamp animate-stamp">VERDICT: ${m.verdictCategory}</span>
              <span class="text-xs font-mono text-zinc-400">EVIDENCE DELIBERATION COMPLETE</span>
            </div>

            <h3 class="text-2xl sm:text-3xl font-serif text-zinc-100 leading-snug">
              “Your attention was interrupted <span class="text-indigo-300 font-semibold underline decoration-indigo-400/40 underline-offset-4">${m.pickups} times</span> today.”
            </h3>

            <div class="space-y-2 text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
              <p>You spent <strong class="font-medium text-white">4h 12m</strong> on your phone. <strong class="font-medium text-rose-300">1h 47m</strong> appears to have been unplanned scrolling.</p>
              <p class="text-emerald-300/90 font-medium">“But you also reclaimed 38 minutes.”</p>
              <p class="text-zinc-400 italic font-serif text-base pt-1">
                ${m.verdictQuote}
              </p>
            </div>
          </div>

          <!-- Right: Judicial Action & Reclaim Score -->
          <div class="lg:col-span-4 flex flex-col items-center lg:items-end gap-4 p-6 rounded-2xl bg-black/40 border border-white/5">
            <div class="text-center lg:text-right">
              <span class="case-label text-zinc-500">ATTENTION RECOVERY</span>
              <div class="text-4xl font-serif text-emerald-400 mt-1">38 <span class="text-lg font-sans text-zinc-400">min</span></div>
              <div class="text-xs text-zinc-400 font-mono mt-1">RECLAIMED FROM DRIFT</div>
            </div>

            <div class="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" style="width: 64%;"></div>
            </div>

            <button id="courtroomReflectBtn" class="w-full btn-secondary text-xs font-mono py-2.5">
              <span>ENTER REFLECTION MODE</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
          </div>

        </div>
      </div>

      <!-- Key Evidence Metrics Grid (8 Core Exhibits) -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="case-label text-zinc-400 font-mono">COURT EXHIBITS A THROUGH H</div>
          <span class="text-xs text-zinc-400 font-mono">CLICK ANY EXHIBIT TO INSPECT</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Exhibit 1: Total Screen Time -->
          <div class="glass-panel p-6 evidence-card magnetic-card cursor-pointer hover:border-indigo-400/40" data-exhibit="screen-time">
            <div class="flex items-center justify-between mb-3">
              <span class="case-label text-zinc-400">EXHIBIT A</span>
              <span class="font-mono text-xs text-zinc-400">TOTAL</span>
            </div>
            <div id="metricScreenTime" class="text-3xl sm:text-4xl font-serif text-white font-medium">4h 12m</div>
            <div class="text-xs text-zinc-400 mt-1 font-sans">total screen time today</div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>7-day avg: 4h 30m</span>
              <span class="text-emerald-400">-18m</span>
            </div>
          </div>

          <!-- Exhibit 2: Doom Scroll Time -->
          <div class="glass-panel p-6 evidence-card magnetic-card cursor-pointer hover:border-rose-400/40" data-exhibit="doom-scroll">
            <div class="flex items-center justify-between mb-3">
              <span class="case-label text-rose-400/80">EXHIBIT B</span>
              <span class="font-mono text-xs text-rose-400">DRIFT</span>
            </div>
            <div id="metricDoomScroll" class="text-3xl sm:text-4xl font-serif text-rose-300 font-medium">1h 47m</div>
            <div class="text-xs text-zinc-400 mt-1 font-sans">unintentional scrolling</div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>42.4% of total time</span>
              <span class="text-rose-400 font-semibold">Flagged</span>
            </div>
          </div>

          <!-- Exhibit 3: Number of Pickups -->
          <div class="glass-panel p-6 evidence-card magnetic-card cursor-pointer hover:border-indigo-400/40" data-exhibit="pickups">
            <div class="flex items-center justify-between mb-3">
              <span class="case-label text-zinc-400">EXHIBIT C</span>
              <span class="font-mono text-xs text-zinc-400">IMPULSES</span>
            </div>
            <div id="metricPickups" class="text-3xl sm:text-4xl font-serif text-white font-medium">27</div>
            <div class="text-xs text-zinc-400 mt-1 font-sans">phone pickups</div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Avg: 1 every 28 min</span>
              <span class="text-indigo-300">Habit</span>
            </div>
          </div>

          <!-- Exhibit 4: Longest Scrolling Session -->
          <div class="glass-panel p-6 evidence-card magnetic-card cursor-pointer hover:border-amber-400/40" data-exhibit="longest-session">
            <div class="flex items-center justify-between mb-3">
              <span class="case-label text-amber-400/80">EXHIBIT D</span>
              <span class="font-mono text-xs text-amber-400">PEAK TRAP</span>
            </div>
            <div id="metricLongestSession" class="text-3xl sm:text-4xl font-serif text-amber-200 font-medium">42m</div>
            <div class="text-xs text-zinc-400 mt-1 font-sans">longest scrolling session</div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Detected at 11:48 PM</span>
              <span class="text-amber-400">Late night</span>
            </div>
          </div>

          <!-- Exhibit 5: Most Distracting Category -->
          <div class="glass-panel p-6 evidence-card magnetic-card cursor-pointer hover:border-indigo-400/40" data-exhibit="distracting-app">
            <div class="flex items-center justify-between mb-3">
              <span class="case-label text-zinc-400">EXHIBIT E</span>
              <span class="font-mono text-xs text-zinc-400">CATALYST</span>
            </div>
            <div class="text-2xl font-serif text-zinc-100 font-medium truncate" title="${m.distractingCategory}">Endless Feeds</div>
            <div class="text-xs text-zinc-400 mt-1 font-sans">short videos & auto-reels</div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>1h 14m consumed</span>
              <span class="text-zinc-300">Infinite UI</span>
            </div>
          </div>

          <!-- Exhibit 6: Focus Time Recovered -->
          <div class="glass-panel p-6 evidence-card magnetic-card cursor-pointer hover:border-emerald-400/40" data-exhibit="focus-recovered">
            <div class="flex items-center justify-between mb-3">
              <span class="case-label text-emerald-400">EXHIBIT F</span>
              <span class="font-mono text-xs text-emerald-400">RESCUED</span>
            </div>
            <div id="metricRecovered" class="text-3xl sm:text-4xl font-serif text-emerald-300 font-medium">${m.focusRecoveredMinutes}m</div>
            <div class="text-xs text-zinc-400 mt-1 font-sans">focus time recovered</div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Via 3 interventions</span>
              <span class="text-emerald-400">Conscious</span>
            </div>
          </div>

          <!-- Exhibit 7: Current Scrolling Streak -->
          <div class="glass-panel p-6 evidence-card magnetic-card cursor-pointer hover:border-sky-400/40" data-exhibit="streak">
            <div class="flex items-center justify-between mb-3">
              <span class="case-label text-sky-400">EXHIBIT G</span>
              <span class="font-mono text-xs text-sky-400">CONSISTENCY</span>
            </div>
            <div id="metricStreak" class="text-3xl sm:text-4xl font-serif text-sky-200 font-medium">${m.consciousStreakDays} Days</div>
            <div class="text-xs text-zinc-400 mt-1 font-sans">conscious attention streak</div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Zero guilt days</span>
              <span class="text-sky-300">Aware</span>
            </div>
          </div>

          <!-- Exhibit 8: Number of Intentional Sessions -->
          <div class="glass-panel p-6 evidence-card magnetic-card cursor-pointer hover:border-indigo-400/40" data-exhibit="intentional-sessions">
            <div class="flex items-center justify-between mb-3">
              <span class="case-label text-indigo-400">EXHIBIT H</span>
              <span class="font-mono text-xs text-indigo-400">CHOICE</span>
            </div>
            <div id="metricIntentional" class="text-3xl sm:text-4xl font-serif text-indigo-200 font-medium">${m.intentionalSessionsCount} Sessions</div>
            <div class="text-xs text-zinc-400 mt-1 font-sans">planned deliberate usage</div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Avg length: 24m</span>
              <span class="text-indigo-400">Chosen</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Quick Action Navigation Deck -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div class="glass-panel p-6 flex flex-col justify-between group hover:border-indigo-500/40 cursor-pointer" id="cardGoDetector">
          <div class="space-y-2">
            <div class="case-label text-indigo-400">FEATURE 01</div>
            <h4 class="text-xl font-serif text-white group-hover:text-indigo-200 transition-colors">The Scroll Detector</h4>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Trace the 24-hour visual timeline of your day. Discover exact patterns where scrolling takes control.
            </p>
          </div>
          <div class="mt-6 flex items-center gap-2 text-xs font-mono text-indigo-300">
            <span>OPEN DETECTOR & SCROLL TRAP</span>
            <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>

        <div class="glass-panel p-6 flex flex-col justify-between group hover:border-sky-500/40 cursor-pointer" id="cardGoMirror">
          <div class="space-y-2">
            <div class="case-label text-sky-400">FEATURE 02</div>
            <h4 class="text-xl font-serif text-white group-hover:text-sky-200 transition-colors">The Attention Mirror</h4>
            <p class="text-xs text-zinc-400 leading-relaxed">
              “If your attention were money, would you spend it this way again?” The signature 24-hour currency reflection.
            </p>
          </div>
          <div class="mt-6 flex items-center gap-2 text-xs font-mono text-sky-300">
            <span>VIEW ATTENTION SPECTRUM</span>
            <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>

        <div class="glass-panel p-6 flex flex-col justify-between group hover:border-emerald-500/40 cursor-pointer" id="cardGoCaseFile">
          <div class="space-y-2">
            <div class="case-label text-emerald-400">FEATURE 03</div>
            <h4 class="text-xl font-serif text-white group-hover:text-emerald-200 transition-colors">Today's Case File</h4>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Your daily tasks and intentions with intelligent contextual scroll protection when you drift.
            </p>
          </div>
          <div class="mt-6 flex items-center gap-2 text-xs font-mono text-emerald-300">
            <span>MANAGE ACTIVE TASKS</span>
            <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>
      </div>

    </section>
  `;

  // Initialize magnetic 3D tilt on cards
  initMagneticCards(container);

  // Trigger smooth number counting animations on metrics
  countUp(container.querySelector('#metricScreenTime'), 252, 1300, v => `${Math.floor(v / 60)}h ${Math.round(v % 60)}m`);
  countUp(container.querySelector('#metricDoomScroll'), 107, 1300, v => `${Math.floor(v / 60)}h ${Math.round(v % 60)}m`);
  countUp(container.querySelector('#metricPickups'), 27, 1000, v => Math.round(v));
  countUp(container.querySelector('#metricLongestSession'), 42, 1100, v => `${Math.round(v)}m`);
  countUp(container.querySelector('#metricRecovered'), 38, 1100, v => `${Math.round(v)}m`);
  countUp(container.querySelector('#metricStreak'), 4, 800, v => `${Math.round(v)} Days`);
  countUp(container.querySelector('#metricIntentional'), 6, 800, v => `${Math.round(v)} Sessions`);

  // Attach event handlers
  const gavelBtn = container.querySelector('#btnGavelSound');
  const stampEl = container.querySelector('#judicialVerdictStamp');

  if (gavelBtn) {
    gavelBtn.addEventListener('click', () => {
      triggerGavelStrikeVisual(gavelBtn);
      if (stampEl) {
        stampEl.classList.remove('animate-stamp');
        void stampEl.offsetWidth; // Trigger reflow
        stampEl.classList.add('animate-stamp');
      }
    });
  }

  const reflectBtn = container.querySelector('#courtroomReflectBtn');
  if (reflectBtn) {
    reflectBtn.addEventListener('click', () => {
      sound.playClick();
      store.setState({ activeTab: 'reflection' });
    });
  }

  // Quick navigation cards
  container.querySelector('#cardGoDetector')?.addEventListener('click', () => {
    sound.playClick();
    store.setState({ activeTab: 'detector' });
  });

  container.querySelector('#cardGoMirror')?.addEventListener('click', () => {
    sound.playClick();
    store.setState({ activeTab: 'mirror' });
  });

  container.querySelector('#cardGoCaseFile')?.addEventListener('click', () => {
    sound.playClick();
    store.setState({ activeTab: 'casefile' });
  });

  // Date buttons
  container.querySelector('#btnDateYesterday')?.addEventListener('click', (e) => {
    sound.playClick();
    alert("Archived Case for Yesterday: 3h 54m screen time, 1h 12m unintentional, 22 pickups. Verdict: FOCUSED.");
  });

  container.querySelector('#btnDateWeek')?.addEventListener('click', (e) => {
    sound.playClick();
    store.setState({ activeTab: 'weekly' });
  });

  // Exhibit click inspection
  const exhibitCards = container.querySelectorAll('.evidence-card');
  exhibitCards.forEach(card => {
    card.addEventListener('click', () => {
      sound.playClick();
      const exType = card.getAttribute('data-exhibit');
      openExhibitModal(exType);
    });
  });
}

function openExhibitModal(type) {
  const modal = document.getElementById('globalModalBackdrop');
  const modalBody = document.getElementById('globalModalBody');
  if (!modal || !modalBody) return;

  const exhibitsInfo = {
    'screen-time': {
      title: 'EXHIBIT A: TOTAL SCREEN TIME',
      stat: '4h 12m (252 minutes)',
      detail: 'Screen time reflects total active viewport hours recorded across your synchronized devices today.',
      insight: 'Notice that total time alone is neutral. A surgeon or programmer may log 6 hours intentionally. What matters is the ratio of conscious creation vs passive consumption.'
    },
    'doom-scroll': {
      title: 'EXHIBIT B: UNINTENTIONAL SCROLLING',
      stat: '1h 47m (107 minutes)',
      detail: 'Algorithms detected 4 prolonged continuous feed-swiping episodes with low intentional engagement.',
      insight: 'Doom scrolling typically occurs when cognitive energy dips. It is rarely a failure of will, but rather the brain searching for passive relief when fatigued.'
    },
    'pickups': {
      title: 'EXHIBIT C: PHONE PICKUPS',
      stat: '27 Pickups Recorded',
      detail: 'Device activated every 28 minutes on average during waking hours.',
      insight: 'Micro-checking often serves as a reflex to bridge brief transitions — waiting for a kettle, an elevator, or between paragraphs.'
    },
    'longest-session': {
      title: 'EXHIBIT D: LONGEST SCROLLING SESSION',
      stat: '42m at 11:48 PM',
      detail: 'Occurred in bed while blue-light filters were engaged.',
      insight: 'Late-night scrolling suppresses melatonin production. Scroll Court suggests placing the phone outside arm’s reach 30 minutes before sleep.'
    },
    'distracting-app': {
      title: 'EXHIBIT E: PRIMARY CATALYST CATEGORY',
      stat: 'Endless Feeds & Short Videos',
      detail: 'Infinite scroll mechanics with algorithmic reinforcement.',
      insight: 'These interfaces eliminate stopping cues (the natural end of a chapter or newspaper page). Creating conscious artificial stopping cues restores autonomy.'
    },
    'focus-recovered': {
      title: 'EXHIBIT F: ATTENTION RECOVERED',
      stat: '38 Minutes Reclaimed',
      detail: 'Time saved when you acknowledged Court Interruptions and paused.',
      insight: 'You stepped away 3 times when prompted. That is 38 minutes invested back into your physical life.'
    },
    'streak': {
      title: 'EXHIBIT G: CONSCIOUS ATTENTION STREAK',
      stat: '4 Consecutive Days of Awareness',
      detail: 'Logging evidence without avoidance or shame.',
      insight: 'Consistency of awareness creates emotional freedom. You are observing your mind, not fighting it.'
    },
    'intentional-sessions': {
      title: 'EXHIBIT H: INTENTIONAL SESSIONS',
      stat: '6 Purposeful Blocks',
      detail: 'Sessions opened with a specific, articulated purpose and closed when done.',
      insight: 'When you choose when to enter and when to leave, technology serves you, not the reverse.'
    }
  };

  const info = exhibitsInfo[type] || exhibitsInfo['screen-time'];

  modalBody.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between border-b border-white/10 pb-4">
        <span class="case-label text-indigo-400 font-mono">${info.title}</span>
        <button id="closeExhibitModalBtn" class="text-zinc-400 hover:text-white text-lg cursor-pointer">✕</button>
      </div>

      <div class="text-3xl font-serif text-white">${info.stat}</div>

      <p class="text-zinc-300 text-sm leading-relaxed">${info.detail}</p>

      <div class="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
        <span class="text-xs font-mono text-indigo-300 uppercase tracking-widest font-semibold">Judicial Perspective</span>
        <p class="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-serif italic">
          “${info.insight}”
        </p>
      </div>

      <div class="flex justify-end pt-2">
        <button id="dismissExhibitModalBtn" class="btn-primary text-xs py-2 px-6">
          CLOSE EXHIBIT
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');
  modalBody.querySelector('#closeExhibitModalBtn')?.addEventListener('click', close);
  modalBody.querySelector('#dismissExhibitModalBtn')?.addEventListener('click', close);
}
