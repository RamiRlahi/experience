import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is authenticated and redirect appropriately
    if (this.authService.isAuthenticated()) {
      // Only redirect if we're on the login/register page
      const currentUrl = this.router.url;
      if (currentUrl === '/login' || currentUrl === '/register' || currentUrl === '/') {
        this.router.navigate(['/dashboard']);
      }
    }
  }
}