import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick($event)"></div>
    <div class="modal-content">
      <h2 class="modal-title">{{ title }}</h2>
      <div class="modal-subtitle" *ngIf="subtitle">{{ subtitle }}</div>
      <ng-content></ng-content>
      <div class="modal-actions">
        <button class="modal-cancel" (click)="cancel.emit()">Cancel</button>
        <button class="modal-confirm" (click)="confirm.emit()">{{ confirmText || 'Create' }}</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.18); z-index: 1000;
    }
    .modal-content {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: #fff; border-radius: 18px; box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      padding: 2.5rem 2.5rem 1.5rem 2.5rem; min-width: 380px; max-width: 95vw; z-index: 1001;
      display: flex; flex-direction: column; align-items: stretch;
    }
    .modal-title { font-size: 1.35rem; font-weight: 700; margin-bottom: 0.3rem; color: #222; }
    .modal-subtitle { font-size: 1rem; color: #888; margin-bottom: 1.2rem; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 1.2rem; margin-top: 1.5rem; }
    .modal-cancel {
      background: #fff; color: #222; border: 1px solid #e5e5e5; border-radius: 8px;
      padding: 0.5rem 1.5rem; font-weight: 500; cursor: pointer; transition: background 0.18s;
    }
    .modal-cancel:hover { background: #f7f7f8; color: #2563eb; }
    .modal-confirm {
      background: #2563eb; color: #fff; border: none; border-radius: 8px;
      padding: 0.5rem 1.5rem; font-weight: 600; cursor: pointer; transition: background 0.18s;
    }
    .modal-confirm:hover { background: #1749b1; }
  `]
})
export class ModalComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() confirmText = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.cancel.emit();
    }
  }
}

@Component({
  selector: 'app-fab',
  template: `
    <button class="fab-btn" (click)="toggleMenu()">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#2563eb"/>
        <rect x="9" y="15" width="14" height="2" rx="1" fill="#fff"/>
        <rect x="15" y="9" width="2" height="14" rx="1" fill="#fff"/>
      </svg>
    </button>
    <div class="fab-menu" *ngIf="menuOpen">
      <button (click)="select.emit('repo')">Add Repository</button>
      <button (click)="select.emit('folder')">Add Folder</button>
      <button (click)="select.emit('file')">Add File</button>
    </div>
  `,
  styles: [`
    .fab-btn {
      position: fixed; bottom: 2.5rem; right: 2.5rem; z-index: 1200;
      background: none; border: none; outline: none; cursor: pointer;
      box-shadow: 0 4px 16px rgba(37,99,235,0.12);
      border-radius: 50%; padding: 0; width: 64px; height: 64px;
      display: flex; align-items: center; justify-content: center;
      transition: box-shadow 0.18s;
    }
    .fab-btn:hover { box-shadow: 0 8px 32px rgba(37,99,235,0.18); }
    .fab-menu {
      position: fixed; bottom: 6.5rem; right: 2.5rem; z-index: 1201;
      background: #fff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.10);
      display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 1.2rem;
      min-width: 180px;
    }
    .fab-menu button {
      background: none; border: none; color: #2563eb; font-size: 1.08rem; font-weight: 600;
      text-align: left; padding: 0.5rem 0.2rem; border-radius: 6px; cursor: pointer;
      transition: background 0.18s, color 0.18s;
    }
    .fab-menu button:hover { background: #eaf1ff; color: #1749b1; }
  `]
})
export class FabComponent {
  menuOpen = false;
  @Output() select = new EventEmitter<'repo' | 'folder' | 'file'>();
  toggleMenu() { this.menuOpen = !this.menuOpen; }
}
