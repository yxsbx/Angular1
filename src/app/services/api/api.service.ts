import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MoodLogDto, NotificationDto, RoutineDto, UserDto } from '../../dtos';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // CalendarController Methods
  addEventToCalendar(eventTitle: string, date: string): Observable<any> {
    const endpoint = `${this.apiUrl}/calendar/add-event`;
    return this.http.post(endpoint, { eventTitle, date });
  }

  // MoodLogController Methods
  getAllMoodLogs(): Observable<MoodLogDto[]> {
    return this.http.get<MoodLogDto[]>(`${this.apiUrl}/mood-logs`);
  }

  createMoodLog(moodLog: MoodLogDto): Observable<MoodLogDto> {
    return this.http.post<MoodLogDto>(`${this.apiUrl}/mood-logs`, moodLog);
  }

  getMoodLogById(id: number): Observable<MoodLogDto> {
    return this.http.get<MoodLogDto>(`${this.apiUrl}/mood-logs/${id}`);
  }

  updateMoodLog(id: number, moodLog: MoodLogDto): Observable<MoodLogDto> {
    return this.http.put<MoodLogDto>(`${this.apiUrl}/mood-logs/${id}`, moodLog);
  }

  deleteMoodLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/mood-logs/${id}`);
  }

  // NotificationController Methods
  getAllNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiUrl}/notifications`);
  }

  createNotification(
    notification: NotificationDto
  ): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(
      `${this.apiUrl}/notifications`,
      notification
    );
  }

  getNotificationById(id: number): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiUrl}/notifications/${id}`);
  }

  updateNotification(
    id: number,
    notification: NotificationDto
  ): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(
      `${this.apiUrl}/notifications/${id}`,
      notification
    );
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notifications/${id}`);
  }

  // RoutineController Methods
  getAllRoutines(): Observable<RoutineDto[]> {
    return this.http.get<RoutineDto[]>(`${this.apiUrl}/routines`);
  }

  createRoutine(routine: RoutineDto): Observable<RoutineDto> {
    return this.http.post<RoutineDto>(`${this.apiUrl}/routines`, routine);
  }

  getRoutineById(id: number): Observable<RoutineDto> {
    return this.http.get<RoutineDto>(`${this.apiUrl}/routines/${id}`);
  }

  updateRoutine(id: number, routine: RoutineDto): Observable<RoutineDto> {
    return this.http.put<RoutineDto>(`${this.apiUrl}/routines/${id}`, routine);
  }

  deleteRoutine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/routines/${id}`);
  }

  // UserController Methods
  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/users`);
  }

  createUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/users`, user);
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: number, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
