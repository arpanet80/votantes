import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { EstadosService } from './core/services/estados.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, BreadcrumbsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private authService = inject( AuthService);
  public estadosService = inject( EstadosService );

  usuario = this.estadosService.estadoUsuario();

  logueado = false;
  async ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.logueado = true
    }

  }
}
