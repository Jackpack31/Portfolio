import {
  Component, OnInit, OnDestroy,
  HostListener, ViewChild, ElementRef,
  AfterViewInit, inject
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('cursorCanvas') cursorCanvasRef!: ElementRef<HTMLCanvasElement>;

  private cursorCtx!: CanvasRenderingContext2D;
  private animFrame!: number;
  private cursorX = -999;
  private cursorY = -999;
  private glowX = -100;
  private glowY = -100;

  panels = ['stack', 'erfahrung', 'stats'];
  activePanel = 0;
  private timer: any;

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

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
  }

  ngOnInit() {
    this.startTimer();
  }

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
    this.glowX += (this.cursorX - this.glowX) * 0.1;
    this.glowY += (this.cursorY - this.glowY) * 0.1;

    const canvas = this.cursorCanvasRef.nativeElement;
    const ctx = this.cursorCtx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.cursorX > 0) {
      const color = this.hexToRgb(this.getAccentColor());

      const g1 = ctx.createRadialGradient(
        this.glowX, this.glowY, 0,
        this.glowX, this.glowY, 120
      );
      g1.addColorStop(0, `rgba(${color},0.08)`);
      g1.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const g2 = ctx.createRadialGradient(
        this.cursorX, this.cursorY, 0,
        this.cursorX, this.cursorY, 40
      );
      g2.addColorStop(0, `rgba(${color},0.15)`);
      g2.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(this.cursorX, this.cursorY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},0.8)`;
      ctx.fill();
    }

    this.animFrame = requestAnimationFrame(() => this.animateCursor());
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