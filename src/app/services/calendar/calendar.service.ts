import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';

/**
 * CalendarService handles integration with Google Calendar.
 */
@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
    return this.http.post<string>(`${this.apiUrl}/api/calendar/add-event`, {
      eventTitle,
      startDateTime,
      endDateTime,
    });
  }
}
