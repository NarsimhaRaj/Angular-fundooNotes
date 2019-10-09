import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatListModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatCheckboxModule, MatCardModule, MatTooltipModule } from '@angular/material'
import { MatMenuModule, MatOptionModule, MatSelectModule } from '@angular/material'
import { MatFormFieldModule, MatIconModule, MatSnackBarModule, MatSidenavModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserService } from './services/userServices/user.service';
import { HttpService } from './services/httpServices/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent
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
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    LayoutModule,
    ClickOutsideModule
  ],
  providers: [UserService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
