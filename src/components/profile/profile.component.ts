import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Repository, Folder, FileItem } from '../../models/content.model';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <button class="back-button" (click)="goBack()">← Back to Dashboard</button>
        <h1>Profile</h1>
      </div>

      <div class="profile-content">
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              {{ getInitials() }}
            </div>
          </div>

          <div class="profile-info">
            <h2>{{ user?.name }}</h2>
            <p class="user-email">{{ user?.email }}</p>
            <p class="member-since">Member since {{ formatDate(user?.createdAt) }}</p>
          </div>

          <div class="profile-stats">
            <div class="stat-item">
              <div class="stat-value">{{ getDaysRegistered() }}</div>
              <div class="stat-label">Days Active</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ user?.email?.length || 0 }}</div>
              <div class="stat-label">Email Length</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ getRandomStat() }}</div>
              <div class="stat-label">Profile Views</div>
            </div>
          </div>

          <div class="profile-actions">
            <button class="edit-button">Edit Profile</button>
            <button class="settings-button">Account Settings</button>
          </div>
        </div>

        <div class="profile-sections">
          <div class="section-card">
            <h3>Account Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>User ID</label>
                <span>{{ user?.id }}</span>
              </div>
              <div class="info-item">
                <label>Email</label>
                <span>{{ user?.email }}</span>
              </div>
              <div class="info-item">
                <label>Name</label>
                <span>{{ user?.name }}</span>
              </div>
              <div class="info-item">
                <label>Registration Date</label>
                <span>{{ formatDate(user?.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div class="section-card">
            <h3>Security</h3>
            <div class="security-items">
              <div class="security-item">
                <div class="security-info">
                  <h4>Password</h4>
                  <p>Last changed: Recently</p>
                </div>
                <button class="security-button">Change Password</button>
              </div>
              <div class="security-item">
                <div class="security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Not enabled</p>
                </div>
                <button class="security-button">Enable 2FA</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      min-height: 100vh;
      background: #2a3441;
      padding: 2rem 1rem;
    }

    .profile-header {
      max-width: 800px;
      margin: 0 auto 2rem auto;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .back-button {
      background: #102542;
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .back-button:hover {
      background: #0f1f35;
    }

    .profile-header h1 {
      margin: 0;
      color: white;
      font-size: 2rem;
      font-weight: 600;
    }

    .profile-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-card {
      background: #3a4651;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
      text-align: center;
    }

    .profile-avatar {
      margin-bottom: 1.5rem;
    }

    .avatar-placeholder {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #102542 0%, #F87060 100%);
      color: white;
      font-size: 3rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    .profile-info h2 {
      color: white;
      margin: 0 0 0.5rem 0;
      font-size: 1.75rem;
    }

    .user-email {
      color: #102542;
      font-size: 1.1rem;
      margin: 0 0 0.5rem 0;
    }

    .member-since {
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 1.5rem 0;
    }

    .profile-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-item {
      padding: 1rem;
      background: #2a3441;
      border-radius: 8px;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #102542;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.85rem;
    }

    .profile-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .edit-button, .settings-button {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .edit-button {
      background: linear-gradient(135deg, #102542 0%, #F87060 100%);
      color: white;
      border: none;
    }

    .settings-button {
      background: transparent;
      color: #102542;
      border: 2px solid #102542;
    }

    .edit-button:hover, .settings-button:hover {
      transform: translateY(-1px);
    }

    .profile-sections {
      display: grid;
      gap: 2rem;
    }

    .section-card {
      background: #3a4651;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .section-card h3 {
      color: white;
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-item label {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      font-weight: 500;
    }

    .info-item span {
      color: white;
      font-weight: 600;
    }

    .security-items {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #2a3441;
      border-radius: 8px;
    }

    .security-info h4 {
      color: white;
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
    }

    .security-info p {
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
      font-size: 0.9rem;
    }

    .security-button {
      background: #102542;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .security-button:hover {
      background: #0f1f35;
    }

    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .profile-actions {
        flex-direction: column;
      }

      .security-item {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  getInitials(): string {
    if (!this.user?.name) return 'U';
    return this.user.name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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