import { Injectable } from '@angular/core';
import { Repository, Folder, FileItem } from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class LocalContentService {
  private readonly REPOS_KEY = 'repositories';

  private saveRepositories(repos: Repository[]) {
    localStorage.setItem(this.REPOS_KEY, JSON.stringify(repos));
  }

  private getRepositoriesFromStorage(): Repository[] {
    const data = localStorage.getItem(this.REPOS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getRepositories(): Repository[] {
    return this.getRepositoriesFromStorage();
  }

  addRepository(name: string): string {
    const repos = this.getRepositoriesFromStorage();
    const id = this.generateId();
    repos.push({ id, name, folders: [] });
    this.saveRepositories(repos);
    return id;
  }

  renameRepository(id: string, newName: string): void {
    const repos = this.getRepositoriesFromStorage();
    const repo = repos.find(r => r.id === id);
    if (repo) repo.name = newName;
    this.saveRepositories(repos);
  }

  deleteRepository(id: string): void {
    let repos = this.getRepositoriesFromStorage();
    repos = repos.filter(r => r.id !== id);
    this.saveRepositories(repos);
  }

  addFolder(repoId: string, folderName: string): void {
    const repos = this.getRepositoriesFromStorage();
    const repo = repos.find(r => r.id === repoId);
    if (repo) {
      repo.folders.push({ id: this.generateId(), name: folderName, files: [] });
      this.saveRepositories(repos);
    }
  }

  renameFolder(repoId: string, folderId: string, newName: string): void {
    const repos = this.getRepositoriesFromStorage();
    const repo = repos.find(r => r.id === repoId);
    const folder = repo?.folders.find(f => f.id === folderId);
    if (folder) folder.name = newName;
    this.saveRepositories(repos);
  }

  deleteFolder(repoId: string, folderId: string): void {
    const repos = this.getRepositoriesFromStorage();
    const repo = repos.find(r => r.id === repoId);
    if (repo) {
      repo.folders = repo.folders.filter(f => f.id !== folderId);
      this.saveRepositories(repos);
    }
  }

  addFile(repoId: string, folderId: string, file: FileItem): void {
    const repos = this.getRepositoriesFromStorage();
    const repo = repos.find(r => r.id === repoId);
    const folder = repo?.folders.find(f => f.id === folderId);
    if (folder) {
      folder.files.push(file);
      this.saveRepositories(repos);
    }
  }

  updateFile(repoId: string, folderId: string, fileId: string, newFile: FileItem): void {
    const repos = this.getRepositoriesFromStorage();
    const repo = repos.find(r => r.id === repoId);
    const folder = repo?.folders.find(f => f.id === folderId);
    if (folder) {
      folder.files = folder.files.map(f => f.id === fileId ? newFile : f);
      this.saveRepositories(repos);
    }
  }

  deleteFile(repoId: string, folderId: string, fileId: string): void {
    const repos = this.getRepositoriesFromStorage();
    const repo = repos.find(r => r.id === repoId);
    const folder = repo?.folders.find(f => f.id === folderId);
    if (folder) {
      folder.files = folder.files.filter(f => f.id !== fileId);
      this.saveRepositories(repos);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
} 