import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGard implements CanActivate{
  constructor(private router: Router){}
  canActivate(): boolean{
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if(isLoggedIn)
      return true;
    this.router.navigate(['/login']);
    return false;
  }
}
