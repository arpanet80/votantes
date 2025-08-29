import { Component, computed, inject, input, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EstadosService } from '../../../../core/services/estados.service';
import { opcionSimple } from '../../../../core/services/menu-sidebar/menu.interface';

@Component({
  selector: 'app-menu-simple',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './menu-simple.component.html',
  styleUrl: './menu-simple.component.css'
})

export class MenuSimpleComponent {
  private estadosService = inject( EstadosService );

  menusimple = input.required<opcionSimple>();
  permiso = computed(()  => this.estadosService.verificaArrayRoles(this.menusimple().roles,this.estadosService.estadoUsuario()?.permisos.map(o => o.idrol)) )

}
