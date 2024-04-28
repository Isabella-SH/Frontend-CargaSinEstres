import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentDialogComponent } from './edit-payment-dialog.component';

describe('EditPaymentDialogComponent', () => {
  let component: EditPaymentDialogComponent;
  let fixture: ComponentFixture<EditPaymentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPaymentDialogComponent]
    });
    fixture = TestBed.createComponent(EditPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
