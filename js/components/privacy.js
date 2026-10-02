// SCROLL COURT - Privacy & "YOUR DATA IS YOURS"
import { store } from '../state.js';
import { sound } from '../audio.js';

export function renderPrivacy(container) {
  const state = store.getState();
  const priv = state.privacy;
  const isBluetooth = state.bodySignals.mode === 'live_bluetooth';

  container.innerHTML = `
    <section class="py-8 px-4 sm:px-8 max-w-5xl mx-auto space-y-10 animate-fade-in">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div class="space-y-2">
          <div class="case-label text-emerald-400 font-mono flex items-center gap-2">
            <span>SOVEREIGN ARCHITECTURE</span>
            <span class="text-zinc-600">/</span>
            <span>ZERO CLOUD TELEMETRY</span>
          </div>
          <h2 class="text-4xl sm:text-5xl editorial-title text-zinc-100">
            YOUR DATA IS YOURS
          </h2>
          <p class="text-zinc-400 text-sm max-w-xl font-light">
            Attention cannot be reclaimed through surveillance. Scroll Court operates with absolute cryptographic local privacy.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span class="court-seal border-emerald-500/30 text-emerald-400">
            <span class="status-dot bg-emerald-400"></span>
            100% ON-DEVICE
          </span>
        </div>
      </div>

      <!-- Core Privacy Guarantees Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div class="glass-panel p-6 space-y-3 border-t-2 border-t-emerald-400">
          <div class="flex items-center gap-2 text-emerald-300 font-mono text-xs">
            <span>🛡️ NO CLOUD STORAGE</span>
          </div>
          <h3 class="text-lg font-serif text-white">Stays On Your Machine</h3>
          <p class="text-xs text-zinc-400 leading-relaxed font-light">
            Every minute logged, every task added, and every personal reflection is written exclusively to your browser’s encrypted LocalStorage. No database server exists.
          </p>
        </div>

        <div class="glass-panel p-6 space-y-3 border-t-2 border-t-sky-400">
          <div class="flex items-center gap-2 text-sky-300 font-mono text-xs">
            <span>⚡ HARDWARE TRANSPARENCY</span>
          </div>
          <h3 class="text-lg font-serif text-white">Strict Device APIs</h3>
          <p class="text-xs text-zinc-400 leading-relaxed font-light">
            Wearable connections use standard Web Bluetooth GATT protocols with direct peer pairing. Metrics are processed ephemerally in RAM and never transmitted.
          </p>
        </div>

        <div class="glass-panel p-6 space-y-3 border-t-2 border-t-indigo-400">
          <div class="flex items-center gap-2 text-indigo-300 font-mono text-xs">
            <span>🚫 ZERO TRACKING OR ADS</span>
          </div>
          <h3 class="text-lg font-serif text-white">Anti-Surveillance Brand</h3>
          <p class="text-xs text-zinc-400 leading-relaxed font-light">
            We will never sell personal usage patterns, serve behavioral advertisements, or monetize your attention metrics. We are an antidote to the attention economy.
          </p>
        </div>

      </div>

      <!-- DATA & PERMISSIONS Dashboard -->
      <div class="glass-panel-elevated p-6 sm:p-8 space-y-6 border border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span class="case-label text-indigo-400 font-mono">JUDICIAL PERMISSIONS MATRIX</span>
            <h3 class="text-xl sm:text-2xl font-serif text-white">Data & Permissions Dashboard</h3>
          </div>
          <span class="text-xs font-mono text-zinc-400">DEVICE ACCESS CONTROLS</span>
        </div>

        <!-- Permission Rows -->
        <div class="space-y-4 font-mono text-xs">
          
          <!-- Web Bluetooth / Wearable -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div class="space-y-1 font-sans">
              <div class="text-white font-medium flex items-center gap-2">
                <span>Web Bluetooth (0x180D GATT Service)</span>
                ${isBluetooth ? '<span class="text-emerald-400 text-[10px] font-mono">[ACTIVE]</span>' : '<span class="text-zinc-500 text-[10px] font-mono">[INACTIVE]</span>'}
              </div>
              <div class="text-xs text-zinc-400 font-light">Used exclusively to read live heart rate pulses from Bluetooth monitors.</div>
            </div>
            <div>
              ${isBluetooth ? `
                <button id="btnRevokeBluetooth" class="btn-secondary text-[11px] py-1.5 px-3 text-rose-300 border-rose-500/30">
                  REVOKE ACCESS
                </button>
              ` : `
                <button id="btnGrantBluetooth" class="btn-secondary text-[11px] py-1.5 px-3 text-zinc-300">
                  CONNECT BLE
                </button>
              `}
            </div>
          </div>

          <!-- Web Notifications -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div class="space-y-1 font-sans">
              <div class="text-white font-medium flex items-center gap-2">
                <span>System Interruption Notifications</span>
                <span id="notifStatusBadge" class="text-zinc-500 text-[10px] font-mono">[SYSTEM CHECK]</span>
              </div>
              <div class="text-xs text-zinc-400 font-light">Triggers gentle desktop interruptions when a 30-minute scroll is detected in background tabs.</div>
            </div>
            <div>
              <button id="btnToggleNotifications" class="btn-secondary text-[11px] py-1.5 px-3 text-zinc-300">
                REQUEST PERMISSION
              </button>
            </div>
          </div>

          <!-- Synthesized Audio -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div class="space-y-1 font-sans">
              <div class="text-white font-medium">Audio Feedback (Synthesized Gavel & Chimes)</div>
              <div class="text-xs text-zinc-400 font-light">Uses Web Audio API oscillators. Fully generated locally without external audio downloads.</div>
            </div>
            <div>
              <button id="btnToggleAudioPrivacy" class="btn-secondary text-[11px] py-1.5 px-3 text-zinc-300">
                ${priv.soundEnabled ? 'ENABLED (MUTE)' : 'MUTED (UNMUTE)'}
              </button>
            </div>
          </div>

          <!-- Reduced Motion Accessibility -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div class="space-y-1 font-sans">
              <div class="text-white font-medium">Reduced Motion Mode (Accessibility)</div>
              <div class="text-xs text-zinc-400 font-light">Disables intensive scales, breathing ripples, and smooth transitions for vestibular comfort.</div>
            </div>
            <div>
              <button id="btnToggleReducedMotion" class="btn-secondary text-[11px] py-1.5 px-3 text-zinc-300">
                ${priv.reducedMotion ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>

          <!-- High Contrast Mode -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div class="space-y-1 font-sans">
              <div class="text-white font-medium">High Contrast Mode (WCAG AAA)</div>
              <div class="text-xs text-zinc-400 font-light">Sharp white text against pure black background with ultra-defined boundaries.</div>
            </div>
            <div>
              <button id="btnToggleHighContrast" class="btn-secondary text-[11px] py-1.5 px-3 text-zinc-300">
                ${priv.highContrast ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>
          </div>

        </div>

        <!-- Export & Burn Actions -->
        <div class="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button id="btnExportCaseFile" class="btn-secondary text-xs font-mono py-2.5 px-5 flex items-center gap-2">
            <span>EXPORT CASE DOSSIER (.JSON)</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          </button>

          <button id="btnBurnTheEvidence" class="btn-emergency text-xs py-2 px-5 text-rose-300 hover:text-white">
            🔥 BURN THE EVIDENCE (WIPE ALL DATA)
          </button>
        </div>

      </div>

    </section>
  `;

  // Attach permission and settings buttons
  container.querySelector('#btnExportCaseFile')?.addEventListener('click', () => {
    sound.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `scroll_court_dossier_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
  });

  container.querySelector('#btnBurnTheEvidence')?.addEventListener('click', () => {
    if (confirm("Are you certain you wish to Burn The Evidence?\n\nThis will permanently expunge all tasks, attention metrics, and reflections from your local browser storage. This cannot be undone.")) {
      sound.playGavel();
      store.burnTheEvidence();
      alert("All evidence incinerated. Slate wiped clean.");
      location.reload();
    }
  });

  // Audio privacy toggle
  container.querySelector('#btnToggleAudioPrivacy')?.addEventListener('click', () => {
    const updated = sound.toggleMute();
    renderPrivacy(container);
  });

  // Reduced motion toggle
  container.querySelector('#btnToggleReducedMotion')?.addEventListener('click', () => {
    sound.playClick();
    const cur = store.getState().privacy.reducedMotion;
    document.body.classList.toggle('reduced-motion', !cur);
    store.setState({
      privacy: { ...store.getState().privacy, reducedMotion: !cur }
    });
    renderPrivacy(container);
  });

  // High contrast toggle
  container.querySelector('#btnToggleHighContrast')?.addEventListener('click', () => {
    sound.playClick();
    const cur = store.getState().privacy.highContrast;
    document.body.classList.toggle('high-contrast', !cur);
    store.setState({
      privacy: { ...store.getState().privacy, highContrast: !cur }
    });
    renderPrivacy(container);
  });

  // Bluetooth grant/revoke
  container.querySelector('#btnGrantBluetooth')?.addEventListener('click', () => {
    store.setState({ activeTab: 'body' });
  });

  container.querySelector('#btnRevokeBluetooth')?.addEventListener('click', () => {
    sound.playClick();
    store.setState({
      bodySignals: { ...state.bodySignals, mode: 'demo', connected: false }
    });
    renderPrivacy(container);
  });

  // Web Notifications request
  container.querySelector('#btnToggleNotifications')?.addEventListener('click', async () => {
    sound.playClick();
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        new Notification("Scroll Court", {
          body: "Court is now in session. Interruption alerts will protect your attention.",
          icon: "./assets/favicon.svg"
        });
        alert("Web notifications authorized. Court alerts enabled.");
      } else {
        alert("Notification permission was not granted.");
      }
    } else {
      alert("Web Notifications API not supported in this browser.");
    }
  });
}
