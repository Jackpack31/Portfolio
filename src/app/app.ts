import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {

  private router = inject(Router);
  private themeService = inject(ThemeService);

  themes = this.themeService.getThemes();
  activeTheme = this.themeService.getActiveId();
  currentMode = this.themeService.getCurrentMode();
  showThemePicker = false;
  isPulsing = false;
  hasChangedTheme = false;
  private pulseInterval: any;

  titles: Record<string, string> = {
    '/':          'Jakob Lettner – Fachinformatiker AE',
    '/skills':    'Skills – Jakob Lettner',
    '/projekte':  'Projekte – Jakob Lettner',
    '/3d-druck':  '3D Druck – Jakob Lettner',
  };

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

  ngOnDestroy() {
    clearInterval(this.pulseInterval);
  }

  startPulse() {
    this.pulseInterval = setInterval(() => {
      this.isPulsing = true;
      setTimeout(() => this.isPulsing = false, 3000);
    }, 10000);
  }

  setTheme(theme: any) {
    this.themeService.apply(theme.id);
    this.activeTheme = theme.id;
    this.currentMode = this.themeService.getCurrentMode();
    this.showThemePicker = false;

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