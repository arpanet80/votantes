import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Ciudadano } from '../models/ciudadano.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private http = inject( HttpClient );
  private url = `${environment.apiUrl}`;

  constructor() {   }

  ///////////////////////////////////////////////////////
  /////////////// CIUDADANO  ////////////////////////////////
  ///////////////////////////////////////////////////////

  // getCiudadano(ci: string): Observable<Ciudadano> {
  //   return this.http.get(`${this.url}certificado-votante/${ci}`)
  //     .pipe<Ciudadano>(map((data: any) => data));
  // }

  getCiudadanoJudiciales(ci: string): Observable<Ciudadano> {
    return this.http.get(`${this.url}certificado-votante/${ci}`).pipe(
      map((data: any) => data),
      catchError(error => {
        if (error.status === 404) {
          // Aquí manejas el error 404 de manera específica
          return throwError('NoPadron');
        }
        // Puedes manejar otros errores aquí o re-lanzarlos
        return throwError(error);
      })
    );
  }

  getCiudadanoGenerales(ci: string): Observable<Ciudadano> {
    return this.http.get(`${this.url}certificado-votante/generales/${ci}`).pipe(
      map((data: any) => data),
      catchError(error => {
        if (error.status === 404) {
          // Aquí manejas el error 404 de manera específica
          return throwError('NoPadron');
        }
        // Puedes manejar otros errores aquí o re-lanzarlos
        return throwError(error);
      })
    );
  }


}
