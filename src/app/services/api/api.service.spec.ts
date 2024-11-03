import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { MoodLogDto, NotificationDto, RoutineDto, UserDto } from '../../dtos';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // CalendarController Tests
  it('should add an event to the calendar', () => {
    const eventTitle = 'Meeting';
    const date = '2024-11-15';
    service.addEventToCalendar(eventTitle, date).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/calendar/add-event`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ eventTitle, date });
    req.flush({});
  });

  // MoodLogController Tests
  it('should retrieve all mood logs', () => {
    const mockData: MoodLogDto[] = [
      {
        id: 1,
        userId: 1,
        date: new Date().toISOString().split('T')[0],
        morningMood: 'Happy',
        eveningMood: 'Relaxed',
      },
    ];

    service.getAllMoodLogs().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/mood-logs`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create a new mood log', () => {
    const moodLog: MoodLogDto = {
      id: 1,
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      morningMood: 'Happy',
      eveningMood: 'Relaxed',
    };
    service.createMoodLog(moodLog).subscribe((data) => {
      expect(data).toEqual(moodLog);
    });

    const req = httpMock.expectOne(`${apiUrl}/mood-logs`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(moodLog);
    req.flush(moodLog);
  });

  it('should retrieve a mood log by ID', () => {
    const id = 1;
    const mockData: MoodLogDto = {
      id,
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      morningMood: 'Happy',
      eveningMood: 'Relaxed',
    };
    service.getMoodLogById(id).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/mood-logs/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update a mood log by ID', () => {
    const id = 1;
    const updatedMoodLog: MoodLogDto = {
      id,
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      morningMood: 'Excited',
      eveningMood: 'Calm',
    };
    service.updateMoodLog(id, updatedMoodLog).subscribe((data) => {
      expect(data).toEqual(updatedMoodLog);
    });

    const req = httpMock.expectOne(`${apiUrl}/mood-logs/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedMoodLog);
    req.flush(updatedMoodLog);
  });

  it('should delete a mood log by ID', () => {
    const id = 1;
    service.deleteMoodLog(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/mood-logs/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // NotificationController Tests
  it('should retrieve all notifications', () => {
    const mockData: NotificationDto[] = [
      {
        id: 1,
        userId: 1,
        type: 'Reminder',
        message: 'Don’t forget!',
        scheduledTime: new Date().toISOString().split('T')[0],
      },
    ];
    service.getAllNotifications().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/notifications`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create a new notification', () => {
    const notification: NotificationDto = {
      id: 1,
      userId: 1,
      type: 'Reminder',
      message: 'Don’t forget!',
      scheduledTime: new Date().toISOString().split('T')[0],
    };
    service.createNotification(notification).subscribe((data) => {
      expect(data).toEqual(notification);
    });

    const req = httpMock.expectOne(`${apiUrl}/notifications`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(notification);
    req.flush(notification);
  });

  it('should retrieve a notification by ID', () => {
    const id = 1;
    const mockData: NotificationDto = {
      id,
      userId: 1,
      type: 'Alert',
      message: 'Update required!',
      scheduledTime: new Date().toISOString().split('T')[0],
    };
    service.getNotificationById(id).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/notifications/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update a notification by ID', () => {
    const id = 1;
    const updatedNotification: NotificationDto = {
      id,
      userId: 1,
      type: 'Alert',
      message: 'Time to check in!',
      scheduledTime: new Date().toISOString().split('T')[0],
    };
    service.updateNotification(id, updatedNotification).subscribe((data) => {
      expect(data).toEqual(updatedNotification);
    });

    const req = httpMock.expectOne(`${apiUrl}/notifications/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedNotification);
    req.flush(updatedNotification);
  });

  it('should delete a notification by ID', () => {
    const id = 1;
    service.deleteNotification(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/notifications/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // RoutineController Tests
  it('should retrieve all routines', () => {
    const mockData: RoutineDto[] = [
      {
        id: 1,
        userId: 1,
        date: new Date().toISOString().split('T')[0],
        goals: 'Exercise',
        completed: true,
      },
    ];
    service.getAllRoutines().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/routines`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create a new routine', () => {
    const routine: RoutineDto = {
      id: 1,
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      goals: 'Exercise',
      completed: true,
    };
    service.createRoutine(routine).subscribe((data) => {
      expect(data).toEqual(routine);
    });

    const req = httpMock.expectOne(`${apiUrl}/routines`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(routine);
    req.flush(routine);
  });

  it('should retrieve a routine by ID', () => {
    const id = 1;
    const mockData: RoutineDto = {
      id,
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      goals: 'Study',
      completed: false,
    };
    service.getRoutineById(id).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/routines/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update a routine by ID', () => {
    const id = 1;
    const updatedRoutine: RoutineDto = {
      id,
      userId: 1,
      date: new Date().toISOString().split('T')[0],
      goals: 'Read',
      completed: true,
    };
    service.updateRoutine(id, updatedRoutine).subscribe((data) => {
      expect(data).toEqual(updatedRoutine);
    });

    const req = httpMock.expectOne(`${apiUrl}/routines/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedRoutine);
    req.flush(updatedRoutine);
  });

  it('should delete a routine by ID', () => {
    const id = 1;
    service.deleteRoutine(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/routines/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // UserController Tests
  it('should retrieve all users', () => {
    const mockData: UserDto[] = [
      { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    ];
    service.getAllUsers().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create a new user', () => {
    const user: UserDto = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    service.createUser(user).subscribe((data) => {
      expect(data).toEqual(user);
    });

    const req = httpMock.expectOne(`${apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    req.flush(user);
  });

  it('should retrieve a user by ID', () => {
    const id = 1;
    const mockData: UserDto = {
      id,
      name: 'Jane Doe',
      email: 'janedoe@example.com',
    };
    service.getUserById(id).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update a user by ID', () => {
    const id = 1;
    const updatedUser: UserDto = {
      id,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
    };
    service.updateUser(id, updatedUser).subscribe((data) => {
      expect(data).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });

  it('should delete a user by ID', () => {
    const id = 1;
    service.deleteUser(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/users/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
