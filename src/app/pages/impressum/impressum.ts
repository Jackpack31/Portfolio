// ─────────────────────────────────────────────────
// impressum.ts – Impressum Seite
//
// Gesetzlich vorgeschrieben nach § 5 TMG für
// öffentlich erreichbare Websites.
// Keine Logik – rein statischer Inhalt.
// ─────────────────────────────────────────────────

import { Component } from '@angular/core';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [],
  templateUrl: './impressum.html',
  styleUrl: './impressum.scss'
})
export class Impressum {}
