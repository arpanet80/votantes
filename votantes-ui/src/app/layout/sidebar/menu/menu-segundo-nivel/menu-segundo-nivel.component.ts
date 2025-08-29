import { Component, inject, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EstadosService } from '../../../../core/services/estados.service';
import { menuSegundoNivel } from '../../../../core/services/menu-sidebar/menu.interface';

@Component({
  selector: 'app-menu-segundo-nivel',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive],
  templateUrl: './menu-segundo-nivel.component.html',
  styleUrl: './menu-segundo-nivel.component.css'
})
export class MenuSegundoNivelComponent {
  public estadosService = inject( EstadosService );

  segundonivel = input.required<menuSegundoNivel[]>();
  usuario = this.estadosService.estadoUsuario()?.permisos.map(o => o.idrol);


}
