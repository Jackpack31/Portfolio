import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {

  activeCategory = 'alle';

  categories = [
    { id: 'alle',     label: '// alle'      },
    { id: 'frontend', label: '// frontend'  },
    { id: 'backend',  label: '// backend'   },
    { id: 'tools',    label: '// tools'     },
  ];

  skills = [
    // Frontend
    { name: 'Angular',     level: 60, category: 'frontend'},
    { name: 'TypeScript',  level: 70, category: 'frontend'},
    { name: 'HTML / CSS',  level: 80, category: 'frontend'},
    // Backend
    { name: 'Python',      level: 80, category: 'backend'},
    { name: 'Django',      level: 55, category: 'backend'},
    { name: 'C#',          level: 85, category: 'backend'},
    { name: 'C',           level: 95, category: 'backend'},
    { name: 'SQL',         level: 60, category: 'backend'},
    // Tools
    { name: 'Git',         level: 80, category: 'tools'},
    { name: 'Blender',     level: 65, category: 'tools'},
    { name: 'Unity',       level: 90, category: 'tools'},
    { name: 'Unreal',      level: 75, category: 'tools'},
  ];

timeline = [
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
    parallel: true  // ← gleichzeitig mit Game Dev
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
    parallel: true  // ← gleichzeitig mit Zerspanungsmechaniker
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

  get filteredSkills() {
    if (this.activeCategory === 'alle') return this.skills;
    return this.skills.filter(s => s.category === this.activeCategory);
  }

  setCategory(id: string) {
    this.activeCategory = id;
  }
}