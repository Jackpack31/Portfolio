// ─────────────────────────────────────────────────
// skills.ts – Skills & Erfahrung Seite
//
// Features:
// - Skill-Bars mit Kategorie-Filter (alle/frontend/backend/tools)
// - Timeline mit Bildung & Berufserfahrung
//   parallel: true = zeitgleiche Einträge visuell eingerückt
//
// Datenfluss:
//   activeCategory → filteredSkills getter → skills.html Grid
//   timeline[] → direkt in skills.html gerendert
// ─────────────────────────────────────────────────

import { Component } from '@angular/core';

// Datenstruktur für einen Skill
interface Skill {
  name: string;
  level: number;    // 0–100 für Skill-Bar Breite in %
  category: string; // frontend | backend | tools
}

// Datenstruktur für einen Timeline-Eintrag
interface TimelineItem {
  type: 'education' | 'work'; // Bestimmt Dot-Farbe (rose/purple)
  title: string;
  place: string;
  period: string;
  url: string;                // Link zur Institution/Firma
  points: string[];           // Aufzählungspunkte
  active: boolean;            // true = aktueller Eintrag (Rose hervorgehoben)
  parallel: boolean;          // true = zeitgleich mit vorherigem → eingerückt mit Lila Linie
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {

  // Aktive Filterkategorie (default: alle)
  activeCategory = 'alle';

  // ── Filter Kategorien ───────────────────────────
  categories = [
    { id: 'alle',     label: '// alle'     },
    { id: 'frontend', label: '// frontend' },
    { id: 'backend',  label: '// backend'  },
    { id: 'tools',    label: '// tools'    },
  ];

  // ── Skills ──────────────────────────────────────
  // level = Prozentwert für die Skill-Bar Breite (CSS width%)
  skills: Skill[] = [
    // Frontend
    { name: 'Angular',    level: 60, category: 'frontend' },
    { name: 'TypeScript', level: 70, category: 'frontend' },
    { name: 'HTML / CSS', level: 80, category: 'frontend' },
    // Backend
    { name: 'Python',     level: 80, category: 'backend'  },
    { name: 'Django',     level: 55, category: 'backend'  },
    { name: 'C#',         level: 85, category: 'backend'  },
    { name: 'C',          level: 95, category: 'backend'  },
    { name: 'SQL',        level: 60, category: 'backend'  },
    // Tools
    { name: 'Git',        level: 80, category: 'tools'    },
    { name: 'Blender',    level: 65, category: 'tools'    },
    { name: 'Unity',      level: 90, category: 'tools'    },
    { name: 'Unreal',     level: 75, category: 'tools'    },
  ];

  // ── Timeline ────────────────────────────────────
  // parallel: true = zeitgleich mit vorherigem Eintrag
  // → wird visuell eingerückt mit Lila Linie dargestellt
  timeline: TimelineItem[] = [
    {
      type: 'education',
      title: 'Fachinformatiker: Anwendungsentwicklung',
      place: 'IBB Münster',
      period: '08/2025 – heute',
      url: 'https://www.ibb.com/standort/ibb-muenster',
      points: [
        'Objektorientierte Programmierung & Softwareentwicklung',
        'Java, C#, JavaScript, Python',
        'Webentwicklung mit HTML, CSS & Angular',
        'Datenbanken, SQL & agile Methoden (Scrum, Kanban)',
        'Versionsverwaltung mit Git',
      ],
      active: true,
      parallel: false
    },
    {
      type: 'work',
      title: 'Zerspanungsmechaniker',
      place: 'BSL Technology GmbH, Lengerich',
      period: '10/2018 – 07/2025',
      url: 'https://www.bsl-technology.de',
      points: [
        'Einrichtung & Programmierung von CNC-Maschinen',
        'Fertigung von Präzisionsteilen nach technischen Zeichnungen',
        'Qualitätskontrolle & Messungen',
        'Wartung und Reparatur der Produktionsanlagen',
      ],
      active: false,
      parallel: true  // zeitgleich mit Game Development
    },
    {
      type: 'education',
      title: 'Game Development',
      place: 'Wilhelm Büchner Hochschule, Darmstadt',
      period: '07/2020 – 08/2024',
      url: 'https://www.wb-fernstudium.de',
      points: [
        'Programmierung, Datenbanken & Softwarearchitektur',
        '3D-Entwicklung & Projektorganisation',
        'Fernstudium neben Vollzeitbeschäftigung',
      ],
      active: false,
      parallel: true  // zeitgleich mit Zerspanungsmechaniker
    },
    {
      type: 'education',
      title: 'Allgemeine Hochschulreife',
      place: 'Comenius-Kolleg, Mettingen',
      period: '09/2013 – 12/2016',
      url: 'https://www.comenius-kolleg.de',
      points: [],
      active: false,
      parallel: false
    },
  ];

  // Gibt gefilterte Skills zurück – aufgerufen von skills.html
  get filteredSkills(): Skill[] {
    if (this.activeCategory === 'alle') return this.skills;
    return this.skills.filter(s => s.category === this.activeCategory);
  }

  setCategory(id: string) {
    this.activeCategory = id;
  }
}
