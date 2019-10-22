import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelnotesComponent } from './labelnotes.component';

describe('LabelnotesComponent', () => {
  let component: LabelnotesComponent;
  let fixture: ComponentFixture<LabelnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
