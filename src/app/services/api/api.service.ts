import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { UserDto, LocalUserDto } from '@app/dtos';
import { LocalStorageUtility, ApiUtility } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private useLocalApi = environment.useLocalApi;
  private usersKey = 'users';

  constructor(private http: HttpClient) {
    LocalStorageUtility.initializeLocalStorage(this.usersKey, [
      { id: 1, email: 'admin@gmail.com', password: 'admin' } as LocalUserDto,
    ]);
  }

  login(email: string, password: string): Observable<any> {
    return ApiUtility.handleRequest(
      this.useLocalApi,
      () => {
        const users = LocalStorageUtility.getFromLocalStorage<LocalUserDto>(
          this.usersKey
        );
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return { success: true, user };
        }
        return { success: false };
      },
      () => this.http.post(`${this.apiUrl}/auth/login`, { email, password }),
      'Login failed'
    );
  }

  register(
    email: string,
    password: string
  ): Observable<UserDto | LocalUserDto> {
    return this.useLocalApi
      ? of(
          LocalStorageUtility.addToLocalStorage<LocalUserDto>(this.usersKey, {
            email,
            password,
          })
        )
      : this.http.post<UserDto>(`${this.apiUrl}/auth/register`, {
          email,
          password,
        });
  }

  getAllUsers(): Observable<UserDto[]> {
    return ApiUtility.handleRequest(
      this.useLocalApi,
      () => LocalStorageUtility.getFromLocalStorage<UserDto>(this.usersKey),
      () => this.http.get<UserDto[]>(`${this.apiUrl}/users`)
    );
  }

  getUserById(id: number): Observable<UserDto> {
    return ApiUtility.handleRequest(
      this.useLocalApi,
      () =>
        LocalStorageUtility.getItemFromLocalStorage<UserDto>(this.usersKey, id),
      () => this.http.get<UserDto>(`${this.apiUrl}/users/${id}`),
      'User not found'
    );
  }

  updateUser(id: number, user: UserDto): Observable<UserDto> {
    return ApiUtility.handleRequest(
      this.useLocalApi,
      () =>
        LocalStorageUtility.updateInLocalStorage<UserDto>(
          this.usersKey,
          id,
          user
        ),
      () => this.http.put<UserDto>(`${this.apiUrl}/users/${id}`, user),
      'Failed to update user'
    );
  }

  deleteUser(id: number): Observable<void> {
    return ApiUtility.handleRequest<void>(
      this.useLocalApi,
      () => {
        const deleted = LocalStorageUtility.deleteFromLocalStorage<UserDto>(
          this.usersKey,
          id
        );
        if (!deleted) {
          throw new Error('Failed to delete user');
        }
      },
      () => this.http.delete<void>(`${this.apiUrl}/users/${id}`),
      'Failed to delete user'
    );
  }
}
