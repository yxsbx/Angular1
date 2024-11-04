import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isRegistering: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (this.isRegistering) {
      this.authService.register(email, password).subscribe({
        next: (response) => {
          console.log('Registered:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => console.error('Registration error:', error),
      });
    } else {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Logged in:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => console.error('Login error:', error),
      });
    }
  }
}
