// SCROLL COURT - State Management & Local Storage Persistence

const STORAGE_KEY = 'scroll_court_state_v1';

const defaultState = {
  activeTab: 'court', // 'hero', 'court', 'insights', 'focus', 'casefile', 'weekly', 'mirror', 'privacy'
  todayMetrics: {
    totalScreenMinutes: 252, // 4h 12m
    doomScrollMinutes: 107,  // 1h 47m
    pickups: 27,
    longestSessionMinutes: 42,
    distractingCategory: 'Endless Feeds & Short Videos',
    focusRecoveredMinutes: 38,
    consciousStreakDays: 4,
    intentionalSessionsCount: 6,
    attentionStatus: 'UNDER YOUR CONTROL', // 'UNDER YOUR CONTROL', 'DRIFTING DETECTED', 'ATTENTION CRITICAL'
    interruptionCount: 27,
    verdictCategory: 'RECOVERING', // 'INTENTIONAL', 'DRIFTING', 'RECOVERING', 'FOCUSED'
    verdictQuote: 'You noticed the pattern. When scrolling surged after dusk, you reclaimed 38 minutes.'
  },
  
  timelineEvents: [
    { id: 1, time: '08:30', duration: '45m', type: 'focus', title: 'Deep Work: Project Brief', category: 'Productivity', hr: 64, flag: false },
    { id: 2, time: '10:15', duration: '7m', type: 'social', title: 'Message Replies', category: 'Communication', hr: 68, flag: false },
    { id: 3, time: '10:22', duration: '34m', type: 'doom', title: 'Feed Exploration', category: 'Endless Feed', hr: 79, flag: true, note: 'Rapid app switching between 3 platforms' },
    { id: 4, time: '12:40', duration: '22m', type: 'intentional', title: 'Long-form Essay Read', category: 'Reading', hr: 62, flag: false },
    { id: 5, time: '15:10', duration: '65m', type: 'focus', title: 'System Engineering', category: 'Focus', hr: 66, flag: false },
    { id: 6, time: '18:30', duration: '48m', type: 'doom', title: 'Short Video Auto-Play', category: 'Short Video', hr: 81, flag: true, note: 'Continuous scroll with zero search intent' },
    { id: 7, time: '19:12', duration: '25m', type: 'doom', title: 'Comment Thread Wandering', category: 'Social Forums', hr: 77, flag: true, note: 'Returned to app 4 minutes after closing' },
    { id: 8, time: '21:15', duration: '50m', type: 'intentional', title: 'Film Discussion & Call', category: 'Leisure', hr: 65, flag: false },
    { id: 9, time: '23:48', duration: '42m', type: 'doom', title: 'Late-night Bedtime Scroll', category: 'Endless Feed', hr: 76, flag: true, note: 'Past scheduled bedtime boundary' }
  ],

  tasks: [
    { id: 'task-1', title: 'Study for 1 hour', completed: false, priority: 'urgent', estMinutes: 60, contextReminder: true },
    { id: 'task-2', title: 'Finish assignment draft', completed: false, priority: 'high', estMinutes: 45, contextReminder: true },
    { id: 'task-3', title: 'Workout (Strength & Run)', completed: true, priority: 'normal', estMinutes: 40, contextReminder: false },
    { id: 'task-4', title: 'Read 20 pages of book', completed: false, priority: 'normal', estMinutes: 30, contextReminder: false },
    { id: 'task-5', title: 'Call Mom', completed: false, priority: 'high', estMinutes: 15, contextReminder: true }
  ],

  bodySignals: {
    connected: false,
    mode: 'demo', // 'demo' | 'live_bluetooth'
    deviceName: null,
    currentBpm: 72,
    restingBpm: 61,
    scrollingBpm: 78,
    steps: 6420,
    sleepDuration: '7h 24m',
    activeMinutes: 42,
    permissionExplained: false
  },

  // 24-Hour Attention × Heart Rate Correlation points (hour 0 to 23)
  correlationData: [
    { hour: '00:00', bpm: 58, scrollMin: 12, intentionalMin: 0, hrBaseline: 60 },
    { hour: '02:00', bpm: 54, scrollMin: 0, intentionalMin: 0, hrBaseline: 55 },
    { hour: '04:00', bpm: 52, scrollMin: 0, intentionalMin: 0, hrBaseline: 54 },
    { hour: '06:00', bpm: 59, scrollMin: 0, intentionalMin: 0, hrBaseline: 58 },
    { hour: '08:00', bpm: 68, scrollMin: 5, intentionalMin: 45, hrBaseline: 62 },
    { hour: '10:00', bpm: 79, scrollMin: 34, intentionalMin: 10, hrBaseline: 64 },
    { hour: '12:00', bpm: 66, scrollMin: 8, intentionalMin: 22, hrBaseline: 63 },
    { hour: '14:00', bpm: 71, scrollMin: 12, intentionalMin: 35, hrBaseline: 64 },
    { hour: '16:00', bpm: 70, scrollMin: 6, intentionalMin: 55, hrBaseline: 64 },
    { hour: '18:00', bpm: 81, scrollMin: 48, intentionalMin: 5, hrBaseline: 65 },
    { hour: '20:00', bpm: 75, scrollMin: 25, intentionalMin: 20, hrBaseline: 63 },
    { hour: '22:00', bpm: 68, scrollMin: 15, intentionalMin: 30, hrBaseline: 61 },
    { hour: '23:30', bpm: 78, scrollMin: 42, intentionalMin: 0, hrBaseline: 60 }
  ],

  // 24-Hour Attention Mirror breakdown (in minutes, summing to 1440 mins)
  mirrorBreakdown: [
    { key: 'sleep', label: 'Sleep & Restoration', minutes: 480, color: '#38bdf8', category: 'Rest' },
    { key: 'focus', label: 'Conscious Deep Work', minutes: 300, color: '#10b981', category: 'Focus' },
    { key: 'offline', label: 'Real Life & Physicality', minutes: 170, color: '#d4af37', category: 'Life' },
    { key: 'social', label: 'Intentional Connection', minutes: 195, color: '#818cf8', category: 'Connection' },
    { key: 'entertainment', label: 'Chosen Entertainment', minutes: 165, color: '#c084fc', category: 'Leisure' },
    { key: 'unplanned', label: 'Unplanned Doom-Scrolling', minutes: 130, color: '#f43f5e', category: 'Drift' }
  ],

  courtOrders: [
    { id: 1, title: 'No social media for 30 minutes', durationMinutes: 30, tag: 'Digital Detox' },
    { id: 2, title: 'Study until 7:00 PM', durationMinutes: 60, tag: 'Academic Focus' },
    { id: 3, title: 'No scrolling during meals', durationMinutes: 45, tag: 'Conscious Eating' },
    { id: 4, title: 'No social media after 11:00 PM', durationMinutes: 120, tag: 'Sleep Boundary' },
    { id: 5, title: 'Give me a 30-minute focus session', durationMinutes: 30, tag: 'Deep Work' }
  ],

  activeFocusSession: null, // { orderId, title, remainingSeconds, totalSeconds, startTime, timerInterval }

  weeklyCase: {
    totalScrollingHours: '26h 14m',
    intentionalPercentage: 56,
    unplannedPercentage: 44,
    peakVulnerableHours: '11:00 PM – 1:00 AM & 2:30 PM – 3:30 PM',
    longestSession: '54m (Thursday night)',
    avgSessionLength: '16m',
    focusTimeTotal: '18h 40m',
    reclaimedTime: '4h 12m',
    questions: [
      { id: 'q1', prompt: 'What usually happens right before you start scrolling?', answer: 'I notice mental fatigue right after completing an intensive work block, or feeling slight overwhelm about starting the next difficult task.' },
      { id: 'q2', prompt: 'When does scrolling feel intentional?', answer: 'When I deliberately search for a specific creator’s research breakdown or architectural reference for under 15 minutes, then close the tab.' },
      { id: 'q3', prompt: 'What were you avoiding?', answer: 'Re-writing section 3 of my technical draft and making an uncomfortable phone call.' },
      { id: 'q4', prompt: 'What would you rather have done with your last hour?', answer: 'Walked in the evening air, finished the second chapter of Marcus Aurelius, or stretched my back.' }
    ]
  },

  reflections: [
    {
      id: 'ref-1',
      date: 'Yesterday at 11:45 PM',
      text: 'I reached for the screen not because there was news, but because silence felt briefly uncomfortable. Once I named that feeling, the urge dissipated.',
      reclaimedMinutes: 25
    }
  ],

  privacy: {
    bluetoothGranted: false,
    notificationsGranted: false,
    localStorageActive: true,
    soundEnabled: true,
    reducedMotion: false,
    highContrast: false
  }
};

class StateManager {
  constructor() {
    this.state = this.loadState();
    this.listeners = new Set();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default state', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  saveState() {
    try {
      // Avoid saving transient timers in localStorage
      const toSave = { ...this.state, activeFocusSession: null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  getState() {
    return this.state;
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.saveState();
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => {
      try {
        fn(this.state);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    });
  }

  // Task actions
  addTask(title, priority = 'normal', estMinutes = 30) {
    const newTask = {
      id: 'task-' + Date.now(),
      title: title.trim(),
      completed: false,
      priority,
      estMinutes: parseInt(estMinutes) || 30,
      contextReminder: true
    };
    this.state.tasks = [newTask, ...this.state.tasks];
    this.saveState();
    this.notify();
    return newTask;
  }

  toggleTask(taskId) {
    this.state.tasks = this.state.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    this.saveState();
    this.notify();
  }

  deleteTask(taskId) {
    this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
    this.saveState();
    this.notify();
  }

  // Reflection actions
  addReflection(text, reclaimedMinutes = 15) {
    const newRef = {
      id: 'ref-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      text: text.trim(),
      reclaimedMinutes
    };
    this.state.reflections = [newRef, ...this.state.reflections];
    this.saveState();
    this.notify();
    return newRef;
  }

  // Weekly question answer update
  updateWeeklyAnswer(qId, answer) {
    this.state.weeklyCase.questions = this.state.weeklyCase.questions.map(q => 
      q.id === qId ? { ...q, answer } : q
    );
    this.saveState();
    this.notify();
  }

  // Reclaim attention time
  reclaimMinutes(amount = 15) {
    this.state.todayMetrics.focusRecoveredMinutes += amount;
    this.state.todayMetrics.doomScrollMinutes = Math.max(0, this.state.todayMetrics.doomScrollMinutes - amount);
    this.saveState();
    this.notify();
  }

  // Clear all data (Burn The Evidence)
  burnTheEvidence() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = JSON.parse(JSON.stringify(defaultState));
    this.saveState();
    this.notify();
  }
}

export const store = new StateManager();
