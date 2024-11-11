import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
  ],
})
export class AppComponent {
  title = 'ZenFlow';
  isAuthenticated: Observable<boolean>;
  isOpen: boolean = false;
  links = [
    {
      icon: 'dashboard',
      href: '/dashboard',
      text: 'Dashboard',
    },
    {
      icon: 'event_note',
      href: '/routine',
      text: 'Routine',
    }
  ]

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
