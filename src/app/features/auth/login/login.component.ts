import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login({ email: this.email, senha: this.senha }).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.authService.setToken(response.token);
          const userRole = this.authService.getUserRole();
          if (userRole === 'ROLE_ADMINISTRADOR') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/candidato/dashboard']);
          }
        } else {
          console.error('Login error: Invalid response format', response);
          // Mostrar mensagem de erro ao usuário
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        // Mostrar mensagem de erro ao usuário
      }
    });
  }
}