import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatListModule, MatButtonModule } from '@angular/material'
import { MatMenuModule, MatOptionModule, MatSelectModule } from '@angular/material'
import { MatFormFieldModule, MatIconModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserService } from './services/userServices/user.service';
import { HttpService } from './services/httpServices/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [UserService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
