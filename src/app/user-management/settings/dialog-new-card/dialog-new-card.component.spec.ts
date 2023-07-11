import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewCardComponent } from './dialog-new-card.component';

describe('DialogNewCardComponent', () => {
  let component: DialogNewCardComponent;
  let fixture: ComponentFixture<DialogNewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
