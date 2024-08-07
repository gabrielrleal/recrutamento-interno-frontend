import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidatura, CandidaturaResponse } from '../models/candidatura.model';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {
  private apiUrl = `${environment.apiUrl}candidaturas`;
  private token: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken() || '';
  }

  listarCandidaturas(): Observable<Candidatura[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Candidatura[]>(this.apiUrl, { headers });
  }

  listarCandidaturasPorVaga(vagaId: number): Observable<Candidatura[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Candidatura[]>(`${this.apiUrl}/vaga/${vagaId}`, { headers });
  }

  criarCandidatura(candidatura: Candidatura): Observable<CandidaturaResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<CandidaturaResponse>(this.apiUrl, candidatura, { headers });
  }

  atualizarCandidatura(id: number, candidatura: Candidatura): Observable<Candidatura> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<Candidatura>(`${this.apiUrl}/${id}`, candidatura, { headers });
  }

  deletarCandidatura(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  listarCandidaturasPorCandidato(candidatoId: number): Observable<Candidatura[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Candidatura[]>(`${this.apiUrl}/candidato/${candidatoId}`, { headers });
  }
}