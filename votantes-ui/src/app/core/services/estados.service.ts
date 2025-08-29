import { computed, Injectable, signal } from '@angular/core';
import { Usuario } from '../../auth/interfaces/usuario';
import { Sistema } from '../models/sistema.model';
import { Permiso } from '../models/permiso.model';
import { Rol } from '../models/rol.model';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  public estadoUsuario = signal<Usuario | null>(null)
  readonly usuarioinfo = computed(() => this.estadoUsuario())

  public sistema = signal<Sistema[] | null>(null)
  public permiso = signal<Permiso[] | null>(null)
  public rol = signal<Rol[] | null>(null)
  public usuario = signal<UsuarioModel[] | null>(null)

  verificaArrayRoles(rolesSistema: number[] | undefined, rolesUsuario: number[] | undefined): boolean {

    if (rolesSistema?.some( rol => rolesUsuario?.includes(rol) )) {
      return true;
    }
    else
      return false;
  }

}
