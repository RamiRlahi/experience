import { Component, EventEmitter, Output, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="sidebar" [class.sidebar-open]="open || isHovered" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      <div>
        <ul class="sidebar-menu">
          <li [class.active]="activeItem === 'home'" (click)="select('home')">
            <span class="icon">🏠</span>
            <span class="label">Home</span>
          </li>
          <li [class.active]="activeItem === 'workspaces'" (click)="select('workspaces')">
            <span class="icon">🗂️</span>
            <span class="label">Workspaces</span>
          </li>
        </ul>
      </div>
      <div class="sidebar-bottom">
        <button class="settings-btn" (click)="select('settings')">
          <span class="icon">⚙️</span>
          <span class="label">Settings</span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 0;
      left: -240px;
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #f7f7f8;
      width: 240px;
      height: 100vh;
      border-right: 1px solid #e5e5e5;
      box-sizing: border-box;
      font-family: 'Inter', Arial, sans-serif;
      transition: left 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .sidebar.sidebar-open {
      left: 0;
    }
    .sidebar-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .sidebar-menu li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 24px;
      font-size: 1.08rem;
      color: #222;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 4px;
      font-weight: 500;
      transition: background 0.18s, color 0.18s;
    }
    .sidebar-menu li.active, .sidebar-menu li:hover {
      background: #eaf1ff;
      color: #2563eb;
    }
    .icon {
      font-size: 1.2rem;
      width: 24px;
      text-align: center;
    }
    .label {
      flex: 1;
      text-align: left;
    }
    .sidebar-bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 24px;
      margin-bottom: 12px;
    }
    .settings-btn {
      background: none;
      border: none;
      color: #888;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 8px 0;
      border-radius: 8px;
      font-weight: 500;
      transition: background 0.18s, color 0.18s;
    }
    .settings-btn:hover {
      background: #eaf1ff;
      color: #2563eb;
    }
  `]
})
export class SidebarComponent {
  @Input() open: boolean = false;
  activeItem: string = 'home';
  @Output() navigate = new EventEmitter<string>();
  @Output() hoverState = new EventEmitter<boolean>();
  isHovered = false;

  select(item: string) {
    this.activeItem = item;
    this.navigate.emit(item);
  }
  onMouseEnter() {
    this.isHovered = true;
    this.hoverState.emit(true);
  }
  onMouseLeave() {
    this.isHovered = false;
    this.hoverState.emit(false);
  }
} 