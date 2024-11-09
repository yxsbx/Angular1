import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { UserDto, RoutineDto, MoodLogDto, NotificationDto } from '@app/dtos';

/**
 * ApiService handles communication with the API for user authentication,
 * user CRUD operations, routine management, and Google Calendar integration.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // *** User Methods ***

  /**
   * Registers a new user with the complete UserDto, including name.
   * @param user - The UserDto containing name, email, and other user data.
   * @returns An Observable with the newly created user's UserDto.
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  /**
   * Registers a new user.
   * @param email - The user's email address
   * @param password - The user's password
   * @returns An Observable with the newly created user's UserDto.
   */
  register(email: string, password: string): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/auth/register`, {
      email,
      password,
    });
  }

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

  // *** Routines ***

  /**
   * Retrieves all routines.
   * @returns An Observable with a list of RoutineDto representing all routines.
   */
  getAllRoutines(): Observable<RoutineDto[]> {
    return this.http.get<RoutineDto[]>(`${this.apiUrl}/routines`);
  }

  /**
   * Retrieves a specific routine by ID.
   * @param id - The routine's ID
   * @returns An Observable with the RoutineDto of the specified routine.
   */
  getRoutineById(id: number): Observable<RoutineDto> {
    return this.http.get<RoutineDto>(`${this.apiUrl}/routines/${id}`);
  }

  /**
   * Creates a new routine.
   * @param routine - The data for the new routine to be created
   * @returns An Observable with the newly created RoutineDto.
   */
  createRoutine(routine: RoutineDto): Observable<RoutineDto> {
    return this.http.post<RoutineDto>(`${this.apiUrl}/routines`, routine);
  }

  /**
   * Updates a specific routine.
   * @param id - The routine's ID
   * @param routine - The updated routine data
   * @returns An Observable with the updated RoutineDto.
   */
  updateRoutine(id: number, routine: RoutineDto): Observable<RoutineDto> {
    return this.http.put<RoutineDto>(`${this.apiUrl}/routines/${id}`, routine);
  }

  /**
   * Deletes a specific routine.
   * @param id - The routine's ID
   * @returns An Observable that completes when the routine is deleted.
   */
  deleteRoutine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/routines/${id}`);
  }

  // *** Calendar ***

  /**
   * Adds an event to Google Calendar.
   * @param eventTitle - The event's title
   * @param startDateTime - The event's start date and time (ISO 8601 format)
   * @param endDateTime - The event's end date and time (ISO 8601 format)
   * @returns An Observable with a confirmation message or the created event link.
   */
  addEventToCalendar(
    eventTitle: string,
    startDateTime: string,
    endDateTime: string
  ): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/calendar/add-event`, {
      eventTitle,
      startDateTime,
      endDateTime,
    });
  }

  // *** Notification Methods ***

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

  // *** Mood Log Methods ***

  /**
   * Retrieves all mood logs.
   * @returns An Observable with a list of MoodLogDto representing all mood logs.
   */
  getAllMoodLogs(): Observable<MoodLogDto[]> {
    return this.http.get<MoodLogDto[]>(`${this.apiUrl}/mood-logs`);
  }

  /**
   * Creates a new mood log.
   * @param moodLog - The data for the new mood log in MoodLogDto
   * @returns An Observable with the newly created MoodLogDto.
   */
  createMoodLog(moodLog: MoodLogDto): Observable<MoodLogDto> {
    return this.http.post<MoodLogDto>(`${this.apiUrl}/mood-logs`, moodLog);
  }

  /**
   * Retrieves a specific mood log by ID.
   * @param id - The mood log's ID
   * @returns An Observable with the MoodLogDto of the specified mood log.
   */
  getMoodLogById(id: number): Observable<MoodLogDto> {
    return this.http.get<MoodLogDto>(`${this.apiUrl}/mood-logs/${id}`);
  }

  /**
   * Updates a specific mood log.
   * @param id - The mood log's ID
   * @param moodLog - The updated mood log data in MoodLogDto
   * @returns An Observable with the updated MoodLogDto.
   */
  updateMoodLog(id: number, moodLog: MoodLogDto): Observable<MoodLogDto> {
    return this.http.put<MoodLogDto>(`${this.apiUrl}/mood-logs/${id}`, moodLog);
  }

  /**
   * Deletes a specific mood log.
   * @param id - The mood log's ID
   * @returns An Observable that completes when the mood log is deleted.
   */
  deleteMoodLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/mood-logs/${id}`);
  }
}
