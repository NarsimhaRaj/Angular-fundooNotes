import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatListModule, MatButtonModule, MatToolbarModule, MatExpansionModule,
   MatCheckboxModule, MatCardModule, MatTooltipModule, MatTabsModule,
    MatProgressBarModule, MatChipsModule, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule } from '@angular/material'
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
import { AuthGuard, RegisterGuard } from './auth/auth.guard';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { LabelsDialogComponent } from './components/labels-dialog/labels-dialog.component';
import { CartService } from './services/cartServices/cart.service';
import { CardComponent } from './components/card/card.component';
import { LabelService } from './services/label/label.service';
import { LabelnotesComponent } from './components/labelnotes/labelnotes.component';
import { CollaboratorDialogComponent } from './components/collaborator-dialog/collaborator-dialog.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SearchPipe } from './pipe/search.pipe';
import { ReminderComponentComponent } from './components/reminder-component/reminder-component.component';
import { DatePipe } from '@angular/common';
import { ReminderNotesComponent } from './components/reminder-notes/reminder-notes.component';
import { MyDatePipe } from './pipe/date/my-date.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropDialogComponent } from './components/image-crop-dialog/image-crop-dialog.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { SearchLabelPipe } from './pipe/searchLabel/search-label.pipe';
import { PinUnpinNotesComponent } from './components/pin-unpin-notes/pin-unpin-notes.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { BarRatingModule } from "ngx-bar-rating";


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
    CartDialogComponent,
    LabelsDialogComponent,
    CardComponent,
    LabelnotesComponent,
    CollaboratorDialogComponent,
    ShoppingCartComponent,
    SearchPipe,
    ReminderComponentComponent,
    ReminderNotesComponent,
    MyDatePipe,
    ImageCropDialogComponent,
    QuestionAnswerComponent,
    SearchLabelPipe,
    PinUnpinNotesComponent,
    ColorPickerComponent,
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
    MatChipsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    GridModule,
    HttpClientModule,
    LayoutModule,
    ClickOutsideModule,
    NgxPopper,
    ImageCropperModule,
    BarRatingModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  entryComponents: 
  [
    UpdateDialogComponent, 
    CartDialogComponent, 
    LabelsDialogComponent, 
    CollaboratorDialogComponent,
    ImageCropDialogComponent
  ],
  providers: [UserService, HttpService, AuthGuard, CartService, LabelService, RegisterGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
