// ─────────────────────────────────────────────────
// navbar.ts – Navigationsleiste
//
// Features:
// - Desktop: horizontale Links mit Active-Highlight
// - Mobile (<691px): Burger-Menü mit Dropdown
// - Klick außerhalb schließt das Menü automatisch
//
// Datenfluss:
//   links[] → wird in navbar.html gerendert
//   RouterLinkActive → setzt .active CSS-Klasse
// ─────────────────────────────────────────────────

import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  // Steuert ob das mobile Menü offen ist
  menuOpen = false;

  // Navigationspunkte – path muss mit app.routes.ts übereinstimmen
  links = [
    { label: 'über_mich',  path: '/'          },
    { label: 'skills',     path: '/skills'    },
    { label: 'projekte',   path: '/projekte'  },
    { label: '3d_druck',   path: '/3d-druck'  },
    { label: 'impressum',  path: '/impressum' },
  ];

  // Schließt Menü bei Klick außerhalb der Navbar
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav')) {
      this.menuOpen = false;
    }
  }

  toggleMenu()  { this.menuOpen = !this.menuOpen; }
  closeMenu()   { this.menuOpen = false; }
}
