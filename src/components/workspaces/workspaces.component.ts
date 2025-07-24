import { Component, OnInit } from '@angular/core';
import { Repository } from '../../models/content.model';
import { LocalContentService } from '../../services/local-content.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workspaces',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="workspaces-container">
      <div class="workspaces-section-label">Repositories</div>
      <div class="workspaces-repos-list">
        <div class="workspaces-repo-card" *ngFor="let repo of repositories">
          <span class="workspaces-repo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="20" cy="8" rx="16" ry="6" fill="#2563eb"/>
              <ellipse cx="20" cy="20" rx="16" ry="6" fill="#2563eb"/>
              <ellipse cx="20" cy="32" rx="16" ry="6" fill="#2563eb"/>
            </svg>
          </span>
          <span class="workspaces-repo-name">{{ repo.name }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .workspaces-container { max-width: 900px; margin: 0 auto; padding: 2rem 0; }
    .workspaces-section-label { font-size: 1.15rem; font-weight: 600; color: #222; margin-bottom: 1.2rem; }
    .workspaces-repos-list { display: flex; flex-direction: column; gap: 1.2rem; }
    .workspaces-repo-card { display: flex; align-items: center; gap: 1.2rem; background: #f7f7f8; border-radius: 12px; padding: 1.1rem 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.03); font-size: 1.08rem; font-weight: 500; }
    .workspaces-repo-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
    .workspaces-repo-name { color: #222; font-weight: 500; }
  `]
})
export class WorkspacesComponent implements OnInit {
  repositories: Repository[] = [];
  constructor(private contentService: LocalContentService) {}
  ngOnInit() {
    this.repositories = this.contentService.getRepositories();
  }
}
