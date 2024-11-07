import { Injectable, inject } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afAuth = inject(AngularFireAuth);
  private useLocalStorage: boolean = environment.useLocalApi;

  login(email: string, password: string): Observable<any> {
    if (this.useLocalStorage) {
      const storedUser = JSON.parse(localStorage.getItem('users') || '{}');
      if (storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('user', JSON.stringify(storedUser));
        return of({ success: true, user: storedUser });
      } else {
        return of({ success: false, error: 'Invalid credentials' });
      }
    } else {
      return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
        map((userCredential) => ({
          success: true,
          user: userCredential.user,
        }))
      );
    }
  }

  register(email: string, password: string): Observable<any> {
    if (this.useLocalStorage) {
      const newUser = { email, password };
      localStorage.setItem('user', JSON.stringify(newUser));
      return of({ success: true, user: newUser });
    } else {
      return from(
        this.afAuth.createUserWithEmailAndPassword(email, password)
      ).pipe(
        map((userCredential) => ({
          success: true,
          user: userCredential.user,
        }))
      );
    }
  }

  logout(): void {
    if (this.useLocalStorage) {
      localStorage.removeItem('user');
    } else {
      this.afAuth.signOut();
    }
  }

  isAuthenticated(): Observable<boolean> {
    if (this.useLocalStorage) {
      return of(!!localStorage.getItem('user'));
    } else {
      return this.afAuth.authState.pipe(
        map((user) => !!user),
        take(1)
      );
    }
  }

  getUser(): Observable<any> {
    if (this.useLocalStorage) {
      const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null;
      return of(user);
    } else {
      return this.afAuth.authState;
    }
  }
}
