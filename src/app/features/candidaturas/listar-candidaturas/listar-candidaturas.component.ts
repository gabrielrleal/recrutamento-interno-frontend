import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CandidaturaService } from '../../../core/services/candidatura.service';
import { VagaService } from '../../../core/services/vaga.service';
import { AuthService } from '../../../core/services/auth.service';
import { Candidatura } from '../../../core/models/candidatura.model';
import { Vaga } from '../../../core/models/vaga.model';


@Component({
  selector: 'app-listar-candidaturas',
 
  templateUrl: './listar-candidaturas.component.html',
  styleUrls: ['./listar-candidaturas.component.scss']
})
export class ListarCandidaturasComponent implements OnInit {
  candidaturas: (Candidatura & { vaga?: Vaga })[] = [];
  errorMessage: string | null = null;

  constructor(
    private candidaturaService: CandidaturaService,
    private vagaService: VagaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarCandidaturas();
  }

  carregarCandidaturas(): void {
    const candidatoId = this.authService.getCandidatoId();
    if (candidatoId !== null) {
      this.candidaturaService.listarCandidaturasPorCandidato(candidatoId).subscribe({
        next: (candidaturas) => {
          if (candidaturas) {
            this.candidaturas = candidaturas;
            this.candidaturas.forEach(candidatura => {
              this.vagaService.obterVagaPorId(candidatura.vagaId).subscribe(vaga => {
                candidatura.vaga = vaga;
              });
            });
          } else {
            this.errorMessage = 'Nenhuma candidatura encontrada.';
            console.error('Nenhuma candidatura encontrada');
          }
        },
        error: (err) => {
          this.errorMessage = 'Erro ao carregar candidaturas.';
          console.error('Erro ao carregar candidaturas', err);
        }
      });
    } else {
      this.errorMessage = 'Usuário não autenticado';
      console.error('Usuário não autenticado');
    }
  }

  excluirCandidatura(id: number | undefined): void {
    if (id === undefined) {
      this.errorMessage = 'ID da candidatura é indefinido';
      console.error('ID da candidatura é indefinido');
      return;
    }
    this.candidaturaService.deletarCandidatura(id).subscribe({
      next: () => {
        this.candidaturas = this.candidaturas.filter(candidatura => candidatura.id !== id);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao excluir candidatura.';
        console.error('Erro ao excluir candidatura', err);
      }
    });
  }
}