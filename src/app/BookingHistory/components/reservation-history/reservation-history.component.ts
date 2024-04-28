import {Component, OnInit} from '@angular/core';
import {CargaSinEstresDataService} from "../../../services/carga-sin-estres-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-reservation-history',
    templateUrl: './reservation-history.component.html',
    styleUrls: ['./reservation-history.component.scss']
})
export class ReservationHistoryComponent implements OnInit {

    userType: any;
    userId: any;
    reservations: any[];

    constructor(
        private companyDataService: CargaSinEstresDataService,
        private route: ActivatedRoute,
    ) {
        this.reservations = [];
        this.route.pathFromRoot[1].url.subscribe(
            url => {
                // Obtiene el tipo de usuario
                this.userType = url[0].path;
                // Obtiene el id del usuario
                this.userId = url[1].path;
            }
        );
    }

    ngOnInit(): void {
        this.getOldReservations();
    }

    getOldReservations() {
        this.companyDataService.getReservationByCompanyId(this.userId).subscribe((res: any) => {
            this.reservations = res;
            this.reservations = this.reservations.filter(reservation =>
                reservation.status === 'finalized' || reservation.status === 'cancelled'
            );
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        if (!filterValue) {
            this.getOldReservations();
        } else {
            this.reservations = this.reservations.filter(reservation =>
                Object.values(reservation).some(value =>
                    (typeof value === 'string' && value.toLowerCase().includes(filterValue))
                )
            );
        }
    }

}
