import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '../models/vaga.model';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  private apiUrl = `${environment.apiUrl}vagas`;
  private token: string;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.token = this.authService.getToken() || ''; 
  }



  listarVagas(): Observable<Vaga[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Vaga[]>(this.apiUrl, { headers });
  }

  listarVagasInativas(): Observable<Vaga[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Vaga[]>(`${this.apiUrl}/inativas`, { headers });
  }

  listarVagasAtivas(): Observable<Vaga[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Vaga[]>(`${this.apiUrl}/ativas`, { headers });
  }

  obterVagaPorId(id: number): Observable<Vaga> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Vaga>(`${this.apiUrl}/${id}`, { headers });
  }

  criar(vaga: Vaga): Observable<Vaga> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<Vaga>(this.apiUrl, vaga, { headers });
  }

  atualizarVaga(id: number, vaga: Vaga): Observable<Vaga> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<Vaga>(`${this.apiUrl}/${id}`, vaga, { headers });
  }

  deletarVaga(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  desativarVaga(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<void>(`${this.apiUrl}/desativar/${id}`, {}, { headers });
  }
  ativarVaga(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<void>(`${this.apiUrl}/ativar/${id}`, {}, { headers });
  }
}