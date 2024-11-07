import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { MoodLogDto } from '@app/dtos';
import { ApiUtility, LocalStorageUtility } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class MoodLogService {
  private apiUrl = `${environment.apiUrl}/mood-logs`;
  private moodLogsKey = 'moodLogs';
  private useLocalApi = environment.useLocalApi;

  constructor(private http: HttpClient) {}

  getMoodLogById(id: number): Observable<MoodLogDto> {
    return this.useLocalApi
      ? LocalStorageUtility.getItemFromLocalStorage<MoodLogDto>(
          this.moodLogsKey,
          id
        )
        ? of(
            LocalStorageUtility.getItemFromLocalStorage<MoodLogDto>(
              this.moodLogsKey,
              id
            ) as MoodLogDto
          )
        : throwError(() => new Error('Mood log not found'))
      : ApiUtility.getById<MoodLogDto>(this.http, this.apiUrl, id);
  }

  updateMoodLog(id: number, moodLog: MoodLogDto): Observable<MoodLogDto> {
    const updatedMoodLog = LocalStorageUtility.updateInLocalStorage<MoodLogDto>(
      this.moodLogsKey,
      id,
      moodLog
    );
    return this.useLocalApi
      ? updatedMoodLog
        ? of(updatedMoodLog)
        : throwError(() => new Error('Failed to update mood log'))
      : ApiUtility.update(this.http, this.apiUrl, id, moodLog);
  }

  deleteMoodLog(id: number): Observable<void> {
    const deleted = LocalStorageUtility.deleteFromLocalStorage<MoodLogDto>(
      this.moodLogsKey,
      id
    );
    return this.useLocalApi
      ? deleted
        ? of()
        : throwError(() => new Error('Failed to delete mood log'))
      : ApiUtility.delete(this.http, this.apiUrl, id);
  }
}
