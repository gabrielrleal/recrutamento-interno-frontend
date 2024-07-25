import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Candidatura } from '../models/candidatura.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {
  private apiUrl = `${environment.apiUrl}/candidaturas`;

  constructor(private httpService: HttpService) {}

  listarCandidaturas(): Observable<Candidatura[]> {
    return this.httpService.get<Candidatura[]>(this.apiUrl);
  }

  criarCandidatura(candidatura: Candidatura): Observable<Candidatura> {
    return this.httpService.post<Candidatura>(this.apiUrl, candidatura);
  }

  atualizarCandidatura(id: number, candidatura: Candidatura): Observable<Candidatura> {
    return this.httpService.put<Candidatura>(`${this.apiUrl}/${id}`, candidatura);
  }

  deletarCandidatura(id: number): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}/${id}`);
  }
}
