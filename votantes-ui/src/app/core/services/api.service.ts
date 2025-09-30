import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Ciudadano } from '../models/ciudadano.model';
import { BuscarCiudadanos } from '../models/buscar-ciudadanos.model';
import { CiudadanoGenerales } from '../models/ciudadano-generales.model';

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

  buscarCiudadanos(params: any): Observable<any> {
    return this.http.post<any>(`${this.url}ciudadanos-generales2025/buscar/`, params)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.total) {
            // Error de "demasiados resultados"
            return throwError({
              type: 'TOO_MANY_RESULTS',
              message: error.error.message,
              total: error.error.total,
              criteria: error.error.criteria,
              suggestion: error.error.suggestion
            });
          } else if (error.status === 404) {
            // Error de "no hay resultados"
            return throwError({
              type: 'NO_RESULTS',
              message: error.error.message,
              criteria: error.error.criteria,
              suggestion: error.error.suggestion
            });
          } else {
            // Otro tipo de error
            return throwError({
              type: 'GENERAL_ERROR',
              message: 'Error al realizar la búsqueda. Intente nuevamente.'
            });
          }
        })
      );
  }
  
/*
  getCiudadanosByParams(params: BuscarCiudadanos): Observable<CiudadanoGenerales[]> {
    return this.http.post<CiudadanoGenerales[]>(`${this.url}ciudadanos-generales2025/buscar/`, params);
  }
*/

}
