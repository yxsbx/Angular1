import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { NotificationDto } from '@app/dtos';

/**
 * NotificationService handles CRUD operations for notifications.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all notifications.
   * @returns An Observable with a list of NotificationDto representing all notifications.
   */
  getAllNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiUrl}/notifications`);
  }

  /**
   * Creates a new notification.
   * @param notification - The data for the new notification in NotificationDto
   * @returns An Observable with the newly created NotificationDto.
   */
  createNotification(
    notification: NotificationDto
  ): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(
      `${this.apiUrl}/notifications`,
      notification
    );
  }

  /**
   * Retrieves a specific notification by ID.
   * @param id - The notification's ID
   * @returns An Observable with the NotificationDto of the specified notification.
   */
  getNotificationById(id: number): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiUrl}/notifications/${id}`);
  }

  /**
   * Updates a specific notification.
   * @param id - The notification's ID
   * @param notification - The updated notification data in NotificationDto
   * @returns An Observable with the updated NotificationDto.
   */
  updateNotification(
    id: number,
    notification: NotificationDto
  ): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(
      `${this.apiUrl}/notifications/${id}`,
      notification
    );
  }

  /**
   * Deletes a specific notification.
   * @param id - The notification's ID
   * @returns An Observable that completes when the notification is deleted.
   */
  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notifications/${id}`);
  }
}
