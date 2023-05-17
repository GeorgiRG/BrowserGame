import { ErrorHandler, NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandlerInterceptor } from './core/interceptors/http-error-handler.interceptor';
import { GlobalErrorHandler } from './core/services/global-error-handler.service';
import { MessageModalComponent } from './shared/components/modals/message-modal/message-modal.component';
import { IconsModule } from './shared/icons/icons.module';
import { CharCreationComponent } from './modules/character-creation/char-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    MainComponent,
    MessageModalComponent,
    CharCreationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    IconsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
