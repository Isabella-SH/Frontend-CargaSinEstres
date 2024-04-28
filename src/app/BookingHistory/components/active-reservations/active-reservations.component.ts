import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CargaSinEstresDataService} from 'src/app/services/carga-sin-estres-data.service';

@Component({
    selector: 'app-active-reservations',
    templateUrl: './active-reservations.component.html',
    styleUrls: ['./active-reservations.component.scss']
})
export class ActiveReservationsComponent implements OnInit {

    userType: any;
    userId: any;
    newReservations: any[];
    pendingReservations: any[];

    constructor(
        private companyDataService: CargaSinEstresDataService,
        private route: ActivatedRoute,
    ) {
        this.newReservations = [];
        this.pendingReservations = [];
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
        this.getNewReservations();
        this.getPendingReservations();
    }

    getNewReservations() {
        if (this.userType === 'client') {
            this.companyDataService.getReservationByCustomerId(this.userId).subscribe((res: any) => {
                this.newReservations = res;
                this.newReservations = this.newReservations.filter(reservation =>
                    reservation.status === 'solicited'
                );
            });
        }
        else{
            this.companyDataService.getReservationByCompanyId(this.userId).subscribe((res: any) => {
                this.newReservations = res;
                this.newReservations = this.newReservations.filter(reservation =>
                    reservation.status === 'solicited'
                );
            });
        }
    }

    getPendingReservations() {
        if (this.userType === 'client') {
            this.companyDataService.getReservationByCustomerId(this.userId).subscribe((res: any) => {
                this.pendingReservations = res;
                console.log(res)
                this.pendingReservations = this.pendingReservations.filter(reservation =>
                    reservation.status === 'scheduled' ||
                    reservation.status === 'to be scheduled' ||
                    reservation.status === 're-scheduled' ||
                    reservation.status === 'in progress'
                );
            });
        }
        else{
            this.companyDataService.getReservationByCompanyId(this.userId).subscribe((res: any) => {
                this.pendingReservations = res;
                this.pendingReservations = this.pendingReservations.filter(reservation =>
                    reservation.status === 'scheduled' ||
                    reservation.status === 'to be scheduled' ||
                    reservation.status === 're-scheduled' ||
                    reservation.status === 'in progress'
                );
            });
        }
    }

    updateReservations() {
        this.getNewReservations();
        this.getPendingReservations();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        if (!filterValue) {
            this.getPendingReservations();
        } else {
            this.pendingReservations = this.pendingReservations.filter(reservation =>
                Object.values(reservation).some(value =>
                    (typeof value === 'string' && value.toLowerCase().includes(filterValue))
                )
            );
        }
    }

}

