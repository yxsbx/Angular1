import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { RoutineDto } from '@app/dtos';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private apiUrl = environment.apiUrl;

  private routineUpdated$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllRoutines(): Observable<RoutineDto[]> {
    return this.http.get<RoutineDto[]>(`${this.apiUrl}/api/routines`);
  }

  getRoutineById(id: number): Observable<RoutineDto> {
    return this.http.get<RoutineDto>(`${this.apiUrl}/api/routines/${id}`);
  }

  createRoutine(routine: RoutineDto): Observable<RoutineDto> {
    console.log('Chamando o backend com dados:', routine);
    return this.http.post<RoutineDto>(`${this.apiUrl}/api/routines`, routine);
  }

  updateRoutine(id: number, routine: RoutineDto): Observable<RoutineDto> {
    return this.http.put<RoutineDto>(
      `${this.apiUrl}/api/routines/${id}`,
      routine
    );
  }

  deleteRoutine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/routines/${id}`);
  }

  notifyRoutineUpdated() {
    this.routineUpdated$.next();
  }

  onRoutineUpdated(): Observable<void> {
    return this.routineUpdated$.asObservable();
  }
}
