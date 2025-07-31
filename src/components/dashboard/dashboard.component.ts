import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { KeycloakAuthService } from '../../services/keycloak-auth.service';
import { User } from '../../models/user.model';
import { LocalContentService } from '../../services/local-content.service';
import { Repository, Folder, FileItem } from '../../models/content.model';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CreateExperienceModalComponent } from '../create-experience-modal/create-experience-modal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateExperienceModalComponent,
    SidebarComponent,
  ],
  template: `
    <div class="dashboard-container">
      <app-sidebar 
        [userName]="user?.name || 'User'"
        [activeItem]="'dashboard'"
        (sidebarVisibilityChange)="onSidebarVisibilityChange($event)">
      </app-sidebar>
      <app-create-experience-modal
        [show]="showCreateExperienceModal"
        (close)="showCreateExperienceModal = false"
        (create)="handleCreateExperience($event)"></app-create-experience-modal>
      <div class="dashboard-profile-bar top-right-profile-bar">
        <div class="profile-info-bar">
          <div class="user-avatar"></div>
              <span class="user-name">{{ user?.name }}</span>
          <button class="logout-btn-blue" (click)="logout()">Logout</button>
            </div>
          </div>
      <div class="dashboard-body" [class.sidebar-visible]="sidebarVisible">
        <main class="dashboard-main">
          <div class="dashboard-header-row">
            <span class="back-arrow">←</span>
            <h2 class="dashboard-title">Value content services app</h2>
            <input class="search-bar" placeholder="Search" />
    </div>
          <div class="folders-section">
            <div class="folders-header">
              <h3>Folders</h3>
              <div class="layout-toggle">
                <button 
                  class="layout-btn" 
                  [class.active]="folderLayout === 'card'"
                  (click)="folderLayout = 'card'">
                  <img src="/assets/card.png" alt="Card Layout" class="layout-icon">
                </button>
                <button 
                  class="layout-btn" 
                  [class.active]="folderLayout === 'grid'"
                  (click)="folderLayout = 'grid'">
                  <img src="/assets/grid.png" alt="Grid Layout" class="layout-icon">
                </button>
                <button 
                  class="layout-btn" 
                  [class.active]="folderLayout === 'table'"
                  (click)="folderLayout = 'table'">
                  <img src="/assets/layout.png" alt="Table Layout" class="layout-icon">
                </button>
  </div>
  </div>

            <!-- Single container with dynamic classes for smooth transitions -->
            <div class="folders-list" [ngClass]="{
              'folders-card': folderLayout === 'card',
              'folders-grid': folderLayout === 'grid',
              'folders-table': folderLayout === 'table'
            }">
              <div class="folder-item" *ngFor="let folder of getAllFolders()" [ngClass]="{
                'folder-card': folderLayout === 'card',
                'folder-grid-item': folderLayout === 'grid',
                'folder-table-item': folderLayout === 'table'
              }">
                <img src="/assets/open-folder.png" alt="Folder" [ngClass]="{
                  'folder-icon': folderLayout === 'card' || folderLayout === 'grid',
                  'folder-icon-small': folderLayout === 'table'
                }">
                <div class="folder-content" [ngClass]="{
                  'folder-details': folderLayout === 'table'
                }">
                  <span class="folder-name" [ngClass]="{
                    'folder-path': folderLayout === 'table'
                  }">{{ folder.name }}</span>
                  <span class="folder-path" *ngIf="folderLayout === 'table'">{{ folder.repoName }} / {{ folder.name }}</span>
                  </div>
                <span class="folder-files" *ngIf="folderLayout === 'table'">{{ folder.files.length }} files</span>
                  </div>
                </div>
              </div>
          <div class="files-section">
            <div class="files-header">
              <h3>Files</h3>
              <div class="layout-toggle">
                <button 
                  class="layout-btn" 
                  [class.active]="fileLayout === 'card'"
                  (click)="fileLayout = 'card'">
                  <img src="/assets/card.png" alt="Card Layout" class="layout-icon">
                </button>
                <button 
                  class="layout-btn" 
                  [class.active]="fileLayout === 'grid'"
                  (click)="fileLayout = 'grid'">
                  <img src="/assets/grid.png" alt="Grid Layout" class="layout-icon">
                </button>
                <button 
                  class="layout-btn" 
                  [class.active]="fileLayout === 'table'"
                  (click)="fileLayout = 'table'">
                  <img src="/assets/layout.png" alt="Table Layout" class="layout-icon">
                </button>
                </div>
              </div>
            
            <!-- Single container with dynamic classes for smooth transitions -->
            <div class="files-list" [ngClass]="{
              'files-card': fileLayout === 'card',
              'files-grid': fileLayout === 'grid',
              'files-table': fileLayout === 'table'
            }">
              <div class="file-item" *ngFor="let file of getAllFiles()" [ngClass]="{
                'file-row': fileLayout === 'card',
                'file-grid-item': fileLayout === 'grid',
                'file-table-item': fileLayout === 'table'
              }"
                      (mouseenter)="showFilePreview(file, $event)"
                      (mousemove)="moveFilePreview($event)"
                      (mouseleave)="hideFilePreview()">
                <img [src]="getFileTypeIcon(file.type)" [alt]="file.type" [ngClass]="{
                  'file-icon': fileLayout === 'card' || fileLayout === 'grid',
                  'file-icon-small': fileLayout === 'table'
                }">
                <div class="file-content" [ngClass]="{
                  'file-details': fileLayout === 'table'
                }">
                  <span class="file-name" [ngClass]="{
                    'file-path': fileLayout === 'table'
                  }">{{ file.name }}</span>
                  <span class="file-path" *ngIf="fileLayout === 'table'">{{ file.repoName }} / {{ file.folderName }} / {{ file.name }}</span>
            </div>
                <span class="file-type" *ngIf="fileLayout === 'table'">{{ file.type.toUpperCase() }}</span>
              </div>
            </div>
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
          </div>
          <button class="fab" (click)="showCreateExperienceModal = true" #fabBtn
            [style.bottom]="'2.5rem'"
            [style.right]="'2.5rem'"
              (mouseenter)="fabBtnRef = fabBtn"
            (mouseleave)="fabBtnRef = fabBtn">
            <span class="fab-plus" [style.transform]="'translate(' + fabPlusOffsetX + 'px,' + fabPlusOffsetY + 'px)'">+</span>
            </button>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      color: #1a202c;
    }
    .dashboard-container {
      min-height: 100vh;
      background: #f7f9fb;
      display: flex;
      flex-direction: column;
    }
    .dashboard-profile-bar.top-right-profile-bar {
      width: 100%;
      background: #f7f9fb;
      box-shadow: none;
      padding: 0 2rem;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
    }
    .profile-info-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .user-avatar::before {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 16px;
      height: 16px;
      background: #cbd5e1;
      border-radius: 50%;
      transform: translate(-50%, -60%);
    }
    .user-avatar::after {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      top: 70%;
      width: 20px;
      height: 8px;
      background: #cbd5e1;
      border-radius: 8px 8px 12px 12px;
      transform: translate(-50%, -50%);
    }
    .user-name {
      font-weight: 600;
      color: #1a202c;
      font-size: 1.05rem;
    }
    .logout-btn-blue {
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
      transition: background 0.2s;
    }
    .logout-btn-blue:hover {
      background: #1746a2;
    }
    .dashboard-body {
      display: flex;
      flex-direction: row;
      width: 100%;
      min-height: 0;
      margin-top: 64px;
      margin-left: 0;
      background: #f7f9fb;
      transition: margin-left 0.3s ease;
    }
    
    .dashboard-body.sidebar-visible {
      margin-left: 260px;
    }

    .dashboard-main {
      flex: 1;
      padding: 2.5rem 3rem 2rem 3rem;
      background: #f7f9fb;
      min-height: 100vh;
      width: 100%;
      box-sizing: border-box;
    }
    .dashboard-header-row {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    .back-arrow {
      font-size: 1.3rem;
      color: #64748b;
      cursor: pointer;
      margin-right: 0.5rem;
    }
    .dashboard-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0;
      flex: 1;
    }
    .search-bar {
      background: #f7f9fb;
      border: none;
      border-radius: 12px;
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      width: 320px;
      color: #1a202c;
      outline: none;
      box-shadow: none;
      margin-right: 1rem;
    }
    .create-btn {
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
      transition: background 0.2s;
    }
    .create-btn:hover {
      background: #1746a2;
    }
    .folders-section {
      margin-bottom: 2.5rem;
    }
    .folders-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .folders-header h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a202c;
    }
    .layout-toggle {
      display: flex;
      gap: 0.5rem;
      position: relative;
      background: #e5e7eb;
      border-radius: 8px;
      padding: 0.25rem;
    }
    .layout-btn {
      background: transparent;
      color: #4b5563;
      border: none;
      border-radius: 6px;
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      position: relative;
      min-width: fit-content;
      }
    .layout-btn:hover {
      background: #d1d5db;
      color: #374151;
    }
    .layout-btn.active {
      background: #2563eb;
      color: #fff;
      box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
    }
    .layout-btn.active:hover {
      background: #1d4ed8;
    }
    .layout-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
      filter: brightness(0) saturate(100%);
      transition: filter 0.2s ease-in-out;
    }
    .layout-btn.active .layout-icon {
      filter: brightness(0) saturate(100%) invert(1);
    }
    .folders-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .folders-list.folders-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .folders-list.folders-table {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .folder-item {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }
    .folder-item.folder-card {
      background: #f1f6fe;
      color: #2563eb;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      font-weight: 600;
      font-size: 1.05rem;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.04);
      cursor: pointer;
      border: none;
      width: auto;
      height: auto;
      transform: scale(1);
    }
    .folder-item.folder-card:hover {
      background: #e7f0fe;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
    }
    .folder-item.folder-grid-item {
      background: #f1f6fe;
      color: #2563eb;
      border-radius: 12px;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      font-weight: 600;
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.04);
      cursor: pointer;
      border: none;
      text-align: center;
      min-height: 140px;
      width: 100%;
      transform: scale(1.1);
    }
    .folder-item.folder-grid-item:hover {
      background: #e7f0fe;
      transform: translateY(-2px) scale(1.12);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
    }
    .folder-item.folder-table-item {
      background: #f1f6fe;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      color: #1a202c;
      font-size: 1.05rem;
      box-shadow: 0 1px 4px rgba(100, 116, 139, 0.04);
      cursor: pointer;
      border: none;
      width: 100%;
      transform: scale(0.95);
    }
    .folder-item.folder-table-item:hover {
      background: #e7f0fe;
      transform: translateX(4px) scale(0.97);
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
    }
    .folders-table .folder-icon-small {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
    .folders-table .folder-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .folders-table .folder-name {
      font-weight: 600;
      color: #1a202c;
      font-size: 1rem;
    }
    .folders-table .folder-path {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 2px;
    }
    .folders-table .folder-files {
      font-size: 0.8rem;
      color: #64748b;
      margin-left: 1rem;
    }
    .files-section {
      margin-bottom: 2.5rem;
    }
    .files-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .files-header h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a202c;
    }
    .files-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .files-list.files-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .files-list.files-table {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .file-item {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }
    .file-item.file-row {
      background: #f1f6fe;
      color: #2563eb;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      font-weight: 600;
      font-size: 1.05rem;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.04);
      cursor: pointer;
      border: none;
      width: auto;
      height: auto;
      transform: scale(1);
    }
    .file-item.file-row:hover {
      background: #e7f0fe;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
    }
    .file-item.file-grid-item {
      background: #f1f6fe;
      color: #2563eb;
      border-radius: 12px;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      font-weight: 600;
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.04);
      cursor: pointer;
      border: none;
      text-align: center;
      min-height: 140px;
      width: 100%;
      transform: scale(1.1);
    }
    .file-item.file-grid-item:hover {
      background: #e7f0fe;
      transform: translateY(-2px) scale(1.12);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
    }
    .file-item.file-table-item {
      background: #f1f6fe;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      color: #1a202c;
      font-size: 1.05rem;
      box-shadow: 0 1px 4px rgba(100, 116, 139, 0.04);
      cursor: pointer;
      border: none;
      width: 100%;
      transform: scale(0.95);
    }
    .file-item.file-table-item:hover {
      background: #e7f0fe;
      transform: translateX(4px) scale(0.97);
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
    }
    .files-table .file-icon-small {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
    .files-table .file-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .files-table .file-name {
      font-weight: 600;
      color: #1a202c;
      font-size: 1rem;
    }
    .files-table .file-path {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 2px;
    }
    .files-table .file-type {
      font-size: 0.8rem;
      color: #64748b;
      margin-left: 1rem;
    }
    .file-hover-preview {
      position: fixed;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 10px;
      z-index: 1000;
      max-width: 200px;
      max-height: 150px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .file-hover-preview img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    .hover-pdf-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #2563eb;
    }
    .hover-pdf-icon div {
      font-size: 0.75rem;
      text-align: center;
      margin-top: 5px;
      color: #64748b;
    }
    .fab {
      overflow: hidden;
      position: fixed;
      bottom: 2.5rem;
      right: 2.5rem;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #1a367b;
      color: #fff;
      font-size: 2.5rem;
      border: none;
      box-shadow: 0 4px 16px rgba(26, 54, 123, 0.18);
      cursor: pointer;
      z-index: 1200;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.18s;
    }
    .fab:hover {
      background: #1560bd;
    }
    .fab-plus {
      display: inline-block;
      transition: transform 0.05s cubic-bezier(0.4,0,0.2,1);
      font-size: 2.5rem;
      pointer-events: none;
      user-select: none;
      color: #fff;
    }
    @media (max-width: 900px) {
      .dashboard-main {
        padding: 2.5rem 1rem 2rem 1rem;
        margin-left: 0;
      }
      .dashboard-body {
        margin-left: 0 !important;
      }
      .dashboard-body.sidebar-visible {
        margin-left: 0 !important;
    }
      .dashboard-profile-bar.top-right-profile-bar {
        padding: 0 1rem;
      }
    }
    .folder-icon, .folder-icon-small {
      width: 24px;
      height: 24px;
      object-fit: contain;
      transition: transform 0.3s ease-in-out;
    }
    .folder-icon-small {
      width: 20px;
      height: 20px;
    }
    .folder-content {
      display: flex;
      align-items: center;
      gap: 0.7rem;
    }
    .folder-content.folder-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .folder-name {
      font-weight: 600;
      color: #2563eb;
      font-size: 1.05rem;
    }
    .folder-name.folder-path {
      font-weight: 600;
      color: #1a202c;
      font-size: 1rem;
    }
    .folder-path {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 2px;
    }
    .folder-files {
      font-size: 0.8rem;
      color: #64748b;
      margin-left: 1rem;
    }
    .file-icon, .file-icon-small {
      width: 24px;
      height: 24px;
      object-fit: contain;
      transition: transform 0.3s ease-in-out;
    }
    .file-icon-small {
      width: 20px;
      height: 20px;
    }
    .file-content {
      display: flex;
      align-items: center;
      gap: 0.7rem;
    }
    .file-content.file-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .file-name {
      font-weight: 600;
      color: #2563eb;
      font-size: 1.05rem;
    }
    .file-name.file-path {
      font-weight: 600;
      color: #1a202c;
      font-size: 1rem;
    }
    .file-path {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 2px;
    }
    .file-type {
      font-size: 0.8rem;
      color: #64748b;
      margin-left: 1rem;
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
  showAddRepoModal = false;
  showAddFolderModal = false;
  addFolderRepoId: string | null = null;
  addFolderMode: 'existing' | 'new' = 'existing';
  newRepoNameForFolder = '';
  fabPlusOffsetX = 0;
  fabPlusOffsetY = 0;
  fabBtnRef: HTMLElement | null = null;
  showCreateExperienceModal = false;
  sidebarVisible = false;
  folderLayout: 'card' | 'grid' | 'table' = 'card';
  fileLayout: 'card' | 'grid' | 'table' = 'card';

  // Hover preview state
  hoveredFile: (FileItem & { folderName: string, repoName: string }) | null = null;
  hoverX = 0;
  hoverY = 0;
  hoverTimeout: any = null;

  constructor(
    private keycloakAuthService: KeycloakAuthService,
    private router: Router,
    private contentService: LocalContentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.keycloakAuthService.getCurrentUser();
    this.loadRepositories();
    document.addEventListener('click', this.handleClickOutside.bind(this));
    document.addEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    document.addEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
  }
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
    document.removeEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    document.removeEventListener('mouseleave', this.handleGlobalMouseLeave.bind(this));
    
    // Clear any pending hover timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
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

  logout(): void {
    this.keycloakAuthService.logout();
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
  getAllFiles(): (FileItem & { folderName: string, repoName: string })[] {
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
      this.contentService.addRepository(this.newRepoName.trim());
      this.newRepoName = '';
      this.closeAddRepoModal();
      this.loadRepositories();
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

    // Handle preview hiding when mouse moves away from file rows
    // Only check if we have a hovered file to avoid unnecessary processing
    if (this.hoveredFile) {
      const target = event.target as HTMLElement;
      const fileRow = target.closest('.file-row');
      const filePreview = target.closest('.file-hover-preview');
      
      // Don't hide if mouse is over the preview itself or a file row
      if (!fileRow && !filePreview) {
        this.hideFilePreview();
      }
    }
  }
  handleGlobalMouseLeave() {
    this.fabPlusOffsetX = 0;
    this.fabPlusOffsetY = 0;
  }

  showFilePreview(file: any, event: MouseEvent) {
    // Clear any existing timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    
    this.hoveredFile = file;
    this.hoverX = event.clientX + 16;
    this.hoverY = event.clientY - 16;
  }
  
  moveFilePreview(event: MouseEvent) {
    if (this.hoveredFile) {
    this.hoverX = event.clientX + 16;
    this.hoverY = event.clientY - 16;
  }
  }
  
  hideFilePreview() {
    // Only set timeout if we don't already have one
    if (!this.hoverTimeout) {
      this.hoverTimeout = setTimeout(() => {
    this.hoveredFile = null;
        this.hoverX = 0;
        this.hoverY = 0;
        this.hoverTimeout = null;
      }, 150); // Slightly longer delay to prevent flickering
    }
  }

  handleCreateExperience(event: any) {
    // Handle the created experience
    console.log('Experience created:', event);
    this.showCreateExperienceModal = false;
    this.loadRepositories(); // Refresh repositories to include the new one
  }

  onSidebarVisibilityChange(isVisible: boolean): void {
    this.sidebarVisible = isVisible;
  }

  getFileTypeIcon(type: string): string {
    switch(type) {
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
}