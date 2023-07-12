import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogOrderDetailsComponent } from './dailog-order-details.component';

describe('DailogOrderDetailsComponent', () => {
  let component: DailogOrderDetailsComponent;
  let fixture: ComponentFixture<DailogOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailogOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
