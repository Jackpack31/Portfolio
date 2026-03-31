import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {

  skills = [
    { label: 'Angular',    type: 'hi'     },
    { label: 'TypeScript', type: 'hi'     },
    { label: 'Python',     type: 'hi'     },
    { label: 'C#',         type: 'purple' },
    { label: 'Git',        type: 'purple' },
    { label: 'Blender',    type: ''       },
    { label: 'SQL',        type: ''       },
    { label: 'HTML/CSS',   type: ''       },
    { label: 'Unity',      type: ''       },
  ];

  timeline = [
    { text: 'Fachinformatiker AE · IBB 2025–heute',  active: true  },
    { text: 'Game Dev · WBH 2020–2024',              active: false },
    { text: 'Zerspanungsmechaniker · BSL 2018–2025', active: false },
    { text: 'Abitur · Mettingen 2013–2016',          active: false },
  ];

  stats = [
    { value: '7+', label: 'Berufsjahre',  purple: false },
    { value: '6+', label: 'Sprachen',     purple: true  },
    { value: 'B2', label: 'Englisch',     purple: false },
  ];

  panels = ['stack', 'erfahrung', 'stats'];
  activePanel = 0;
  private timer: any;

  // ── Theme ──────────────────────────────────────────
  themes = [
    {
      id: 'rose',
      label: 'Rose',
      color: '#ff6b85',
      vars: {
        '--accent-rose':   '#ff6b85',
        '--accent-purple': '#c4b5fd',
        '--border-rose':   'rgba(255, 107, 133, 0.15)',
        '--border-purple': 'rgba(167, 139, 250, 0.35)',
        '--glow1':         'rgba(255, 107, 133, 0.45)',
        '--glow2':         'rgba(167, 139, 250, 0.38)',
        '--glow3':         'rgba(255, 107, 133, 0.22)',
      }
    },
    {
      id: 'blue',
      label: 'Blau',
      color: '#60a5fa',
      vars: {
        '--accent-rose':   '#60a5fa',
        '--accent-purple': '#93c5fd',
        '--border-rose':   'rgba(96, 165, 250, 0.15)',
        '--border-purple': 'rgba(147, 197, 253, 0.35)',
        '--glow1':         'rgba(96, 165, 250, 0.45)',
        '--glow2':         'rgba(59, 130, 246, 0.38)',
        '--glow3':         'rgba(96, 165, 250, 0.22)',
      }
    },
    {
      id: 'green',
      label: 'Grün',
      color: '#34d399',
      vars: {
        '--accent-rose':   '#34d399',
        '--accent-purple': '#6ee7b7',
        '--border-rose':   'rgba(52, 211, 153, 0.15)',
        '--border-purple': 'rgba(110, 231, 183, 0.35)',
        '--glow1':         'rgba(52, 211, 153, 0.45)',
        '--glow2':         'rgba(16, 185, 129, 0.38)',
        '--glow3':         'rgba(52, 211, 153, 0.22)',
      }
    },
    {
      id: 'orange',
      label: 'Orange',
      color: '#fb923c',
      vars: {
        '--accent-rose':   '#fb923c',
        '--accent-purple': '#fbbf24',
        '--border-rose':   'rgba(251, 146, 60, 0.15)',
        '--border-purple': 'rgba(251, 191, 36, 0.35)',
        '--glow1':         'rgba(251, 146, 60, 0.45)',
        '--glow2':         'rgba(245, 158, 11, 0.38)',
        '--glow3':         'rgba(251, 146, 60, 0.22)',
      }
    },
  ];

  activeTheme = 'rose';
  showThemePicker = false;

  setTheme(theme: any) {
    this.activeTheme = theme.id;
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
    // speichern damit es beim neu laden erhalten bleibt
    localStorage.setItem('theme', theme.id);
    this.showThemePicker = false;
  }

  loadSavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      const theme = this.themes.find(t => t.id === saved);
      if (theme) this.setTheme(theme);
    }
  }
  // ───────────────────────────────────────────────────

  ngOnInit() {
    this.startTimer();
    this.loadSavedTheme();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.activePanel = (this.activePanel + 1) % this.panels.length;
    }, 10000);
  }

  goTo(index: number) {
    this.activePanel = index;
    clearInterval(this.timer);
    this.startTimer();
  }
}