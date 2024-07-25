import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { VagaService } from "../../../core/services/vaga.service";
import { Vaga } from "../../../core/models/vaga.model"; // Added this line

@Component({
  selector: 'app-criar-vaga',
  templateUrl: './criar-vaga.component.html',
  styleUrls: ['./criar-vaga.component.scss']
})
export class CriarVagaComponent implements OnInit {
  vagaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vagaService: VagaService
  ) {
    this.vagaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.vagaForm.valid) {
      const novaVaga: Vaga = {
        id: 0, // O backend deve gerar o ID
        ...this.vagaForm.value,
        status: true // Nova vaga é criada como ativa
      };
      this.vagaService.criar(novaVaga).subscribe(() => {
        this.router.navigate(['/vagas/listar']);
      });
    }
  }
}