import { Injectable, Inject } from '@angular/core';
import { CalendarService } from '../calendar/calendar.service';
import { MoodLogService } from '../mood-log/mood-log.service';
import { NotificationService } from '../notification/notification.service';
import { RoutineService } from '../routine/routine.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

/**
 * ApiService acts as a centralized access point for all API-related services,
 * facilitating dependency management and organization.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    @Inject(AuthService) public auth: AuthService,
    @Inject(UserService) public user: UserService,
    @Inject(RoutineService) public routine: RoutineService,
    @Inject(CalendarService) public calendar: CalendarService,
    @Inject(NotificationService) public notification: NotificationService,
    @Inject(MoodLogService) public moodLog: MoodLogService
  ) {}
}
