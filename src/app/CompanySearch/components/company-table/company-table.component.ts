import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CargaSinEstresDataService} from 'src/app/services/carga-sin-estres-data.service';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CompanyDetailComponent} from "../company-detail/company-detail.component";
import {CargaRapidaDialogComponent} from "../cargaRapida-dialog/cargaRapida-dialog.component";


@Component({
    selector: 'app-company-table',
    templateUrl: './company-table.component.html',
    styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent {

    dataSource_company = new MatTableDataSource();
    displayedColumns: string[] = ['name', 'services', 'location'];

    @ViewChild(MatPaginator, {static: true})
    paginator!: MatPaginator;

    originalData: any[] = []; //contiene todas las empresas sin ningún filtro aplicado

    customerId: string = '';

    constructor(
        private companyDataService: CargaSinEstresDataService,
        private route: ActivatedRoute,
        public dialog: MatDialog) {

        // Obtiene el id del usuario
        this.route.pathFromRoot[1].url.subscribe(
            url => {
                this.customerId = url[1].path;
            }
        );

    }

    ngOnInit(): void {
        this.dataSource_company.paginator = this.paginator;
        this.getAllCompanies();
        this.getUserFullName();
    }

    getAllCompanies() {
        this.companyDataService.getAllCompanies().subscribe((res: any) => {
            this.originalData = res;
            this.dataSource_company.data = res;

            /*const observables = this.dataSource_company.data.map((company: any) => {
              return this.companyDataService.searchExistingMembership(company.id);
            });

            forkJoin(observables).subscribe((results: boolean[]) => {
              this.dataSource_company.data.forEach((company: any, index: number) => {
                const hasMembership = results[index];
                company.hasMembership = hasMembership;
                company.rowStyle = hasMembership ? 'golden-background' : 'default-background';
              });

              // Ahora que se han completado todas las llamadas
              this.dataSource_company.data.sort((a: any, b: any) => {
                if (a.hasMembership && !b.hasMembership) {
                  return -1; // a viene antes que b
                } else if (!a.hasMembership && b.hasMembership) {
                  return 1; // b viene antes que a
                }
                return 0; // sin cambios en el orden
              });

            });*/

            this.searchBySelectedServices();
            this.searchByLocation();
        });

    }


    /* FILTER: SEARCH BY NAME */
    manualCompanyName: string = ''; // Nombre de la empresa ingresado por el usuario

    searchByCompanyName() {
        this.dataSource_company.data = this.originalData.filter((company) => {
            return company.name.toLowerCase().includes(this.manualCompanyName.toLowerCase());
        });
    }

    /* FILTER: SEARCH BY SERVICES */
    selectedServices: number[] = [];
    servicesList: { id: number, name: string }[] = [
        { id: 1, name: 'Transporte' },
        { id: 2, name: 'Carga' },
        { id: 3, name: 'Embalaje' },
        { id: 4, name: 'Montaje' },
        { id: 5, name: 'Desmontaje' }
    ];


    searchBySelectedServices() {
        if (this.selectedServices.length === 0) {
            this.dataSource_company.data = this.originalData;
        } else {
            this.dataSource_company.data = this.originalData.filter(company => {
                const servicioIds = company.servicios.map((servicio: any) => servicio.id);
                return this.selectedServices.every(serviceId => servicioIds.includes(serviceId));
            });
        }

        this.dataSource_company.filter = ''; 
    }

    onServiceSelectionChange(event: any) {
        this.selectedServices = event.value.map((service: { id: number, name: string }) => service.id);
        this.searchBySelectedServices();
    }


    /* FILTER: SEARCH BY LOCATION */
    searchMethod: string = 'noFilter'; // Opción predeterminada <----------------//Membreship
    manualLocation: string = ''; // Ubicación manual ingresada por el usuario
    userLocation: string = ''; // Ubicación del usuario
    userFullName: string = ''


    getUserFullName() {
        this.companyDataService.getCustomerById(this.customerId).subscribe(
            (customer) => {
                this.userFullName = customer.firstName + ' ' + customer.lastName;
            }
        );
    }

    searchByLocation() {
        if (this.searchMethod === 'userLocation') {
            this.dataSource_company.data = this.originalData.filter((company) => {
                return company.direccion.toLowerCase().includes(this.userLocation.toLowerCase());
            });
        } else if (this.searchMethod === 'manualLocation') {
            this.dataSource_company.data = this.originalData.filter((company) => {
                return company.direccion.toLowerCase().includes(this.manualLocation.toLowerCase());
            });
        } else {
            // Si se selecciona "Sin filtro", no se aplica ningún filtro
            this.dataSource_company.data = this.originalData;
            this.searchMethod = '';
        }
    }

    /* GO TO COMPANY INFO PAGE */
    getRow(row: any) {
        const dialogRef = this.dialog.open(CompanyDetailComponent, {
            data: {
                company: row,
                customerId: this.customerId
            }
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(CargaRapidaDialogComponent, {
            data: {
                customerId: this.customerId,
            }
        });
    }

}


