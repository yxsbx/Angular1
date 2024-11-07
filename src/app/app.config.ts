import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { ApiService, AuthService } from './services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

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
      ReactiveFormsModule
    ),
    AuthService,
    {
      provide: ApiService,
      useClass: ApiService,
    },
  ],
};
