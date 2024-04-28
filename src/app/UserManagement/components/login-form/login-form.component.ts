import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargaSinEstresDataService } from 'src/app/services/carga-sin-estres-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  emailVerify: string = '';
  passwordVerify: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private api: CargaSinEstresDataService, private router: Router, private _snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }


  onSubmit() {
    this.errorMessage = '';
    const LoginData = this.loginForm.value;
    let warnings = "";

    if(!LoginData.email || !LoginData.password){
      warnings += `Se necesitan ambos campos para acceder <br>`;
    }

    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(LoginData.email)){
      warnings += `Email incorrecto<br>`;
    }

    if(LoginData.password.length < 6){
      warnings += `Contraseña incorrecta<br>`;
    }

    this.errorMessage = warnings;

    if (this.errorMessage == '') {
      this.emailVerify = this.loginForm.value.email;
      this.passwordVerify = this.loginForm.value.password;

      try {
        // Buscar en clientes
        
        this.api.getCustomersForLogin(this.emailVerify, this.passwordVerify)
          .subscribe((clientResponse: any) => {
            if (clientResponse != null) {
              // Las credenciales son válidas para un cliente, redirigir a la página correspondiente
              this._snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
                duration: 2000, // Duración en milisegundos
              });
              this.router.navigate(['client/'+ clientResponse.id + '/company-table']);
            }
          }
        );

        this.api.getCompaniesForLogin(this.emailVerify, this.passwordVerify).subscribe((companyResponse: any) => {
          if (companyResponse != null) {
            this._snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
              duration: 2000, // Duración en milisegundos
            });
            this.router.navigate(['company/'+ companyResponse.id + '/active-reservations']);
          } else {
            this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';
          }
        }
      );   
      } catch (error) {
        this.errorMessage = 'Ocurrió un error al iniciar sesión. Intente nuevamente.';
      } 
    }
  
  }

  cancelar(){
    this.router.navigate(['/landing-page']);
  }

}
