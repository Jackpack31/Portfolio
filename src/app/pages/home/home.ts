// ─────────────────────────────────────────────────
// home.ts – Startseite
//
// Verantwortlich für:
// - Hero Bereich mit Name & Beschreibung
// - Cursor Glow-Dot Canvas Effekt
// - Desktop: Tech Stack / Erfahrung / Stats Grid
// - Mobile: Panel Slider mit Auto-Rotation alle 10s
//
// Datenfluss:
//   MouseEvent → cursorX/Y → animateCursor() → Canvas
//   timer → activePanel → home.html Panel Anzeige
// ─────────────────────────────────────────────────

import {
  Component, OnInit, OnDestroy, AfterViewInit,
  HostListener, ViewChild, ElementRef
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy, AfterViewInit {

  // ── Cursor Canvas ───────────────────────────────
  // Zeichnet den Glow-Dot der der Maus mit Lag-Effekt folgt
  @ViewChild('cursorCanvas') cursorCanvasRef!: ElementRef<HTMLCanvasElement>;
  private cursorCtx!: CanvasRenderingContext2D;
  private animFrame!: number;
  private cursorX = -999;
  private cursorY = -999;
  private glowX   = -100;
  private glowY   = -100;

  // ── Mobile Panel Slider ─────────────────────────
  // Wechselt alle 10s zwischen Tech Stack / Erfahrung / Stats
  panels      = ['stack', 'erfahrung', 'stats'];
  activePanel = 0;
  private timer: any;

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

  ngAfterViewInit() {
    const canvas = this.cursorCanvasRef.nativeElement;
    this.cursorCtx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.animateCursor();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    cancelAnimationFrame(this.animFrame);
  }

  // ── Cursor ──────────────────────────────────────
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
  }

  private resizeCanvas() {
    const canvas = this.cursorCanvasRef.nativeElement;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private getAccentColor(): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-rose').trim() || '#ff6b85';
  }

  private hexToRgb(hex: string): string {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r},${g},${b}`;
  }

  private animateCursor() {
    // Sanftes Nachziehen: Glow folgt Maus mit Lag (0.1 = 10% Annäherung/Frame)
    this.glowX += (this.cursorX - this.glowX) * 0.1;
    this.glowY += (this.cursorY - this.glowY) * 0.1;

    const canvas = this.cursorCanvasRef.nativeElement;
    const ctx    = this.cursorCtx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.cursorX > 0) {
      const color = this.hexToRgb(this.getAccentColor());

      // Äußerer weicher Glow (folgt langsam der Maus)
      const g1 = ctx.createRadialGradient(
        this.glowX, this.glowY, 0,
        this.glowX, this.glowY, 120
      );
      g1.addColorStop(0, `rgba(${color}, 0.08)`);
      g1.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Innerer schärferer Glow (direkt an Mausposition)
      const g2 = ctx.createRadialGradient(
        this.cursorX, this.cursorY, 0,
        this.cursorX, this.cursorY, 40
      );
      g2.addColorStop(0, `rgba(${color}, 0.15)`);
      g2.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Kleiner Dot an Mausposition
      ctx.beginPath();
      ctx.arc(this.cursorX, this.cursorY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, 0.8)`;
      ctx.fill();
    }

    this.animFrame = requestAnimationFrame(() => this.animateCursor());
  }

  // ── Panel Slider ────────────────────────────────
  startTimer() {
    this.timer = setInterval(() => {
      this.activePanel = (this.activePanel + 1) % this.panels.length;
    }, 10000);
  }

  // Manuell zu einem Panel navigieren + Timer resetten
  goTo(index: number) {
    this.activePanel = index;
    clearInterval(this.timer);
    this.startTimer();
  }
}
