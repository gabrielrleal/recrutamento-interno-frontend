import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../models/auth.model';
import { RegistroUsuario } from '../models/registroUsuario.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Certifique-se de que a URL está correta

  constructor(private httpService: HttpService) {}

  login(credentials: { email: string; senha: string }): Observable<AuthResponse> {
    return this.httpService.post<AuthResponse>(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  register(user: RegistroUsuario): Observable<AuthResponse> {
    return this.httpService.post<AuthResponse>(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
    
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles[0].authority;
    }
    return null;
  }

  getCandidatoId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.candidatoId;
    }
    return null;
  }

  isAdmin(): boolean {
    if (this.getUserRole() === 'ROLE_ADMINISTRADOR') {
      return true;
    }
    return false;
  }
}