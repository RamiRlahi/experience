import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { DashboardContentService } from '../../services/dashboard-content.service';
import { Repository, Document, DashboardFolder, DashboardFile } from '../../models/content.model';
import { CreateExperienceModalComponent } from '../create-experience-modal/create-experience-modal.component';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CreateExperienceModalComponent],
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit, OnDestroy {
  @Input() sidebarVisible: boolean = false;
  
  repositories: Repository[] = [];
  folders: DashboardFolder[] = [];
  files: DashboardFile[] = [];
  folderFiles: DashboardFile[] = [];
  selectedContent: DashboardFolder | DashboardFile | null = null;
  selectedFolder: DashboardFolder | null = null;
  
  loading = false;
  rightSidebarVisible = false;
  viewMode: 'list' | 'grid' = 'list';
  expandedRepos = new Set<string>();
  
  // Modal states
  showCreateRepoModal = false;
  showCreateFolderModal = false;
  showCreateExperienceModal = false;
  
  // Form data
  newRepoName = '';
  newRepoDescription = '';
  newFolderName = '';
  selectedRepoForFolder = '';
  
  // Drag and Drop states
  isDragOver = false;
  showUploadModal = false;
  draggedFiles: File[] = [];
  uploadTargetFolder: DashboardFolder | null = null;
  uploadProgress: { [key: string]: number } = {};
  
  // Floating Action Button states
  fabPlusOffsetX = 0;
  fabPlusOffsetY = 0;
  fabBtnRef: HTMLElement | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(private dashboardContentService: DashboardContentService) {}

  ngOnInit(): void {
    this.loadContent();
    
    // Add global mouse event listeners for FAB button
    document.addEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    document.addEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Remove global mouse event listeners
    document.removeEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    document.removeEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
  }

  loadContent(): void {
    this.loading = true;
    
    // Load repositories, folders, and files
    combineLatest([
      this.dashboardContentService.repositories$,
      this.dashboardContentService.folders$,
      this.dashboardContentService.files$,
      this.dashboardContentService.loading$
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([repositories, folders, files, loading]) => {
      // Convert API repositories to UI repositories (without folders property)
      this.repositories = repositories.map(repo => ({
        id: repo.id,
        name: repo.name,
        folders: [] // Add empty folders array to match UI model
      }));
      
      this.folders = folders;
      this.files = files;
      this.loading = loading;
      
      // Auto-expand repositories that have folders
      this.autoExpandRepositories();
    });

    // Initialize dashboard data
    this.dashboardContentService.initializeDashboard().subscribe();
  }

  autoExpandRepositories(): void {
    this.repositories.forEach(repo => {
      const repoFolders = this.getFoldersForRepo(repo.id);
      if (repoFolders.length > 0) {
        this.expandedRepos.add(repo.id);
      }
    });
  }

  toggleRepository(repoId: string): void {
    if (this.expandedRepos.has(repoId)) {
      this.expandedRepos.delete(repoId);
    } else {
      this.expandedRepos.add(repoId);
    }
  }

  getFoldersForRepo(repoId: string): DashboardFolder[] {
    return this.folders.filter(folder => folder.repositoryId === repoId);
  }

  getFolderCount(repoId: string): number {
    return this.getFoldersForRepo(repoId).length;
  }

  selectFolder(folder: DashboardFolder): void {
    this.selectedFolder = folder;
    this.selectedContent = null;
    this.loadFolderFiles(folder);
  }

  loadFolderFiles(folder: DashboardFolder): void {
    // Filter files that belong to this folder
    this.folderFiles = this.files.filter(file => {
      // Check if file path starts with folder path
      return file.folderPath === folder.path || 
             file.path.startsWith(folder.path + '/') ||
             file.path === folder.path;
    });
  }

  toggleRightSidebar(): void {
    this.rightSidebarVisible = !this.rightSidebarVisible;
  }

  selectContent(content: DashboardFolder | DashboardFile): void {
    this.selectedContent = content;
    if (!this.rightSidebarVisible) {
      this.rightSidebarVisible = true;
    }
  }

  refreshContent(): void {
    this.dashboardContentService.refreshData().subscribe();
  }

  // Create Repository functionality
  createRepository(): void {
    if (!this.newRepoName.trim()) return;
    
    this.dashboardContentService.createRepository(this.newRepoName.trim(), this.newRepoDescription.trim())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showCreateRepoModal = false;
          this.newRepoName = '';
          this.newRepoDescription = '';
          this.refreshContent();
        },
        error: (error) => {
          console.error('Error creating repository:', error);
          // You could add error handling here (show toast, etc.)
        }
      });
  }

  // Create Folder functionality
  openCreateFolderModal(repoId: string, event: Event): void {
    event.stopPropagation(); // Prevent repository toggle
    this.selectedRepoForFolder = repoId;
    this.newFolderName = '';
    this.showCreateFolderModal = true;
  }

  createFolder(): void {
    if (!this.newFolderName.trim() || !this.selectedRepoForFolder) return;
    
    this.dashboardContentService.createFolder(this.selectedRepoForFolder, this.newFolderName.trim())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showCreateFolderModal = false;
          this.newFolderName = '';
          this.selectedRepoForFolder = '';
          this.refreshContent();
        },
        error: (error) => {
          console.error('Error creating folder:', error);
          // You could add error handling here (show toast, etc.)
        }
      });
  }

  // Drag and Drop functionality
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Only set drag over if we have files
    if (event.dataTransfer?.types.includes('Files')) {
      this.isDragOver = true;
    }
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Only set drag over if we have files
    if (event.dataTransfer?.types.includes('Files')) {
      this.isDragOver = true;
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Only remove drag over if we're leaving the container entirely
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
      this.isDragOver = false;
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.draggedFiles = Array.from(files);
      this.uploadTargetFolder = this.selectedFolder;
      this.showUploadModal = true;
    }
  }

  // File upload functionality
  confirmUpload(): void {
    if (!this.uploadTargetFolder || this.draggedFiles.length === 0) return;

    this.draggedFiles.forEach(file => {
      this.uploadProgress[file.name] = 0;
      
      // Simulate upload progress
      const interval = setInterval(() => {
        if (this.uploadProgress[file.name] < 90) {
          this.uploadProgress[file.name] += 10;
        }
      }, 100);

      // Upload file to the selected folder
      this.dashboardContentService.uploadFile(this.uploadTargetFolder!.repositoryId, this.uploadTargetFolder!.path, file)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.uploadProgress[file.name] = 100;
            clearInterval(interval);
            
            // Remove from progress after a delay
            setTimeout(() => {
              delete this.uploadProgress[file.name];
            }, 1000);
            
            // Refresh content after successful upload
            this.refreshContent();
          },
          error: (error) => {
            console.error('Error uploading file:', error);
            clearInterval(interval);
            delete this.uploadProgress[file.name];
          }
        });
    });

    this.closeUploadModal();
  }

  cancelUpload(): void {
    this.closeUploadModal();
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
    this.draggedFiles = [];
    this.uploadTargetFolder = null;
    this.uploadProgress = {};
  }

  getUploadProgress(fileName: string): number {
    return this.uploadProgress[fileName] || 0;
  }

  getContentIcon(item: DashboardFolder | DashboardFile): string {
    if (this.isFolder(item)) {
      return '/assets/open-folder.png';
    }
    
    // For files, use the iconPath if available
    if ('iconPath' in item && item.iconPath) {
      return item.iconPath;
    }
    
    // Fallback based on file type
    const fileType = 'type' in item ? item.type.toLowerCase() : '';
    switch(fileType) {
      case 'png':
      case 'jpg':
      case 'jpeg':
        return '/assets/img.png';
      case 'pdf':
        return '/assets/pdf.png';
      case 'docx':
      case 'doc':
        return '/assets/docx.png';
      case 'txt':
        return '/assets/txt-file.png';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '/assets/mp4.png';
      case 'zip':
      case 'rar':
      case '7z':
        return '/assets/zip.png';
      default:
        return '/assets/poste.png';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid Date';
    }
  }

  getRepositoryName(repositoryId: string): string {
    const repository = this.repositories.find(r => r.id === repositoryId);
    return repository?.name || 'Unknown Repository';
  }

  isFolder(item: DashboardFolder | DashboardFile): item is DashboardFolder {
    return 'documentCount' in item;
  }

  // Helper methods for type-safe property access
  getFileSize(item: DashboardFolder | DashboardFile): string | null {
    if (!this.isFolder(item) && 'size' in item) {
      return item.size;
    }
    return null;
  }

  getFileCreatedBy(item: DashboardFolder | DashboardFile): string | null {
    if (!this.isFolder(item) && 'createdBy' in item) {
      return item.createdBy;
    }
    return null;
  }

  viewContent(content: DashboardFolder | DashboardFile, event: Event): void {
    event.stopPropagation();
    console.log('View content:', content);
    // Implement view logic
  }

  editContent(content: DashboardFolder | DashboardFile, event: Event): void {
    event.stopPropagation();
    console.log('Edit content:', content);
    // Implement edit logic
  }

  deleteContent(content: DashboardFolder | DashboardFile, event: Event): void {
    event.stopPropagation();
    console.log('Delete content:', content);
    // Implement delete logic
  }

  downloadContent(): void {
    if (this.selectedContent && !this.isFolder(this.selectedContent)) {
      console.log('Download content:', this.selectedContent);
      // Implement download logic
    }
  }

  shareContent(): void {
    console.log('Share content:', this.selectedContent);
    // Implement share logic
  }

  duplicateContent(): void {
    // TODO: Implement duplicate functionality
    console.log('Duplicate content:', this.selectedContent);
  }

  // Floating Action Button methods
  handleGlobalMouseMove(event: MouseEvent): void {
    // Handle FAB button movement
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

  handleGlobalMouseLeave(): void {
    this.fabPlusOffsetX = 0;
    this.fabPlusOffsetY = 0;
  }

  handleCreateExperience(event: any): void {
    // Handle the created experience with path information
    console.log('Experience created:', event);
    
    // Create the experience as a document in the selected location
    if (event.repositoryId && event.targetPath) {
      const experienceDocument = {
        repositoryId: event.repositoryId,
        path: event.targetPath,
        type: 'cmis:document',
        name: event.title,
        title: event.title,
        properties: {
          'cmis:name': event.title,
          'experience:baseUrl': event.baseUrl,
          'experience:defaultLocale': event.defaultLocale,
          'experience:additionalLocales': event.additionalLocales,
          'experience:thumbnail': event.thumbnail ? event.thumbnail.name : null
        }
      };

      // Save the experience to the content services
      this.dashboardContentService.saveContent(experienceDocument)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (savedExperience: Document) => {
            console.log('Experience saved successfully:', savedExperience);
            // Refresh the content to show the new experience
            this.refreshContent();
          },
          error: (error: any) => {
            console.error('Error saving experience:', error);
          }
        });
    }
    
    this.showCreateExperienceModal = false;
  }
} 