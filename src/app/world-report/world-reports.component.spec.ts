import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldReportsComponent } from './world-reports.component';

describe('WorldReportsComponent', () => {
  let component: WorldReportsComponent;
  let fixture: ComponentFixture<WorldReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorldReportsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
