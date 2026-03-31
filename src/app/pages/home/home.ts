import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {

  private themeService = inject(ThemeService);

  // Theme über Service
  themes = this.themeService.getThemes();
  activeTheme = this.themeService.getActiveId();
  showThemePicker = false;

  setTheme(theme: any) {
    this.themeService.apply(theme.id);
    this.activeTheme = theme.id;
    this.showThemePicker = false;
  }

  // Cursor
  cursorX = -300;
  cursorY = -300;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cursorX = e.clientX - 100;
    this.cursorY = e.clientY - 100;
  }

  @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.theme-picker')) {
    this.showThemePicker = false;
  }
}

  // Panels
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

  ngOnInit() { this.startTimer(); }
  ngOnDestroy() { clearInterval(this.timer); }

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