import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { NavigationDirection } from '@src/app/models/navigation-direction';
import { ViewTypes } from '@src/app/models/view-types';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = environment.apiUrl;

  private dayNavigationAction$ = new Subject<NavigationDirection>();
  private viewType$ = new Subject<ViewTypes>();

  constructor(private http: HttpClient) {}

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

  navigate(direction: NavigationDirection) {
    this.dayNavigationAction$.next(direction);
  }

  onNavigate(): Observable<NavigationDirection> {
    return this.dayNavigationAction$.asObservable();
  }

  setViewType(viewType: ViewTypes) {
    this.viewType$.next(viewType);
  }

  onViewTypeChange(): Observable<ViewTypes> {
    return this.viewType$.asObservable();
  }
}
