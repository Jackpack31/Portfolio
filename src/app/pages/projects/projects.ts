import { Component } from '@angular/core';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'fertig' | 'in-arbeit';
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {

  projects: Project[] = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Angular 21, animierte Canvas-Effekte, Theme-System mit Dark/Light Mode und vollständig responsivem Design.',
      image: '',
      tags: ['Angular 21', 'TypeScript', 'SCSS', 'Canvas API'],
      githubUrl: 'https://github.com/jakoblettner',
      liveUrl: 'https://jakob-lettner.de',
      status: 'in-arbeit',
      featured: true
    },
    {
      id: 2,
      title: 'Placeholder 1',
      description: 'Kurze Beschreibung was dieses Projekt macht.',
      image: '',
      tags: ['Python', 'Django'],
      githubUrl: 'https://github.com/jakoblettner',
      status: 'in-arbeit',
      featured: false
    },
    {
      id: 3,
      title: 'Placeholder 2',
      description: 'Kurze Beschreibung was dieses Projekt macht.',
      image: '',
      tags: ['C#', 'Unity'],
      githubUrl: 'https://github.com/jakoblettner',
      status: 'fertig',
      featured: false
    },
    {
      id: 4,
      title: 'Placeholder 3',
      description: 'Kurze Beschreibung was dieses Projekt macht.',
      image: '',
      tags: ['HTML/CSS', 'JavaScript'],
      githubUrl: 'https://github.com/jakoblettner',
      status: 'fertig',
      featured: false
    },
    {
      id: 5,
      title: 'Placeholder 4',
      description: 'Kurze Beschreibung was dieses Projekt macht.',
      image: '',
      tags: ['SQL', 'Python'],
      githubUrl: 'https://github.com/jakoblettner',
      status: 'fertig',
      featured: false
    },
  ];

  get featuredProject() {
    return this.projects.find(p => p.featured);
  }

  get otherProjects() {
    return this.projects.filter(p => !p.featured);
  }
}