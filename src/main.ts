import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
<<<<<<< HEAD
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
=======
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()
>>>>>>> dfa8698d7ac4a8915ae07eff6197c54e4a175482
  ]
}).catch(err => console.error(err));
