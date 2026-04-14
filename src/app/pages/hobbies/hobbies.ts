import { Component } from '@angular/core';

interface Project3D {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  previewImage: string;
  images: string[];
  originalUrl: string;
  originalSource: string;
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
