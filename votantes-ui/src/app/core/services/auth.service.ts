import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { NotificacionService } from './notificacion.service';
import { LoginResponse } from '../../auth/interfaces/usuario';
import { LoginUser } from '../../auth/interfaces/login-user';
import { EstadosService } from './estados.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.apiUsuarios;
  private http = inject( HttpClient);
  private router = inject( Router);
  private tokenService = inject( TokenService);
  private noticiacionService = inject( NotificacionService );
  private estadosService = inject(EstadosService );

  estadoUsuario = this.estadosService.estadoUsuario;

  login( usuario: string, contrasena: string ): Observable<any> {

    const url  = `${ this.baseUrl }auth/login`;

    const credenciales: LoginUser = {
      usuario: usuario,
      contrasena: contrasena,


      idsistema: 2    //Sistema.USUARIOS

      
    }

    return this.http.post<LoginResponse>( url, credenciales )
      .pipe(
        // retry(3),
        //tap( ( { userInfo, token } ) => { this.tokenService.saveToken(token); }),
        tap( ( response ) => {
          if (response.token) {

            this.tokenService.setStorageToken(response);

          }
        }),
        map( () => true ),
        /*map( (response) => {
          if (response.token) {

            // this.tokenService.saveToken(response.token);
            console.log(response.token);
            console.log(response.userInfo);
          }
        }),*/

        catchError((error: HttpErrorResponse )  => {
          const errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
          // if (error.status == 400) {
            this.noticiacionService.showError(errorMessage, "Error");
          // }
          return throwError( () => error );
        })
      );
  }


  isAuthenticated(): boolean {

    if (this.tokenService.getTokenIsValid())
      return true;
    else
      return false



    // this.tokenService.getTokenIsValid();
    // var value = this.tokenService.getStorageToken();
     // if (value != null || value != undefined) {
    //   this.estadoUsuario.set(value.userInfo);
    //   return true;
    // }
    // else {
    //   return false
    // }

  }

  logout() {

    this.tokenService.removeStorageToken();

    // Limpia las señales
    this.estadoUsuario.set(null);

    // this.router.navigate(['/login']);

    // redirige recargando la pagina destino
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }

}
