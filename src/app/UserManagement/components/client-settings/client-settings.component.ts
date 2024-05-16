import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargaSinEstresDataService } from 'src/app/services/carga-sin-estres-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-settings',
  templateUrl: './client-settings.component.html',
  styleUrls: ['./client-settings.component.scss']
})

export class ClientSettingsComponent {
  userSettingsForm: FormGroup;
  errorMessage: string = '';
  id: any;
  client: any;

  constructor(private fb: FormBuilder, private api: CargaSinEstresDataService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {
    this.userSettingsForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      dateOfBirth: [null],
      phoneNumber: [null],
      email: [null],
      password: [null],
      confirmPassword: [null]
    });

    this.route.pathFromRoot[1].url.subscribe(
      url => {
        this.id = url[1].path;
      }
    ); 

    this.getClient(this.id);
  }

  ngOnInit(){}

  getClient(id: any){
    this.api.getCustomerById(id).subscribe(
      (res: any) => 
      {
        this.client = res;
      }
    );
  }

  onSubmit(){
    const formData = this.userSettingsForm.value;

    // Verificar si todos los campos son nulos
    const allFieldsAreNull = Object.values(formData).every(value => value === null);

    if (allFieldsAreNull) {
      this._snackBar.open('No hay cambios para guardar', 'Cerrar', {
        duration: 5000, // Duración en milisegundos
      });
      return;
    }

    const newClientSettings={
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
    }

    // Validar el formato de la fecha de nacimiento
    const dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (formData.dateOfBirth!=null && !dateOfBirthPattern.test(formData.dateOfBirth)) {
      this._snackBar.open('El formato de la fecha de nacimiento debe ser aaaa-mm-dd', 'Cerrar', {
        duration: 5000, // Duración en milisegundos
      });
      return;
    }

    if (formData.password !== null) {
      if (formData.password !== formData.confirmPassword) {
        this._snackBar.open('La contraseña y la confirmación de contraseña no coinciden', 'Cerrar', {
          duration: 5000, // Duración en milisegundos
        });
        return;
      }
    }

    this.api.updateCustomer(this.id, newClientSettings).subscribe(
      (response) => {
        console.log('Respuesta del servidor: ', response);
        this._snackBar.open('Edicion de datos exitoso', 'Cerrar', {
          duration: 2000, // Duración en milisegundos
        });

        setTimeout(() => { location.reload();}, 2000);
      },
      (error) => {
        console.log('Error al actualizar los ajustes: ', error);

        // Mostrar mensaje de error del servidor
        if (error && error.error && error.error.message) {
          this._snackBar.open(`${error.error.message}`, 'Cerrar', {
            duration: 5000, // Duración en milisegundos
          });
        } else {
          this._snackBar.open('Error desconocido del servidor', 'Cerrar', {
            duration: 5000, // Duración en milisegundos
          });
        }
      }
    );
  }

  cancelar(){
    this.router.navigate(['/client', this.id, 'company-table']);
  }

}
