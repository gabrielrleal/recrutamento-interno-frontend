import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getUserRole() === 'ROLE_ADMINISTRADOR') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}