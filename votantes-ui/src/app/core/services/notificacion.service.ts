import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService  {

  ////////////////// TOASTR /////////////////////////
  private toastr= inject( ToastrService );

  showSuccess(message: string, title: string){
      this.toastr.success(message, title, { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true } )
  }

  showError(message: string, title: string){
      this.toastr.error(message, title, { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true } )
  }

  showInfo(message: string, title: string){
      this.toastr.info(message, title, { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true } )
  }

/////////// SWEETALERT 2  ///////////////////////



}
