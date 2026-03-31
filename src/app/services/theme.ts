import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

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

  apply(themeId: string) {
    const theme = this.themes.find(t => t.id === themeId);
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([k, v]) => {
      root.style.setProperty(k, v as string);
    });
    localStorage.setItem('theme', themeId);
  }

  loadSaved() {
    const saved = localStorage.getItem('theme') ?? 'rose';
    this.apply(saved);
  }

  getThemes() {
    return this.themes;
  }

  getActiveId(): string {
    return localStorage.getItem('theme') ?? 'rose';
  }
}