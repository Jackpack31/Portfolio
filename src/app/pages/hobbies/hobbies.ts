// ─────────────────────────────────────────────────
// hobbies.ts – 3D-Druck Seite
//
// Features:
// - Übersicht: alle Projekte als Karten-Grid
// - Detail: Klick auf Karte öffnet Detailansicht
//   mit Bildergalerie, Druckeinstellungen & Original-Link
// - 3D Viewer: optionales Modal mit Three.js
//   → Button nur sichtbar wenn modelFile gesetzt ist
//
// Datenfluss:
//   selectedProject = null     → Übersicht angezeigt
//   selectedProject = Project3D → Detailansicht angezeigt
//   show3DViewer = true         → Three.js Modal geöffnet
//   activeImage                 → aktives Bild in Galerie
// ─────────────────────────────────────────────────

import { Component, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';


// Datenstruktur für ein 3D-Druckprojekt
interface Project3D {
  id: number;
  title: string;
  description: string;
  category: string[];
  date: string;
  previewImage: string;       // Pfad relativ zu public/ für Übersichtskarte
  images: string[];           // Alle Bilder für Detailansicht-Galerie
  originalUrl: string;        // Link zur Original-Vorlage
  originalSource: string;     // Name der Plattform (z.B. MakerWorld)
  tags: string[];
  modelFile?: string;         // Optional: Pfad zu STL/3MF Datei → zeigt 3D Viewer Button
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
  imports: [UpperCasePipe],
  templateUrl: './hobbies.html',
  styleUrl: './hobbies.scss'
})
export class Hobbies implements OnDestroy {

  // Aktuell geöffnetes Projekt (null = Übersicht anzeigen)
  selectedProject: Project3D | null = null;

  // Index des aktiven Bildes in der Detailansicht-Galerie
  activeImage = 0;

  // Steuert ob das 3D Viewer Modal offen ist
  show3DViewer = false;

  // Three.js Objekte – werden beim Schließen des Modals aufgeräumt
  private threeRenderer: any = null;
  private threeAnimFrame: any = null;

  // ── Projektdaten ────────────────────────────────
  // Bilder liegen in public/3d/projektX/
  projects: Project3D[] = [
    {
      id: 1,
      title: 'Mario Mahjong',
      description: 'Original von Angies Gizmos',
      category: ['Spiel', 'Mario'],
      date: '2026-02',
      previewImage: '3d/projekt1/preview.png',
      images: ['3d/projekt1/preview.png', '3d/projekt1/bild2.png'],
      originalUrl: 'https://makerworld.com/de/models/2207215-8-bit-mario-mahjong-complete-set',
      originalSource: 'MakerWorld',
      tags: ['PLA', 'Mario', 'Spiel'],
      // modelFile: '3d/projekt1/model.stl',
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '93h',
        scale: '100%'
      }
    },
    {
      id: 2,
      title: 'Super Mario Star',
      description: 'Original von McG3D Designs',
      category: ['Deko', 'Mario'],
      date: '2025-10',
      previewImage: '3d/projekt2/preview.png',
      images: ['3d/projekt2/preview.png', '3d/projekt2/bild2.png', '3d/projekt2/bild3.png'],
      originalUrl: 'https://makerworld.com/de/models/1327915-cute-knitted-super-mario-super-star',
      originalSource: 'MakerWorld',
      tags: ['PLA', 'deko', 'Mario'],
      // modelFile: '3d/projekt1/model.stl',
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '4h',
        scale: '100%'
      }
    },
    {
      id: 3,
      title: 'Teehaus',
      description: 'Original von 3DMerchandMore',
      category: ['Deko', 'Küche'],
      date: '2026-01',
      previewImage: '3d/projekt3/preview.png',
      images: ['3d/projekt3/preview.png', '3d/projekt3/bild2.png'],
      originalUrl: 'https://makerworld.com/de/models/1949697-tea-organizer-rotating-japanese-tea-dispenser',
      originalSource: 'MakerWorld',
      tags: ['PLA', 'Deko', 'Küche'],
      // modelFile: '3d/projekt1/model.stl',
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '13h',
        scale: '100%'
      }
    },
    {
      id: 4,
      title: 'Snowman',
      description: 'Original von Maxx Design',
      category: ['Deko', 'Weihnachten'],
      date: '2025-10',
      previewImage: '3d/projekt4/preview.png',
      images: ['3d/projekt4/preview.png', '3d/projekt4/bild2.png'],
      originalUrl: 'https://makerworld.com/de/models/1966269-christmas-snowman-tea-light',
      originalSource: 'MakerWorld',
      tags: ['PLA', 'Deko', 'Weihnachten'],
      // modelFile: '3d/projekt1/model.stl',
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '12h',
        scale: '100%'
      }
    },
    {
      id: 5,
      title: 'Treasure Chest',
      description: 'Original von Grisy Studio',
      category: ['Deko'],
      date: '2026-01',
      previewImage: '3d/projekt5/preview.png',
      images: ['3d/projekt5/preview.png', '3d/projekt5/bild2.png', '3d/projekt5/bild3.png'],
      originalUrl: 'https://makerworld.com/de/models/1650790-world-of-warcraft-fan-made-chest',
      originalSource: 'MakerWorld',
      tags: ['PLA', 'Deko'],
      // modelFile: '3d/projekt1/model.stl',
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '8h',
        scale: '100%'
      }
    },
    {
      id: 6,
      title: 'Pinguin',
      description: 'Original von mika',
      category: ['Deko', 'Weihnachten'],
      date: '2025-11',
      previewImage: '3d/projekt6/preview.png',
      images: ['3d/projekt6/preview.png', '3d/projekt6/bild2.png'],
      originalUrl: 'https://makerworld.com/de/models/2019531-christmas-penguin-multipart-no-ams',
      originalSource: 'MakerWorld',
      tags: ['PLA', 'Deko', 'Weihnachten'],
      // modelFile: '3d/projekt1/model.stl',
      printSettings: {
        material: 'PLA',
        infill: '20%',
        time: '4h',
        scale: '100%'
      }
    }
  ];

  // ── Navigation ──────────────────────────────────

  // Öffnet Detailansicht und scrollt nach oben
  openProject(project: Project3D) {
    this.selectedProject = project;
    this.activeImage = 0;
    window.scrollTo(0, 0);
  }

  // Schließt Detailansicht → zurück zur Übersicht
  closeProject() {
    this.close3DViewer();
    this.selectedProject = null;
    this.activeImage = 0;
  }

  // Wechselt aktives Bild in der Detailansicht-Galerie
  setImage(index: number) {
    this.activeImage = index;
  }

  // ── 3D Viewer ───────────────────────────────────

  // Öffnet Modal und initialisiert Three.js nach kurzer Verzögerung
  // (Verzögerung damit der DOM-Canvas erst gerendert ist)
  open3DViewer() {
    this.show3DViewer = true;
    setTimeout(() => this.init3DViewer(), 100);
  }

  // Schließt Modal und räumt Three.js Ressourcen auf
  close3DViewer() {
    this.show3DViewer = false;
    if (this.threeAnimFrame) {
      cancelAnimationFrame(this.threeAnimFrame);
      this.threeAnimFrame = null;
    }
    if (this.threeRenderer) {
      this.threeRenderer.dispose();
      this.threeRenderer = null;
    }
  }

  // Schließt Modal bei Klick auf Overlay (außerhalb des Modals)
  onOverlayClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('viewer-overlay')) {
      this.close3DViewer();
    }
  }

  // Initialisiert Three.js Scene + Loader + OrbitControls
  private init3DViewer() {
    const canvas = document.getElementById('three-canvas') as HTMLCanvasElement;
    if (!canvas || !this.selectedProject?.modelFile) return;

    // Three.js wird via CDN geladen (index.html script tag)
    const THREE = (window as any).THREE;
    if (!THREE) {
      console.error('Three.js nicht geladen');
      return;
    }

    // Scene Setup
    const scene    = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0a18);

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.threeRenderer = renderer;

    // Beleuchtung
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xff6b85, 1.2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xc4b5fd, 0.8);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Datei-Extension bestimmen welcher Loader genutzt wird
    const file = this.selectedProject.modelFile;
    const ext  = file!.split('.').pop()?.toLowerCase();

    const onLoad = (geometry: any) => {
      // Geometrie zentrieren
      geometry.computeBoundingBox();
      geometry.center();
      const box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      camera.position.set(0, 0, maxDim * 2);

      const material = new THREE.MeshPhongMaterial({
        color: 0xff6b85,
        specular: 0xc4b5fd,
        shininess: 40,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Einfache OrbitControls via Maus
      let isDragging = false;
      let prevMouse  = { x: 0, y: 0 };

      canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      canvas.addEventListener('mouseup',   () => isDragging = false);
      canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        mesh.rotation.y += dx * 0.01;
        mesh.rotation.x += dy * 0.01;
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      canvas.addEventListener('wheel', (e) => {
        camera.position.z += e.deltaY * 0.005;
        camera.position.z = Math.max(0.5, Math.min(camera.position.z, maxDim * 5));
      });
    };

    // STL laden
    if (ext === 'stl') {
      const { STLLoader } = (window as any).THREE_STL ?? {};
      if (!STLLoader) { console.error('STLLoader nicht verfügbar'); return; }
      const loader = new STLLoader();
      loader.load(file!, onLoad);
    }

    // 3MF laden
    if (ext === '3mf') {
      const { ThreeMFLoader } = (window as any).THREE_3MF ?? {};
      if (!ThreeMFLoader) { console.error('3MFLoader nicht verfügbar'); return; }
      const loader = new ThreeMFLoader();
      loader.load(file!, (obj: any) => {
        obj.traverse((child: any) => {
          if (child.isMesh) onLoad(child.geometry);
        });
      });
    }

    // Render Loop
    const animate = () => {
      this.threeAnimFrame = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }

  ngOnDestroy() {
    this.close3DViewer();
  }
}
