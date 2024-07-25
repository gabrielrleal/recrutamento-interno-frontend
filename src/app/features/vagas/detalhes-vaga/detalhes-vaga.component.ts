import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VagaService } from '../../../core/services/vaga.service';
import { CandidaturaService } from '../../../core/services/candidatura.service';
import { Vaga } from '../../../core/models/vaga.model';
import { Candidatura } from '../../../core/models/candidatura.model';

@Component({
  selector: 'app-detalhes-vaga',
  templateUrl: './detalhes-vaga.component.html',
  styleUrls: ['./detalhes-vaga.component.scss']
})
export class DetalhesVagaComponent implements OnInit {
  vaga: Vaga | undefined;
  candidaturas: Candidatura[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private vagaService: VagaService,
    private candidaturaService: CandidaturaService
  ) {}

  ngOnInit(): void {
    const vagaId = +this.route.snapshot.paramMap.get('id')!;
    this.carregarDetalhesVaga(vagaId);
  }

  carregarDetalhesVaga(vagaId: number): void {
    this.vagaService.obterVagaPorId(vagaId).subscribe({
      next: (vaga) => {
        this.vaga = vaga;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar detalhes da vaga.';
        console.error('Erro ao carregar detalhes da vaga', err);
      }
    });

    this.candidaturaService.listarCandidaturasPorVaga(vagaId).subscribe({
      next: (candidaturas) => {
        this.candidaturas = candidaturas;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar candidaturas.';
        console.error('Erro ao carregar candidaturas', err);
      }
    });
  }
}