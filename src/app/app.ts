// ─────────────────────────────────────────────────
// app.ts – Root Komponente
//
// Verantwortlich für:
// 1. Globale Partikel-Animation (Canvas) → läuft auf allen Seiten
// 2. Theme Picker → Dark/Light Mode + 4 Farbschemen
// 3. Dynamische Seitentitel bei Navigation
// 4. Scroll-to-top bei Seitenwechsel
//
// Datenfluss:
//   ThemeService → liefert Themes & aktuellen Modus
//   Router Events → triggern Titel-Update & Scroll
//   Theme/Mode Änderung → rebuildet Partikel
// ─────────────────────────────────────────────────

import {
  Component, OnInit, OnDestroy,
  inject, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Navbar } from './components/navbar/navbar';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy, AfterViewInit {

  // ── Canvas Referenz ─────────────────────────────
  // Partikel-Canvas liegt über dem gesamten Viewport
  @ViewChild('particleCanvas') particleCanvasRef!: ElementRef<HTMLCanvasElement>;
  private particleCtx!: CanvasRenderingContext2D;
  private particleFrame!: number;
  private particles: any[] = [];

  // ── Services ────────────────────────────────────
  private router       = inject(Router);
  private themeService = inject(ThemeService);

  // ── Theme Picker State ──────────────────────────
  themes          = this.themeService.getThemes();
  activeTheme     = this.themeService.getActiveId();
  currentMode     = this.themeService.getCurrentMode();
  showThemePicker = false;

  // ── Pulse Animation ─────────────────────────────
  // Pulsiert alle 10s bis Theme erstmals gewechselt
  isPulsing       = false;
  hasChangedTheme = false;
  private pulseInterval: any;

  // ── Seitentitel ─────────────────────────────────
  // Wird bei NavigationEnd automatisch gesetzt
  private titles: Record<string, string> = {
    '/':          'Jakob Lettner – Fachinformatiker AE',
    '/skills':    'Skills – Jakob Lettner',
    '/projekte':  'Projekte – Jakob Lettner',
    '/3d-druck':  '3D Druck – Jakob Lettner',
    '/impressum': 'Impressum – Jakob Lettner',
  };

  // ── Lifecycle ───────────────────────────────────
  ngOnInit() {
    this.themeService.loadSaved();
    this.currentMode = this.themeService.getCurrentMode();

    if (!localStorage.getItem('theme-changed')) {
      this.startPulse();
    }

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        document.title = this.titles[e.url] ?? 'Jakob Lettner';
        window.scrollTo(0, 0);
      });
  }

  ngAfterViewInit() {
  const pc = this.particleCanvasRef.nativeElement;
  this.particleCtx = pc.getContext('2d')!;
  window.addEventListener('resize', () => this.resizeCanvas());

  setTimeout(() => {
    this.resizeCanvas();
    this.buildParticles();
    this.animateParticles();
  }, 50);
}

  ngOnDestroy() {
    clearInterval(this.pulseInterval);
    cancelAnimationFrame(this.particleFrame);
  }

  // ── Canvas Resize ───────────────────────────────
  private resizeCanvas() {
    const pc = this.particleCanvasRef.nativeElement;
    pc.width  = window.innerWidth;
    pc.height = window.innerHeight;
    this.buildParticles();
  }

  // ── Partikel aufbauen ───────────────────────────
  // Dark  → Fireflies (lila) + Embers (rose)
  // Light → je nach Theme: Sakura / Bubbles / Blätter / Laub
  private buildParticles() {
    const W       = window.innerWidth;
    const H       = window.innerHeight;
    const mode    = this.themeService.getCurrentMode();
    const themeId = this.themeService.getActiveId();

    mode === 'light'
      ? this.buildLightParticles(W, H, themeId)
      : this.buildDarkParticles(W, H);
  }

  // 60 Partikel: erste 30 = Fireflies (lila), Rest = Embers (rose)
  private buildDarkParticles(W: number, H: number) {
    this.particles = Array.from({length: 60}, (_, i) => {
      const isFirefly = i < 30;
      return {
        x:           Math.random() * W,
        y:           Math.random() * H,
        speed:       isFirefly ? 0.12 + Math.random() * 0.18 : 0.15 + Math.random() * 0.25,
        wobble:      Math.random() * Math.PI * 2,
        wobbleSpeed: 0.012 + Math.random() * 0.018,
        drift:       (Math.random() - 0.5) * 0.3,
        r:           isFirefly ? 1.5 + Math.random() * 2.5 : 1.2 + Math.random() * 2.5,
        phase:       Math.random() * Math.PI * 2,
        phaseSpeed:  0.02 + Math.random() * 0.025,
        type:        isFirefly ? 'firefly' : 'ember',
        mode:        'dark'
      };
    });
  }

  // Light Partikel: Typ richtet sich nach aktivem Theme
  // blue = weniger Partikel (Blasen sind größer)
  private buildLightParticles(W: number, H: number, themeId: string) {
    const count = themeId === 'blue' ? 15 : 30;
    this.particles = Array.from({length: count}, () => ({
      x:           Math.random() * W,
      y:           Math.random() * H,
      r:           4 + Math.random() * 14,
      vy:          -(0.08 + Math.random() * 0.15),
      vx:          (Math.random() - 0.5) * 0.15,
      wobble:      Math.random() * Math.PI * 2,
      wobbleSpeed: 0.012 + Math.random() * 0.015,
      rot:         Math.random() * Math.PI * 2,
      rotSpeed:    (Math.random() - 0.5) * 0.015,
      phase:       Math.random() * Math.PI * 2,
      phaseSpeed:  0.008 + Math.random() * 0.01,
      useC1:       Math.random() > 0.4,
      type:        themeId,
      mode:        'light'
    }));
  }

  // ── Partikel Animation Loop ─────────────────────
  private animateParticles() {
    const canvas = this.particleCanvasRef.nativeElement;
    const ctx    = this.particleCtx;
    const W      = canvas.width;
    const H      = canvas.height;
    const mode   = this.themeService.getCurrentMode();
    const rose   = this.hexToRgb(this.getAccentColor());
    const purple = this.hexToRgb(this.getAccentPurple());

    ctx.clearRect(0, 0, W, H);

    this.particles.forEach(p => {
      mode === 'dark'
        ? this.drawDarkParticle(ctx, p, W, H, rose, purple)
        : this.drawLightParticle(ctx, p, W, H);
    });

    this.particleFrame = requestAnimationFrame(() => this.animateParticles());
  }

  // ── Dark Partikel Zeichnen ──────────────────────
  // firefly = lila Glow, ember = rose Glow
  private drawDarkParticle(
    ctx: CanvasRenderingContext2D,
    p: any, W: number, H: number,
    rose: string, purple: string
  ) {
    p.y      -= p.speed;
    p.phase  += p.phaseSpeed;
    p.wobble += p.wobbleSpeed;
    p.x      += Math.sin(p.wobble) * 0.4 + p.drift;

    if (p.y < -20) { p.y = H + 10; p.x = Math.random() * W; }

    const alpha = Math.max(0, 0.5 + Math.sin(p.phase) * 0.45);

    if (p.type === 'firefly') {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0,   `rgba(${purple}, ${alpha})`);
      g.addColorStop(0.4, `rgba(${purple}, ${alpha * 0.5})`);
      g.addColorStop(1,   `rgba(${purple}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(p.x - p.r * 5, p.y - p.r * 5, p.r * 10, p.r * 10);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${purple}, ${alpha})`;
      ctx.fill();
    } else {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0,   `rgba(${rose}, ${alpha})`);
      g.addColorStop(0.5, `rgba(${rose}, ${alpha * 0.5})`);
      g.addColorStop(1,   `rgba(${rose}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(p.x - p.r * 4, p.y - p.r * 4, p.r * 8, p.r * 8);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rose}, ${alpha})`;
      ctx.fill();
    }
  }

  // ── Light Partikel Zeichnen ─────────────────────
  // rose → Sakura | blue → Bubbles | green → Blätter | orange → Laub
  private drawLightParticle(
    ctx: CanvasRenderingContext2D,
    p: any, W: number, H: number
  ) {
    p.y      += p.vy;
    p.x      += p.vx;
    p.rot    += p.rotSpeed;
    p.wobble += p.wobbleSpeed;
    p.phase  += p.phaseSpeed;
    p.x      += Math.sin(p.wobble) * 0.3;

    if (p.y < -25) { p.y = H + 25; p.x = Math.random() * W; }

    const alpha = Math.max(0, 0.12 + Math.sin(p.phase) * 0.03);
    const c1    = this.hexToRgb(this.getAccentColor());
    const c2    = this.hexToRgb(this.getAccentPurple());

    switch (p.type) {
      case 'rose':   this.drawSakura(ctx, p, c1, c2, alpha); break;
      case 'blue':   this.drawBubble(ctx, p, c1, alpha);     break;
      case 'green':  this.drawLeaf(ctx, p, c1, c2, alpha);   break;
      case 'orange': this.drawMaple(ctx, p, c1, c2, alpha);  break;
    }
  }

  // ── Sakura (Rose Theme) ─────────────────────────
  private drawSakura(ctx: CanvasRenderingContext2D, p: any, c1: string, c2: string, a: number) {
    const c = p.useC1 ? c1 : c2;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    for (let i = 0; i < 5; i++) {
      ctx.save();
      ctx.rotate(i * Math.PI * 2 / 5);
      ctx.beginPath();
      ctx.ellipse(0, -p.r * 0.9, p.r * 0.38, p.r * 0.75, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c}, ${a})`;
      ctx.fill();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, p.r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${c}, ${a * 0.5})`;
    ctx.fill();
    ctx.restore();
  }

  // ── Bubble (Blue Theme) ─────────────────────────
  private drawBubble(ctx: CanvasRenderingContext2D, p: any, c: string, a: number) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${c}, ${a * 3})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    const g = ctx.createRadialGradient(
      p.x - p.r * 0.3, p.y - p.r * 0.3, 0,
      p.x, p.y, p.r
    );
    g.addColorStop(0, `rgba(255, 255, 255, ${a * 2})`);
    g.addColorStop(1, `rgba(${c}, ${a})`);
    ctx.fillStyle = g;
    ctx.fill();
  }

  // ── Leaf (Green Theme) ──────────────────────────
  private drawLeaf(ctx: CanvasRenderingContext2D, p: any, c1: string, c2: string, a: number) {
    const c = p.useC1 ? c1 : c2;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.beginPath();
    ctx.moveTo(0,  p.r * 1.2);
    ctx.bezierCurveTo( p.r * 0.7,  p.r * 0.5,  p.r * 0.7, -p.r * 0.5, 0, -p.r * 1.2);
    ctx.bezierCurveTo(-p.r * 0.7, -p.r * 0.5, -p.r * 0.7,  p.r * 0.5, 0,  p.r * 1.2);
    ctx.fillStyle = `rgba(${c}, ${a})`;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0,  p.r * 1.1);
    ctx.lineTo(0, -p.r * 1.1);
    ctx.strokeStyle = `rgba(${c}, ${a * 0.4})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();
  }

  // ── Maple (Orange Theme) ────────────────────────
  private drawMaple(ctx: CanvasRenderingContext2D, p: any, c1: string, c2: string, a: number) {
    const c = p.useC1 ? c1 : c2;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    const points = 7;
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
      const outerA = i * Math.PI * 2 / points - Math.PI / 2;
      const innerA = outerA + Math.PI / points;
      const ox = Math.cos(outerA) * p.r;
      const oy = Math.sin(outerA) * p.r;
      const ix = Math.cos(innerA) * p.r * 0.45;
      const iy = Math.sin(innerA) * p.r * 0.45;
      i === 0 ? ctx.moveTo(ox, oy) : ctx.lineTo(ox, oy);
      ctx.lineTo(ix, iy);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(${c}, ${a})`;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, p.r * 1.1);
    ctx.strokeStyle = `rgba(${c}, ${a * 0.6})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  }

  // ── CSS Variablen auslesen ──────────────────────
  private getAccentColor(): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-rose').trim() || '#ff6b85';
  }

  private getAccentPurple(): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-purple').trim() || '#c4b5fd';
  }

  private hexToRgb(hex: string): string {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r},${g},${b}`;
  }

  // ── Theme Picker ────────────────────────────────
  startPulse() {
    this.pulseInterval = setInterval(() => {
      this.isPulsing = true;
      setTimeout(() => this.isPulsing = false, 3000);
    }, 10000);
  }

  setTheme(theme: any) {
    this.themeService.apply(theme.id);
    this.activeTheme     = theme.id;
    this.currentMode     = this.themeService.getCurrentMode();
    this.showThemePicker = false;
    this.buildParticles();

    if (!this.hasChangedTheme) {
      this.hasChangedTheme = true;
      localStorage.setItem('theme-changed', 'true');
      clearInterval(this.pulseInterval);
      this.isPulsing = false;
    }
  }

  toggleMode() {
    this.themeService.toggleMode();
    this.currentMode = this.themeService.getCurrentMode();
    this.buildParticles();
  }

  onPickerClick() {
    this.showThemePicker = !this.showThemePicker;
  }

  closePickerIfOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.theme-picker')) {
      this.showThemePicker = false;
    }
  }
}
