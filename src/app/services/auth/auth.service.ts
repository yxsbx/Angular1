import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

/**
 * AuthService handles authentication operations, including login, registration,
 * logout, and retrieving the current user authentication status.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afAuth = inject(AngularFireAuth);

  /**
   * Logs in the user with the specified email and password.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns An Observable with the login result, containing success status and user data.
   */
  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((userCredential) => ({
        success: true,
        user: userCredential.user,
      }))
    );
  }

  /**
   * Registers a new user with the specified email and password.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns An Observable with the registration result, containing success status and user data.
   */
  register(email: string, password: string): Observable<any> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      map((userCredential) => ({
        success: true,
        user: userCredential.user,
      }))
    );
  }

  /**
   * Logs out the currently authenticated user.
   */
  logout(): void {
    this.afAuth.signOut();
  }

  /**
   * Checks if a user is currently authenticated.
   * @returns An Observable that emits a boolean indicating the authentication status.
   */
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => !!user),
      take(1)
    );
  }

  /**
   * Retrieves the current authenticated user.
   * @returns An Observable that emits the user data of the authenticated user.
   */
  getUser(): Observable<any> {
    return this.afAuth.authState;
  }
}
