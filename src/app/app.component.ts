import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CalendarModule } from 'angular-calendar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatSnackBarModule,
    CalendarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule,
  ],
})
export class AppComponent {
  title = 'ZenFlow';
  isAuthenticated: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showNotification('Logout realizado com sucesso', 'Fechar');
  }

  showNotification(
    message: string,
    action: string = 'Fechar',
    duration: number = 3000
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: ['snackbar-info'],
    });
  }
}
