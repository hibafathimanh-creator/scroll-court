// SCROLL COURT - Master Application Coordinator
import { store } from './state.js';
import { sound } from './audio.js';
import { initAmbientDust } from './animations.js';
import { renderHero } from './components/hero.js';
import { renderCourtroom } from './components/courtroom.js';
import { renderDetector } from './components/detector.js';
import { renderMirror } from './components/mirror.js';
import { renderBodySignals } from './components/bodySignals.js';
import { renderCaseFile } from './components/caseFile.js';
import { renderFocusMode } from './components/focusMode.js';
import { renderReflection } from './components/reflection.js';
import { renderWeeklyCase } from './components/weeklyCase.js';
import { renderPrivacy } from './components/privacy.js';
import { triggerEmergencyBreak } from './components/emergencyBreak.js';
import { triggerCourtInterruption } from './components/interruptionOverlay.js';

class App {
  constructor() {
    this.mainContainer = document.getElementById('mainAppContent');
    this.init();
  }

  init() {
    // Start ambient ethereal dust particle canvas
    initAmbientDust();

    // Apply accessibility settings from state
    const state = store.getState();
    if (state.privacy.reducedMotion) document.body.classList.add('reduced-motion');
    if (state.privacy.highContrast) document.body.classList.add('high-contrast');

    // Subscribe to state changes
    store.subscribe((newState) => {
      this.render();
      this.updateNav(newState.activeTab);
    });

    // Setup global listeners
    this.setupNavigation();
    this.setupGlobalActions();
    this.setupKeyboardShortcuts();

    // Initial render
    this.render();
    this.updateNav(state.activeTab);
  }

  render() {
    if (!this.mainContainer) return;
    const tab = store.getState().activeTab;

    switch (tab) {
      case 'hero':
        renderHero(this.mainContainer);
        break;
      case 'court':
        renderCourtroom(this.mainContainer);
        break;
      case 'detector':
        renderDetector(this.mainContainer);
        break;
      case 'mirror':
        renderMirror(this.mainContainer);
        break;
      case 'body':
        renderBodySignals(this.mainContainer);
        break;
      case 'casefile':
        renderCaseFile(this.mainContainer);
        break;
      case 'focus':
        renderFocusMode(this.mainContainer);
        break;
      case 'reflection':
        renderReflection(this.mainContainer);
        break;
      case 'weekly':
        renderWeeklyCase(this.mainContainer);
        break;
      case 'privacy':
        renderPrivacy(this.mainContainer);
        break;
      default:
        renderCourtroom(this.mainContainer);
    }

    // Scroll to top upon tab switch unless it's hero scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupNavigation() {
    // Desktop navigation tabs
    document.querySelectorAll('[data-nav-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        sound.playClick();
        const target = btn.getAttribute('data-nav-target');
        store.setState({ activeTab: target });
      });
    });

    // Brand logo click goes to hero or courtroom
    document.getElementById('brandLogoLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      sound.playClick();
      const cur = store.getState().activeTab;
      store.setState({ activeTab: cur === 'hero' ? 'court' : 'hero' });
    });
  }

  setupGlobalActions() {
    // Header Emergency Break Button
    document.getElementById('emergencyBreakBtn')?.addEventListener('click', () => {
      triggerEmergencyBreak();
    });

    // Floating Emergency Break Button for mobile
    document.getElementById('floatingEmergencyBtn')?.addEventListener('click', () => {
      triggerEmergencyBreak();
    });

    // Audio Toggle in Header
    const audioBtn = document.getElementById('headerAudioToggle');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const enabled = sound.toggleMute();
        audioBtn.textContent = enabled ? '🔊' : '🔇';
        audioBtn.setAttribute('title', enabled ? 'Sound On' : 'Sound Muted');
      });
    }

    // Global Modal Backdrop click to dismiss
    const modalBackdrop = document.getElementById('globalModalBackdrop');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('active');
        }
      });
    }

    // Keyboard Shortcuts Modal Trigger `?`
    document.getElementById('btnHelpShortcuts')?.addEventListener('click', () => {
      sound.playClick();
      this.openShortcutsModal();
    });
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger hotkeys if user is typing in an input or textarea
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      if (e.key === 'Escape') {
        const modal = document.getElementById('globalModalBackdrop');
        if (modal) modal.classList.remove('active');
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        this.openShortcutsModal();
      } else if (e.key === '1') {
        sound.playClick();
        store.setState({ activeTab: 'court' });
      } else if (e.key === '2') {
        sound.playClick();
        store.setState({ activeTab: 'detector' });
      } else if (e.key === '3') {
        sound.playClick();
        store.setState({ activeTab: 'mirror' });
      } else if (e.key === '4') {
        sound.playClick();
        store.setState({ activeTab: 'casefile' });
      } else if (e.key === '5') {
        sound.playClick();
        store.setState({ activeTab: 'focus' });
      } else if (e.key.toLowerCase() === 'e') {
        triggerEmergencyBreak();
      }
    });
  }

  updateNav(currentTab) {
    // Update desktop nav tab active styling
    document.querySelectorAll('[data-nav-target]').forEach(btn => {
      const target = btn.getAttribute('data-nav-target');
      if (target === currentTab) {
        btn.classList.add('active');
        btn.classList.add('text-white');
      } else {
        btn.classList.remove('active');
        btn.classList.remove('text-white');
      }
    });

    // Update mobile bottom bar active styling
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      const target = item.getAttribute('data-nav-target');
      if (target === currentTab) {
        item.classList.add('text-indigo-400');
        item.classList.remove('text-zinc-500');
      } else {
        item.classList.remove('text-indigo-400');
        item.classList.add('text-zinc-500');
      }
    });
  }

  openShortcutsModal() {
    const modal = document.getElementById('globalModalBackdrop');
    const modalBody = document.getElementById('globalModalBody');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <span class="case-label text-indigo-400 font-mono">COURT KEYBOARD DIRECTIVES</span>
          <button id="closeShortcutsModalBtn" class="text-zinc-400 hover:text-white text-lg cursor-pointer">✕</button>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs font-mono">
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span class="text-zinc-300">The Courtroom</span>
            <kbd class="px-2 py-0.5 rounded bg-zinc-800 text-indigo-300 border border-white/10">1</kbd>
          </div>
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span class="text-zinc-300">Scroll Detector</span>
            <kbd class="px-2 py-0.5 rounded bg-zinc-800 text-indigo-300 border border-white/10">2</kbd>
          </div>
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span class="text-zinc-300">Attention Mirror</span>
            <kbd class="px-2 py-0.5 rounded bg-zinc-800 text-indigo-300 border border-white/10">3</kbd>
          </div>
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span class="text-zinc-300">Case File (Tasks)</span>
            <kbd class="px-2 py-0.5 rounded bg-zinc-800 text-indigo-300 border border-white/10">4</kbd>
          </div>
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span class="text-zinc-300">Focus Mode / Orders</span>
            <kbd class="px-2 py-0.5 rounded bg-zinc-800 text-indigo-300 border border-white/10">5</kbd>
          </div>
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span class="text-rose-300">Emergency Break</span>
            <kbd class="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30">E</kbd>
          </div>
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span class="text-zinc-300">Dismiss Modal</span>
            <kbd class="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/10">Esc</kbd>
          </div>
          <div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span class="text-zinc-300">Directives Help</span>
            <kbd class="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/10">?</kbd>
          </div>
        </div>

        <div class="pt-2 flex justify-end">
          <button id="dismissShortcutsModalBtn" class="btn-primary text-xs py-2 px-6">
            UNDERSTOOD
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    modalBody.querySelector('#closeShortcutsModalBtn')?.addEventListener('click', close);
    modalBody.querySelector('#dismissShortcutsModalBtn')?.addEventListener('click', close);
  }
}

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
