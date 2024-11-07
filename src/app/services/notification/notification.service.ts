import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '@src/environments/environment';
import { NotificationDto } from '@app/dtos';
import { ApiUtility, LocalStorageUtility } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;
  private notificationsKey = 'notifications';
  private useLocalApi = environment.useLocalApi;

  constructor(private http: HttpClient) {}

  getAllNotifications(): Observable<NotificationDto[]> {
    return this.useLocalApi
      ? of(
          LocalStorageUtility.getFromLocalStorage<NotificationDto>(
            this.notificationsKey
          )
        )
      : ApiUtility.getAll<NotificationDto>(this.http, this.apiUrl);
  }

  createNotification(
    notification: NotificationDto
  ): Observable<NotificationDto> {
    return this.useLocalApi
      ? of(
          LocalStorageUtility.addToLocalStorage<NotificationDto>(
            this.notificationsKey,
            notification
          )
        )
      : ApiUtility.create(this.http, this.apiUrl, notification);
  }

  getNotificationById(id: number): Observable<NotificationDto> {
    if (this.useLocalApi) {
      const notification =
        LocalStorageUtility.getItemFromLocalStorage<NotificationDto>(
          this.notificationsKey,
          id
        );
      return notification
        ? of(notification)
        : throwError(() => new Error('Notification not found'));
    } else {
      return ApiUtility.getById<NotificationDto>(this.http, this.apiUrl, id);
    }
  }

  updateNotification(
    id: number,
    notification: NotificationDto
  ): Observable<NotificationDto> {
    if (this.useLocalApi) {
      const updatedNotification =
        LocalStorageUtility.updateInLocalStorage<NotificationDto>(
          this.notificationsKey,
          id,
          notification
        );
      return updatedNotification
        ? of(updatedNotification)
        : throwError(() => new Error('Failed to update notification'));
    } else {
      return ApiUtility.update(this.http, this.apiUrl, id, notification);
    }
  }

  deleteNotification(id: number): Observable<void> {
    if (this.useLocalApi) {
      const deleted =
        LocalStorageUtility.deleteFromLocalStorage<NotificationDto>(
          this.notificationsKey,
          id
        );
      return deleted
        ? of()
        : throwError(() => new Error('Failed to delete notification'));
    } else {
      return ApiUtility.delete(this.http, this.apiUrl, id);
    }
  }
}
