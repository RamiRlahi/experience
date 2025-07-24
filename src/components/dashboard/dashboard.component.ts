import { Component, OnInit,EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { LocalContentService } from '../../services/local-content.service';
import { Repository, Folder, FileItem } from '../../models/content.model';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PlusComponent } from '../reusable/+.component';
import { WorkspacesComponent } from '../workspaces/workspaces.component';
import { ContentApiService } from '../../services/content-api.service';

// Interface for repository creation payload (matches OpenAPI, not frontend Repository)
interface RepositoryCreate {
  repositoryId: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, PlusComponent, WorkspacesComponent],
  template: `
    <div class="dashboard-container">
      <div class="sidebar-hover-zone" (mouseenter)="sidebarOpen = true"></div>
      <div class="dashboard-body" [ngStyle]="{ 'margin-left': sidebarOpen ? '240px' : '0', 'transition': 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)' }">
        <app-sidebar [open]="sidebarOpen" (navigate)="onSidebarNavigate($event)" (hoverState)="sidebarOpen = $event"></app-sidebar>
        <main class="dashboard-main">
          <div class="dashboard-content">
            <ng-container *ngIf="currentView === 'home'">
              <div class="dashboard-section-label">Folders</div>
              <div class="dashboard-folders-grid">
                <div class="dashboard-folder-card" *ngFor="let folder of getAllFoldersWithPath()">
                  <span class="dashboard-folder-icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="7" width="24" height="15" rx="3" fill="#eaf1ff"/>
                      <path d="M2 10a3 3 0 0 1 3-3h5.5a2 2 0 0 0 1.6-.8l.9-1.2A2 2 0 0 1 15.5 4H23a3 3 0 0 1 3 3v2" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <div class="dashboard-folder-info">
                    <div class="dashboard-folder-name">{{ folder.name }}</div>
                    <div class="dashboard-folder-path">{{ folder.repoName }} / {{ folder.name }}</div>
    </div>
  </div>
    </div>
              <div class="dashboard-section-label">Files</div>
              <div class="dashboard-files-list">
                <div class="dashboard-file-card" *ngFor="let file of getAllFilesWithPath()">
                  <span class="dashboard-file-icon">
                    <img [src]="getFileIcon(file.type)" width="28" height="28" style="object-fit:contain;" alt="file icon" />
                  </span>
                  <div class="dashboard-file-info">
                    <div class="dashboard-file-name">{{ file.name }}</div>
                    <div class="dashboard-file-path">{{ file.repoName }} / {{ file.folderName }} &bull; {{ file.type }}</div>
  </div>
                  </div>
                  </div>
                  </ng-container>
            <ng-container *ngIf="currentView === 'workspaces'">
              <!-- Workspaces view handled in workspaces component -->
              <app-workspaces></app-workspaces>
              </ng-container>
            </div>
        </main>
        <app-plus (selectType)="onFabSelect($event)"></app-plus>
      </div>
    </div>
    <div class="modal-backdrop" *ngIf="createType">
      <div class="modal">
        <h2 *ngIf="createType === 'repo'">Add Repository</h2>
        <h2 *ngIf="createType === 'folder'">Add Folder</h2>
        <h2 *ngIf="createType === 'file'">Add File</h2>
        <form (ngSubmit)="onCreateSubmit()">
          <!-- Repo Form -->
          <ng-container *ngIf="createType === 'repo'">
            <label>Repository Name</label>
            <input type="text" [(ngModel)]="newRepoName" name="repoName" required />
          </ng-container>
          <!-- Folder Form -->
          <ng-container *ngIf="createType === 'folder'">
            <label>Folder Name</label>
            <input type="text" [(ngModel)]="newFolderName" name="folderName" required />
            <label>Base URL</label>
            <input type="text" [(ngModel)]="newFolderBaseUrl" name="folderBaseUrl" required />
            <label>Optional File</label>
            <input type="file" (change)="onNewFolderFileSelected($event)" />
            <span *ngIf="newFolderFile">Selected: {{ newFolderFile.name }}</span>
          </ng-container>
          <!-- File Form -->
          <ng-container *ngIf="createType === 'file'">
            <label>Title</label>
            <input type="text" [(ngModel)]="newFileTitle" name="fileTitle" required />
            <label>Base URL</label>
            <input type="text" [(ngModel)]="newFileBaseUrl" name="fileBaseUrl" required />
          </ng-container>
          <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
            <button type="button" (click)="closeCreateModal()">Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: #fff;
      display: flex;
      flex-direction: column;
    }
    .dashboard-body {
      display: flex;
      flex-direction: row;
      width: 100vw;
      min-height: 100vh;
      background: #fff;
      /* Remove fixed margin-left, use ngStyle for dynamic margin */
      /* margin-left: 280px; */
      transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .dashboard-main {
      flex: 1;
      background: #fff;
      min-height: 100vh;
      display: flex;
        flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
        width: 100%;
    }
    .dashboard-content {
      width: 90%;
      margin: 0 auto;
      /* max-width: 900px; */
      /* margin: 0 auto; */
      padding: 2.5rem 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .dashboard-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2.5rem;
      gap: 1.5rem;
    }
    .dashboard-search {
      flex: 1;
      max-width: 420px;
      padding: 0.9rem 1.2rem;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
      background: #f7f7f8;
      font-size: 1.08rem;
      color: #222;
      outline: none;
      }
    .dashboard-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }
    .dashboard-create {
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.7rem 2.2rem;
      font-size: 1.08rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s;
    }
    .dashboard-create:hover {
      background: #1749b1;
    }
    .dashboard-user-info {
      display: flex;
      align-items: center;
      gap: 0.7rem;
    }
    .user-name {
      font-weight: 600;
      color: #222;
      font-size: 1.08rem;
    }
    .profile-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #fff;
      background: #eee;
      box-shadow: 0 1px 4px rgba(0,0,0,0.10);
      cursor: pointer;
    }
    .dashboard-back-title-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .dashboard-back-btn {
      background: none;
      border: none;
      color: #222;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0.3rem 0.8rem;
      border-radius: 6px;
      transition: background 0.18s;
    }
    .dashboard-back-btn:hover {
      background: #f7f7f8;
    }
    .dashboard-title {
      font-size: 2rem;
      font-weight: 700;
      color: #222;
      margin: 0;
    }
    .dashboard-section {
      margin-bottom: 2.2rem;
    }
    .dashboard-section-label {
      font-size: 1.08rem;
      font-weight: 600;
      color: #888;
      margin-bottom: 1.1rem;
    }
    .dashboard-folders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.2rem 2.2rem;
    }
    .dashboard-folder-card {
      background: #f7f7f8;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 1.1rem;
      padding: 1.1rem 1.5rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.03);
      cursor: pointer;
      transition: box-shadow 0.18s, background 0.18s;
      font-size: 1.08rem;
      font-weight: 500;
    }
    .dashboard-folder-card:hover {
      background: #eaf1ff;
      box-shadow: 0 2px 8px rgba(37,99,235,0.08);
    }
    .dashboard-folder-icon {
      width: 28px;
      height: 28px;
      display: inline-block;
      background: none;
    }
    .dashboard-folder-name {
      color: #222;
      text-align: left;
      font-weight: 500;
      word-break: break-word;
    }
    .dashboard-folder-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .dashboard-folder-path {
      font-size: 0.85rem;
      color: #666;
      font-weight: 400;
    }
    .dashboard-files-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.7rem;
    }
    .dashboard-file-card {
      background: #f7f7f8;
      border-radius: 0;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.3rem 0.8rem;
      font-size: 0.98rem;
      line-height: 1.2;
      font-weight: 500;
      color: #222;
      border: none;
      margin-bottom: 0.7rem;
      box-shadow: none;
      width: 100%;
    }
    .dashboard-file-icon {
      width: 28px;
      height: 28px;
      display: inline-block;
      background: none;
    }
    .dashboard-file-name {
      color: #222;
      text-align: left;
      font-weight: 500;
      word-break: break-word;
    }
    .dashboard-file-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .dashboard-file-path {
      font-size: 0.85rem;
      color: #666;
      font-weight: 400;
    }
    .sidebar-hover-zone {
      position: fixed;
      top: 0;
      left: 0;
      width: 16px;
      height: 100vh;
      z-index: 99; /* less than sidebar's 100 */
      background: transparent;
    }
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal {
      background: #fff;
      border-radius: 18px;
      padding: 2.5rem 1.5rem;
      min-width: 210px;
      width: 330px;
      min-height: 600px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      box-shadow: 0 4px 32px rgba(0,0,0,0.12);
    }
    .dropzone {
      border: 2px dashed #2563eb;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      background: #eaf1ff;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  repositories: Repository[] = [];
  selectedRepo: Repository | null = null;
  selectedFolder: Folder | null = null;
  selectedFiles: FileItem[] = [];
  previewModalFile: FileItem | null = null;

  // UI state
  newRepoName = '';
  newRepoFile: File | null = null;
  renamingRepo: Repository | null = null;
  renameRepoName = '';
  newFolderName = '';
  newFolderBaseUrl = '';
  newFolderFile: File | null = null;
  newFileTitle = '';
  newFileBaseUrl = '';
  allowedFileTypes: FileItem['type'][] = ['png', 'jpg', 'jpeg', 'json', 'xml', 'txt', 'mp4', 'pdf', 'zip', 'docx'];
  newFileName = '';
  newFileType: FileItem['type'] = this.allowedFileTypes[0];
  newFileContent = '';
  newFileBase64 = '';
  isUploading = false;
  repoOptionsRepo: Repository | null = null;
  folderOptionsFolder: Folder | null = null;
  isDragOver = false;
  previewFile: {
    name: string;
    type: string;
    base64: string;
    width?: number;
    height?: number;
    addedBy: string;
    timestamp: string;
  } | null = null;
  showDropzoneText = false;
  showRepoForm = false;
  showFolderFormRepoId: string | null = null;
  showFileFormFolderId: string | null = null;
  // New state for floating button and add folder modal
  showAddMenu = false;
  showAddRepoModal = false;
  showAddFolderModal = false;
  addFolderRepoId: string | null = null;
  addFolderMode: 'existing' | 'new' = 'existing';
  newRepoNameForFolder = '';
  fabPlusOffsetX = 0;
  fabPlusOffsetY = 0;
  fabBtnRef: HTMLElement | null = null;

  // Hover preview state
  hoveredFile: (FileItem & { folderName: string, repoName: string }) | null = null;
  hoverX = 0;
  hoverY = 0;

  navbarVisible = true;
  navbarHeight = 72; // px

  folders: Folder[] = []; // or your actual folder data
  showCreateFileModal: boolean = false;

  // Modal state properties
  showCreateRepoModal = false;
  showRenameRepoModal = false;
  showCreateFolderModal = false;
  showRenameFolderModal = false;
  repoToRename: Repository | null = null;
  folderToRename: Folder | null = null;

  // Add a property to track the current view
  currentView: 'home' | 'workspaces' = 'home';
  sidebarOpen = false;

  experienceTitle = '';
  experienceBaseUrl = '';
  experienceDefaultLocale = '';
  experienceAdditionalLocales = '';
  thumbnailName = '';
  thumbnailFile: File | null = null;
  showCreateExperienceModal = false;

  createType: 'repo' | 'folder' | 'file' | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private contentService: LocalContentService,
    private sanitizer: DomSanitizer,
    private contentApi: ContentApiService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadRepositories();
    document.addEventListener('click', this.handleClickOutside.bind(this));
    document.addEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    document.addEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
    window.addEventListener('scroll', this.onScroll, true);
  }
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
    document.removeEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    document.removeEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
    window.removeEventListener('scroll', this.onScroll, true);
  }
  onScroll = () => {
    this.navbarVisible = window.scrollY < this.navbarHeight;
  };
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
    this.contentApi.getRepositories().subscribe({
      next: (repos) => {
        this.repositories = repos;
        if (this.selectedRepo) {
          this.selectedRepo = this.repositories.find(r => r.id === this.selectedRepo!.id) || null;
        }
        if (this.selectedFolder && this.selectedRepo) {
          this.selectedFolder = this.selectedRepo.folders.find(f => f.id === this.selectedFolder!.id) || null;
          this.selectedFiles = this.selectedFolder?.files || [];
        }
      },
      error: (err) => {
        // Optionally handle error (e.g., show a message)
        this.repositories = [];
      }
    });
  }

  // Repository methods
  addRepository(): void {
    if (!this.newRepoName.trim()) return;
    this.contentService.addRepository(this.newRepoName.trim());
    this.newRepoName = '';
    this.loadRepositories();
    this.showDropzoneText = true;
    this.showRepoForm = false;
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
  confirmRenameRepo() {
    if (!this.renameRepoName.trim() || !this.repoToRename) return;
    this.contentService.renameRepository(this.repoToRename.id, this.renameRepoName.trim());
    this.closeRenameRepoModal();
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
    this.showDropzoneText = true;
    this.showFolderFormRepoId = null;
  }
  selectFolder(folder: Folder): void{
    this.selectedFolder = folder;
    this.selectedFiles = folder.files;
  }
  startRenameFolder(folder: Folder, event: Event): void {
    event.stopPropagation();
    this.newFolderName = folder.name;
  }
  confirmRenameFolder() {
    if (!this.newFolderName.trim() || !this.selectedRepo || !this.folderToRename) return;
    this.contentService.renameFolder(this.selectedRepo.id, this.folderToRename.id, this.newFolderName.trim());
    this.closeRenameFolderModal();
    this.loadRepositories();
  }
  cancelRenameFolder(): void {
    this.newFolderName = '';
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
    this.isUploading = true;
    let content = this.newFileContent;
    if (this.newFileType === 'png' || this.newFileType === 'jpg' || this.newFileType === 'jpeg') {
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
    this.newFileType = this.allowedFileTypes[0];
    this.newFileContent = '';
    this.newFileBase64 = '';
    this.loadRepositories();
    this.showDropzoneText = true;
    this.showFileFormFolderId = null;
    setTimeout(() => { this.isUploading = false; }, 600); // Simulate loading
  }
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files || !files.length) return;
    this.isUploading = true;
    let processed = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64 = e.target.result.split(',')[1];
        const fileItem: FileItem = {
          id: this.generateId(),
          name: file.name,
          type: file.type.split('/')[1] as any, // e.g. 'png', 'jpg', 'jpeg'
          content: base64,
          addedBy: this.user?.name || this.user?.email || 'Unknown',
          timestamp: new Date().toISOString()
        };
        this.contentService.addFile(this.selectedRepo!.id, this.selectedFolder!.id, fileItem);
        processed++;
        if (processed === files.length) {
          this.isUploading = false;
          this.loadRepositories();
        }
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
    this.isUploading = true;
    const files = event.dataTransfer.files;
    let processed = 0;
    const allowedTypes = ['png', 'jpg', 'jpeg', 'json', 'xml', 'txt', 'mp4', 'pdf'];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: 'png' | 'jpg' | 'jpeg' | 'json' | 'xml' | 'txt' | 'mp4' | 'pdf' = 'json';
      if (ext === 'png') type = 'png';
      else if (ext === 'jpg') type = 'jpg';
      else if (ext === 'jpeg') type = 'jpeg';
      else if (ext === 'xml') type = 'xml';
      else if (ext === 'json') type = 'json';
      else if (ext === 'txt') type = 'txt';
      else if (ext === 'mp4') type = 'mp4';
      else if (ext === 'pdf') type = 'pdf';
      // skip if not allowed
      if (!allowedTypes.includes(type)) continue;
      const addedBy = this.user?.name || this.user?.email || 'Unknown';
      const timestamp = new Date().toISOString();

      if (type === 'png' || type === 'jpg' || type === 'jpeg' || type === 'mp4' || type === 'pdf') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64 = e.target.result.split(',')[1];
          const img = new Image();
          img.onload = () => {
            const fileItem: FileItem = {
              id: this.generateId(),
              name: file.name,
              type,
              content: base64,
              addedBy,
              timestamp
            };
            this.contentService.addFile(this.selectedRepo!.id, this.selectedFolder!.id, fileItem);
            processed++;
            if (processed === files.length) {
              this.isUploading = false;
              this.loadRepositories();
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const fileItem: FileItem = {
            id: this.generateId(),
            name: file.name,
            type,
            content: e.target.result,
            addedBy,
            timestamp
          };
          this.contentService.addFile(this.selectedRepo!.id, this.selectedFolder!.id, fileItem);
          processed++;
          if (processed === files.length) {
            this.isUploading = false;
            this.loadRepositories();
          }
        };
        reader.readAsText(file);
      }
    }
  }

  confirmPreviewUpload(): void {
    if (!this.previewFile || !this.selectedRepo || !this.selectedFolder) return;
    this.isUploading = true;
    const fileItem: FileItem = {
      id: this.generateId(),
      name: this.previewFile.name,
      type: this.previewFile.type as any,
      content: this.previewFile.type === 'png' || this.previewFile.type === 'jpg' || this.previewFile.type === 'jpeg' ? this.previewFile.base64 : this.previewFile.base64,
      addedBy: this.previewFile.addedBy,
      timestamp: this.previewFile.timestamp
    };
    this.contentService.addFile(this.selectedRepo.id, this.selectedFolder.id, fileItem);
    this.previewFile = null;
    this.loadRepositories();
    this.showDropzoneText = true;
    this.showFileFormFolderId = null;
    setTimeout(() => { this.isUploading = false; }, 600); // Simulate loading
  }
  cancelPreviewUpload(): void {
    this.previewFile = null;
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
      case 'json': return '🟩';
      case 'xml': return '🟪';
      case 'png': return '🖼️';
      case 'jpg': return '🖼️';
      case 'jpeg': return '🖼️';
      case 'txt': return '📄';
      case 'mp4': return '🎬';
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
  goToDashboard(): void{
    // Reset dashboard to initial state (no repo/folder selected)
    this.selectedRepo = null;
    this.selectedFolder = null;
    this.selectedFiles = [];
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

  formatJson(content: string): string {
    try {
      return JSON.stringify(JSON.parse(content), null, 2);
    } catch {
      return content;
    }
  }
  formatXml(content: string): string {
    // Simple pretty print for XML (not perfect, but better than nothing)
    try {
      const PADDING = '  ';
      const reg = /(>)(<)(\/*)/g;
      let xml = content.replace(reg, '$1\r\n$2$3');
      let pad = 0;
      return xml.split('\r\n').map((node: string) => {
        let indent = '';
        if (node.match(/.+<\/.+>$/)) {
          indent = PADDING.repeat(pad);
        } else if (node.match(/^<\//)) {
          pad = pad > 0 ? pad - 1 : 0;
          indent = PADDING.repeat(pad);
        } else if (node.match(/^<[^/].*>$/)) {
          indent = PADDING.repeat(pad);
          pad++;
        } else {
          indent = PADDING.repeat(pad);
        }
        return indent + node;
      }).join('\n');
    } catch {
      return content;
    }
  }

  getSafePdfUrl(base64: string): SafeResourceUrl {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } catch (e) {
      // Return a blank PDF as a SafeResourceUrl, not an empty string
      const blank = 'data:application/pdf;base64,';
      return this.sanitizer.bypassSecurityTrustResourceUrl(blank);
    }
  }

  getSafeMp4Url(base64: string): SafeResourceUrl {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } catch (e) {
      // Return a blank PDF as a SafeResourceUrl, not an empty string
      const blank = 'data:video/mp4;base64,';
      return this.sanitizer.bypassSecurityTrustResourceUrl(blank);
    }
  }

  openPreviewModal(file: FileItem) {
    this.previewModalFile = file;
  }

  closePreviewModal(): void {
    this.previewModalFile = null;
  }

  // Utility to get all folders across all repos
  getAllFolders(): Array<Folder & { repoId: string, repoName: string }> {
    return this.repositories.flatMap(r => r.folders.map(f => ({ ...f, repoId: r.id, repoName: r.name })));
  }
  // Utility to get recent files (7 most recent)
  getRecentFiles(): (FileItem & { folderName: string, repoName: string })[] {
    const files: (FileItem & { folderName: string, repoName: string })[] = [];
    for (const repo of this.repositories) {
      for (const folder of repo.folders) {
        for (const file of folder.files) {
          files.push({ ...file, folderName: folder.name, repoName: repo.name });
        }
      }
    }
    return files.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 7);
  }
  // Handler for folder grid click
  selectFolderFromGrid(folder: Folder & { repoId: string, repoName: string }): void {
    const repo = this.repositories.find(r => r.id === folder.repoId);
    if (repo) {
      this.selectedRepo = repo;
      this.selectedFolder = repo.folders.find(f => f.id === folder.id) || null;
      this.selectedFiles = this.selectedFolder?.files || [];
    }
  }
  // Floating button handlers
  openAddMenu(): void { this.showAddMenu = true; }
  closeAddMenu(): void { this.showAddMenu = false; }
  openAddRepo(): void { this.showAddRepoModal = true; this.showAddMenu = false; }
  closeAddRepoModal() { this.showAddRepoModal = false; this.newRepoName = ''; }
  addRepoFromModal() {
    if (this.newRepoName.trim()) {
      const repoToCreate: RepositoryCreate[] = [{
        name: this.newRepoName.trim(),
        description: '',
        repositoryId: this.newRepoName.trim().toLowerCase().replace(/\s+/g, '-')
      }];
      // For now, just log or store the file, as backend does not support file upload on repo creation
      if (this.newRepoFile) {
        // You can store or process the file here if needed
        console.log('Optional file selected for repo:', this.newRepoFile);
      }
      this.contentApi.createRepositories(repoToCreate).subscribe({
        next: () => {
          this.newRepoName = '';
          this.newRepoFile = null;
          this.closeAddRepoModal();
          this.loadRepositories();
        },
        error: (err) => {
          // Optionally handle error (e.g., show a message)
        }
      });
    }
  }
  openAddFolder(): void { this.showAddFolderModal = true; this.showAddMenu = false; }
  closeAddFolderModal() { this.showAddFolderModal = false; this.addFolderRepoId = null; }
  confirmAddFolder(): void {
    if (this.addFolderMode === 'existing') {
      if (this.addFolderRepoId && this.newFolderName.trim()) {
        this.contentService.addFolder(this.addFolderRepoId, this.newFolderName.trim());
        this.newFolderName = '';
        this.closeAddFolderModal();
        this.loadRepositories();
      }
    } else if (this.addFolderMode === 'new') {
      if (this.newRepoNameForFolder.trim() && this.newFolderName.trim()) {
        const repoId = this.contentService.addRepository(this.newRepoNameForFolder.trim());
        if (repoId) {
          this.contentService.addFolder(repoId, this.newFolderName.trim());
        }
        this.newRepoNameForFolder = '';
        this.newFolderName = '';
        this.closeAddFolderModal();
        this.loadRepositories();
      }
    }
  }
  handleGlobalMouseMove(event: MouseEvent) {
    // Find the FAB button in the DOM
    let btn = this.fabBtnRef;
    if (!btn) {
      btn = document.querySelector('[data-fab-btn="true"]') as HTMLElement;
      if (!btn) return;
      this.fabBtnRef = btn;
    }
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let dx = event.clientX - centerX;
    let dy = event.clientY - centerY;
    const maxDist = rect.width / 2 - 16;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxDist) {
      const ratio = maxDist / dist;
      dx *= ratio;
      dy *= ratio;
    }
    this.fabPlusOffsetX = dx;
    this.fabPlusOffsetY = dy;
  }
  handleGlobalMouseLeave() {
    this.fabPlusOffsetX = 0;
    this.fabPlusOffsetY = 0;
  }

  showFilePreview(file: any, event: MouseEvent) {
    this.hoveredFile = file;
    this.hoverX = event.clientX + 16;
    this.hoverY = event.clientY - 16;
  }
  moveFilePreview(event: MouseEvent) {
    this.hoverX = event.clientX + 16;
    this.hoverY = event.clientY - 16;
  }
  hideFilePreview() {
    this.hoveredFile = null;
  }
  onSidebarNavigate(item: string) {
    if (item === 'home') {
      this.currentView = 'home';
    } else if (item === 'workspaces') {
      this.currentView = 'workspaces';
    }
  }

  closeCreateFileModal() {
    this.showCreateFileModal = false;
    this.newFileName = '';
    this.newFileType = this.allowedFileTypes[0];
    this.newFileContent = '';
    this.newFileBase64 = '';
  }
  openCreateRepoModal() {
    this.showCreateRepoModal = true;
    this.newRepoName = '';
  }
  closeCreateRepoModal() {
    this.showCreateRepoModal = false;
    this.newRepoName = '';
  }
  openCreateFolderModal() {
    this.showCreateFolderModal = true;
    this.newFolderName = '';
  }
  closeCreateFolderModal() {
    this.showCreateFolderModal = false;
    this.newFolderName = '';
  }
  openCreateFileModal() {
    this.showCreateFileModal = true;
    this.newFileName = '';
    this.newFileType = this.allowedFileTypes[0];
    this.newFileContent = '';
    this.newFileBase64 = '';
  }
  openRenameRepoModal(repo: Repository, event: Event) {
    event.stopPropagation();
    this.renamingRepo = repo;
    this.renameRepoName = repo.name;
    this.showRenameRepoModal = true;
  }
  closeRenameRepoModal() {
    this.showRenameRepoModal = false;
    this.repoToRename = null;
    this.renameRepoName = '';
  }
  openRenameFolderModal(folder: Folder, event: Event) {
    event.stopPropagation();
    this.newFolderName = folder.name;
    this.showRenameFolderModal = true;
  }
  closeRenameFolderModal() {
    this.showRenameFolderModal = false;
    this.folderToRename = null;
    this.newFolderName = '';
  }

  isTextFileType(type: FileItem['type']): boolean {
    // Adjust this list if you want to treat other types as text
    return type === 'json' || type === 'xml' || type === 'txt';
  }

  // Add helpers to get all folders and all files with their paths
  getAllFoldersWithPath() {
    return this.repositories.flatMap(repo =>
      repo.folders.map(folder => ({
        ...folder,
        repoName: repo.name
      }))
    );
  }
  getAllFilesWithPath() {
    return this.repositories.flatMap(repo =>
      repo.folders.flatMap(folder =>
        folder.files.map(file => ({
          ...file,
          folderName: folder.name,
          repoName: repo.name
        }))
      )
    );
  }

  getFileIcon(type: string): string {
    switch(type) {
      case 'png':
      case 'jpg':
      case 'jpeg':
        return '/assets/img.png';
      case 'pdf':
        return '/assets/pdf.png';
      case 'mp4':
        return '/assets/mp4.png';
      case 'zip':
        return '/assets/zip.png';
      case 'txt':
        return '/assets/txt-file.png';
      case 'docx':
        return '/assets/docx.png';
      case 'xml':
      case 'json':
        return '/assets/folder.png'; // fallback for data files
      default:
        return '/assets/folder.png';
    }
  }

  deselectRepo() {
    this.selectedRepo = null;
    this.selectedFolder = null;
  }

  onFabSelect(type: 'repo' | 'folder' | 'file') {
    this.createType = type;
  }
  closeCreateModal() {
    this.createType = null;
    this.newRepoName = '';
    this.newRepoFile = null;
    this.newFolderName = '';
    this.newFolderBaseUrl = '';
    this.newFolderFile = null;
    this.newFileTitle = '';
    this.newFileBaseUrl = '';
  }
  onNewFolderFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    this.newFolderFile = file ? file : null;
  }
  onCreateSubmit() {
    if (this.createType === 'repo') {
      this.addRepoFromModal();
    } else if (this.createType === 'folder') {
      this.addFolderFromModal();
    } else if (this.createType === 'file') {
      this.addFileFromModal();
    }
  }
  addFolderFromModal() {
    // TODO: Implement folder creation logic here
    this.closeCreateModal();
  }
  addFileFromModal() {
    // TODO: Implement file creation logic here
    this.closeCreateModal();
  }
}