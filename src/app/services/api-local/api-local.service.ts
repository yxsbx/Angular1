import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  MoodLogDto,
  NotificationDto,
  RoutineDto,
  LocalUserDto,
} from '../../dtos';

@Injectable({
  providedIn: 'root',
})
export class ApiLocalService {
  private moodLogsKey = 'moodLogs';
  private notificationsKey = 'notifications';
  private routinesKey = 'routines';
  private usersKey = 'users';

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.moodLogsKey)) {
      localStorage.setItem(this.moodLogsKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.notificationsKey)) {
      localStorage.setItem(this.notificationsKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.routinesKey)) {
      localStorage.setItem(this.routinesKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.usersKey)) {
      const defaultUser = {
        id: 1,
        email: 'admin@gmail.com',
        password: 'admin',
      };
      localStorage.setItem(this.usersKey, JSON.stringify([defaultUser]));
    }
  }

  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; user?: LocalUserDto }> {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      return of({ success: true, user });
    } else {
      return of({ success: false });
    }
  }

  getUserByEmail(email: string): Observable<LocalUserDto | undefined> {
    const users: LocalUserDto[] = JSON.parse(
      localStorage.getItem(this.usersKey) || '[]'
    );
    return of(users.find((u: any) => u.email === email));
  }

  addEventToCalendar(eventTitle: string, date: string): Observable<any> {
    return of({ message: `Event '${eventTitle}' added for date ${date}` });
  }

  getAllMoodLogs(): Observable<MoodLogDto[]> {
    const moodLogs = JSON.parse(localStorage.getItem(this.moodLogsKey) || '[]');
    return of(moodLogs);
  }

  createMoodLog(moodLog: MoodLogDto): Observable<MoodLogDto> {
    const moodLogs = JSON.parse(localStorage.getItem(this.moodLogsKey) || '[]');
    moodLog.id = new Date().getTime();
    moodLogs.push(moodLog);
    localStorage.setItem(this.moodLogsKey, JSON.stringify(moodLogs));
    return of(moodLog);
  }

  getMoodLogById(id: number): Observable<MoodLogDto | undefined> {
    const moodLogs: MoodLogDto[] = JSON.parse(
      localStorage.getItem(this.moodLogsKey) || '[]'
    );
    return of(moodLogs.find((m) => m.id === id));
  }

  updateMoodLog(
    id: number,
    moodLog: Partial<MoodLogDto>
  ): Observable<MoodLogDto | undefined> {
    const moodLogs: MoodLogDto[] = JSON.parse(
      localStorage.getItem(this.moodLogsKey) || '[]'
    );
    const index = moodLogs.findIndex((m) => m.id === id);
    if (index !== -1) {
      moodLogs[index] = { ...moodLogs[index], ...moodLog };
      localStorage.setItem(this.moodLogsKey, JSON.stringify(moodLogs));
      return of(moodLogs[index]);
    }
    return of(undefined);
  }

  deleteMoodLog(id: number): Observable<void> {
    let moodLogs: MoodLogDto[] = JSON.parse(
      localStorage.getItem(this.moodLogsKey) || '[]'
    );
    moodLogs = moodLogs.filter((m) => m.id !== id);
    localStorage.setItem(this.moodLogsKey, JSON.stringify(moodLogs));
    return of();
  }

  getAllNotifications(): Observable<NotificationDto[]> {
    const notifications = JSON.parse(
      localStorage.getItem(this.notificationsKey) || '[]'
    );
    return of(notifications);
  }

  createNotification(
    notification: NotificationDto
  ): Observable<NotificationDto> {
    const notifications = JSON.parse(
      localStorage.getItem(this.notificationsKey) || '[]'
    );
    notification.id = new Date().getTime();
    notifications.push(notification);
    localStorage.setItem(this.notificationsKey, JSON.stringify(notifications));
    return of(notification);
  }

  getNotificationById(id: number): Observable<NotificationDto | undefined> {
    const notifications: NotificationDto[] = JSON.parse(
      localStorage.getItem(this.notificationsKey) || '[]'
    );
    return of(notifications.find((n) => n.id === id));
  }

  updateNotification(
    id: number,
    notification: Partial<NotificationDto>
  ): Observable<NotificationDto | undefined> {
    const notifications: NotificationDto[] = JSON.parse(
      localStorage.getItem(this.notificationsKey) || '[]'
    );
    const index = notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications[index] = { ...notifications[index], ...notification };
      localStorage.setItem(
        this.notificationsKey,
        JSON.stringify(notifications)
      );
      return of(notifications[index]);
    }
    return of(undefined);
  }

  deleteNotification(id: number): Observable<void> {
    let notifications: NotificationDto[] = JSON.parse(
      localStorage.getItem(this.notificationsKey) || '[]'
    );
    notifications = notifications.filter((n) => n.id !== id);
    localStorage.setItem(this.notificationsKey, JSON.stringify(notifications));
    return of();
  }

  getAllRoutines(): Observable<RoutineDto[]> {
    const routines = JSON.parse(localStorage.getItem(this.routinesKey) || '[]');
    return of(routines);
  }

  createRoutine(routine: RoutineDto): Observable<RoutineDto> {
    const routines = JSON.parse(localStorage.getItem(this.routinesKey) || '[]');
    routine.id = new Date().getTime();
    routines.push(routine);
    localStorage.setItem(this.routinesKey, JSON.stringify(routines));
    return of(routine);
  }

  getRoutineById(id: number): Observable<RoutineDto | undefined> {
    const routines: RoutineDto[] = JSON.parse(
      localStorage.getItem(this.routinesKey) || '[]'
    );
    return of(routines.find((r) => r.id === id));
  }

  updateRoutine(
    id: number,
    routine: Partial<RoutineDto>
  ): Observable<RoutineDto | undefined> {
    const routines: RoutineDto[] = JSON.parse(
      localStorage.getItem(this.routinesKey) || '[]'
    );
    const index = routines.findIndex((r) => r.id === id);
    if (index !== -1) {
      routines[index] = { ...routines[index], ...routine };
      localStorage.setItem(this.routinesKey, JSON.stringify(routines));
      return of(routines[index]);
    }
    return of(undefined);
  }

  deleteRoutine(id: number): Observable<void> {
    let routines: RoutineDto[] = JSON.parse(
      localStorage.getItem(this.routinesKey) || '[]'
    );
    routines = routines.filter((r) => r.id !== id);
    localStorage.setItem(this.routinesKey, JSON.stringify(routines));
    return of();
  }

  getAllUsers(): Observable<LocalUserDto[]> {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    return of(users);
  }

  createUser(user: LocalUserDto): Observable<LocalUserDto> {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const newUser = {
      ...user,
      id: new Date().getTime(),
      name: user.name || 'Default Name',
    };
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return of(newUser);
  }

  getUserById(id: number): Observable<LocalUserDto | undefined> {
    const users: LocalUserDto[] = JSON.parse(
      localStorage.getItem(this.usersKey) || '[]'
    );
    return of(users.find((u) => u.id === id));
  }

  updateUser(
    id: number,
    user: Partial<LocalUserDto>
  ): Observable<LocalUserDto | undefined> {
    const users: LocalUserDto[] = JSON.parse(
      localStorage.getItem(this.usersKey) || '[]'
    );
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...user };
      localStorage.setItem(this.usersKey, JSON.stringify(users));
      return of(users[index]);
    }
    return of(undefined);
  }

  deleteUser(id: number): Observable<void> {
    let users: LocalUserDto[] = JSON.parse(
      localStorage.getItem(this.usersKey) || '[]'
    );
    users = users.filter((u) => u.id !== id);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return of();
  }
}
