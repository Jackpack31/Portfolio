// ─────────────────────────────────────────────────
// hobbies.ts – 3D-Druck Seite
//
// Features:
// - Übersicht: alle Projekte als Karten-Grid
// - Detail: Klick auf Karte öffnet Detailansicht
//   mit Bildergalerie, Druckeinstellungen & Original-Link
//
// Datenfluss:
//   selectedProject = null → Übersicht wird angezeigt
//   selectedProject = Project3D → Detailansicht wird angezeigt
//   activeImage → Index des aktiven Bildes in der Galerie
// ─────────────────────────────────────────────────

import { Component } from '@angular/core';

// Datenstruktur für ein 3D-Druckprojekt
interface Project3D {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  previewImage: string;       // Pfad relativ zu public/ für Übersichtskarte
  images: string[];           // Alle Bilder für Detailansicht-Galerie
  originalUrl: string;        // Link zur Original-Vorlage
  originalSource: string;     // Name der Plattform (z.B. MakerWorld)
  tags: string[];
  printSettings: {
    material: string;
    infill: string;
    time: string;
    scale: string;
  };
}

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [],
  templateUrl: './hobbies.html',
  styleUrl: './hobbies.scss'
})
export class Hobbies {

  // Aktuell geöffnetes Projekt (null = Übersicht anzeigen)
  selectedProject: Project3D | null = null;

  // Index des aktiven Bildes in der Detailansicht-Galerie
  activeImage = 0;

  // ── Projektdaten ────────────────────────────────
  // Bilder liegen in public/3d/projektX/
  projects: Project3D[] = [
    {
      id: 1,
      title: 'Mario Mahjong',
      description: 'Original von Angies Gizmos',
      category: 'Spiel',
      date: '2025-01',
      previewImage: '3d/projekt1/preview.jpg',
      images: ['3d/projekt1/preview.jpg'],
      originalUrl: 'https://makerworld.com/de/models/2207215-8-bit-mario-mahjong-complete-set',
      originalSource: 'MakerWorld',
      tags: ['PLA', 'Mario', 'Spiel'],
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '70h',
        scale: '100%'
      }
    },
    {
      id: 2,
      title: 'Fuchs',
      description: 'Original von Bedlam Threadz',
      category: 'Schattenbox',
      date: '2026-04',
      previewImage: '3d/projekt2/preview.jpg',
      images: ['3d/projekt2/preview.jpg'],
      originalUrl: 'https://makerworld.com/de/models/886239-smell-the-roses-shadowbox',
      originalSource: 'MakerWorld',
      tags: ['PLA', 'Schattenbox'],
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '5h',
        scale: '100%'
      }
    }
  ];

  // Öffnet Detailansicht und scrollt nach oben
  openProject(project: Project3D) {
    this.selectedProject = project;
    this.activeImage = 0;
    window.scrollTo(0, 0);
  }

  // Schließt Detailansicht → zurück zur Übersicht
  closeProject() {
    this.selectedProject = null;
    this.activeImage = 0;
  }

  // Wechselt aktives Bild in der Detailansicht-Galerie
  setImage(index: number) {
    this.activeImage = index;
  }
}
