import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { LocalContentService } from '../../services/local-content.service';
import { Repository, Folder, FileItem } from '../../models/content.model';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
          <form (ngSubmit)="addRepository()" class="repo-form">
            <input [(ngModel)]="newRepoName" name="repoName" placeholder="New repository name" required />
            <button type="submit">Add Repo</button>
          </form>
          <ul class="repo-list">
            <li *ngFor="let repo of repositories">
              <div class="repo-name" (click)="selectRepo(repo)">
                <span [class.expanded]="repo === selectedRepo">&#9654;</span> {{ repo.name }}
                <button class="more-btn" (click)="toggleRepoOptions(repo, $event)">...</button>
                <div *ngIf="repo === repoOptionsRepo" class="repo-options">
                  <button (click)="startRenameRepo(repo, $event)">Rename</button>
                  <button (click)="deleteRepository(repo, $event)">Delete</button>
                </div>
              </div>
              <div *ngIf="repo === renamingRepo">
                <input [(ngModel)]="renameRepoName" name="renameRepoName" />
                <button (click)="confirmRenameRepo(repo)">Save</button>
                <button (click)="cancelRenameRepo()">Cancel</button>
              </div>
              <div *ngIf="repo === selectedRepo">
                <form (ngSubmit)="addFolder()" class="folder-form child-form">
                  <input [(ngModel)]="newFolderName" name="folderName" placeholder="New folder name" required />
                  <button type="submit">Add Folder</button>
                </form>
                <ul class="folder-list">
                  <li *ngFor="let folder of repo.folders">
                    <div class="folder-name" (click)="selectFolder(folder)">{{ folder.name }}
                      <button class="more-btn" (click)="toggleFolderOptions(folder, $event)">...</button>
                      <div *ngIf="folder === folderOptionsFolder" class="folder-options">
                        <button (click)="startRenameFolder(folder, $event)">Rename</button>
                        <button (click)="deleteFolder(folder, $event)">Delete</button>
                      </div>
                    </div>
                    <div *ngIf="folder === renamingFolder">
                      <input [(ngModel)]="renameFolderName" name="renameFolderName" />
                      <button (click)="confirmRenameFolder(folder)">Save</button>
                      <button (click)="cancelRenameFolder()">Cancel</button>
                    </div>
                    <div *ngIf="folder === selectedFolder">
                      <form (ngSubmit)="addFile()" class="file-form">
                        <input [(ngModel)]="newFileName" name="fileName" placeholder="File name" required />
                        <select [(ngModel)]="newFileType" name="fileType" required>
                          <option value="png">PNG</option>
                          <option value="json">JSON</option>
                          <option value="xml">XML</option>
                        </select>
                        <input *ngIf="newFileType === 'png'" type="file" (change)="onFileSelected($event)" />
                        <textarea *ngIf="newFileType !== 'png'" [(ngModel)]="newFileContent" name="fileContent" placeholder="File content"></textarea>
                        <button type="submit">Add File</button>
                      </form>
                      <ul class="file-list">
                        <li *ngFor="let file of folder.files">
                          {{ file.name }} ({{ file.type }})
                          <button (click)="deleteFile(file, $event)">Delete</button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </aside>

        <main class="dashboard-main">
          <div *ngIf="selectedFolder" class="dropzone-wrapper">
            <div class="dropzone-card"
                 (dragover)="onDragOver($event)"
                 (dragleave)="onDragLeave($event)"
                 (drop)="onFileDrop($event)"
                 [class.dragover]="isDragOver">
              <div class="plus-sign">+</div>
              <div class="dropzone-text">Drag & drop a file here to add to '{{selectedFolder.name}}'</div>
            </div>
            <div *ngIf="selectedFolder.files.length > 0" class="folder-files-list">
              <h3>Files in '{{selectedFolder.name}}'</h3>
              <ul>
                <li *ngFor="let file of selectedFolder.files">
                  <span class="file-icon">{{ fileTypeIcon(file.type) }}</span>
                  <span class="file-name">{{ file.name }}</span>
                  <span class="file-type">({{ file.type }})</span>
                  <span class="file-meta">Added by: {{ file.addedBy }} at {{ file.timestamp | date:'short' }}</span>
                  <button (click)="deleteFile(file, $event)">Delete</button>
                </li>
              </ul>
            </div>
          </div>
          <ng-container *ngIf="!selectedFolder">
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
          </ng-container>
        </main>
      </div>
    </div>
  ',
  styles: ['
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
      width: 48px; /* collapsed width */
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
      width: 360px; /* expanded width */
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
      margin-left: 48px; /* match collapsed width */
      width: 100%;
      transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .sidebar:hover ~ .dashboard-main {
      margin-left: 360px; /* match expanded width */
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
    .repo-form, .folder-form, .file-form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .repo-form input, .folder-form input, .file-form input, .repo-form select, .folder-form select {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid #4a5568;
      border-radius: 6px;
      background: #3a4651;
      color: white;
      font-size: 0.95rem;
    }
    .repo-form button, .folder-form button, .file-form button {
      background: #102542;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }
    .repo-form button:hover, .folder-form button:hover, .file-form button:hover {
      background: #1a367b;
    }
    .repo-name button, .folder-name button {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.3rem 0.7rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background-color 0.2s ease;
    }
    .repo-name button:hover, .folder-name button:hover {
      background: #c0392b;
    }
    .repo-name, .folder-name {
      position: relative;
    }
    .more-btn {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 1.2rem;
      margin-left: 0.5rem;
      cursor: pointer;
      padding: 0 0.25rem;
      box-shadow: none;
      outline: none;
      z-index: 20;
      position: relative;
    }
    .more-btn:hover, .more-btn:focus {
      color: #F87060;
      background: transparent;
      outline: none;
      box-shadow: none;
    }
    .repo-options, .folder-options {
      display: flex;
      flex-direction: column;
      background: #34405a;
      border-radius: 6px;
      position: absolute;
      z-index: 30;
      left: 0;
      top: 2.1rem;
      min-width: 120px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      padding: 0.25rem 0;
      animation: dropdown-fade-in 0.18s;
    }
    .repo-options::before, .folder-options::before {
      content: '';
      display: block;
      position: absolute;
      top: -8px;
      left: 18px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #34405a;
      z-index: 31;
    }
    .repo-options button, .folder-options button {
      background: none;
      border: none;
      color: #fff;
      padding: 0.5rem 1rem;
      text-align: left;
      cursor: pointer;
      width: 100%;
      font-size: 0.98rem;
      transition: background 0.15s;
    }
    .repo-options button:hover, .folder-options button:hover {
      background: #22304a;
    }
    @keyframes dropdown-fade-in {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .child-form {
      margin-left: 1.5rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }
    .child-form input {
      width: 120px;
      font-size: 0.9rem;
      padding: 0.25rem 0.5rem;
    }
    .child-form button {
      font-size: 0.9rem;
      padding: 0.25rem 0.75rem;
    }
    .dropzone-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      min-height: 60vh;
      padding-top: 3rem;
    }
    .dropzone-card {
      width: 340px;
      height: 220px;
      background: #22304a;
      border: 2px dashed #F87060;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: border-color 0.2s;
      margin-bottom: 2rem;
      position: relative;
    }
    .dropzone-card.dragover {
      border-color: #1abc9c;
      background: #2a3441;
    }
    .plus-sign {
      font-size: 4rem;
      color: #F87060;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .dropzone-text {
      color: #fff;
      font-size: 1.1rem;
      text-align: center;
    }
    .folder-files-list {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background: #3a4651;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .folder-files-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .folder-files-list li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 0;
      color: #fff;
      font-size: 1.1rem;
    }
    .file-meta {
      color: #b0c4de;
      font-size: 0.95rem;
      margin-left: 1rem;
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
    .folder-files-list button {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.3rem 0.7rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background-color 0.2s ease;
    }
    .folder-files-list button:hover {
      background: #c0392b;
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  repositories: Repository[] = [];
  selectedRepo: Repository | null = null;
  selectedFolder: Folder | null = null;
  selectedFiles: FileItem[] = [];

  // UI state
  newRepoName = '';
  renamingRepo: Repository | null = null;
  renameRepoName = '';
  newFolderName = '';
  renamingFolder: Folder | null = null;
  renameFolderName = '';
  newFileName = '';
  newFileType: 'png' | 'json' | 'xml' = 'json';
  newFileContent = '';
  newFileBase64 = '';

  repoOptionsRepo: Repository | null = null;
  folderOptionsFolder: Folder | null = null;
  isDragOver = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private contentService: LocalContentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadRepositories();
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.repo-options') && !target.closest('.more-btn')) {
      this.repoOptionsRepo = null;
    }
    if (!target.closest('.folder-options') && !target.closest('.more-btn')) {
      this.folderOptionsFolder = null;
    }
  }

  loadRepositories(): void {
    this.repositories = this.contentService.getRepositories();
    if (this.selectedRepo) {
      this.selectedRepo = this.repositories.find(r => r.id === this.selectedRepo!.id) || null;
    }
    if (this.selectedFolder && this.selectedRepo) {
      this.selectedFolder = this.selectedRepo.folders.find(f => f.id === this.selectedFolder!.id) || null;
      this.selectedFiles = this.selectedFolder?.files || [];
    }
  }

  // Repository methods
  addRepository(): void {
    if (!this.newRepoName.trim()) return;
    this.contentService.addRepository(this.newRepoName.trim());
    this.newRepoName = '';
    this.loadRepositories();
  }
  selectRepo(repo: Repository): void {
    this.selectedRepo = repo;
    this.selectedFolder = null;
    this.selectedFiles = [];
  }
  startRenameRepo(repo: Repository, event: Event): void {
    event.stopPropagation();
    this.renamingRepo = repo;
    this.renameRepoName = repo.name;
  }
  confirmRenameRepo(repo: Repository): void {
    if (!this.renameRepoName.trim()) return;
    this.contentService.renameRepository(repo.id, this.renameRepoName.trim());
    this.renamingRepo = null;
    this.renameRepoName = '';
    this.loadRepositories();
  }
  cancelRenameRepo(): void {
    this.renamingRepo = null;
    this.renameRepoName = '';
  }
  deleteRepository(repo: Repository, event: Event): void {
    event.stopPropagation();
    this.contentService.deleteRepository(repo.id);
    if (this.selectedRepo?.id === repo.id) {
      this.selectedRepo = null;
      this.selectedFolder = null;
      this.selectedFiles = [];
    }
    this.loadRepositories();
  }

  toggleRepoOptions(repo: Repository, event: Event): void {
    event.stopPropagation();
    this.repoOptionsRepo = this.repoOptionsRepo === repo ? null : repo;
    this.folderOptionsFolder = null;
  }

  // Folder methods
  addFolder(): void {
    if (!this.selectedRepo || !this.newFolderName.trim()) return;
    this.contentService.addFolder(this.selectedRepo.id, this.newFolderName.trim());
    this.newFolderName = '';
    this.loadRepositories();
  }
  selectFolder(folder: Folder): void {
    this.selectedFolder = folder;
    this.selectedFiles = folder.files;
  }
  startRenameFolder(folder: Folder, event: Event): void {
    event.stopPropagation();
    this.renamingFolder = folder;
    this.renameFolderName = folder.name;
  }
  confirmRenameFolder(folder: Folder): void {
    if (!this.selectedRepo || !this.renameFolderName.trim()) return;
    this.contentService.renameFolder(this.selectedRepo.id, folder.id, this.renameFolderName.trim());
    this.renamingFolder = null;
    this.renameFolderName = '';
    this.loadRepositories();
  }
  cancelRenameFolder(): void {
    this.renamingFolder = null;
    this.renameFolderName = '';
  }
  deleteFolder(folder: Folder, event: Event): void {
    event.stopPropagation();
    if (!this.selectedRepo) return;
    this.contentService.deleteFolder(this.selectedRepo.id, folder.id);
    if (this.selectedFolder?.id === folder.id) {
      this.selectedFolder = null;
      this.selectedFiles = [];
    }
    this.loadRepositories();
  }

  toggleFolderOptions(folder: Folder, event: Event): void {
    event.stopPropagation();
    this.folderOptionsFolder = this.folderOptionsFolder === folder ? null : folder;
    this.repoOptionsRepo = null;
  }

  // File methods
  addFile(): void {
    if (!this.selectedRepo || !this.selectedFolder || !this.newFileName.trim()) return;
    let content = this.newFileContent;
    if (this.newFileType === 'png') {
      content = this.newFileBase64;
    }
    const file: FileItem = {
      id: this.generateId(),
      name: this.newFileName.trim(),
      type: this.newFileType,
      content,
      addedBy: this.user?.name || this.user?.email || 'Unknown',
      timestamp: new Date().toISOString()
    };
    this.contentService.addFile(this.selectedRepo.id, this.selectedFolder.id, file);
    this.newFileName = '';
    this.newFileType = 'json';
    this.newFileContent = '';
    this.newFileBase64 = '';
    this.loadRepositories();
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newFileBase64 = e.target.result.split(',')[1]; // base64 only
      };
      reader.readAsDataURL(file);
    }
  }
  deleteFile(file: FileItem, event: Event): void {
    event.stopPropagation();
    if (!this.selectedRepo || !this.selectedFolder) return;
    this.contentService.deleteFile(this.selectedRepo.id, this.selectedFolder.id, file.id);
    this.loadRepositories();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (!event.dataTransfer || !event.dataTransfer.files.length || !this.selectedRepo || !this.selectedFolder) return;
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    let type: 'png' | 'json' | 'xml' = 'json';
    if (ext === 'png') type = 'png';
    else if (ext === 'xml') type = 'xml';
    else if (ext === 'json') type = 'json';
    const addedBy = this.user?.name || this.user?.email || 'Unknown';
    const timestamp = new Date().toISOString();
    reader.onload = (e: any) => {
      let content = '';
      if (type === 'png') {
        // Remove data URL prefix
        content = e.target.result.split(',')[1];
      } else {
        content = e.target.result;
      }
      const fileItem: FileItem = {
        id: this.generateId(),
        name: file.name,
        type,
        content,
        addedBy,
        timestamp
      } as any;
      this.contentService.addFile(this.selectedRepo!.id, this.selectedFolder!.id, fileItem);
      this.loadRepositories();
      // Optionally re-select the folder to update UI
      const repo = this.repositories.find(r => r.id === this.selectedRepo!.id);
      this.selectedFolder = repo?.folders.find(f => f.id === this.selectedFolder!.id) || null;
    };
    if (type === 'png') {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  }

  // Utility
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

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