import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-trigger" 
         (mouseenter)="showSidebar()" 
         (mouseleave)="hideSidebar()">
    </div>
    
    <div class="sidebar-container" 
         [class.visible]="isVisible"
         (mouseenter)="showSidebar()" 
         (mouseleave)="hideSidebar()">
      
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-text">Content experience</span>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-title">Navigation</div>
          <div class="nav-item" 
               [class.active]="activeItem === 'dashboard'"
               (click)="setActive('dashboard')">
            <img src="/assets/dash.png" alt="Dashboard" class="nav-icon">
            <span class="nav-text">Dashboard</span>
          </div>
          <div class="nav-item" 
               [class.active]="activeItem === 'content'"
               (click)="setActive('content')">
            <img src="/assets/poste.png" alt="Content" class="nav-icon">
            <span class="nav-text">Content</span>
          </div>
        </div>
      </nav>
      
      <div class="sidebar-footer">
        <div class="nav-item" 
             [class.active]="activeItem === 'settings'"
             (click)="setActive('settings')">
          <img src="/assets/gear.png" alt="Settings" class="nav-icon">
          <span class="nav-text">Settings</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidebar-trigger {
      position: fixed;
      left: 0;
      top: 0;
      width: 8px;
      height: 100vh;
      z-index: 60;
      background: transparent;
      transition: background 0.3s ease;
    }
    
    .sidebar-trigger.visible {
      background: rgba(37, 99, 235, 0.1);
    }
    
    .sidebar-container {
      width: 260px;
      height: 100vh;
      background: #fff;
      border-right: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: -260px;
      top: 0;
      z-index: 150;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
      transition: left 0.3s ease;
      min-height: 100vh;
    }
    
    .sidebar-container.visible {
      left: 0;
    }
    
    .sidebar-header {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
      border-bottom: 1px solid #f1f5f9;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .logo-icon {
      font-size: 1.5rem;
    }
    
    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
    }
    
    .sidebar-nav {
      flex: 1;
      padding: 1rem 0;
      overflow-y: auto;
    }
    
    .nav-section {
      margin-bottom: 2rem;
    }
    
    .nav-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 0.75rem 1.5rem;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      margin: 0 0.5rem 0.25rem 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #64748b;
    }
    
    .nav-item:hover {
      background: #f8fafc;
      color: #1e293b;
    }
    
    .nav-item.active {
      background: #eff6ff;
      color: #2563eb;
      font-weight: 500;
    }
    
    .nav-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
    
    .nav-text {
      font-size: 0.95rem;
      font-weight: 500;
    }
    
    .sidebar-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #f1f5f9;
      background: #fafafa;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .user-details {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }
    
    .user-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1e293b;
    }
    
    .user-role {
      font-size: 0.75rem;
      color: #64748b;
    }
    
    @media (max-width: 768px) {
      .sidebar-trigger {
        display: none;
      }
      
      .sidebar-container {
        width: 100%;
        height: auto;
        position: relative;
        left: 0;
        transition: none;
      }
      
      .sidebar-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 0.5rem;
      }
      
      .nav-section {
        margin-bottom: 0;
      }
      
      .nav-title {
        display: none;
      }
      
      .nav-item {
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.5rem;
        margin: 0;
        text-align: center;
      }
      
      .nav-text {
        font-size: 0.75rem;
      }
      
      .sidebar-footer {
        display: none;
      }
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() userName: string = 'User';
  @Input() activeItem: string = 'dashboard';
  @Output() sidebarVisibilityChange = new EventEmitter<boolean>();

  isVisible = false;
  private hideTimeout: any = null;

  get userInitial(): string {
    return this.userName.charAt(0).toUpperCase();
  }

  ngOnInit(): void {
    //nwarriw el sidebar chway kbal ma tarjaa
    this.showSidebar();
    setTimeout(() => {
      this.hideSidebar();
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  showSidebar(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.isVisible = true;
    this.sidebarVisibilityChange.emit(true);
  }

  hideSidebar(): void {
    this.hideTimeout = setTimeout(() => {
      this.isVisible = false;
      this.sidebarVisibilityChange.emit(false);
    }, 300); // Small delay to prevent flickering when moving between trigger and sidebar
  }

  setActive(item: string): void {
    this.activeItem = item;
    // You can emit an event here to notify parent component
    // this.activeItemChange.emit(item);
  }
} 