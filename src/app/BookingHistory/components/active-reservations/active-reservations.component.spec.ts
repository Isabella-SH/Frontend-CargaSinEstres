import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveReservationsComponent } from './active-reservations.component';

describe('HistoryCardsComponent', () => {
  let component: ActiveReservationsComponent;
  let fixture: ComponentFixture<ActiveReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveReservationsComponent]
    });
    fixture = TestBed.createComponent(ActiveReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
