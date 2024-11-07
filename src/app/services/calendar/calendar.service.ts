import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@src/environments/environment';
import { ApiUtility } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = `${environment.apiUrl}/calendar`;
  private useLocalApi = environment.useLocalApi;

  constructor(private http: HttpClient) {}

  addEventToCalendar(eventTitle: string, date: string): Observable<any> {
    if (this.useLocalApi) {
      return of({ message: `Event '${eventTitle}' added for date ${date}` });
    } else {
      return ApiUtility.create(this.http, `${this.apiUrl}/add-event`, {
        eventTitle,
        date,
      });
    }
  }
}
