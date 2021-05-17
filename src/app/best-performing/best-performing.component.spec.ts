import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPerformingComponent } from './best-performing.component';

describe('BestPerformingComponent', () => {
  let component: BestPerformingComponent;
  let fixture: ComponentFixture<BestPerformingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestPerformingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestPerformingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
