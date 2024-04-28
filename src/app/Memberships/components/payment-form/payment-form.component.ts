import {Component, Input} from '@angular/core';
import {CargaSinEstresDataService} from 'src/app/services/carga-sin-estres-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-payment-form',
    templateUrl: './payment-form.component.html',
    styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {

    planOptions = [
        { months: 3, price: 35 },
        { months: 6, price: 95 },
        { months: 12, price: 365 }
    ];

    selectedPlan: any;
    companyId: string = '';
    cardNumber: string = '';

    newMembership: any = {
        startDate: undefined,
        endDate: undefined,
        price: undefined
    };

    constructor(
        private dataService: CargaSinEstresDataService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar
    ){
        this.route.pathFromRoot[1].url.subscribe(
            url => {
                this.companyId = url[1].path;
            }
        );
    }


    vigenciaSuscripcion: string = '';

    CVV: string = '';
    fechaVencimiento: string = '';

    //para mostrar el mensaje de confirmacion
    confirmacionVisible: boolean = false;

    //para desactivar el boton de confirmacion (no hacer spam de subscripciones)
    botonDesactivado: boolean = true;

    //incializar la firma aleatoria
    firma: string = this.generarCodigoAleatorio();

    calculateEndDate(startDate: Date, months: number): Date {
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + months);
        return endDate;
    }

    addMembership() {
        const startDate = new Date();
        this.newMembership = {
            startDate: startDate.toISOString(),
            endDate: this.calculateEndDate(startDate, this.selectedPlan.months).toISOString(),
            price: this.selectedPlan.price
        };

        console.log("Test", this.newMembership);

        this.dataService.createMembership(this.companyId, this.newMembership).subscribe(
            (response) => {
                this._snackBar.open('Suscripción creada con éxito', 'Cerrar', {
                    duration: 2000, // Duración en milisegundos
                });
            }
        );
    }


    onSubmit() {
        this.addMembership();
        this.confirmacionVisible = true;
    }

    generarCodigoAleatorio(): string {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        const longitudCodigo = 6;

        for (let i = 0; i < longitudCodigo; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres.charAt(indice);
        }

        return codigo;
    }

    firmar() {
        this.firma = this.generarCodigoAleatorio();
    }


    descargarBoleta() {
        const contenidoBoleta = this.generarContenidoBoleta();

        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenidoBoleta));
        enlaceDescarga.setAttribute('download', 'boleta.txt');

        enlaceDescarga.style.display = 'none';
        document.body.appendChild(enlaceDescarga);
        enlaceDescarga.click();
        document.body.removeChild(enlaceDescarga);
        this._snackBar.open('Boleta descargada con éxito', 'Cerrar', {
            duration: 2000, // Duración en milisegundos
        });
    }

    generarContenidoBoleta(): string {
        const contenido = `
    Información de la Boleta:

    Vigencia de Suscripción: ${this.vigenciaSuscripcion}
    Numero de Tarjeta: ${this.cardNumber}
    Firma: ${this.firma}
    `;
        return contenido;
    }

}