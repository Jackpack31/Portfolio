import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar />
    <router-outlet />
  `
})
export class App {
  titles: Record<string, string> = {
    '/':         'Jakob Lettner – Fachinformatiker AE',
    '/skills':   'Skills – Jakob Lettner',
    '/projekte': 'Projekte – Jakob Lettner',
    '/3d-druck': '3D Druck – Jakob Lettner',
  };

  constructor(private router: Router, private theme: ThemeService) {
    // Theme beim Start laden
    this.theme.loadSaved();

    // Titel bei Navigation setzen
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        document.title = this.titles[e.url] ?? 'Jakob Lettner';
        window.scrollTo(0, 0);
      });
  }
}