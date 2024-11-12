import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';

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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isRegistering = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: [''],
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isRegistering$.subscribe((isRegistering) => {
        this.isRegistering = isRegistering;
        const nameControl = this.loginForm.get('name');
        if (this.isRegistering) {
          nameControl?.setValidators([Validators.required]);
        } else {
          nameControl?.clearValidators();
        }
        nameControl?.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, name } = this.loginForm.value;

      if (this.isRegistering) {
        this.authService.register(email, password, name).subscribe(
          (result) => {
            if (result.success) {
              alert(
                'Registro realizado com sucesso! Você pode agora fazer login.'
              );
              this.toggleMode();
            } else {
              alert(result.error || 'Registro falhou');
            }
          },
          (error) => {
            alert(error.error || 'Erro no registro');
          }
        );
      } else {
        this.authService.login(email, password).subscribe(
          (result) => {
            if (result.success) {
              this.router.navigate(['/dashboard']);
            } else {
              alert(result.error || 'Login falhou');
            }
          },
          (error) => {
            alert(error.error || 'Erro no login');
          }
        );
      }
    }
  }

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
    this.authService.setRegistering(this.isRegistering);
    if (!this.isRegistering) {
      this.loginForm.patchValue({ name: '' });
    }
  }
}
