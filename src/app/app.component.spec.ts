import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterGuard } from './auth/auth.guard';
import { FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { 
  MatCardModule, 
  MatIconModule, 
  MatMenuModule, 
  MatCheckboxModule, 
  MatProgressBarModule, 
  MatDatepickerModule, 
  MatChipsModule,
  MatToolbarModule, 
  MatSidenavModule, 
  MatFormFieldModule, 
  MatListModule} from '@angular/material';
import { CardComponent } from './components/card/card.component';
import { Route} from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ArchiveComponent } from './components/archive/archive.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import { LabelnotesComponent } from './components/labelnotes/labelnotes.component';
import { ReminderComponentComponent } from './components/reminder-component/reminder-component.component';
import { FroalaViewModule, FroalaEditorModule } from 'angular-froala-wysiwyg';
import { BarRatingModule } from 'ngx-bar-rating';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { PinUnpinNotesComponent } from './components/pin-unpin-notes/pin-unpin-notes.component';
import { SearchLabelPipe } from './pipe/searchLabel/search-label.pipe';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { ImageCropDialogComponent } from './components/image-crop-dialog/image-crop-dialog.component';
import { MyDatePipe } from './pipe/date/my-date.pipe';
import { ReminderNotesComponent } from './components/reminder-notes/reminder-notes.component';
import { SearchPipe } from './pipe/search.pipe';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TrashComponent } from './components/trash/trash.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        CardComponent,
        LabelnotesComponent,
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
        FormsModule,
        MatListModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule,
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatChipsModule,
        MatProgressBarModule,
        MatDatepickerModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        ImageCropperModule,
        BarRatingModule,
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],      
    }).compileComponents();
  }));
  fit('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  fit(`should have as title 'fundooNotes'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('fundooNotes');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to fundooNotes!');
  // }));
});
