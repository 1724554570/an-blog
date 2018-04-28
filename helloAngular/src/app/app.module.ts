import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { AppComponent } from './base/app.component';
import { LoginComponent } from './components/members/login/login.component';
import { AuthService } from './core/auth.service';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    routing
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: 'authService', useClass: AuthService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
