import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CargaSinEstresDataService} from "../../../services/carga-sin-estres-data.service";

@Component({
    selector: 'cargaRapida-dialog',
    templateUrl: './cargaRapida-dialog.component.html',
    styleUrls: ['./cargaRapida-dialog.component.scss'],
})
export class CargaRapidaDialogComponent {

    reservation: any = {
        originAddress: undefined,
        destinationAddress: undefined,
        startDate: undefined,
        startTime: undefined,
        services: []
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private api: CargaSinEstresDataService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<CargaRapidaDialogComponent>
    ) {
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'Cerrar', {
            panelClass: ['color-snackbar-created'],
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
    }

    addReservation() {
        const now = new Date();
        this.reservation.startDate = now.toISOString().slice(0, 10);
        this.reservation.startTime = `${now.getHours()}:${now.getMinutes()}`;
        this.reservation.services = 'carga';

        this.api.getAllCompanies().subscribe((companies: any[]) => {
            const randomIndex = Math.floor(Math.random() * companies.length);
            const randomCompany = companies[randomIndex];

            this.api.createReservation(this.data.customerId, randomCompany.id, this.reservation).subscribe(
                (res: any) => {
                    this.openSnackBar('Carga Rápida agregada exitosamente');
                },
                (error: any) => {
                    console.error('Error al agregar reserva:', error);
                }
            );
            this.dialogRef.close();
        });
    }

    onSubmit() {
        this.addReservation();
    }

    closeDialog() {
        this.dialogRef.close();
    }
}