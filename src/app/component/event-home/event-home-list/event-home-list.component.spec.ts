import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHomeListComponent } from './event-home-list.component';

describe('EventHomeListComponent', () => {
  let component: EventHomeListComponent;
  let fixture: ComponentFixture<EventHomeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventHomeListComponent]
    });
    fixture = TestBed.createComponent(EventHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
