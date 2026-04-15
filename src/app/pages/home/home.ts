import {
  Component, OnInit, OnDestroy,
  HostListener, inject
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {

  panels      = ['stack', 'erfahrung', 'stats'];
  activePanel = 0;
  private timer: any;

  skills = [
  { label: 'Angular',      type: 'hi'     },
  { label: 'TypeScript',   type: 'hi'     },
  { label: 'Python',       type: 'hi'     },
  { label: 'C#',           type: 'purple' },
  { label: 'C',            type: 'purple' },
  { label: 'Git',          type: 'purple' },
  { label: 'Blender',      type: ''       },
  { label: 'SQL',          type: ''       },
  { label: 'HTML/CSS',     type: ''       },
  { label: 'Unity',        type: ''       },
  { label: 'Unreal',       type: ''       },
  { label: 'Django',       type: ''       },
  ];

  timeline = [
    { text: 'Fachinformatiker AE · IBB 2025–heute',  active: true  },
    { text: 'Game Dev · WBH 2020–2024',              active: false },
    { text: 'Zerspanungsmechaniker · BSL 2018–2025', active: false },
    { text: 'Abitur · Mettingen 2013–2016',          active: false },
  ];

  stats = [
    { value: 'B2', label: 'Englisch',     purple: false },
  ];

  ngOnInit()    { this.startTimer(); }
  ngOnDestroy() { clearInterval(this.timer); }

  startTimer() {
    this.timer = setInterval(() => {
      this.activePanel = (this.activePanel + 1) % this.panels.length;
    }, 10000);
  }

  goTo(index: number) {
    this.activePanel = index;
    clearInterval(this.timer);
    this.startTimer();
  }
}