import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpScrollBtnComponent } from './up-scroll-btn.component';

describe('UpScrollBtnComponent', () => {
  let component: UpScrollBtnComponent;
  let fixture: ComponentFixture<UpScrollBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpScrollBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpScrollBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
