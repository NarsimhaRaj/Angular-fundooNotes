import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedNotesComponent } from './pinned-notes.component';

describe('PinnedNotesComponent', () => {
  let component: PinnedNotesComponent;
  let fixture: ComponentFixture<PinnedNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnedNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
