import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinUnpinNotesComponent } from './pin-unpin-notes.component';

describe('PinUnpinNotesComponent', () => {
  let component: PinUnpinNotesComponent;
  let fixture: ComponentFixture<PinUnpinNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinUnpinNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinUnpinNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
