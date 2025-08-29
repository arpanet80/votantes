import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withInterceptors([
      errorHandlerInterceptor,
      tokenInterceptor,
      spinnerInterceptor
    ])),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,

    /////// para Toastr ////////////
    provideAnimations(), // required animations providers
    provideToastr(), provideAnimationsAsync(), // Toastr providers
    ////////////////////////////
  ]
};
