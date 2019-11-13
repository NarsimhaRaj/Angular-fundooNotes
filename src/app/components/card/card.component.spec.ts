import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MatCardModule, MatListModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatChipsModule, MatProgressBarModule, MatDatepickerModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotesComponent } from '../notes/notes.component';
import { ArchiveComponent } from '../archive/archive.component';
import { TrashComponent } from '../trash/trash.component';
import { LabelnotesComponent } from '../labelnotes/labelnotes.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { SearchPipe } from 'src/app/pipe/search.pipe';
import { ReminderComponentComponent } from '../reminder-component/reminder-component.component';
import { ReminderNotesComponent } from '../reminder-notes/reminder-notes.component';
import { MyDatePipe } from 'src/app/pipe/date/my-date.pipe';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';
import { QuestionAnswerComponent } from '../question-answer/question-answer.component';
import { SearchLabelPipe } from 'src/app/pipe/searchLabel/search-label.pipe';
import { PinUnpinNotesComponent } from '../pin-unpin-notes/pin-unpin-notes.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BarRatingModule } from 'ngx-bar-rating';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CardComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        DashboardComponent,
        NotesComponent,
        ArchiveComponent,
        TrashComponent,
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
        ColorPickerComponent
   ],
      imports:[
        MatCardModule,
        HttpClientModule,
        AppRoutingModule,
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
        MatSnackBarModule,
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
