import { Component, OnInit } from '@angular/core';
import { NotificationDto } from '@app/dtos';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification-list',
  template: `
    <div *ngIf="notifications.length; else noNotifications">
      <ul>
        <li *ngFor="let notification of notifications">
          <strong>{{ notification.title }}</strong> - {{ notification.message }}
        </li>
      </ul>
    </div>
    <ng-template #noNotifications>
      <p>No notifications available.</p>
    </ng-template>
  `,
})
export class NotificationListComponent implements OnInit {
  notifications: NotificationDto[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Failed to load notifications', err);
      },
    });
  }
}
