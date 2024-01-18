import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEmployeeComponent } from './self-employee.component';

describe('SelfEmployeeComponent', () => {
  let component: SelfEmployeeComponent;
  let fixture: ComponentFixture<SelfEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfEmployeeComponent]
    });
    fixture = TestBed.createComponent(SelfEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
