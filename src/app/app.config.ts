import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import {
  ApiService,
  AuthService,
  UserService,
  RoutineService,
  CalendarService,
  NotificationService,
  MoodLogService,
} from './services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideAuth(() => getAuth()),
    importProvidersFrom(
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      FormsModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule
    ),
    AuthService,
    UserService,
    RoutineService,
    CalendarService,
    NotificationService,
    MoodLogService,
    {
      provide: ApiService,
      useClass: ApiService,
    },
  ],
};
