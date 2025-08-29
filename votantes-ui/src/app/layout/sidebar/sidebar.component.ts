import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import { MenuSimpleComponent } from './menu/menu-simple/menu-simple.component';
import { MenuEtiquetaComponent } from './menu/menu-etiqueta/menu-etiqueta.component';
import { MenuPrimerNivelComponent } from './menu/menu-primer-nivel/menu-primer-nivel.component';
import { MenuSegundoNivelComponent } from './menu/menu-segundo-nivel/menu-segundo-nivel.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ MenuPrincipalComponent ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
