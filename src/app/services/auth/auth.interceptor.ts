import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isAuthRequest =
      req.url.includes('/api/auth/login') ||
      req.url.includes('/api/auth/register');

    if (!isAuthRequest) {
      return this.authService.getUserToken().pipe(
        switchMap((token) => {
          if (token) {
            console.log('Token adicionado ao cabeçalho Authorization:', token);
            const authReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
            return next.handle(authReq);
          }
          console.warn(
            'Nenhum token encontrado para adicionar ao cabeçalho Authorization'
          );
          return next.handle(req);
        })
      );
    }

    console.log(
      'Requisição de autenticação (login/register), não adicionando token'
    );
    return next.handle(req);
  }
}
