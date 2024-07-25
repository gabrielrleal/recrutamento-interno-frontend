import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VagaService } from '../../../core/services/vaga.service';
import { Vaga } from '../../../core/models/vaga.model';

@Component({
  selector: 'app-editar-vaga',
  templateUrl: './editar-vaga.component.html',
  styleUrls: ['./editar-vaga.component.scss']
})
export class EditarVagaComponent implements OnInit {
  vagaForm: FormGroup;
  vagaId: number = 0; // Inicializar vagaId com um valor padrão

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vagaService: VagaService
  ) {
    this.vagaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.vagaId = +(this.route.snapshot.paramMap.get('id') ?? 0); // Tratar a possibilidade de null
    this.carregarVaga();
  }

  carregarVaga(): void {
    this.vagaService.obterVagaPorId(this.vagaId).subscribe((vaga: Vaga) => {
      this.vagaForm.patchValue({
        titulo: vaga.titulo,
        descricao: vaga.descricao
      });
    });
  }

  onSubmit(): void {
    if (this.vagaForm.valid) {
      const vagaAtualizada: Vaga = {
        id: this.vagaId,
        ...this.vagaForm.value
      };
      this.vagaService.atualizarVaga(this.vagaId, vagaAtualizada).subscribe(() => {
        this.router.navigate(['/vagas/listar']);
      });
    }
  }
}