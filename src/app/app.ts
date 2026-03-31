import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { filter } from 'rxjs/operators';

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

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        document.title = this.titles[e.url] ?? 'Jakob Lettner';
      });
  }
}