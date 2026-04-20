// ─────────────────────────────────────────────────
// projects.ts – Projekte Seite
//
// Layout:
// - Links: Featured Projekt (groß, mit Bild)
// - Rechts: weitere Projekte als 2x2 Grid
//
// Datenfluss:
//   projects[] → featuredProject getter → links angezeigt
//   projects[] → otherProjects getter → rechts im Grid
//
// TODO: Placeholder durch echte Projekte ersetzen
//       sobald diese abgeschlossen sind.
// ─────────────────────────────────────────────────

import { Component } from '@angular/core';

// Datenstruktur für ein Projekt
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;          // Pfad relativ zu public/ (leer = Placeholder anzeigen)
  tags: string[];
  githubUrl: string;
  liveUrl?: string;       // Optional – nur wenn deployed
  status: 'fertig' | 'in-arbeit';
  featured: boolean;      // true = wird groß links angezeigt (nur eines!)
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {

  // ── Projektdaten ────────────────────────────────
  // featured: true → wird als Hauptprojekt links angezeigt
  // Nur ein Projekt sollte featured: true haben
  projects: Project[] = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Angular 21, animierte Canvas-Effekte, Theme-System mit Dark/Light Mode und vollständig responsivem Design.',
      image: '',
      tags: ['Angular 21', 'TypeScript', 'SCSS', 'Canvas API'],
      githubUrl: 'https://github.com/Jackpack31/Portfolio',
      liveUrl: 'https://jackpack31.github.io/Portfolio/',
      status: 'in-arbeit',
      featured: true
    },
/*     {
      id: 2,
      title: 'Placeholder 1',           // TODO: durch echtes Projekt ersetzen
      description: 'Kurze Beschreibung was dieses Projekt macht.',
      image: '',
      tags: ['Python', 'Django'],
      githubUrl: 'https://github.com/jakoblettner',
      status: 'in-arbeit',
      featured: false
    },
    {
      id: 3,
      title: 'Placeholder 2',           // TODO: durch echtes Projekt ersetzen
      description: 'Kurze Beschreibung was dieses Projekt macht.',
      image: '',
      tags: ['C#', 'Unity'],
      githubUrl: 'https://github.com/jakoblettner',
      status: 'fertig',
      featured: false
    },
    {
      id: 4,
      title: 'Placeholder 3',           // TODO: durch echtes Projekt ersetzen
      description: 'Kurze Beschreibung was dieses Projekt macht.',
      image: '',
      tags: ['HTML/CSS', 'JavaScript'],
      githubUrl: 'https://github.com/jakoblettner',
      status: 'fertig',
      featured: false
    },
    {
      id: 5,
      title: 'Placeholder 4',           // TODO: durch echtes Projekt ersetzen
      description: 'Kurze Beschreibung was dieses Projekt macht.',
      image: '',
      tags: ['SQL', 'Python'],
      githubUrl: 'https://github.com/jakoblettner',
      status: 'fertig',
      featured: false
    }, */
  ];

  // Gibt das Featured Projekt zurück (wird links groß angezeigt)
  get featuredProject(): Project | undefined {
    return this.projects.find(p => p.featured);
  }

  // Gibt alle nicht-featured Projekte zurück (Grid rechts)
  get otherProjects(): Project[] {
    return this.projects.filter(p => !p.featured);
  }
}
