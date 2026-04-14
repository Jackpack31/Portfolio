import { Component } from '@angular/core';

interface Project3D {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  previewImage: string;
  images: string[];
  stlFiles: { name: string; url: string }[];
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

  selectedProject: Project3D | null = null;
  activeImage = 0;

  projects: Project3D[] = [
    {
      id: 1,
      title: 'Beispielprojekt 1',
      description: 'Kurze Beschreibung des Projekts. Was wurde gedruckt und warum.',
      category: 'Werkzeug',
      date: '2024-03',
      previewImage: '3d/projekt1/preview.jpg',
      images: [
        '3d/projekt1/preview.jpg',
        '3d/projekt1/bild2.jpg',
      ],
      stlFiles: [
        { name: 'teil1.stl', url: '3d/projekt1/teil1.stl' },
      ],
      tags: ['PLA', 'funktional'],
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '3h 20min',
        scale: '100%'
      }
    },
    {
      id: 2,
      title: 'Beispielprojekt 2',
      description: 'Kurze Beschreibung des zweiten Projekts.',
      category: 'Deko',
      date: '2024-06',
      previewImage: '3d/projekt2/preview.jpg',
      images: [
        '3d/projekt2/preview.jpg',
      ],
      stlFiles: [
        { name: 'modell.stl', url: '3d/projekt2/modell.stl' },
      ],
      tags: ['PETG', 'design'],
      printSettings: {
        material: 'PETG',
        infill: '15%',
        time: '5h',
        scale: '100%'
      }
    }
  ];

  openProject(project: Project3D) {
    this.selectedProject = project;
    this.activeImage = 0;
    window.scrollTo(0, 0);
  }

  closeProject() {
    this.selectedProject = null;
    this.activeImage = 0;
  }

  setImage(index: number) {
    this.activeImage = index;
  }

  downloadStl(file: { name: string; url: string }) {
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.name;
    a.click();
  }
}
