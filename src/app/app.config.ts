import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { setHeaderInterceptor } from './core/interceptor/set-header/set-header.interceptor';
import { authInterceptor } from './core/interceptor/auth/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([
      authInterceptor,
      setHeaderInterceptor
    ]))
  ]
};
