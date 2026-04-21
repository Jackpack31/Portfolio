// ─────────────────────────────────────────────────
// home.ts – Startseite
//
// Verantwortlich für:
// - Hero Bereich mit Name & Beschreibung
// - Desktop: Tech Stack / Erfahrung / Stats Grid
// - Mobile: Panel Slider mit Auto-Rotation alle 10s
//         + Swipe-Geste zum Wechseln
//
// Datenfluss:
//   timer → activePanel → home.html Panel Anzeige
//   touchStart/touchEnd → swipe → goTo()
// ─────────────────────────────────────────────────

import {
  Component, OnInit, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {

  // ── Mobile Panel Slider ─────────────────────────
  // Wechselt alle 10s zwischen Tech Stack / Erfahrung / Stats
  panels      = ['stack', 'erfahrung', 'stats'];
  activePanel = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  // ── Swipe Handling ──────────────────────────────
  // Minimale Pixel-Distanz damit ein Swipe erkannt wird
  private touchStartX = 0;
  private readonly SWIPE_THRESHOLD = 50;

  // ── Tech Stack ──────────────────────────────────
  // hi     = Rose hervorgehoben (Hauptskills)
  // purple = Lila hervorgehoben (Tools/Sprachen)
  // ''     = normal (weitere Skills)
  skills = [
    { label: 'Angular',    type: 'hi'     },
    { label: 'TypeScript', type: 'hi'     },
    { label: 'Python',     type: 'hi'     },
    { label: 'C#',         type: 'purple' },
    { label: 'C',          type: 'purple' },
    { label: 'Git',        type: 'purple' },
    { label: 'Blender',    type: ''       },
    { label: 'SQL',        type: ''       },
    { label: 'HTML/CSS',   type: ''       },
    { label: 'Unity',      type: ''       },
    { label: 'Unreal',     type: ''       },
    { label: 'Django',     type: ''       },
  ];

  // ── Erfahrungs-Timeline ─────────────────────────
  // active = aktueller Eintrag (Rose hervorgehoben)
  timeline = [
    { text: 'Fachinformatiker AE · IBB 2025–heute',  active: true  },
    { text: 'Game Dev · WBH 2020–2024',              active: false },
    { text: 'Zerspanungsmechaniker · BSL 2018–2025', active: false },
    { text: 'Abitur · Mettingen 2013–2016',          active: false },
  ];

  // ── Stats ───────────────────────────────────────
  // purple = Lila Akzentfarbe statt Rose
  stats = [
    { value: 'B2', label: 'Englisch', purple: false },
  ];

  // ── Lifecycle ───────────────────────────────────
  ngOnInit()    { this.startTimer(); }
  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }

  // ── Panel Slider ────────────────────────────────
  startTimer() {
    this.timer = setInterval(() => {
      this.activePanel = (this.activePanel + 1) % this.panels.length;
    }, 10000);
  }

  // Manuell zu einem Panel navigieren + Timer resetten
  goTo(index: number) {
    this.activePanel = index;
    if (this.timer) clearInterval(this.timer);
    this.startTimer();
  }

  // ── Swipe Gesten ────────────────────────────────
  // Wird in home.html an .bottom-mobile gebunden
  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - this.touchStartX;

    // Zu kurze Bewegung ignorieren
    if (Math.abs(deltaX) < this.SWIPE_THRESHOLD) return;

    if (deltaX < 0) {
      // Swipe nach links → nächstes Panel
      const next = (this.activePanel + 1) % this.panels.length;
      this.goTo(next);
    } else {
      // Swipe nach rechts → vorheriges Panel
      const prev = (this.activePanel - 1 + this.panels.length) % this.panels.length;
      this.goTo(prev);
    }
  }
}