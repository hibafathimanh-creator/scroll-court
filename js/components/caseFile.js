// SCROLL COURT - Today's Case File (To-Do List + Contextual Scroll Interruption)
import { store } from '../state.js';
import { sound } from '../audio.js';

export function renderCaseFile(container) {
  const state = store.getState();
  const tasks = state.tasks;

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  container.innerHTML = `
    <section class="py-8 px-4 sm:px-8 max-w-5xl mx-auto space-y-10 animate-fade-in">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div class="space-y-2">
          <div class="case-label text-indigo-400 font-mono">INTENTION DOCKET</div>
          <h2 class="text-4xl sm:text-5xl editorial-title text-zinc-100">
            TODAY'S CASE FILE
          </h2>
          <p class="text-zinc-400 text-sm max-w-xl font-light">
            Your deliberate commitments for the day. Scroll Court monitors your unfinished cases and steps in when attention is hijacked by algorithmic loops.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button id="btnSimulateTaskInterruption" class="btn-secondary text-xs font-mono py-2 px-4 border-indigo-400/40 text-indigo-300 hover:text-white">
            ⚡ TEST CONTEXTUAL REMINDER
          </button>
        </div>
      </div>

      <!-- Add New Task Form -->
      <div class="glass-panel p-6 sm:p-8">
        <form id="addTaskForm" class="flex flex-col sm:flex-row gap-4 items-end">
          <div class="flex-1 space-y-1.5 w-full">
            <label class="case-label text-zinc-400 font-mono">NEW INTENTION / CASE ITEM</label>
            <input 
              type="text" 
              id="newTaskInput" 
              placeholder="e.g., Draft architectural specification or walk outside" 
              class="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-400 transition-colors font-sans text-sm"
              required
            />
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <div class="space-y-1.5 flex-1 sm:w-32">
              <label class="case-label text-zinc-400 font-mono">PRIORITY</label>
              <select id="newTaskPriority" class="w-full px-3 py-3 rounded-xl bg-black/50 border border-white/10 text-zinc-200 text-sm focus:outline-none focus:border-indigo-400">
                <option value="urgent">Urgent</option>
                <option value="high" selected>High</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div class="space-y-1.5 flex-1 sm:w-28">
              <label class="case-label text-zinc-400 font-mono">EST (MIN)</label>
              <input type="number" id="newTaskMinutes" value="45" min="5" max="360" class="w-full px-3 py-3 rounded-xl bg-black/50 border border-white/10 text-zinc-200 text-sm focus:outline-none focus:border-indigo-400 font-mono" />
            </div>

            <button type="submit" class="btn-primary py-3 px-6 text-xs font-mono h-[46px] mt-auto">
              FILE CASE +
            </button>
          </div>
        </form>
      </div>

      <!-- Docket List -->
      <div class="space-y-4">
        <div class="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>CASES ON RECORD: ${tasks.length} (${pendingCount} PENDING, ${completedCount} FULFILLED)</span>
          <span>CONTEXT PROTECTION: ACTIVE</span>
        </div>

        <div class="space-y-2.5" id="caseTasksList">
          ${tasks.map(task => {
            const priorityColors = {
              urgent: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              high: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
              normal: 'text-zinc-400 bg-zinc-800/40 border-white/10'
            };
            const pBadge = priorityColors[task.priority] || priorityColors.normal;

            return `
              <div class="glass-panel p-4 sm:p-5 flex items-center justify-between gap-4 transition-all ${task.completed ? 'opacity-50' : 'hover:border-white/20'}" data-task-id="${task.id}">
                
                <div class="flex items-center gap-4 flex-1">
                  <!-- Custom Checkbox -->
                  <button class="toggle-task-btn w-6 h-6 rounded-lg border ${task.completed ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-white/20 hover:border-indigo-400'} flex items-center justify-center transition-colors cursor-pointer" data-id="${task.id}" aria-label="Toggle task">
                    ${task.completed ? '✓' : ''}
                  </button>

                  <div class="space-y-0.5">
                    <span class="text-sm font-medium ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-100'}">
                      ${task.title}
                    </span>
                    <div class="flex items-center gap-3 text-xs font-mono text-zinc-500">
                      <span>Est: ${task.estMinutes}m</span>
                      ${task.contextReminder ? '<span class="text-indigo-400/90 text-[10px]">● Context Protected</span>' : ''}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <span class="px-2.5 py-0.5 rounded-full border text-[10px] uppercase font-mono font-semibold ${pBadge}">
                    ${task.priority}
                  </span>

                  <!-- Launch in Focus Mode -->
                  ${!task.completed ? `
                    <button class="launch-task-focus-btn btn-secondary text-[11px] py-1 px-3 font-mono text-sky-300 hover:text-white" data-title="${task.title}" data-mins="${task.estMinutes}">
                      FOCUS 🎯
                    </button>
                  ` : ''}

                  <!-- Delete -->
                  <button class="delete-task-btn text-zinc-600 hover:text-rose-400 transition-colors p-1" data-id="${task.id}" title="Dismiss case">
                    ✕
                  </button>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>

    </section>
  `;

  // Attach Add Task
  const form = container.querySelector('#addTaskForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = container.querySelector('#newTaskInput');
      const priority = container.querySelector('#newTaskPriority').value;
      const mins = container.querySelector('#newTaskMinutes').value;
      if (input.value.trim()) {
        sound.playClick();
        store.addTask(input.value, priority, mins);
        renderCaseFile(container);
      }
    });
  }

  // Toggle tasks
  container.querySelectorAll('.toggle-task-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const id = btn.getAttribute('data-id');
      store.toggleTask(id);
      renderCaseFile(container);
    });
  });

  // Delete tasks
  container.querySelectorAll('.delete-task-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const id = btn.getAttribute('data-id');
      store.deleteTask(id);
      renderCaseFile(container);
    });
  });

  // Launch task in focus mode
  container.querySelectorAll('.launch-task-focus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playGavel();
      const title = btn.getAttribute('data-title');
      const mins = parseInt(btn.getAttribute('data-mins')) || 30;
      store.setState({
        activeTab: 'focus',
        activeFocusSession: {
          title,
          totalSeconds: mins * 60,
          remainingSeconds: mins * 60,
          startTime: Date.now()
        }
      });
    });
  });

  // Test Contextual Reminder Interruption Trigger
  const testBtn = container.querySelector('#btnSimulateTaskInterruption');
  if (testBtn) {
    testBtn.addEventListener('click', () => {
      const pending = tasks.find(t => !t.completed);
      const taskName = pending ? pending.title : 'Study for 1 hour';
      triggerContextualTaskReminder(taskName, 34);
    });
  }
}

export function triggerContextualTaskReminder(taskTitle = 'Study for 1 hour', scrollMinutes = 34) {
  const modal = document.getElementById('globalModalBackdrop');
  const modalBody = document.getElementById('globalModalBody');
  if (!modal || !modalBody) return;

  sound.playGavel();

  modalBody.innerHTML = `
    <div class="space-y-6 text-center max-w-lg mx-auto py-2">
      
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs tracking-widest uppercase">
        <span class="status-dot bg-amber-400"></span>
        CONTEXTUAL DOCKET ALERT
      </div>

      <div class="space-y-3">
        <h3 class="text-2xl sm:text-3xl font-serif text-white leading-snug">
          “Your attention has been on social media for ${scrollMinutes} minutes.”
        </h3>

        <div class="p-4 rounded-xl bg-white/[0.03] border border-white/10 my-4 text-left">
          <span class="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">Unfulfilled Intention</span>
          <p class="text-lg font-serif text-indigo-200 mt-1 italic">
            “You told yourself you wanted to finish: ‘${taskTitle}’”
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
        <button id="btnTaskReturn" class="btn-primary py-3 px-3 text-xs font-mono">
          RETURN TO TASK
        </button>
        <button id="btnTaskFiveMore" class="btn-secondary py-3 px-3 text-xs font-mono">
          5 MORE MINUTES
        </button>
        <button id="btnTaskTakingBreak" class="btn-secondary py-3 px-3 text-xs font-mono text-zinc-400 hover:text-white">
          I'M TAKING A BREAK
        </button>
      </div>

      <div class="text-[11px] font-mono text-zinc-500 pt-1">
        INTELLIGENT · RESPECTFUL · NEVER COERCIVE
      </div>

    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');

  modalBody.querySelector('#btnTaskReturn')?.addEventListener('click', () => {
    sound.playClick();
    close();
    store.reclaimMinutes(20);
    store.setState({ activeTab: 'focus' });
  });

  modalBody.querySelector('#btnTaskFiveMore')?.addEventListener('click', () => {
    sound.playClick();
    close();
    alert("5-minute boundary established. Court will check in gently.");
  });

  modalBody.querySelector('#btnTaskTakingBreak')?.addEventListener('click', () => {
    sound.playClick();
    close();
    alert("Break acknowledged. Case item rescheduled without penalty.");
  });
}
