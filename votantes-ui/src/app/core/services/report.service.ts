import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private http = inject( HttpClient );
  private readonly baseUrl: string = environment.reportsUrl;

  url  = `${ this.baseUrl }generate-pdf-parameters?reportName=reports/`;

  constructor() { }

  GeneratePDF(votoLiteral:string, nombrecompleto: string, documento: string,
    mesa: string, recinto: string, pais: string, departamento: string,
    localidad: string, fecha: string
  ){
    // const url  = `${ this.baseUrl }generate-pdf-parameters?reportName=reports/`;
    const reportName  = `Votantes/certificado.trdp`;

    return this.http.get(`${this.url}${reportName}
        &parameters[votoLiteral]=${votoLiteral}
        &parameters[nombrecompleto]=${nombrecompleto}
        &parameters[documento]=${documento}
        &parameters[mesa]=${mesa}
        &parameters[recinto]=${recinto}
        &parameters[pais]=${pais}
        &parameters[departamento]=${departamento}
        &parameters[localidad]=${localidad}
        &parameters[fecha]=${fecha}
      `
      , {observe:'response',responseType:'blob'});
  }

  GeneraCertificadoJuradoPDF(nombre:string){
    
    const reportName  = `Votantes/certif-jurado.trdp`;

    return this.http.get(`${this.url}${reportName}
        &parameters[nombre]=${nombre}       
      `
      , {observe:'response',responseType:'blob'});
  }
}
