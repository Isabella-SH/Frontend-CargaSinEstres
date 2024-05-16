import { Component, Inject, EventEmitter, ViewChild, Input, Output } from '@angular/core';
import { CargaSinEstresDataService } from 'src/app/services/carga-sin-estres-data.service';
import { NgForm } from '@angular/forms';
import { ActiveReservationsComponent } from '../active-reservations/active-reservations.component';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-payment-dialog',
  templateUrl: './edit-payment-dialog.component.html',
  styleUrls: ['./edit-payment-dialog.component.scss']
})
export class EditPaymentDialogComponent {

  payment: any;
  startDate: any;
  startTime: any;
  paymentForm!: NgForm;

  // @ViewChild('paymentForm', {static: false}) currentForm!: NgForm;

  constructor(
      private cargaSinEstresDataService: CargaSinEstresDataService,
      public dialogRef: MatDialogRef<EditPaymentDialogComponent>,
      private route: ActivatedRoute,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.startDate = this.data.element.startDate;
    this.startTime = this.data.element.startTime;
    this.payment = this.data.element.price;
    //this.status = 'rescheduled';
  }

  @Output() reservationUpdated: EventEmitter<void> = new EventEmitter<void>();
    setReservationStatus(company: any, status: any) {
        console.log("status:", status)
        this.cargaSinEstresDataService.updateReservationStatus(company.id, status, {}).subscribe((response: any) => {
            if (status === 're-scheduled') {
                this._snackBar.open('Se actualizó la información de la reserva con éxito', 'Cerrar', {
                    duration: 2000,
                });
            }
            this.reservationUpdated.emit();
        });
    }

  submit() {
    console.log('Enviando');
    this.cargaSinEstresDataService.updateReservationPayment(this.data.element.id, this.payment, this.startDate, this.startTime).subscribe((response: any) => {
      this.data.element.price = this.payment;
      if (this.startDate instanceof Date) {
        this.data.element.startDate = this.startDate.toISOString().split('T')[0];
        // Continúa con el código que utiliza startDateISOString
      }
      else{
        this.data.element.startDate = this.startDate;
      }
      this.data.element.startTime = this.startTime;

      if(this.data.element.status === 'scheduled'){
        this.setReservationStatus(this.data.element, 're-scheduled');
      }

      this._snackBar.open('Se actualizó la información de la reserva con éxito', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
      });
      this.dialogRef.close(this.data.element);
      return response;
    });

  }
  cancel(){
    this.dialogRef.close();
  }

}
