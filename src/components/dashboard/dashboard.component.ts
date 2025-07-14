import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { LocalContentService } from '../../services/local-content.service';
import { Repository, Folder, FileItem } from '../../models/content.model';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
        <button (click)="goToDashboard" class="card-button">Home</button>
        <button (click)="showRepoForm = true" *ngIf="!showRepoForm" class="card-button">Shared with me</button>
          <h2>Repositories</h2>
          <button (click)="showRepoForm = true" *ngIf="!showRepoForm" class="add-btn">Add Repo</button>
          <form *ngIf="showRepoForm" (ngSubmit)="addRepository()" class="repo-form">
            <input [(ngModel)]="newRepoName" name="repoName" placeholder="New repository name" required />
            <button type="submit">Add Repo</button>
            <button type="button" (click)="showRepoForm = false">Cancel</button>
          </form>
          <ul class="repo-list">
            <li *ngFor="let repo of repositories">
              <div class="repo-name" (click)="selectRepo(repo)">
                <span [class.expanded]="repo === selectedRepo">&#9654;</span> {{ repo.name }}
                <button class="more-btn" (click)="toggleRepoOptions(repo, $event)">...</button>
                <div *ngIf="repo === repoOptionsRepo" class="repo-options">
                  <button (click)="showFolderFormRepoId = repo.id; repoOptionsRepo = null">Add Folder</button>
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
                <form *ngIf="showFolderFormRepoId === repo.id" (ngSubmit)="addFolder()" class="folder-form child-form">
                  <input [(ngModel)]="newFolderName" name="folderName" placeholder="New folder name" required />
                  <button type="submit">Add Folder</button>
                  <button type="button" (click)="showFolderFormRepoId = null">Cancel</button>
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
       
    
    <label class="plus-sign" title="Click to choose file">
      +
      <input type="file" (change)="onFileSelected($event)" hidden />
    </label>

    <div *ngIf="showDropzoneText" class="dropzone-text">
      Drag & drop a file here or click + to add to '{{selectedFolder.name}}'
    </div>
  </div>

  <!-- File preview stays the same -->
  <div *ngIf="previewFile" class="file-preview-card">
    <div *ngIf="previewFile.type === 'png'">
      <img [src]="'data:image/png;base64,' + previewFile.base64"
           [style.maxWidth.px]="200" [style.maxHeight.px]="200" />
      <div>Resolution: {{previewFile.width}} x {{previewFile.height}}</div>
    </div>
    <div>Name: {{previewFile.name}}</div>
    <div>Type: {{previewFile.type}}</div>
    <div>Added by: {{previewFile.addedBy}}</div>
    <div>Timestamp: {{ previewFile.timestamp | date:'short' }}</div>
    <button (click)="confirmPreviewUpload()">Confirm Upload</button>
    <button (click)="cancelPreviewUpload()">Cancel</button>
  </div>


            <div *ngIf="selectedFolder.files.length > 0" class="folder-files-list">
              <h3>Files in '{{selectedFolder.name}}'</h3>
              <div class="file-grid">
                <div class="file-card" *ngFor="let file of selectedFolder.files">
                  <div class="file-preview">
                    <img *ngIf="file.type === 'png' || file.type === 'jpg' || file.type === 'jpeg'" [src]="'data:image/' + file.type + ';base64,' + file.content" alt="{{file.name}}" />
                    <span *ngIf="file.type === 'txt' || file.type === 'json' || file.type === 'xml'" class="file-icon">{{ fileTypeIcon(file.type) }}</span>
                    <span *ngIf="file.type === 'mp4'" class="file-icon">{{ fileTypeIcon(file.type) }}</span>
                  </div>
                  <div class="file-info">
                    <div class="file-name">{{ file.name }}</div>
                    <div class="file-type">({{ file.type }})</div>
                    <div class="file-meta">Added by: {{ file.addedBy }}</div>
                    <div class="file-meta">{{ file.timestamp | date:'short' }}</div>
                  </div>
                  <button (click)="previewModalFile = file">Preview</button>
                  <button (click)="deleteFile(file, $event)">Delete</button>
                </div>
              </div>
              <div *ngIf="previewModalFile" class="preview-modal" (click)="closePreviewModal()">
                <div class="preview-modal-content" (click)="$event.stopPropagation()">
                  <button class="close-btn" (click)="closePreviewModal()">&times;</button>
                  <ng-container [ngSwitch]="previewModalFile.type">
                    <img *ngSwitchCase="'png'" [src]="'data:image/png;base64,' + previewModalFile.content" [alt]="previewModalFile.name" />
                    <img *ngSwitchCase="'jpg'" [src]="'data:image/jpg;base64,' + previewModalFile.content" [alt]="previewModalFile.name" />
                    <img *ngSwitchCase="'jpeg'" [src]="'data:image/jpeg;base64,' + previewModalFile.content" [alt]="previewModalFile.name" />
                    <embed *ngSwitchCase="'pdf'" [src]="getSafePdfUrl(previewModalFile.content)" type="application/pdf" style="width:80vw; height:60vh; border-radius:8px; background:#fff;" />
                    <video *ngSwitchCase="'mp4'" controls [src]="'data:video/mp4;base64,' + previewModalFile.content" style="max-width: 100%; max-height: 70vh;"></video>
                    <pre *ngSwitchCase="'txt'">{{ previewModalFile.content }}</pre>
                    <pre *ngSwitchCase="'json'">{{ formatJson(previewModalFile.content) }}</pre>
                    <pre *ngSwitchCase="'xml'">{{ formatXml(previewModalFile.content) }}</pre>
                  </ng-container>
                  <div class="file-meta">{{ previewModalFile.name }} ({{ previewModalFile.type }})</div>
                </div>
              </div>
            </div>
          </div>
          <ng-container *ngIf="!selectedFolder">
            <!-- Folders grid -->
            <div class="folders-grid-section">
              <h3>Folders</h3>
              <div class="folders-grid">
                <div class="folder-card" *ngFor="let folder of getAllFolders()" (click)="selectFolderFromGrid(folder)">
                  <div class="folder-icon">📁</div>
                  <div class="folder-name">{{ folder.name }}</div>
                  <div class="folder-path">{{ folder.repoName }}/{{ folder.name }}</div>
                </div>
              </div>
            </div>
            <div class="welcome-section">
              <h2>Welcome back, {{ user?.name }}!</h2>
              <p>You have successfully logged in to your account.</p>
            </div>
            <!-- Recent files section -->
            <div class="recent-files-section">
              <h3>Recent Files</h3>
              <table class="recent-files-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Propriétaire</th>
                    <th>Emplacement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let file of getRecentFiles()">
                    <td>
                      <span class="file-icon">{{ fileTypeIcon(file.type) }}</span>
                      <span class="file-name">{{ file.name }}</span>
                    </td>
                    <td>{{ file.type | uppercase }}</td>
                    <td>{{ file.timestamp | date:'dd MMM yyyy, HH:mm' }}</td>
                    <td>{{ file.addedBy }}</td>
                    <td>{{ file.repoName }} / {{ file.folderName }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Floating add button -->
            <button
              class="fab"
              (click)="openAddMenu()"
              #fabBtn
              [attr.data-fab-btn]="true"
              (mouseenter)="fabBtnRef = fabBtn"
              (mouseleave)="fabBtnRef = fabBtn"
            >
              <span
                class="fab-plus"
                [style.transform]="'translate(' + fabPlusOffsetX + 'px,' + fabPlusOffsetY + 'px)'"
              >+</span>
            </button>
            <div *ngIf="showAddMenu" class="fab-menu" (clickOutside)="closeAddMenu()">
              <button (click)="openAddRepo()">Add Repo</button>
              <button (click)="openAddFolder()">Add Folder</button>
            </div>
            <!-- Add Folder Modal -->
            <div *ngIf="showAddFolderModal" class="modal-overlay" (click)="closeAddFolderModal()">
              <div class="modal-content" (click)="$event.stopPropagation()">
                <h3>Add Folder</h3>
                <div class="add-folder-mode-toggle">
                  <button [class.active]="addFolderMode === 'existing'" (click)="addFolderMode = 'existing'">Add to Existing Repo</button>
                  <button [class.active]="addFolderMode === 'new'" (click)="addFolderMode = 'new'">New Repo</button>
                </div>
                <ng-container *ngIf="addFolderMode === 'existing'">
                  <label>Repository:
                    <select [(ngModel)]="addFolderRepoId">
                      <option *ngFor="let repo of repositories" [value]="repo.id">{{ repo.name }}</option>
                    </select>
                  </label>
                </ng-container>
                <ng-container *ngIf="addFolderMode === 'new'">
                  <input [(ngModel)]="newRepoNameForFolder" placeholder="New repository name" />
                </ng-container>
                <input [(ngModel)]="newFolderName" placeholder="Folder name" />
                <button (click)="confirmAddFolder()">Add</button>
                <button (click)="closeAddFolderModal()">Cancel</button>
              </div>
            </div>
          </ng-container>
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
      /* Add extra space between sidebar elements */
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
    .repo-list > li {
      margin-bottom: 1.2rem;
    }
    .repo-name {
      cursor: pointer;
      font-weight: 600;
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 2px solid white;
      border-radius: 8px;
      padding: 0.5rem 0.7rem;
      background: rgba(255,255,255,0.03);
      transition: border 0.2s, background 0.2s;
    }
    .repo-name:hover, .repo-name:focus {
      background: rgba(255,255,255,0.08);
      border-color: #F87060;
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
    .folder-list > li {
      margin-bottom: 0.7rem;
    }
    .folder-list li {
      font-size: 0.98rem;
      margin-bottom: 0.15rem;
      color: #b0c4de;
    }
    .folder-name {
      position: relative;
      border: 2px solid white;
      border-radius: 8px;
      padding: 0.35rem 0.6rem;
      background: rgba(255,255,255,0.02);
      margin-bottom: 0.2rem;
      transition: border 0.2s, background 0.2s;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .folder-name:hover, .folder-name:focus {
      background: rgba(255,255,255,0.08);
      border-color: #F87060;
    }
    .folder-name span {
      display: inline-block;
      transition: transform 0.2s;
    }
    .folder-name span.expanded {
      transform: rotate(90deg);
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
      cursor: pointer;
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
    .file-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .file-card {
      background: #22304a;
      border-radius: 10px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      color: #fff;
      position: relative;
    }
    .file-preview {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;
    }
    .file-preview img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 6px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.12);
    }
    .file-icon {
      font-size: 2.5rem;
      color: #F87060;
    }
    .file-info {
      text-align: center;
      margin-bottom: 0.5rem;
    }
    .file-name {
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 0.2rem;
    }
    .file-type {
      color: #b0c4de;
      font-size: 0.95rem;
      margin-bottom: 0.2rem;
    }
    .file-meta {
      color: #b0c4de;
      font-size: 0.85rem;
    }
    .file-card button {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.3rem 0.7rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      transition: background-color 0.2s ease;
    }
    .file-card button:hover {
      background: #c0392b;
    }
    .file-preview-card {
      background: #3a4651;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: white;
      font-size: 0.95rem;
    }
    .file-preview-card img {
      max-width: 200px;
      max-height: 200px;
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }
    .file-preview-card button {
      background: linear-gradient(135deg, #102542 0%, #F87060 100%);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
      width: 100%;
    }
    .file-preview-card button:hover {
      background: #1a367b;
    }
    .add-btn {
      background: #1abc9c;
      color: white;
      border: none;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
      transition: background 0.2s;
    }
    .add-btn:hover {
      background: #16a085;
    }
    .loading-spinner {
      border: 6px solid #f3f3f3;
      border-top: 6px solid #F87060;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      animation: spin 1s linear infinite;
      margin: 1.5rem auto;
      display: block;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .preview-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .preview-modal-content {
      background: #22304a;
      border-radius: 12px;
      padding: 2rem 2.5rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      max-width: 90vw;
      max-height: 80vh;
      overflow: auto;
      position: relative;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .preview-modal-content img, .preview-modal-content video {
      max-width: 80vw;
      max-height: 60vh;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .preview-modal-content pre {
      background: #2a3441;
      color: #fff;
      padding: 1rem;
      border-radius: 8px;
      max-width: 70vw;
      max-height: 50vh;
      overflow: auto;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
    .close-btn {
      position: absolute;
      top: 0.5rem;
      right: 1rem;
      background: none;
      border: none;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
      z-index: 10;
    }
    .folders-grid-section {
      margin-bottom: 2rem;
    }
    .folders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.2rem;
      margin-top: 1rem;
    }
    .folder-card {
      background: #22304a;
      border-radius: 10px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      color: #fff;
      cursor: pointer;
      transition: background 0.18s, box-shadow 0.18s;
    }
    .folder-card:hover {
      background: #2a3441;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    .folder-icon {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
    }
    .folder-path {
      color: #b0c4de;
      font-size: 0.92rem;
      margin-top: 0.2rem;
      font-style: italic;
      opacity: 0.85;
    }
    .repo-name {
      color: #b0c4de;
      font-size: 0.95rem;
    }
    .recent-files-section {
      margin-top: 2.5rem;
      margin-bottom: 2rem;
    }
    .recent-files-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1.2rem;
    }
    .recent-file-card {
      background: #22304a;
      border-radius: 10px;
      padding: 0.8rem 1.2rem;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 180px;
      max-width: 220px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .recent-file-card .file-icon {
      font-size: 1.5rem;
      margin-bottom: 0.2rem;
    }
    .recent-file-card .file-name {
      font-weight: 600;
      font-size: 1.05rem;
    }
    .recent-file-card .file-type {
      color: #b0c4de;
      font-size: 0.95rem;
    }
    .recent-file-card .file-meta {
      color: #b0c4de;
      font-size: 0.85rem;
    }
    .fab {
      overflow: hidden;
      position: fixed;
      bottom: 2.5rem;
      right: 2.5rem;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #102542 0%, #F87060 100%);
      color: #fff;
      font-size: 2.5rem;
      border: none;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      cursor: pointer;
      z-index: 1200;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.18s;
    }
    .fab:hover {
      background: linear-gradient(135deg, #F87060 0%, #102542 100%);
    }
    .fab-menu {
      position: fixed;
      bottom: 7.5rem;
      right: 2.5rem;
      background: #22304a;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      padding: 1rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      z-index: 1201;
    }
    .fab-menu button {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0.5rem 0;
      text-align: left;
      transition: color 0.18s;
    }
    .fab-menu button:hover {
      color: #F87060;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1300;
    }
    .modal-content {
      background: #22304a;
      border-radius: 12px;
      padding: 2rem 2.5rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      color: #fff;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 320px;
      max-width: 90vw;
    }
    .recent-files-table {
      width: 100%;
      border-collapse: collapse;
      background: #22304a;
      border-radius: 12px;
      overflow: hidden;
      margin-top: 1rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .recent-files-table th, .recent-files-table td {
      padding: 0.85rem 1.2rem;
      text-align: left;
      color: #fff;
      font-size: 1rem;
    }
    .recent-files-table th {
      background: #2a3441;
      font-weight: 600;
      border-bottom: 2px solid #34405a;
    }
    .recent-files-table tr:not(:last-child) td {
      border-bottom: 1px solid #34405a;
    }
    .recent-files-table .file-icon {
      font-size: 1.3rem;
      margin-right: 0.5rem;
      vertical-align: middle;
    }
    .recent-files-table .file-name {
      font-weight: 500;
      vertical-align: middle;
    }
    .fab-plus {
      display: inline-block;
      transition: transform 0.05s cubic-bezier(0.4,0,0.2,1);
      font-size: 2.5rem;
      pointer-events: none;
      user-select: none;
    }
    .add-folder-mode-toggle {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .add-folder-mode-toggle button {
      background: #2a3441;
      color: #fff;
      border: none;
      padding: 0.5rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.18s, color 0.18s;
    }
    .add-folder-mode-toggle button.active, .add-folder-mode-toggle button:hover {
      background: #F87060;
      color: #fff;
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
  renamingRepo: Repository | null = null;
  renameRepoName = '';
  newFolderName = '';
  renamingFolder: Folder | null = null;
  renameFolderName = '';
  newFileName = '';
  newFileType: 'png' | 'jpg' | 'jpeg' | 'json' | 'xml' | 'txt' | 'mp4' | 'pdf' = 'json';
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
  showAddFolderModal = false;
  addFolderRepoId: string | null = null;
  addFolderMode: 'existing' | 'new' = 'existing';
  newRepoNameForFolder = '';
  fabPlusOffsetX = 0;
  fabPlusOffsetY = 0;
  fabBtnRef: HTMLElement | null = null;

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
    document.addEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    document.addEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
  }
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
    document.removeEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    document.removeEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
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
    this.showDropzoneText = true;
    this.showFolderFormRepoId = null;
  }
  selectFolder(folder: Folder): void{
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
    this.newFileType = 'json';
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
    this.router.navigate(['/Dashboard']);
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
  openAddRepo(): void { this.showRepoForm = true; this.showAddMenu = false; }
  openAddFolder(): void { this.showAddFolderModal = true; this.showAddMenu = false; }
  closeAddFolderModal(): void { this.showAddFolderModal = false; this.addFolderRepoId = null; }
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
}