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

      <aside class="sidebar">
        <button (click)="goToDashboard()" class="card-button">Home</button>
        <button (click)="goToProfile()" class="card-button">Profile</button>
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
    
    
    <!-- Floating file preview -->
    <div *ngIf="hoveredFile" class="file-hover-preview" [style.left.px]="hoverX" [style.top.px]="hoverY">
      <ng-container [ngSwitch]="hoveredFile.type">
        <img *ngSwitchCase="'png'" [src]="'data:image/png;base64,' + hoveredFile.content" [alt]="hoveredFile.name" />
        <img *ngSwitchCase="'jpg'" [src]="'data:image/jpg;base64,' + hoveredFile.content" [alt]="hoveredFile.name" />
        <img *ngSwitchCase="'jpeg'" [src]="'data:image/jpeg;base64,' + hoveredFile.content" [alt]="hoveredFile.name" />
        <video *ngSwitchCase="'mp4'" [src]="'data:video/mp4;base64,' + hoveredFile.content" muted autoplay loop style="max-width:120px;max-height:80px;border-radius:6px;"></video>
        <div *ngSwitchCase="'pdf'" class="hover-pdf-icon">📕<div>{{ hoveredFile.name }}</div></div>
        <pre *ngSwitchCase="'txt'">{{ hoveredFile.content | slice:0:100 }}{{ hoveredFile.content.length > 100 ? '...' : '' }}</pre>
        <pre *ngSwitchCase="'json'">{{ formatJson(hoveredFile.content) | slice:0:100 }}{{ hoveredFile.content.length > 100 ? '...' : '' }}</pre>
        <pre *ngSwitchCase="'xml'">{{ hoveredFile.content | slice:0:100 }}{{ hoveredFile.content.length > 100 ? '...' : '' }}</pre>
      </ng-container>
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
    <!-- Add Repo Modal -->
    <div *ngIf="showAddRepoModal" class="modal-overlay" (click)="closeAddRepoModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h3>Add Repository</h3>
        <input [(ngModel)]="newRepoName" placeholder="Repository name" />
        <button (click)="addRepoFromModal()">Add</button>
        <button (click)="closeAddRepoModal()">Cancel</button>
      </div>
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
</main>'