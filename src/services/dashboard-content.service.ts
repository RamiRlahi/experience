import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { ContentServicesApiService, Document, Repository } from './content-services-api.service';
import { DashboardFolder, DashboardFile, QueryRequest } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardContentService {
  private readonly repositoriesSubject = new BehaviorSubject<Repository[]>([]);
  private readonly foldersSubject = new BehaviorSubject<DashboardFolder[]>([]);
  private readonly filesSubject = new BehaviorSubject<DashboardFile[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  public repositories$ = this.repositoriesSubject.asObservable();
  public folders$ = this.foldersSubject.asObservable();
  public files$ = this.filesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private contentApiService: ContentServicesApiService) {}

  // Initialize dashboard data
  initializeDashboard(): Observable<void> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.contentApiService.getRepositories().pipe(
      switchMap(repositories => {
        this.repositoriesSubject.next(repositories);
        
        // Get folders and files for all repositories
        const folderObservables = repositories.map(repo => 
          this.getFoldersForRepository(repo.id)
        );
        
        const fileObservables = repositories.map(repo => 
          this.getFilesForRepository(repo.id)
        );

        return combineLatest([...folderObservables, ...fileObservables]);
      }),
      map(() => {
        this.loadingSubject.next(false);
        return void 0;
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        this.errorSubject.next(error.message || 'Failed to load dashboard data');
        return of(void 0);
      })
    );
  }

  // Get folders for a specific repository
  getFoldersForRepository(repositoryId: string): Observable<DashboardFolder[]> {
    const queryRequest: QueryRequest = {
      paths: ['/'],
      repositories: [repositoryId]
    };

    return this.contentApiService.queryContent(queryRequest).pipe(
      map(documents => {
        const folders = documents.filter(doc => this.contentApiService.isFolder(doc));
        return folders.map(doc => this.mapDocumentToDashboardFolder(doc));
      }),
      tap(folders => {
        const currentFolders = this.foldersSubject.value;
        const updatedFolders = currentFolders.filter(f => f.repositoryId !== repositoryId);
        this.foldersSubject.next([...updatedFolders, ...folders]);
      }),
      catchError(error => {
        console.error(`Error loading folders for repository ${repositoryId}:`, error);
        return of([]);
      })
    );
  }

  // Get files for a specific repository
  getFilesForRepository(repositoryId: string): Observable<DashboardFile[]> {
    const queryRequest: QueryRequest = {
      paths: ['/'],
      repositories: [repositoryId]
    };

    return this.contentApiService.queryContent(queryRequest).pipe(
      map(documents => {
        const files = documents.filter(doc => this.contentApiService.isFile(doc));
        return files.map(doc => this.mapDocumentToDashboardFile(doc));
      }),
      tap(files => {
        const currentFiles = this.filesSubject.value;
        const updatedFiles = currentFiles.filter(f => f.repositoryId !== repositoryId);
        this.filesSubject.next([...updatedFiles, ...files]);
      }),
      catchError(error => {
        console.error(`Error loading files for repository ${repositoryId}:`, error);
        return of([]);
      })
    );
  }

  // Search content
  searchContent(searchTerm: string): Observable<{ folders: DashboardFolder[], files: DashboardFile[] }> {
    if (!searchTerm.trim()) {
      return of({ folders: [], files: [] });
    }

    return this.contentApiService.searchContent({
      searchTerm: searchTerm.trim(),
      paths: ['/']
    }).pipe(
      map(documents => {
        const folders = documents
          .filter(doc => this.contentApiService.isFolder(doc))
          .map(doc => this.mapDocumentToDashboardFolder(doc));
        
        const files = documents
          .filter(doc => this.contentApiService.isFile(doc))
          .map(doc => this.mapDocumentToDashboardFile(doc));

        return { folders, files };
      }),
      catchError(error => {
        console.error('Error searching content:', error);
        return of({ folders: [], files: [] });
      })
    );
  }

  // Create new repository
  createRepository(name: string, description?: string): Observable<Repository> {
    return this.contentApiService.createRepository({
      name,
      description
    }).pipe(
      tap(() => this.initializeDashboard().subscribe())
    );
  }

  // Delete repository
  deleteRepository(repositoryId: string): Observable<void> {
    return this.contentApiService.deleteRepository(repositoryId).pipe(
      tap(() => this.initializeDashboard().subscribe())
    );
  }

  // Create folder
  createFolder(repositoryId: string, folderName: string, parentPath: string = '/'): Observable<Document> {
    const newFolder: Document = {
      id: `folder${Date.now()}`,
      path: parentPath === '/' ? `/${folderName}` : `${parentPath}/${folderName}`,
      repositoryId: repositoryId,
      type: 'cmis:folder',
      name: folderName,
      creationDate: new Date().toISOString(),
      lastModificationDate: new Date().toISOString(),
      createdBy: 'Current User'
    };

    return this.contentApiService.saveContent(newFolder).pipe(
      tap(() => {
        // Refresh folders for the repository
        this.getFoldersForRepository(repositoryId).subscribe();
      })
    );
  }

  // Delete folder
  deleteFolder(repositoryId: string, folderId: string): Observable<void> {
    return this.contentApiService.removeContent({
      repositoryId,
      ids: [folderId]
    }).pipe(
      tap(() => {
        // Refresh folders for the repository
        this.getFoldersForRepository(repositoryId).subscribe();
      })
    );
  }

  // Upload file
  uploadFile(repositoryId: string, folderPath: string, file: File): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetPath', folderPath);
    formData.append('name', file.name);
    formData.append('cmis:objectTypeId', 'cmis:document');
    formData.append('repositoryId', repositoryId);

    return this.contentApiService.uploadContent(formData).pipe(
      tap((uploadedDoc) => {
        console.log('File uploaded:', uploadedDoc);
        // Refresh the files for the specific repository to show the new file
        this.getFilesForRepository(repositoryId).subscribe();
      }),
      catchError(error => {
        console.error('Error uploading file:', error);
        throw error;
      })
    );
  }

  // Delete file
  deleteFile(repositoryId: string, fileId: string): Observable<void> {
    return this.contentApiService.removeContent({
      repositoryId,
      ids: [fileId]
    }).pipe(
      tap(() => {
        // Refresh files for the repository
        this.getFilesForRepository(repositoryId).subscribe();
      })
    );
  }

  // Get file content
  getFileContent(fileId: string): Observable<Blob> {
    return this.contentApiService.getContentStream(fileId);
  }

  // Utility methods
  private mapDocumentToDashboardFolder(doc: Document): DashboardFolder {
    const repository = this.repositoriesSubject.value.find(r => r.id === doc.repositoryId);
    return {
      id: doc.id,
      name: this.contentApiService.getFileName(doc),
      path: doc.path,
      repositoryId: doc.repositoryId,
      repositoryName: repository?.name || 'Unknown Repository',
      documentCount: 0, // This would need to be calculated by querying children
      lastModified: doc.lastModificationDate
    };
  }

  private mapDocumentToDashboardFile(doc: Document): DashboardFile {
    const repository = this.repositoriesSubject.value.find(r => r.id === doc.repositoryId);
    const pathParts = doc.path.split('/');
    const fileName = pathParts.pop() || doc.name || 'Unknown';
    const folderPath = pathParts.join('/') || '/';
    const folderName = pathParts[pathParts.length - 1] || 'Root';

    return {
      id: doc.id,
      name: fileName,
      path: doc.path,
      repositoryId: doc.repositoryId,
      repositoryName: repository?.name || 'Unknown Repository',
      folderName,
      folderPath,
      type: this.contentApiService.getFileExtension(doc),
      size: this.formatFileSize(doc.contentStreamLength || 0),
      lastModified: doc.lastModificationDate,
      createdBy: doc.createdBy || 'Unknown',
      iconPath: this.getFileIconPath(this.contentApiService.getFileExtension(doc))
    };
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private getFileIconPath(fileType: string): string {
    switch(fileType.toLowerCase()) {
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
      case 'json':
      case 'xml':
        return '/assets/dash.png';
      default:
        return '/assets/poste.png';
    }
  }

  // Clear error
  clearError(): void {
    this.errorSubject.next(null);
  }

  // Save content (for experiences)
  saveContent(document: Partial<Document>): Observable<Document> {
    return this.contentApiService.saveContent(document).pipe(
      tap(() => {
        // Refresh data after saving
        this.refreshData().subscribe();
      })
    );
  }

  // Refresh data
  refreshData(): Observable<void> {
    return this.initializeDashboard();
  }
} 