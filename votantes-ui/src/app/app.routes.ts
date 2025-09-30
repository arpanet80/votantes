import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NoPageFoundComponent } from './core/components/no-page-found/no-page-found.component';
import { notLoguedGuard } from './core/guards/not-logued.guard';
import { loguedGuard } from './core/guards/logued.guard';
import { VotantesJudicialesComponent } from './dashboard/votantes/votantes-judiciales/votantes-judiciales.component';
import { VotantesGenerales2025Component } from './dashboard/votantes/votantes-generales-2025/votantes-generales-2025.component';
import { VotantesGenerales2025SegundaComponent } from './dashboard/votantes/votantes-generales2025segunda/votantes-generales2025segunda.component';
import { BusquedaCiudadanoomponent } from './dashboard/votantes/busqueda-ciudadano/busqueda-ciudadano.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [ loguedGuard ],
    component: HomeComponent
  },
  {
    path: 'votantes/judiciales',
    canActivate: [ loguedGuard ],
    component: VotantesJudicialesComponent , data: {titulo: 'Elecciones Judiciales 2024', subtitulo: 'Consulta ciudadana', rutaBreadcrumbs:'Judiciales'} ,
  },
  {
    path: 'votantes/generales2025',
    canActivate: [ loguedGuard ],
    component: VotantesGenerales2025Component , data: {titulo: 'Elecciones Generales 2025', subtitulo: 'Consulta ciudadana', rutaBreadcrumbs:'Generales'} ,
  },
  {
    path: 'votantes/generales2025segunda',
    canActivate: [ loguedGuard ],
    component: VotantesGenerales2025SegundaComponent , data: {titulo: 'Elecciones Generales 2025 Segunda Vuelta', subtitulo: 'Consulta ciudadana', rutaBreadcrumbs:'Segunda Vuelta'} ,
  },
  {
    path: 'votantes/busquedaciudadanos',
    canActivate: [ loguedGuard ],
    component: BusquedaCiudadanoomponent , data: {titulo: 'Busqueda de ciudadanos', subtitulo: 'Consulta ciudadana', rutaBreadcrumbs:'Busqueda ciudadana'} ,
  },

  {
    path: 'login',
    canActivate: [ notLoguedGuard ],
    component: LoginComponent,
    // children: [
    //   { path: 'login', component: LoginComponent },
    // ]
  },
  {
    path: '**',
    component: NoPageFoundComponent,
  }
];



/*
{
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },

      // VOTANTES
      { path: 'votantes', component: VotantesSelComponent , data: {titulo: 'Lista y registro de equipo', subtitulo: 'Lista de equipos disponibles para despliegue', rutaBreadcrumbs:'Registro equipo'} ,},

    ]

  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },

      // VOTANTES
      { path: 'votantes', component: VotantesSelComponent , data: {titulo: 'Lista y registro de equipo', subtitulo: 'Lista de equipos disponibles para despliegue', rutaBreadcrumbs:'Registro equipo'} ,},

    ]

  },
  {
    path: 'auth',
    // canActivate: [ isNotAuthenticatedGuard ],
    component: LoginComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '**',
    component: NoPageFoundComponent,
  }*/
