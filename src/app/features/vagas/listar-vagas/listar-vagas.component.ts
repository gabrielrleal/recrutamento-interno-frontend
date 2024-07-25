import { Component, OnInit } from '@angular/core';
import { VagaService } from '../../../core/services/vaga.service';
import { Vaga } from '../../../core/models/vaga.model';
import { CandidaturaService } from '../../../core/services/candidatura.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-vagas',
  templateUrl: './listar-vagas.component.html',
  styleUrls: ['./listar-vagas.component.scss']
})
export class ListarVagasComponent implements OnInit {
  vagas: Vaga[] = [];
  vagasFiltradas: Vaga[] = [];
  searchTerm: string = '';
  isAdmin: boolean = false;
  filtroVagas: string = 'todas'; // Valor padrão para mostrar todas as vagas
  errorMessage: string | null = null;

  constructor(
    private vagaService: VagaService,
    private candidaturaService: CandidaturaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.carregarVagas();
  }

  carregarVagas(): void {
    if (this.isAdmin) {
      this.vagaService.listarVagas().subscribe({
        next: (vagas) => {
          this.vagas = vagas;
          this.filtrarVagas();
        },
        error: (err) => {
          this.errorMessage = 'Erro ao carregar vagas.';
          console.error('Erro ao carregar vagas', err);
        }
      });
    } else {
      this.vagaService.listarVagasAtivas().subscribe({
        next: (vagas) => {
          this.vagas = vagas;
          this.filtrarVagas();
        },
        error: (err) => {
          this.errorMessage = 'Erro ao carregar vagas ativas.';
          console.error('Erro ao carregar vagas ativas', err);
        }
      });
    }
  }

  filtrarVagas(): void {
    if (this.filtroVagas === 'ativas') {
      this.vagasFiltradas = this.vagas.filter(vaga => vaga.status && vaga.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else if (this.filtroVagas === 'inativas') {
      this.vagasFiltradas = this.vagas.filter(vaga => !vaga.status && vaga.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.vagasFiltradas = this.vagas.filter(vaga => vaga.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

  candidatarSe(vagaId: number): void {
    const candidatoId = this.authService.getCandidatoId();
    if (candidatoId === null) {
      this.errorMessage = 'Usuário não autenticado';
      console.error('Usuário não autenticado');
      return;
    }
    const candidatura = { vagaId, candidatoId };
    this.candidaturaService.criarCandidatura(candidatura).subscribe({
      next: (response) => {
        console.log('Candidatura realizada com sucesso', response);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao realizar candidatura.';
        console.error('Erro ao realizar candidatura', error);
      }
    });
  }

  verDetalhesVaga(vagaId: number): void {
    this.router.navigate(['/vagas/detalhes', vagaId]);
  }

  editarVaga(vagaId: number): void {
    this.router.navigate(['/vagas/editar', vagaId]);
  }

  excluirVaga(vagaId: number): void {
    this.vagaService.deletarVaga(vagaId).subscribe({
      next: () => {
        this.vagas = this.vagas.filter(vaga => vaga.id !== vagaId);
        this.filtrarVagas();
      },
      error: (err) => {
        this.errorMessage = 'Erro ao excluir vaga.';
        console.error('Erro ao excluir vaga', err);
      }
    });
  }

  desativarVaga(vagaId: number): void {
    this.vagaService.desativarVaga(vagaId).subscribe({
      next: () => {
        this.carregarVagas();
      },
      error: (err) => {
        this.errorMessage = 'Erro ao desativar vaga.';
        console.error('Erro ao desativar vaga', err);
      }
    });
  }

  ativarVaga(vagaId: number): void {
    this.vagaService.ativarVaga(vagaId).subscribe({
      next: () => {
        this.carregarVagas();
      },
      error: (err) => {
        this.errorMessage = 'Erro ao ativar vaga.';
        console.error('Erro ao ativar vaga', err);
      }
    });
  }
}