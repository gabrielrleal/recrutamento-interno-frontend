import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVagasComponent } from './listar-vagas/listar-vagas.component';
import { EditarVagaComponent } from './editar-vaga/editar-vaga.component';
import { CriarVagaComponent } from './criar-vaga/criar-vaga.component';
import { VagasRoutingModule } from './listar-vagas/listar-vagas.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalhesVagaComponent } from './detalhes-vaga/detalhes-vaga.component';

@NgModule({
  declarations: [
    ListarVagasComponent,
    EditarVagaComponent,
    CriarVagaComponent,
    DetalhesVagaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VagasRoutingModule,
    ReactiveFormsModule
  ]
})
export class VagasModule { }