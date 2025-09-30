import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ControlMessagesComponent } from '../../../core/components/control-messages.component';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';
import { CertificadoVotante } from '../../../core/models/certificado-voto.model';
import { Ciudadano } from '../../../core/models/ciudadano.model';
import { ApiService } from '../../../core/services/api.service';
import { ReportService } from '../../../core/services/report.service';
import { CiudadanoGenerales } from '../../../core/models/ciudadano-generales.model';

@Component({
  selector: 'app-votantes-generales-2020',
  imports: [ReactiveFormsModule, DatePipe, NgIf, NgFor],
  templateUrl: './busqueda-ciudadano.component.html',
  styleUrl: './busqueda-ciudadano.component.css'
})
export class BusquedaCiudadanoomponent {
  private apiService = inject ( ApiService );
  private fb = inject( FormBuilder );

  @ViewChild('ciudadanoModal') ciudadanoModal!: ElementRef;
  
  buscarForm: FormGroup;
  resultados: CiudadanoGenerales[] = [];
  cargando = false;
  errorMensaje = '';
  infoMensaje = '';
  ciudadanoSeleccionado: CiudadanoGenerales | null = null;

  constructor() {
    this.buscarForm = this.createForm();
  }

  // Función de validación personalizada para verificar al menos 2 campos
  atLeastTwoFieldsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const filledFields = Object.keys(formGroup.controls)
        .filter(key => {
          const value = formGroup.get(key)?.value;
          return value !== null && value !== undefined && value !== '';
        }).length;

      return filledFields >= 2 ? null : { atLeastTwoFields: true };
    };
  }

  // Validador para fecha (formato YYYY-MM-DD)
  dateFormatValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!pattern.test(control.value)) {
      return { invalidDateFormat: true };
    }
    
    // Verificar que sea una fecha válida
    const date = new Date(control.value);
    if (isNaN(date.getTime())) {
      return { invalidDate: true };
    }
    
    return null;
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombres: [''],
      paterno: [''],
      materno: [''],
      documento: ['', [Validators.minLength(4)]],
      complemento: ['', [Validators.maxLength(5)]],
      fechaNac: ['', [this.dateFormatValidator]]
    }, { validators: this.atLeastTwoFieldsValidator() });
  }

  onSubmit(): void {
    if (this.buscarForm.valid) {
      this.cargando = true;
      this.errorMensaje = '';
      this.infoMensaje = '';
      
      // Preparar los datos para enviar (eliminar campos vacíos)
      const formData = this.buscarForm.value;
      const requestData: any = {};
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          requestData[key] = formData[key];
        }
      });
      
      this.apiService.buscarCiudadanos(requestData).subscribe({
        next: (resultados) => {
          this.resultados = resultados.data;
          this.cargando = false;
        },
        error: (error) => {
          this.cargando = false;
          
          if (error.type === 'TOO_MANY_RESULTS') {
            this.infoMensaje = `${error.message} Se encontraron ${error.total} coincidencias. ${error.suggestion}`;
            this.resultados = [];
          } else if (error.type === 'NO_RESULTS') {
            this.errorMensaje = error.message;
            this.resultados = [];
          } else {
            this.errorMensaje = error.message || 'Error al realizar la búsqueda. Intente nuevamente.';
          }
          
          // console.error('Error en la búsqueda:', error);
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.buscarForm.controls).forEach(key => {
        this.buscarForm.get(key)?.markAsTouched();
      });
    }
  }

  limpiarFormulario(): void {
    this.buscarForm.reset();
    this.resultados = [];
    this.errorMensaje = '';
    this.infoMensaje = '';
  }

  // Función para seleccionar un ciudadano y abrir el modal
  seleccionarCiudadano(ciudadano: CiudadanoGenerales): void {
    this.ciudadanoSeleccionado = ciudadano;
    // Mostrar el modal usando Bootstrap JavaScript
    const modal = new (window as any).bootstrap.Modal(this.ciudadanoModal.nativeElement);
    modal.show();
  }

  // Función para formatear valores nulos o vacíos
  formatearValor(valor: any): string {
    return valor === null || valor === undefined || valor === '' ? 'N/A' : valor;
  }

  // Helper para acceder a los controles del formulario en el template
  get f() {
    return this.buscarForm.controls;
  }
  
}
