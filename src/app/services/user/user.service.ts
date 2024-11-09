import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { UserDto } from '@app/dtos';

/**
 * UserService handles CRUD operations for user management.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all users.
   * @returns An Observable with a list of UserDto representing all users.
   */
  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/users`);
  }

  /**
   * Retrieves a specific user by ID.
   * @param id - The user's ID
   * @returns An Observable with the UserDto of the specified user.
   */
  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/users/${id}`);
  }

  /**
   * Updates a specific user's data.
   * @param id - The user's ID
   * @param user - The updated user data
   * @returns An Observable with the updated user's UserDto.
   */
  updateUser(id: number, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/users/${id}`, user);
  }

  /**
   * Deletes a specific user.
   * @param id - The user's ID
   * @returns An Observable that completes when the user is deleted.
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
