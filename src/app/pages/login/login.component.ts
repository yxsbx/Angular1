import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isRegistering = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (this.isRegistering) {
        this.authService.register(email, password).subscribe(
          (result) => {
            if (result.success) {
              alert('Registration successful! You can now log in.');
              this.toggleMode();
            } else {
              alert(result.error || 'Registration failed');
            }
          },
          (error) => {
            alert(error.message || 'Registration error');
          }
        );
      } else {
        this.authService.login(email, password).subscribe(
          (result) => {
            if (result.success) {
              this.router.navigate(['/dashboard']);
            } else {
              alert(result.error || 'Login failed');
            }
          },
          (error) => {
            alert(error.message || 'Login error');
          }
        );
      }
    }
  }

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
  }
}
