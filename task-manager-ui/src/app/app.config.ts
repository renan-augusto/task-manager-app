import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { PoHttpRequestModule, PoInterceptorsModule, PoModule, PoPageModule } from '@po-ui/ng-components';
import { loaderInterceptor } from './interceptors/loader.interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PoPageBlockedUserModule } from '@po-ui/ng-templates';
import { tokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      BrowserAnimationsModule, 
      PoHttpRequestModule, 
      CommonModule, 
      FormsModule, 
      ReactiveFormsModule, 
      BrowserModule,
    ]),
    provideAnimations(),
    provideHttpClient(withInterceptors([loaderInterceptor, tokenInterceptor])),
  ],
  
};