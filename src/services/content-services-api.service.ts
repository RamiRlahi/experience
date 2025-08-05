import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { KeycloakAuthService } from './keycloak-auth.service';

// Content Services API Models
export interface Document {
  id: string;
  path: string;
  repositoryId: string;
  type: string;
  versionLabel?: string;
  creationDate: string;
  lastModificationDate: string;
  createdBy?: string;
  lastModifiedBy?: string;
  name?: string;
  title?: string;
  description?: string;
  contentStreamLength?: number;
  contentStreamMimeType?: string;
  contentStreamFileName?: string;
  contentStreamId?: string;
  changeToken?: string;
  isLatestVersion?: boolean;
  isMajorVersion?: boolean;
  isLatestMajorVersion?: boolean;
  isPrivateWorkingCopy?: boolean;
  isImmutable?: boolean;
  isExactAcl?: boolean;
  aclInherited?: boolean;
  properties?: { [key: string]: any };
}

export interface QueryRequest {
  ids?: string[];
  paths?: string[];
  repositories?: string[];
  loadContentForTypes?: string[];
}

export interface SearchRequest {
  searchTerm: string;
  paths?: string[];
  repositories?: string[];
  properties?: { [key: string]: string };
}

export interface Repository {
  id: string;
  name: string;
  description?: string;
  rootFolderId?: string;
  capabilities?: { [key: string]: any };
}

@Injectable({
  providedIn: 'root'
})
export class ContentServicesApiService {
  private readonly API_BASE_URL = 'http://ips-edge-edge-devc.apps.ocp-uat.biat.int/api/content-service';
  private readonly repositoriesSubject = new BehaviorSubject<Repository[]>([]);
  private readonly documentsSubject = new BehaviorSubject<Document[]>([]);
  
  public repositories$ = this.repositoriesSubject.asObservable();
  public documents$ = this.documentsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private keycloakAuthService: KeycloakAuthService
  ) {
    this.loadDataFromStorage();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloakAuthService.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Local Storage Keys with User Context
  private getStorageKey(suffix: string): string {
    const user = this.keycloakAuthService.getCurrentUser();
    const userId = user?.id || user?.email || 'anonymous';
    return `content_services_${userId}_${suffix}`;
  }

  // Load data from localStorage
  private loadDataFromStorage(): void {
    try {
      const repositoriesKey = this.getStorageKey('repositories');
      const documentsKey = this.getStorageKey('documents');
      
      const storedRepositories = localStorage.getItem(repositoriesKey);
      const storedDocuments = localStorage.getItem(documentsKey);
      
      if (storedRepositories) {
        const repositories = JSON.parse(storedRepositories);
        this.repositoriesSubject.next(repositories);
      } else {
        // Initialize with default repositories if none exist
        this.initializeDefaultData();
      }
      
      if (storedDocuments) {
        const documents = JSON.parse(storedDocuments);
        this.documentsSubject.next(documents);
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
      this.initializeDefaultData();
    }
  }

  // Save data to localStorage
  private saveDataToStorage(): void {
    try {
      const repositoriesKey = this.getStorageKey('repositories');
      const documentsKey = this.getStorageKey('documents');
      
      localStorage.setItem(repositoriesKey, JSON.stringify(this.repositoriesSubject.value));
      localStorage.setItem(documentsKey, JSON.stringify(this.documentsSubject.value));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  }

  // Initialize default data for new users
  private initializeDefaultData(): void {
    const defaultRepositories: Repository[] = [
      {
        id: 'repo1',
        name: 'My Documents',
        description: 'Personal document storage'
      },
      {
        id: 'repo2', 
        name: 'Shared Repository',
        description: 'Shared documents and files'
      }
    ];

    const defaultDocuments: Document[] = [
      // Folders
      {
        id: 'folder1',
        path: '/folder1',
        repositoryId: 'repo1',
        type: 'cmis:folder',
        name: 'Documents',
        creationDate: new Date().toISOString(),
        lastModificationDate: new Date().toISOString(),
        createdBy: this.keycloakAuthService.getCurrentUser()?.name || 'Current User'
      },
      {
        id: 'folder2',
        path: '/folder2',
        repositoryId: 'repo1',
        type: 'cmis:folder',
        name: 'Images',
        creationDate: new Date().toISOString(),
        lastModificationDate: new Date().toISOString(),
        createdBy: this.keycloakAuthService.getCurrentUser()?.name || 'Current User'
      },
      {
        id: 'folder3',
        path: '/folder3',
        repositoryId: 'repo2',
        type: 'cmis:folder',
        name: 'Projects',
        creationDate: new Date().toISOString(),
        lastModificationDate: new Date().toISOString(),
        createdBy: this.keycloakAuthService.getCurrentUser()?.name || 'Current User'
      }
    ];

    this.repositoriesSubject.next(defaultRepositories);
    this.documentsSubject.next(defaultDocuments);
    this.saveDataToStorage();
  }

  // Repository Management - Using localStorage
  getRepositories(): Observable<Repository[]> {
    return of(this.repositoriesSubject.value).pipe(
      tap(repositories => {
        if (repositories.length === 0) {
          this.loadDataFromStorage();
        }
      }),
      catchError(error => {
        console.error('Error fetching repositories:', error);
        return throwError(() => error);
      })
    );
  }

  getRepository(repositoryId: string): Observable<Repository> {
    const repo = this.repositoriesSubject.value.find(r => r.id === repositoryId);
    if (repo) {
      return of(repo);
    }
    return throwError(() => new Error('Repository not found'));
  }

  createRepository(repository: Partial<Repository>): Observable<Repository> {
    const newRepo: Repository = {
      id: `repo${Date.now()}`,
      name: repository.name || 'New Repository',
      description: repository.description || '',
      ...repository
    };
    
    const currentRepositories = this.repositoriesSubject.value;
    const updatedRepositories = [...currentRepositories, newRepo];
    
    this.repositoriesSubject.next(updatedRepositories);
    this.saveDataToStorage();
    
    return of(newRepo);
  }

  deleteRepository(repositoryId: string): Observable<void> {
    const currentRepositories = this.repositoriesSubject.value;
    const updatedRepositories = currentRepositories.filter(r => r.id !== repositoryId);
    
    // Also delete all documents in this repository
    const currentDocuments = this.documentsSubject.value;
    const updatedDocuments = currentDocuments.filter(d => d.repositoryId !== repositoryId);
    
    this.repositoriesSubject.next(updatedRepositories);
    this.documentsSubject.next(updatedDocuments);
    this.saveDataToStorage();
    
    return of(void 0);
  }

  // Content Query and Search - Using localStorage
  queryContent(queryRequest: QueryRequest): Observable<Document[]> {
    let results = this.documentsSubject.value;
    
    if (queryRequest.ids) {
      results = results.filter(doc => queryRequest.ids!.includes(doc.id));
    }
    
    if (queryRequest.paths) {
      results = results.filter(doc => queryRequest.paths!.some(path => doc.path.startsWith(path)));
    }
    
    if (queryRequest.repositories) {
      results = results.filter(doc => queryRequest.repositories!.includes(doc.repositoryId));
    }
    
    // Return filtered results WITHOUT overwriting the main documents subject
    return of(results);
  }

  searchContent(searchRequest: SearchRequest): Observable<Document[]> {
    const results = this.documentsSubject.value.filter(doc => 
      doc.name?.toLowerCase().includes(searchRequest.searchTerm.toLowerCase()) ||
      doc.path.toLowerCase().includes(searchRequest.searchTerm.toLowerCase())
    );
    
    // Return search results WITHOUT overwriting the main documents subject
    return of(results);
  }

  // Get content by path (for folders)
  getContentByPath(path: string, repositoryId?: string): Observable<Document[]> {
    const queryRequest: QueryRequest = {
      paths: [path],
      repositories: repositoryId ? [repositoryId] : undefined
    };
    return this.queryContent(queryRequest);
  }

  // Get content by ID
  getContentById(id: string): Observable<Document> {
    const doc = this.documentsSubject.value.find(d => d.id === id);
    if (doc) {
      return of(doc);
    }
    return throwError(() => new Error('Document not found'));
  }

  // Content Stream (for file content) - Mock implementation
  getContentStream(documentId: string): Observable<Blob> {
    const doc = this.documentsSubject.value.find(d => d.id === documentId);
    if (doc) {
      const content = `Mock content for ${doc.name}`;
      return of(new Blob([content], { type: 'text/plain' }));
    }
    return throwError(() => new Error('Document not found'));
  }

  getContentStreamByPath(path: string): Observable<Blob> {
    const doc = this.documentsSubject.value.find(d => d.path === path);
    if (doc) {
      const content = `Mock content for ${doc.name}`;
      return of(new Blob([content], { type: 'text/plain' }));
    }
    return throwError(() => new Error('Document not found'));
  }

  // Save content - Using localStorage
  saveContent(document: Partial<Document>): Observable<Document> {
    const newDoc: Document = {
      id: `doc${Date.now()}`,
      path: document.path || '/',
      repositoryId: document.repositoryId || 'repo1',
      type: document.type || 'cmis:document',
      name: document.name || 'New Document',
      creationDate: new Date().toISOString(),
      lastModificationDate: new Date().toISOString(),
      createdBy: this.keycloakAuthService.getCurrentUser()?.name || 'Current User',
      lastModifiedBy: this.keycloakAuthService.getCurrentUser()?.name || 'Current User',
      ...document
    };
    
    const currentDocuments = this.documentsSubject.value;
    const updatedDocuments = [...currentDocuments, newDoc];
    
    this.documentsSubject.next(updatedDocuments);
    this.saveDataToStorage();
    
    return of(newDoc);
  }

  // Remove content - Using localStorage
  removeContent(removeRequest: { repositoryId: string; ids: string[] }): Observable<void> {
    const currentDocuments = this.documentsSubject.value;
    const updatedDocuments = currentDocuments.filter(doc => 
      !removeRequest.ids.includes(doc.id) || doc.repositoryId !== removeRequest.repositoryId
    );
    
    this.documentsSubject.next(updatedDocuments);
    this.saveDataToStorage();
    
    return of(void 0);
  }

  // Move content - Using localStorage
  moveContent(moveRequest: { documents: Array<{ id: string; targetPath: string }> }): Observable<void> {
    const currentDocuments = this.documentsSubject.value;
    const updatedDocuments = currentDocuments.map(doc => {
      const move = moveRequest.documents.find(m => m.id === doc.id);
      if (move) {
        return {
          ...doc,
          path: move.targetPath,
          lastModificationDate: new Date().toISOString(),
          lastModifiedBy: this.keycloakAuthService.getCurrentUser()?.name || 'Current User'
        };
      }
      return doc;
    });
    
    this.documentsSubject.next(updatedDocuments);
    this.saveDataToStorage();
    
    return of(void 0);
  }

  // Upload content - Using localStorage
  uploadContent(uploadRequest: FormData): Observable<Document> {
    // Extract file information from FormData
    const file = uploadRequest.get('file') as File;
    const targetPath = uploadRequest.get('targetPath') as string;
    const name = uploadRequest.get('name') as string;
    const repositoryId = uploadRequest.get('repositoryId') as string;
    
    if (!file) {
      return throwError(() => new Error('No file provided'));
    }

    // Create a new document with the uploaded file information
    const newDoc: Document = {
      id: `doc${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      path: targetPath ? `${targetPath}/${file.name}` : `/${file.name}`,
      repositoryId: repositoryId || 'repo1',
      type: 'cmis:document',
      name: file.name,
      title: file.name,
      creationDate: new Date().toISOString(),
      lastModificationDate: new Date().toISOString(),
      createdBy: this.keycloakAuthService.getCurrentUser()?.name || 'Current User',
      lastModifiedBy: this.keycloakAuthService.getCurrentUser()?.name || 'Current User',
      contentStreamLength: file.size,
      contentStreamMimeType: file.type,
      contentStreamFileName: file.name,
      contentStreamId: `stream_${Date.now()}`,
      properties: {
        'cmis:name': file.name,
        'cmis:contentStreamLength': file.size,
        'cmis:contentStreamMimeType': file.type,
        'cmis:contentStreamFileName': file.name
      }
    };

    // Add the new document to localStorage
    const currentDocuments = this.documentsSubject.value;
    const updatedDocuments = [...currentDocuments, newDoc];
    
    this.documentsSubject.next(updatedDocuments);
    this.saveDataToStorage();
    
    console.log('File uploaded successfully:', newDoc);
    return of(newDoc);
  }

  // Utility methods
  isFolder(document: Document): boolean {
    return document.type === 'cmis:folder' || document.type === 'bb:folder';
  }

  isFile(document: Document): boolean {
    return document.type === 'cmis:document' || document.type === 'bb:document';
  }

  getFileName(document: Document): string {
    return document.name || document.title || document.path.split('/').pop() || 'Unknown';
  }

  getFileExtension(document: Document): string {
    const fileName = this.getFileName(document);
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  // Initialize data
  initializeData(): Observable<void> {
    return this.getRepositories().pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Error initializing data:', error);
        return throwError(() => error);
      })
    );
  }
} 