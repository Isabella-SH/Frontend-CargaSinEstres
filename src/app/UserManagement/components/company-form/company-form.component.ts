import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargaSinEstresDataService } from 'src/app/services/carga-sin-estres-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})

export class CompanyFormComponent {
  companyRegistrationForm: FormGroup;
  errorMessage: string = '';
  selectedServices: number[] = [];

  constructor(private fb: FormBuilder, private router: Router, private api: CargaSinEstresDataService, private _snackBar: MatSnackBar) {//private http: HttpClient
    this.api.getAllServicios();
    this.companyRegistrationForm = this.fb.group({
      name: ['', Validators.required],
      direction: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern(/^\d+$/)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarpassword: ['', Validators.required],
      description: [''],
      logo: ['', Validators.required],
      tic: ['', Validators.required],
      transporte: [false],
      carga: [false],
      embalaje: [false],
      montaje: [false],
      desmontaje: [false],
      userType: 'company'
    });
  }

  onSubmit() {
    this.errorMessage = '';
    const formData = this.companyRegistrationForm.value;
    let warnings = "";

    if (formData.name.length < 1) {
      warnings += `El nombre no es valido <br>`;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      warnings += `El email no es valido <br>`;
    }

    if (formData.direction.length < 1) {
      warnings += `La ubicacion no es valida <br>`;
    }

    if (!/^\d+$/.test(formData.phoneNumber)) {
      warnings += `El numero de contacto no es valido <br>`;
    }

    if (formData.password.length < 6) {
      warnings += `La contraseña no es valida <br>`;
    }

    if (formData.password !== formData.confirmarpassword) {
      warnings += `No se confirmo la contraseña correctamente <br>`;
    }

    if (!formData.logo){
      warnings += `No se ingreso un link a la imagen de logo de la empresa <br>`;
    }


    if (!formData.description || formData.description.length < 1) {
      warnings += `La descripcion no es valida <br>`;
    }

    this.selectedServices = [];
    if (formData.transporte) this.selectedServices.push(1);
    if (formData.carga) this.selectedServices.push(2);
    if (formData.embalaje) this.selectedServices.push(3);
    if (formData.montaje) this.selectedServices.push(4);
    if (formData.desmontaje) this.selectedServices.push(5);

    this.errorMessage = warnings; // Update the error message with the current errors

    if(!this.errorMessage){

      const companyData = {
        name: formData.name,
        direction: formData.direction,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmarpassword: formData.confirmarpassword,
        description: formData.description,
        logo: formData.logo,
        tic: formData.tic,
        servicioIds: this.selectedServices
      };



      this.api.createCompany(companyData).subscribe((response: any) => {
        if (response && response.id) { //se crea automaticamente el id de la compañia
          this._snackBar.open('Registro exitoso', 'Cerrar', {
            duration: 2000, // Duración en milisegundos
          });
          this.router.navigate(['login']);
        }
      });

    }

  }

  cancelar(){
    this.router.navigate(['/landing-page'])
  }

}
