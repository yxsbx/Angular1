import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../../environments/environment';
import { ApiLocalService } from '../api-local/api-local.service';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private useLocalStorage: boolean = environment.useLocalApi;

  constructor(
    private apiService: ApiService,
    private apiLocalService: ApiLocalService,
    private afAuth: AngularFireAuth
  ) {}

  login(email: string, password: string): Observable<any> {
    if (this.useLocalStorage) {
      return this.apiLocalService.getUserByEmail(email).pipe(
        map((user: any) => {
          if (user && user.password === password) {
            return { success: true, user };
          } else {
            return { success: false };
          }
        })
      );
    } else {
      return from(this.afAuth.signInWithEmailAndPassword(email, password));
    }
  }

  register(email: string, password: string): Observable<any> {
    if (this.useLocalStorage) {
      return this.apiLocalService.createUser({ email, password });
    } else {
      return from(this.afAuth.createUserWithEmailAndPassword(email, password));
    }
  }

  logout(): void {
    if (this.useLocalStorage) {
      localStorage.removeItem('user');
    } else {
      this.afAuth.signOut();
    }
  }

  getUser(): Observable<any> {
    return this.useLocalStorage ? of(null) : this.afAuth.authState;
  }

  isAuthenticated(): boolean {
    return this.useLocalStorage
      ? !!localStorage.getItem('user')
      : !!this.afAuth.authState;
  }
}
