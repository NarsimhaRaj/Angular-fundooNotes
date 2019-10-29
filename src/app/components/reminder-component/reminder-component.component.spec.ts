import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderComponentComponent } from './reminder-component.component';

describe('ReminderComponentComponent', () => {
  let component: ReminderComponentComponent;
  let fixture: ComponentFixture<ReminderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
