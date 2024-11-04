import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(
    map((user) => !!user),
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
    })
  );
};
