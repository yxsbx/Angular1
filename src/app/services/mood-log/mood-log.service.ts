import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { MoodLogDto } from '@app/dtos';

/**
 * MoodLogService handles CRUD operations for mood logs.
 */
@Injectable({
  providedIn: 'root',
})
export class MoodLogService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all mood logs.
   * @returns An Observable with a list of MoodLogDto representing all mood logs.
   */
  getAllMoodLogs(): Observable<MoodLogDto[]> {
    return this.http.get<MoodLogDto[]>(`${this.apiUrl}/api/mood-logs`);
  }

  /**
   * Creates a new mood log.
   * @param moodLog - The data for the new mood log in MoodLogDto
   * @returns An Observable with the newly created MoodLogDto.
   */
  createMoodLog(moodLog: MoodLogDto): Observable<MoodLogDto> {
    return this.http.post<MoodLogDto>(`${this.apiUrl}/api/mood-logs`, moodLog);
  }

  /**
   * Retrieves a specific mood log by ID.
   * @param id - The mood log's ID
   * @returns An Observable with the MoodLogDto of the specified mood log.
   */
  getMoodLogById(id: number): Observable<MoodLogDto> {
    return this.http.get<MoodLogDto>(`${this.apiUrl}/api/mood-logs/${id}`);
  }

  /**
   * Updates a specific mood log.
   * @param id - The mood log's ID
   * @param moodLog - The updated mood log data in MoodLogDto
   * @returns An Observable with the updated MoodLogDto.
   */
  updateMoodLog(id: number, moodLog: MoodLogDto): Observable<MoodLogDto> {
    return this.http.put<MoodLogDto>(
      `${this.apiUrl}/api/mood-logs/${id}`,
      moodLog
    );
  }

  /**
   * Deletes a specific mood log.
   * @param id - The mood log's ID
   * @returns An Observable that completes when the mood log is deleted.
   */
  deleteMoodLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/mood-logs/${id}`);
  }
}
