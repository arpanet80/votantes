import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ControlMessagesComponent } from '../../../core/components/control-messages.component';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';
import { CertificadoVotante } from '../../../core/models/certificado-voto.model';
import { Ciudadano } from '../../../core/models/ciudadano.model';
import { ApiService } from '../../../core/services/api.service';
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-votantes-generales-2020',
  imports: [ReactiveFormsModule, ControlMessagesComponent, SpinnerComponent, DatePipe],
  templateUrl: './votantes-generales-2020.component.html',
  styleUrl: './votantes-generales-2020.component.css'
})
export class VotantesGenerales2025Component {
    private apiService = inject ( ApiService );
  private reportService = inject ( ReportService );
  private fbuilder = inject( FormBuilder );

  private readonly filesUrl: string = environment.filesUrl;
  
  public ciudadano = signal<Ciudadano | null>(null)
  public nombreCompleto =';'
  public documentoIdentidad =';'
  formularioVisible = true;
  encontradoPadron=true;
  llegoDato = false;
  certificadoVotante!: CertificadoVotante;

  form = this.fbuilder.group({
    ci: ['', [Validators.required, Validators.minLength(8)]],
    complemento: ['', [Validators.minLength(2)]],
  });

  consultar() {

    
    if (this.form.invalid) {
      this.form.markAllAsTouched()

      return;
    }
    else {

        this.formularioVisible = false;

        this.apiService.getCiudadanoJudiciales(String(this.form.value.ci) ).subscribe({
          next: ((res:Ciudadano) => {

            this.ciudadano.set(res);
            this.nombreCompleto = res.nombres + ' ' + res.appat + ' ' + res.apmat + ' ' + res.apesp;
            this.documentoIdentidad = res.DocumentoIdentidad + ' ' + res.ComplementoDocumentoIdentidad;
  
          }),
          error: (error) => {
            if (error === 'NoPadron') {
              this.formularioVisible = true;

              this.encontradoPadron = false;
              // console.log("No existe>>>>>>>>>>>>>>>>>");
              // this.form.reset();
            }
          }
        })

    }

  }

  nuevaConsultar() {
    this.formularioVisible = true;
    this.encontradoPadron = true;
    this.form.reset();
    this.ciudadano.set(null);
  }

  generaCertificado() {
    let siNo ='';

    if (this.ciudadano()?.Voto) {
      siNo = 'SI';
    } else {
      siNo = 'NO';
    }

    /// Calcula la fecha actual en texto //////////////////////
    const fechaActual = new Date();
    const formatoFecha = new Intl.DateTimeFormat('es-ES', {   // Configurar el formateador en español
      weekday: 'long', // Día de la semana
      year: 'numeric', // Año completo
      month: 'long',   // Mes completo
      day: 'numeric',  // Día del mes
    });
    let fechaTexto = formatoFecha.format(fechaActual);
    fechaTexto = fechaTexto.replace(',', '');
    ////////////////////////////

    this.certificadoVotante = {
      votoLiteral: siNo,
      nombrecompleto: this.ciudadano()?.nombres + ' ' + this.ciudadano()?.appat + ' ' + this.ciudadano()?.apmat + ' ' + this.ciudadano()?.apesp,
      documento: String( this.ciudadano()?.DocumentoIdentidad ),
      mesa: String(this.ciudadano()?.meesaRecinto),
      recinto: String(this.ciudadano()?.NomReci),
      pais: String(this.ciudadano()?.NomPais),
      departamento: String(this.ciudadano()?.NomDep),
      localidad: String(this.ciudadano()?.NomLoc),
      fecha: 'Potosi,' + fechaTexto
    };

    this.reportService.GeneratePDF(
      siNo.trim(),
      this.ciudadano()?.nombres.trim() + ' ' + this.ciudadano()?.appat.trim() + ' ' + this.ciudadano()?.apmat.trim() + ' ' + this.ciudadano()?.apesp.trim(),
      String( this.ciudadano()?.DocumentoIdentidad ),
      String(this.ciudadano()?.meesaRecinto),
      String(this.ciudadano()?.NomReci),
      String(this.ciudadano()?.NomPais),
      String(this.ciudadano()?.NomDep),
      String(this.ciudadano()?.NomLoc),
      'Potosi,' + fechaTexto
    ).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });

  }

  muestraListaIndice() {

    // const pdfUrl2 = 'http://10.51.104.93/judiciales2024/500001.pdf#page=3'; // Asegúrate de que la URL apunte a la ubicación correcta de tu PDF
    // window.open(pdfUrl2, '_blank'); // Abre el PDF en una nueva pestaña

    // const urlListas = 'http://10.51.104.93/judiciales2024/';
    // const urlListas = 'http://10.51.15.110:8122/';

    const mesa = this.ciudadano()?.CodigoMesa; // '500001.pdf'
    const pagina = this.ciudadano()?.numeropagina //2;

    var pdfUrl = this.filesUrl + 'listas/' + mesa + '.pdf#page=' + pagina;
    window.open(pdfUrl, '_blank'); // Abre el PDF en una nueva pestaña
  }

  generaCertificadoJurado() {
    this.reportService.GeneraCertificadoJuradoPDF(this.ciudadano()?.nombres.trim() + ' ' + this.ciudadano()?.appat.trim() + ' ' + this.ciudadano()?.apmat.trim() + ' ' + this.ciudadano()?.apesp.trim()
      ).subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }

  muestraActaElectoral() {
    // const urlListas = 'http://10.51.15.110:8122/';
    const mesa = this.ciudadano()?.CodigoMesa; // '500001.pdf'

    var pdfUrl = this.filesUrl + 'actas/' + mesa + '.jpg';
    window.open(pdfUrl, '_blank');
  }
  
}
