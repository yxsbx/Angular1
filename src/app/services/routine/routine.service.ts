import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '@src/environments/environment';
import { RoutineDto } from '@app//dtos';
import { ApiUtility, LocalStorageUtility } from '@app//utils';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private apiUrl = `${environment.apiUrl}/routines`;
  private routinesKey = 'routines';
  private useLocalApi = environment.useLocalApi;

  constructor(private http: HttpClient) {}

  getAllRoutines(): Observable<RoutineDto[]> {
    return this.useLocalApi
      ? of(
          LocalStorageUtility.getFromLocalStorage<RoutineDto>(this.routinesKey)
        )
      : ApiUtility.getAll<RoutineDto>(this.http, this.apiUrl);
  }

  createRoutine(routine: RoutineDto): Observable<RoutineDto> {
    return this.useLocalApi
      ? of(
          LocalStorageUtility.addToLocalStorage<RoutineDto>(
            this.routinesKey,
            routine
          )
        )
      : ApiUtility.create(this.http, this.apiUrl, routine);
  }

  getRoutineById(id: number): Observable<RoutineDto> {
    if (this.useLocalApi) {
      const routine = LocalStorageUtility.getItemFromLocalStorage<RoutineDto>(
        this.routinesKey,
        id
      );
      return routine
        ? of(routine)
        : throwError(() => new Error('Routine not found'));
    } else {
      return ApiUtility.getById<RoutineDto>(this.http, this.apiUrl, id);
    }
  }

  updateRoutine(id: number, routine: RoutineDto): Observable<RoutineDto> {
    if (this.useLocalApi) {
      const updatedRoutine =
        LocalStorageUtility.updateInLocalStorage<RoutineDto>(
          this.routinesKey,
          id,
          routine
        );
      return updatedRoutine
        ? of(updatedRoutine)
        : throwError(() => new Error('Failed to update routine'));
    } else {
      return ApiUtility.update(this.http, this.apiUrl, id, routine);
    }
  }

  deleteRoutine(id: number): Observable<void> {
    if (this.useLocalApi) {
      const deleted = LocalStorageUtility.deleteFromLocalStorage<RoutineDto>(
        this.routinesKey,
        id
      );
      return deleted
        ? of()
        : throwError(() => new Error('Failed to delete routine'));
    } else {
      return ApiUtility.delete(this.http, this.apiUrl, id);
    }
  }
}
