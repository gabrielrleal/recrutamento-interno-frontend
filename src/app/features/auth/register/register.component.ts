import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroUsuario } from '../../../core/models/registroUsuario.model';
import { RoleEnum } from '../../../core/enums/role.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  roles = [
    { value: RoleEnum.CANDIDATO, viewValue: 'CANDIDATO' },
    { value: RoleEnum.ADMINISTRADOR, viewValue: 'ADMINISTRADOR' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
   

    this.isLoading = true;
    this.errorMessage = null;

    const { nome, email, senha, role } = this.registerForm.value;
    const newUser = new RegistroUsuario(nome, email, senha, role);

    this.authService.register(newUser).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }
}