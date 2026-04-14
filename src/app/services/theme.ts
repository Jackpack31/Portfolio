import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  themes = [
    {
      id: 'rose',
      label: 'Rose',
      color: '#ff6b85',
      dark: {
        '--bg-main':       '#0f0b18',
        '--accent-rose':   '#ff6b85',
        '--accent-purple': '#c4b5fd',
        '--text-primary':  '#f0eaf8',
        '--text-muted':    'rgba(230, 220, 245, 0.62)',
        '--text-dim':      'rgba(225, 215, 240, 0.45)',
        '--border-rose':   'rgba(255, 107, 133, 0.15)',
        '--border-purple': 'rgba(167, 139, 250, 0.35)',
        '--glow1':         'rgba(255, 107, 133, 0.45)',
        '--glow2':         'rgba(167, 139, 250, 0.38)',
        '--glow3':         'rgba(255, 107, 133, 0.22)',
        '--surface-1':     'rgba(255, 255, 255, 0.02)',
        '--surface-2':     'rgba(255, 255, 255, 0.04)',
        '--surface-hover': 'rgba(255, 255, 255, 0.05)',
        '--navbar-bg':     'rgba(15, 11, 24, 0.85)',
      },
      light: {
        '--bg-main':       '#fdf6f8',
        '--accent-rose':   '#e8365d',
        '--accent-purple': '#7c3aed',
        '--text-primary':  '#1a0a10',
        '--text-muted':    'rgba(60, 20, 35, 0.65)',
        '--text-dim':      'rgba(60, 20, 35, 0.45)',
        '--border-rose':   'rgba(232, 54, 93, 0.2)',
        '--border-purple': 'rgba(124, 58, 237, 0.25)',
        '--glow1':         'rgba(232, 54, 93, 0.15)',
        '--glow2':         'rgba(124, 58, 237, 0.12)',
        '--glow3':         'rgba(232, 54, 93, 0.08)',
        '--surface-1':     'rgba(0, 0, 0, 0.03)',
        '--surface-2':     'rgba(0, 0, 0, 0.06)',
        '--surface-hover': 'rgba(0, 0, 0, 0.08)',
        '--navbar-bg':     'rgba(253, 246, 248, 0.85)',
      }
    },
    {
      id: 'blue',
      label: 'Blau',
      color: '#60a5fa',
      dark: {
        '--bg-main':       '#0a0f1e',
        '--accent-rose':   '#60a5fa',
        '--accent-purple': '#93c5fd',
        '--text-primary':  '#eaf0f8',
        '--text-muted':    'rgba(220, 230, 245, 0.62)',
        '--text-dim':      'rgba(215, 225, 240, 0.45)',
        '--border-rose':   'rgba(96, 165, 250, 0.15)',
        '--border-purple': 'rgba(147, 197, 253, 0.35)',
        '--glow1':         'rgba(96, 165, 250, 0.45)',
        '--glow2':         'rgba(59, 130, 246, 0.38)',
        '--glow3':         'rgba(96, 165, 250, 0.22)',
        '--surface-1':     'rgba(255, 255, 255, 0.02)',
        '--surface-2':     'rgba(255, 255, 255, 0.04)',
        '--surface-hover': 'rgba(255, 255, 255, 0.05)',
        '--navbar-bg':     'rgba(10, 15, 30, 0.85)',
      },
      light: {
        '--bg-main':       '#f0f6ff',
        '--accent-rose':   '#1d4ed8',
        '--accent-purple': '#3b82f6',
        '--text-primary':  '#0a1628',
        '--text-muted':    'rgba(10, 22, 40, 0.65)',
        '--text-dim':      'rgba(10, 22, 40, 0.45)',
        '--border-rose':   'rgba(29, 78, 216, 0.2)',
        '--border-purple': 'rgba(59, 130, 246, 0.25)',
        '--glow1':         'rgba(29, 78, 216, 0.12)',
        '--glow2':         'rgba(59, 130, 246, 0.1)',
        '--glow3':         'rgba(29, 78, 216, 0.06)',
        '--surface-1':     'rgba(0, 0, 0, 0.03)',
        '--surface-2':     'rgba(0, 0, 0, 0.06)',
        '--surface-hover': 'rgba(0, 0, 0, 0.08)',
        '--navbar-bg':     'rgba(240, 246, 255, 0.85)',
      }
    },
    {
      id: 'green',
      label: 'Grün',
      color: '#34d399',
      dark: {
        '--bg-main':       '#071812',
        '--accent-rose':   '#34d399',
        '--accent-purple': '#6ee7b7',
        '--text-primary':  '#eaf8f4',
        '--text-muted':    'rgba(220, 245, 235, 0.62)',
        '--text-dim':      'rgba(215, 240, 230, 0.45)',
        '--border-rose':   'rgba(52, 211, 153, 0.15)',
        '--border-purple': 'rgba(110, 231, 183, 0.35)',
        '--glow1':         'rgba(52, 211, 153, 0.45)',
        '--glow2':         'rgba(16, 185, 129, 0.38)',
        '--glow3':         'rgba(52, 211, 153, 0.22)',
        '--surface-1':     'rgba(255, 255, 255, 0.02)',
        '--surface-2':     'rgba(255, 255, 255, 0.04)',
        '--surface-hover': 'rgba(255, 255, 255, 0.05)',
        '--navbar-bg':     'rgba(7, 24, 18, 0.85)',
      },
      light: {
        '--bg-main':       '#f0fdf6',
        '--accent-rose':   '#059669',
        '--accent-purple': '#10b981',
        '--text-primary':  '#062318',
        '--text-muted':    'rgba(6, 35, 24, 0.65)',
        '--text-dim':      'rgba(6, 35, 24, 0.45)',
        '--border-rose':   'rgba(5, 150, 105, 0.2)',
        '--border-purple': 'rgba(16, 185, 129, 0.25)',
        '--glow1':         'rgba(5, 150, 105, 0.12)',
        '--glow2':         'rgba(16, 185, 129, 0.1)',
        '--glow3':         'rgba(5, 150, 105, 0.06)',
        '--surface-1':     'rgba(0, 0, 0, 0.03)',
        '--surface-2':     'rgba(0, 0, 0, 0.06)',
        '--surface-hover': 'rgba(0, 0, 0, 0.08)',
        '--navbar-bg':     'rgba(240, 253, 246, 0.85)',
      }
    },
    {
      id: 'orange',
      label: 'Orange',
      color: '#fb923c',
      dark: {
        '--bg-main':       '#130c04',
        '--accent-rose':   '#fb923c',
        '--accent-purple': '#fbbf24',
        '--text-primary':  '#fdf4ea',
        '--text-muted':    'rgba(245, 230, 210, 0.62)',
        '--text-dim':      'rgba(240, 225, 205, 0.45)',
        '--border-rose':   'rgba(251, 146, 60, 0.15)',
        '--border-purple': 'rgba(251, 191, 36, 0.35)',
        '--glow1':         'rgba(251, 146, 60, 0.45)',
        '--glow2':         'rgba(245, 158, 11, 0.38)',
        '--glow3':         'rgba(251, 146, 60, 0.22)',
        '--surface-1':     'rgba(255, 255, 255, 0.02)',
        '--surface-2':     'rgba(255, 255, 255, 0.04)',
        '--surface-hover': 'rgba(255, 255, 255, 0.05)',
        '--navbar-bg':     'rgba(19, 12, 4, 0.85)',
      },
      light: {
        '--bg-main':       '#fffbf0',
        '--accent-rose':   '#d97706',
        '--accent-purple': '#f59e0b',
        '--text-primary':  '#1c1008',
        '--text-muted':    'rgba(28, 16, 8, 0.65)',
        '--text-dim':      'rgba(28, 16, 8, 0.45)',
        '--border-rose':   'rgba(217, 119, 6, 0.2)',
        '--border-purple': 'rgba(245, 158, 11, 0.25)',
        '--glow1':         'rgba(217, 119, 6, 0.12)',
        '--glow2':         'rgba(245, 158, 11, 0.1)',
        '--glow3':         'rgba(217, 119, 6, 0.06)',
        '--surface-1':     'rgba(0, 0, 0, 0.03)',
        '--surface-2':     'rgba(0, 0, 0, 0.06)',
        '--surface-hover': 'rgba(0, 0, 0, 0.08)',
        '--navbar-bg':     'rgba(255, 251, 240, 0.85)',
      }
    },
  ];

  apply(themeId: string, mode?: 'dark' | 'light') {
    const theme = this.themes.find(t => t.id === themeId);
    if (!theme) return;

    const resolvedMode = mode ?? this.getSavedMode() ?? this.getSystemMode();
    const vars = resolvedMode === 'light' ? theme.light : theme.dark;

    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => {
      root.style.setProperty(k, v as string);
    });

    if (resolvedMode === 'light') {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }

    document.body.style.background = vars['--bg-main'];
    localStorage.setItem('theme', themeId);
    localStorage.setItem('theme-mode', resolvedMode);
  }

  toggleMode() {
    const currentMode = this.getSavedMode() ?? this.getSystemMode();
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    const themeId = this.getActiveId();
    this.apply(themeId, newMode);
  }

  getSystemMode(): 'dark' | 'light' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  getSavedMode(): 'dark' | 'light' | null {
    const saved = localStorage.getItem('theme-mode');
    return saved === 'dark' || saved === 'light' ? saved : null;
  }

  getCurrentMode(): 'dark' | 'light' {
    return this.getSavedMode() ?? this.getSystemMode();
  }

  loadSaved() {
    const themeId = localStorage.getItem('theme') ?? 'rose';
    this.apply(themeId);
  }

  getThemes() { return this.themes; }
  getActiveId(): string { return localStorage.getItem('theme') ?? 'rose'; }
}