import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProblemComponent } from './dialog-problem.component';

describe('DialogProblemComponent', () => {
  let component: DialogProblemComponent;
  let fixture: ComponentFixture<DialogProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProblemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
