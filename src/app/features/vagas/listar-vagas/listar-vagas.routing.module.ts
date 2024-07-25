import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarVagasComponent } from './listar-vagas.component';
import { EditarVagaComponent } from '../editar-vaga/editar-vaga.component';
import { CriarVagaComponent } from '../criar-vaga/criar-vaga.component';

const routes: Routes = [
  { path: 'listar', component: ListarVagasComponent },
  { path: 'editar/:id', component: EditarVagaComponent },
  { path: 'criar', component: CriarVagaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VagasRoutingModule { }