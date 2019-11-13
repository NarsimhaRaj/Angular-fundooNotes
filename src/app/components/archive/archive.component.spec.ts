import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveComponent } from './archive.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatCheckboxModule, MatChipsModule, MatIconModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { SearchPipe } from 'src/app/pipe/search.pipe';
import { ReminderComponentComponent } from '../reminder-component/reminder-component.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
import { MyDatePipe } from 'src/app/pipe/date/my-date.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { LabelService } from 'src/app/services/label/label.service';
import { SearchLabelPipe } from 'src/app/pipe/searchLabel/search-label.pipe';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { CardComponent } from '../card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { BarRatingModule } from 'ngx-bar-rating';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { QuestionAnswerComponent } from '../question-answer/question-answer.component';
import { ReminderNotesComponent } from '../reminder-notes/reminder-notes.component';
import { LoginComponent } from '../login/login.component';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArchiveComponent,
        UpdateDialogComponent,
        CardComponent,
        LoginComponent,
        CollaboratorDialogComponent,
        SearchPipe,
        ReminderComponentComponent,
        MyDatePipe,
        QuestionAnswerComponent,
        SearchLabelPipe,
        ColorPickerComponent,
      ],
      imports: [
        MatInputModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule,
        MatCardModule,
        MatTooltipModule,
        MatDialogModule,
        MatChipsModule,
        AppRoutingModule,
        FlexLayoutModule,
        HttpClientModule,
        BarRatingModule,
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' },NoteService,LabelService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
