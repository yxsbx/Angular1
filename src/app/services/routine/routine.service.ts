import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { RoutineDto } from '@app/dtos';

/**
 * RoutineService handles CRUD operations for routines.
 */
@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all routines.
   * @returns An Observable with a list of RoutineDto representing all routines.
   */
  getAllRoutines(): Observable<RoutineDto[]> {
    return this.http.get<RoutineDto[]>(`${this.apiUrl}/api/routines`);
  }

  /**
   * Retrieves a specific routine by ID.
   * @param id - The routine's ID
   * @returns An Observable with the RoutineDto of the specified routine.
   */
  getRoutineById(id: number): Observable<RoutineDto> {
    return this.http.get<RoutineDto>(`${this.apiUrl}/api/routines/${id}`);
  }

  /**
   * Creates a new routine.
   * @param routine - The data for the new routine to be created
   * @returns An Observable with the newly created RoutineDto.
   */
  createRoutine(routine: RoutineDto): Observable<RoutineDto> {
    return this.http.post<RoutineDto>(`${this.apiUrl}/api/routines`, routine);
  }

  /**
   * Updates a specific routine.
   * @param id - The routine's ID
   * @param routine - The updated routine data
   * @returns An Observable with the updated RoutineDto.
   */
  updateRoutine(id: number, routine: RoutineDto): Observable<RoutineDto> {
    return this.http.put<RoutineDto>(
      `${this.apiUrl}/api/routines/${id}`,
      routine
    );
  }

  /**
   * Deletes a specific routine.
   * @param id - The routine's ID
   * @returns An Observable that completes when the routine is deleted.
   */
  deleteRoutine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/routines/${id}`);
  }
}
