import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductReviewComponent } from './dialog-product-review.component';

describe('DialogProductReviewComponent', () => {
  let component: DialogProductReviewComponent;
  let fixture: ComponentFixture<DialogProductReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
