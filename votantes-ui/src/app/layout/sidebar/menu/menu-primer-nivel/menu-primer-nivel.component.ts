import {  Component, inject, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuPrincipalComponent } from '../menu-principal/menu-principal.component';
import { EstadosService } from '../../../../core/services/estados.service';
import { menuPrimerNivel } from '../../../../core/services/menu-sidebar/menu.interface';

@Component({
  selector: 'app-menu-primer-nivel',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './menu-primer-nivel.component.html',
  styleUrl: './menu-primer-nivel.component.css'
})
export class MenuPrimerNivelComponent  {
  public estadosService = inject( EstadosService );

  primernivel = input.required<menuPrimerNivel[]>();
  usuario = this.estadosService.estadoUsuario()?.permisos.map(o => o.idrol);

}
