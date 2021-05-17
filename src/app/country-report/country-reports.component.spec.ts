import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryReportsComponent } from './country-reports.component';

describe('CountryReportsComponent', () => {
  let component: CountryReportsComponent;
  let fixture: ComponentFixture<CountryReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryReportsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
