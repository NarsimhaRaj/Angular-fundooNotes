import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderNotesComponent } from './reminder-notes.component';

describe('ReminderNotesComponent', () => {
  let component: ReminderNotesComponent;
  let fixture: ComponentFixture<ReminderNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
