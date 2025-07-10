import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { LocalContentService } from '../../services/local-content.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div class="header-content">
          <h1>Dashboard</h1>
          <div class="user-menu">
            <div class="user-info">
              <span class="user-name">{{ user?.name }}</span>
              <span class="user-email">{{ user?.email }}</span>
            </div>
            <button class="logout-btn" (click)="logout()">Logout</button>
          </div>
        </div>
      </header>

      <div class="dashboard-body">
        <aside class="sidebar">
          <h2>Repositories</h2>
          <ul class="repo-list">
            <li *ngFor="let repo of repositories">
              <div class="repo-name" (click)="selectRepo(repo)">
                <span [class.expanded]="repo.expanded">&#9654;</span> {{ repo.name }}
              </div>
              <ul class="folder-list" *ngIf="repo.expanded">
                <li *ngFor="let folder of repo.folders">
                  <div class="folder-name" (click)="selectFolder(folder)">{{ folder.name }}</div>
                  <ul class="file-list" *ngIf="folder.expanded">
                    <li *ngFor="let file of folder.files">
                      {{ file.name }}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </aside>

        <main class="dashboard-main">
          <div class="welcome-section">
            <h2>Welcome back, {{ user?.name }}!</h2>
            <p>You have successfully logged in to your account.</p>
          </div>
          <div *ngIf="selectedFiles.length > 0" class="files-section">
            <h3>Files</h3>
            <ul class="selected-files-list">
              <li *ngFor="let file of selectedFiles">
                <span class="file-icon">{{ fileTypeIcon(file.type) }}</span>
                <span class="file-name">{{ file.name }}</span>
                <span class="file-type">({{ file.type }})</span>
              </li>
            </ul>
          </div>
          <div class="dashboard-grid" *ngIf="selectedFiles.length === 0">
            <div class="dashboard-card">
              <div class="card-icon">👤</div>
              <h3>Profile</h3>
              <p>Manage your account settings and personal information</p>
              <button class="card-button" (click)="goToProfile()">View Profile</button>
            </div>

            <div class="dashboard-card">
              <div class="card-icon">📊</div>
              <h3>Analytics</h3>
              <p>View your activity and usage statistics</p>
              <button class="card-button">View Analytics</button>
            </div>

            <div class="dashboard-card">
              <div class="card-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Configure your preferences and account settings</p>
              <button class="card-button">Open Settings</button>
            </div>

            <div class="dashboard-card">
              <div class="card-icon">💬</div>
              <h3>Support</h3>
              <p>Get help and contact our support team</p>
              <button class="card-button">Contact Support</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: #2a3441;
      display: flex;
      flex-direction: column;
    }
    .dashboard-body {
      display: flex;
      flex-direction: row;
      width: 100%;
      min-height: 0;
      position: relative;
    }
    .sidebar {
      width: 32px;
      background: #22304a;
      color: #fff;
      border-radius: 0 12px 12px 0;
      margin-right: 2rem;
      padding: 1.5rem 0.2rem;
      min-height: 100vh;
      height: 100vh;
      position: fixed;
      top: 72px; /* Height of the header, adjust if needed */
      left: 0;
      z-index: 100;
      box-shadow: 2px 0 12px rgba(0,0,0,0.08);
      transition: width 0.3s cubic-bezier(0.4,0,0.2,1), padding 0.3s cubic-bezier(0.4,0,0.2,1);
      overflow-x: hidden;
      cursor: pointer;
    }
    .sidebar:hover {
      width: 260px;
      padding: 1.5rem 1rem;
      cursor: default;
    }
    .sidebar * {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
    .sidebar:hover * {
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.2s 0.1s;
    }
    .sidebar h2 {
      opacity: 0;
      transition: opacity 0.2s;
    }
    .sidebar:hover h2 {
      opacity: 1;
      transition: opacity 0.2s 0.1s;
    }
    .repo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .repo-name {
      cursor: pointer;
      font-weight: 600;
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .repo-name span {
      display: inline-block;
      transition: transform 0.2s;
    }
    .repo-name span.expanded {
      transform: rotate(90deg);
    }
    .folder-list {
      list-style: none;
      padding-left: 1.5rem;
      margin: 0.25rem 0 0.5rem 0;
    }
    .folder-list li {
      font-size: 0.98rem;
      margin-bottom: 0.15rem;
      color: #b0c4de;
    }
    @media (max-width: 900px) {
      .dashboard-body {
        flex-direction: column;
      }
      .sidebar {
        position: static;
        width: 100%;
        height: auto;
        border-radius: 12px;
        margin-right: 0;
        margin-bottom: 2rem;
      }
      .dashboard-main {
        margin-left: 0;
      }
    }
    .dashboard-header {
      background: #102542;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
      position: relative;
      z-index: 200;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dashboard-header h1 {
      margin: 0;
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .user-name {
      font-weight: 600;
      color: white;
    }

    .user-email {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .logout-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .logout-btn:hover {
      background: #c0392b;
    }

    .dashboard-main {
      margin-left: 32px;
      width: 100%;
      transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .sidebar:hover ~ .dashboard-main {
      margin-left: 260px;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 3rem;
    }

    .welcome-section h2 {
      color: white;
      font-size: 2rem;
      margin: 0 0 0.5rem 0;
    }

    .welcome-section p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1rem;
      margin: 0;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .dashboard-card {
      background: #3a4651;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .dashboard-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .card-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .dashboard-card h3 {
      color: white;
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }

    .dashboard-card p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }

    .card-button {
      background: linear-gradient(135deg, #102542 0%, #F87060 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s ease;
      width: 100%;
    }

    .card-button:hover {
      transform: translateY(-1px);
    }

    .stats-section {
      background: #3a4651;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .stats-section h3 {
      color: white;
      margin: 0 0 1.5rem 0;
      text-align: center;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: #2a3441;
      border-radius: 8px;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #102542;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }

      .user-menu {
        flex-direction: column;
        gap: 0.5rem;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      }
    }
    .files-section {
      background: #3a4651;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }
    .selected-files-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .selected-files-list li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 0;
      color: #fff;
      font-size: 1.1rem;
    }
    .file-icon {
      font-size: 1.5rem;
    }
    .file-name {
      font-weight: 500;
    }
    .file-type {
      color: #b0c4de;
      font-size: 0.95rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;

  repositories = [
    {
      name: 'repo 1',
      folders: [
        { name: '1', files: [
          { name: 'fileA.txt', type: 'text' },
          { name: 'fileB.js', type: 'js' }
        ], expanded: false },
        { name: '2', files: [
          { name: 'fileC.png', type: 'image' },
          { name: 'fileD.md', type: 'markdown' }
        ], expanded: false },
        { name: '3', files: [
          { name: 'fileE.pdf', type: 'pdf' },
          { name: 'fileF.docx', type: 'doc' }
        ], expanded: false }
      ],
      expanded: false
    },
    {
      name: 'repo 2',
      folders: [
        { name: '4', files: [
          { name: 'fileG.txt', type: 'text' },
          { name: 'fileH.js', type: 'js' }
        ], expanded: false },
        { name: '5', files: [
          { name: 'fileI.png', type: 'image' },
          { name: 'fileJ.md', type: 'markdown' }
        ], expanded: false },
        { name: '6', files: [
          { name: 'fileK.pdf', type: 'pdf' },
          { name: 'fileL.docx', type: 'doc' }
        ], expanded: false }
      ],
      expanded: false
    },
    {
      name: 'repo 3',
      folders: [
        { name: '7', files: [
          { name: 'fileM.txt', type: 'text' },
          { name: 'fileN.js', type: 'js' }
        ], expanded: false },
        { name: '8', files: [
          { name: 'fileO.png', type: 'image' },
          { name: 'fileP.md', type: 'markdown' }
        ], expanded: false },
        { name: '9', files: [
          { name: 'fileQ.pdf', type: 'pdf' },
          { name: 'fileR.docx', type: 'doc' }
        ], expanded: false }
      ],
      expanded: false
    }
  ];

  selectedFiles: Array<{ name: string, type: string }> = [];

  fileTypeIcon(type: string): string {
    switch(type) {
      case 'text': return '📄';
      case 'js': return '🟨';
      case 'image': return '🖼️';
      case 'markdown': return '📝';
      case 'pdf': return '📕';
      case 'doc': return '📄';
      default: return '📁';
    }
  }

  selectRepo(repo: any): void {
    this.selectedFiles = [];
    repo.expanded = !repo.expanded;
    if (repo.expanded) {
      // Show all files in all folders of this repo
      this.selectedFiles = repo.folders.flatMap((folder: any) => folder.files);
    }
  }

  selectFolder(folder: any): void {
    this.selectedFiles = [];
    folder.expanded = !folder.expanded;
    if (folder.expanded) {
      this.selectedFiles = folder.files;
    }
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private contentService: LocalContentService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    // Example: Load all content items
    // this.contentItems = this.contentService.getAll();
  }

  // Example methods for content CRUD
  addContentItem(item: { id: string, name: string, type: string }) {
    this.contentService.add(item);
    // Optionally reload contentItems
  }

  updateContentItem(id: string, newItem: { id: string, name: string, type: string }) {
    this.contentService.update(id, newItem);
    // Optionally reload contentItems
  }

  deleteContentItem(id: string) {
    this.contentService.delete(id);
    // Optionally reload contentItems
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  getDaysRegistered(): number {
    if (!this.user?.createdAt) return 0;
    const createdDate = new Date(this.user.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getRandomStat(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
}