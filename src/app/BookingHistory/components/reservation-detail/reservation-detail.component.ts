import {Component, Input} from '@angular/core';
import {Reservation} from "../../../models/reservation.model";
import { MatDialog } from '@angular/material/dialog';
import { EditPaymentDialogComponent } from '../edit-payment-dialog/edit-payment-dialog.component';
import {ChatDialogComponent} from "../chat-dialog/chat-dialog.component";

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent {
  @Input() reservation!: Reservation;
  @Input() userType!: string;

  constructor(private dialog: MatDialog) { }
  openEditPaymentDialog() {
    const dialogRef = this.dialog.open(EditPaymentDialogComponent, {
      width: '600px',
      data: {
        element: this.reservation
      }
    });
    dialogRef.afterClosed().subscribe(element =>{
      if (element){
        this.reservation = element;
        console.log('Nuevo precio:', this.reservation.price);
      }else{
        console.log('Edición cancelada');
      }
    })

  }

}