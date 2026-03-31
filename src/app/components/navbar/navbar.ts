import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  menuOpen = false;

  links = [
    { label: 'über_mich',  path: '/'         },
    { label: 'skills',     path: '/skills'   },
    { label: 'projekte',   path: '/projekte' },
    { label: '3d_druck',   path: '/3d-druck' },
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}