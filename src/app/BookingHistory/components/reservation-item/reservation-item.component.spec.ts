import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationItemComponent } from './reservation-item.component';

describe('ReservationItemComponent', () => {
  let component: ReservationItemComponent;
  let fixture: ComponentFixture<ReservationItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationItemComponent]
    });
    fixture = TestBed.createComponent(ReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
