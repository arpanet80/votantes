import { Component, inject, OnInit } from '@angular/core';
import { Base64Pipe } from '../../core/pipes/base64.pipe';
import { AuthService } from '../../core/services/auth.service';
import { EstadosService } from '../../core/services/estados.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ Base64Pipe ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public authService = inject(AuthService );
  private estadosService = inject(EstadosService );

  estadoUsuario = this.estadosService.estadoUsuario;

}
