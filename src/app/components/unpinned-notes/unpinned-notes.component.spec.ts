import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpinnedNotesComponent } from './unpinned-notes.component';

describe('UnpinnedNotesComponent', () => {
  let component: UnpinnedNotesComponent;
  let fixture: ComponentFixture<UnpinnedNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpinnedNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpinnedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
