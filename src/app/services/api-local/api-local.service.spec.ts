import { TestBed } from '@angular/core/testing';
import { ApiLocalService } from './api-local.service';
import { MoodLogDto, NotificationDto, RoutineDto, UserDto } from '../../dtos';

describe('ApiLocalService', () => {
  let service: ApiLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLocalService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // CalendarController Methods
  it('should add an event to the calendar', (done) => {
    service.addEventToCalendar('Meeting', '2024-11-15').subscribe((result) => {
      expect(result.message).toBe("Event 'Meeting' added for date 2024-11-15");
      done();
    });
  });

  // MoodLogController Methods
  it('should get all mood logs', (done) => {
    service
      .createMoodLog({
        id: 1,
        userId: 1,
        date: '2024-11-15',
        morningMood: 'Happy',
        eveningMood: 'Relaxed',
      })
      .subscribe(() => {
        service.getAllMoodLogs().subscribe((logs) => {
          expect(logs.length).toBe(1);
          done();
        });
      });
  });

  it('should create a new mood log', (done) => {
    const moodLog: MoodLogDto = {
      id: 1,
      userId: 1,
      date: '2024-11-15',
      morningMood: 'Happy',
      eveningMood: 'Relaxed',
    };
    service.createMoodLog(moodLog).subscribe((createdLog) => {
      expect(createdLog).toEqual(jasmine.objectContaining(moodLog));
      done();
    });
  });

  it('should update a mood log by ID', (done) => {
    const moodLog: MoodLogDto = {
      id: 1,
      userId: 1,
      date: '2024-11-15',
      morningMood: 'Happy',
      eveningMood: 'Relaxed',
    };
    service.createMoodLog(moodLog).subscribe(() => {
      service
        .updateMoodLog(1, { morningMood: 'Excited' })
        .subscribe((updatedLog) => {
          expect(updatedLog?.morningMood).toBe('Excited');
          done();
        });
    });
  });

  it('should delete a mood log by ID', (done) => {
    const moodLog: MoodLogDto = {
      id: 1,
      userId: 1,
      date: '2024-11-15',
      morningMood: 'Happy',
      eveningMood: 'Relaxed',
    };
    service.createMoodLog(moodLog).subscribe(() => {
      service.deleteMoodLog(1).subscribe(() => {
        service.getAllMoodLogs().subscribe((logs) => {
          expect(logs.length).toBe(0);
          done();
        });
      });
    });
  });

  // NotificationController Methods
  it('should create a notification', (done) => {
    const notification: NotificationDto = {
      id: 1,
      userId: 1,
      type: 'Reminder',
      message: 'Check in!',
      scheduledTime: '2024-11-15T10:00:00',
    };
    service
      .createNotification(notification)
      .subscribe((createdNotification) => {
        expect(createdNotification).toEqual(
          jasmine.objectContaining(notification)
        );
        done();
      });
  });

  it('should update a notification by ID', (done) => {
    const notification: NotificationDto = {
      id: 1,
      userId: 1,
      type: 'Reminder',
      message: 'Check in!',
      scheduledTime: '2024-11-15T10:00:00',
    };
    service.createNotification(notification).subscribe(() => {
      service
        .updateNotification(1, { message: 'Updated Message' })
        .subscribe((updatedNotification) => {
          expect(updatedNotification?.message).toBe('Updated Message');
          done();
        });
    });
  });

  it('should delete a notification by ID', (done) => {
    const notification: NotificationDto = {
      id: 1,
      userId: 1,
      type: 'Reminder',
      message: 'Check in!',
      scheduledTime: '2024-11-15T10:00:00',
    };
    service.createNotification(notification).subscribe(() => {
      service.deleteNotification(1).subscribe(() => {
        service.getAllNotifications().subscribe((notifications) => {
          expect(notifications.length).toBe(0);
          done();
        });
      });
    });
  });

  // RoutineController Methods
  it('should create a routine', (done) => {
    const routine: RoutineDto = {
      id: 1,
      userId: 1,
      date: '2024-11-15',
      goals: 'Exercise',
      completed: false,
    };
    service.createRoutine(routine).subscribe((createdRoutine) => {
      expect(createdRoutine).toEqual(jasmine.objectContaining(routine));
      done();
    });
  });

  it('should update a routine by ID', (done) => {
    const routine: RoutineDto = {
      id: 1,
      userId: 1,
      date: '2024-11-15',
      goals: 'Exercise',
      completed: false,
    };
    service.createRoutine(routine).subscribe(() => {
      service
        .updateRoutine(1, { completed: true })
        .subscribe((updatedRoutine) => {
          expect(updatedRoutine?.completed).toBe(true);
          done();
        });
    });
  });

  it('should delete a routine by ID', (done) => {
    const routine: RoutineDto = {
      id: 1,
      userId: 1,
      date: '2024-11-15',
      goals: 'Exercise',
      completed: false,
    };
    service.createRoutine(routine).subscribe(() => {
      service.deleteRoutine(1).subscribe(() => {
        service.getAllRoutines().subscribe((routines) => {
          expect(routines.length).toBe(0);
          done();
        });
      });
    });
  });

  // UserController Methods
  it('should create a user', (done) => {
    const user: UserDto = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    service.createUser(user).subscribe((createdUser) => {
      expect(createdUser).toEqual(jasmine.objectContaining(user));
      done();
    });
  });

  it('should update a user by ID', (done) => {
    const user: UserDto = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    service.createUser(user).subscribe(() => {
      service.updateUser(1, { name: 'Jane Doe' }).subscribe((updatedUser) => {
        expect(updatedUser?.name).toBe('Jane Doe');
        done();
      });
    });
  });

  it('should delete a user by ID', (done) => {
    const user: UserDto = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    service.createUser(user).subscribe(() => {
      service.deleteUser(1).subscribe(() => {
        service.getAllUsers().subscribe((users) => {
          expect(users.length).toBe(0);
          done();
        });
      });
    });
  });
});
