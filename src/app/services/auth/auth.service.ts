import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';

interface TokenResponse {
  idToken?: string;
  customToken?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isRegisteringSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isRegistering$: Observable<boolean> =
    this.isRegisteringSubject.asObservable();

  constructor(private http: HttpClient) {}

  setRegistering(isRegistering: boolean): void {
    this.isRegisteringSubject.next(isRegistering);
  }

  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; error?: string }> {
    return this.http
      .post<TokenResponse>(`${this.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        map((response) => {
          if (response.idToken) {
            localStorage.setItem('idToken', response.idToken);
            return { success: true };
          } else {
            return { success: false, error: 'Login falhou' };
          }
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          const errorMessage =
            error.error?.error?.message || 'Erro desconhecido';
          return of({ success: false, error: errorMessage });
        })
      );
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http
      .post<TokenResponse>(`${this.apiUrl}/api/auth/register`, {
        email,
        password,
        name,
      })
      .pipe(
        map((response) => {
          if (response.customToken) {
            return { success: true };
          } else {
            return { success: false, error: 'Registro falhou' };
          }
        }),
        catchError((error) => {
          console.error('Registration failed:', error);
          const errorMessage =
            error.error?.error?.message || 'Erro desconhecido';
          return of({ success: false, error: errorMessage });
        })
      );
  }

  logout(): void {
    localStorage.removeItem('idToken');
    window.location.href = '/login';
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('idToken');
    return of(!!token);
  }

  getUserToken(): Observable<string | null> {
    const token = localStorage.getItem('idToken');
    console.log('Token recuperado do localStorage:', token);
    return of(token);
  }
}
