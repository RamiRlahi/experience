import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plus',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="plus-btn" (click)="toggleMenu()">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#2563eb"/>
        <rect x="9" y="15" width="14" height="2" rx="1" fill="#fff"/>
        <rect x="15" y="9" width="2" height="14" rx="1" fill="#fff"/>
      </svg>
    </button>
    <div class="plus-menu" *ngIf="menuOpen">
      <button (click)="select('repo')">Add Repository</button>
      <button (click)="select('folder')">Add Folder</button>
      <button (click)="select('file')">Add File</button>
    </div>
  `,
  styles: [`
    .plus-btn {
      position: fixed; bottom: 2.5rem; right: 2.5rem; z-index: 1200;
      background: none; border: none; outline: none; cursor: pointer;
      box-shadow: 0 4px 16px rgba(37,99,235,0.12);
      border-radius: 50%; padding: 0; width: 64px; height: 64px;
      display: flex; align-items: center; justify-content: center;
      transition: box-shadow 0.18s;
    }
    .plus-btn:hover { box-shadow: 0 8px 32px rgba(37,99,235,0.18); }
    .plus-menu {
      position: fixed; bottom: 6.5rem; right: 2.5rem; z-index: 1201;
      background: #fff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);
      display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 1.2rem;
      min-width: 180px;
    }
    .plus-menu button {
      background: none; border: none; color: #2563eb; font-size: 1.08rem; font-weight: 600;
      text-align: left; padding: 0.5rem 0.2rem; border-radius: 6px; cursor: pointer;
      transition: background 0.18s, color 0.18s;
    }
    .plus-menu button:hover { background: #eaf1ff; color: #1749b1; }
  `]
})
export class PlusComponent {
  menuOpen = false;
  @Output() selectType = new EventEmitter<'repo' | 'folder' | 'file'>();
  toggleMenu() { this.menuOpen = !this.menuOpen; }
  select(type: 'repo' | 'folder' | 'file') {
    this.menuOpen = false;
    this.selectType.emit(type);
  }
}
