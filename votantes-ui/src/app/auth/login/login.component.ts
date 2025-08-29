import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject( FormBuilder );
  private router = inject( Router )
  private authService = inject( AuthService );

  loading: boolean = false;
  errorMessage: string = "";

  public myForm: FormGroup = this.fb.group({
    // usuario:    ['dante.ibanez', [ Validators.required, , Validators.minLength(5) ]],
    // contrasena: ['Passw0rd', [ Validators.required, , Validators.minLength(3)]],
    usuario:    ['', [ Validators.required, , Validators.minLength(5) ]],
    contrasena: ['', [ Validators.required, , Validators.minLength(3)]],
  });

  login(): void {

    const { usuario, contrasena } = this.myForm.value;

    if (this.myForm.valid) {

      this.loading = true;

      this.authService.login(usuario, contrasena)
      .subscribe({
        next: ((resp) => {

          // console.log(resp);

          // this.router.navigate(['/home']);

          // redirige recargando la pagina destino
          this.router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            });

        }),

        error: (message) => {
          this.loading = false;
          this.myForm.reset();
        }

      })

    }
  }

}
