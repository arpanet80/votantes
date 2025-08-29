import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { filter, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const router      = inject( Router );
  const authService = inject( AuthService );
  
  let roles = route.data['role'] as Array<number>;
  // let roles = [];
  
  console.log(roles);
  
  ///// si no esta autenticado no deja entrar al dashboard /////////
  if ( authService.isAuthenticated() ) {

    // if (tokenService.getLastURL()) {
    //   tokenService.navigateToLastURL;
    // }
    // else
    //   router.navigateByUrl('/');
    
    console.log("Guard auth dejo entrar ");
    return true;
  }
  else {
      console.log("Guard Auth bloqueo ");
      router.navigateByUrl('/login');
      return false;
  }


  
};


