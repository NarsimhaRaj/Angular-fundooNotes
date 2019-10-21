import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatListModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatTabsModule } from '@angular/material'
import { MatMenuModule, MatOptionModule, MatSelectModule } from '@angular/material'
import { MatFormFieldModule, MatIconModule, MatSnackBarModule, MatSidenavModule, MatDialogModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserService } from './services/userServices/user.service';
import { HttpService } from './services/httpServices/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ClickOutsideModule } from 'ng-click-outside';
import { NotesComponent } from './components/notes/notes.component';
import { NgxPopper } from 'angular-popper';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { LabelsDialogComponent } from './components/labels-dialog/labels-dialog.component';
import { CartService } from './services/cartServices/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    NotesComponent,
    ArchiveComponent,
    TrashComponent,
    UpdateDialogComponent,
    CartComponent,
    CartDialogComponent,
    LabelsDialogComponent
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
    MatDialogModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    GridModule,
    HttpClientModule,
    LayoutModule,
    ClickOutsideModule,
    NgxPopper
  ],
  entryComponents: [UpdateDialogComponent,CartDialogComponent,LabelsDialogComponent],
  providers: [UserService, HttpService,AuthGuard,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
