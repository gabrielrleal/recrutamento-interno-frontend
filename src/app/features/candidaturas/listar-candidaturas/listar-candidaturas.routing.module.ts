import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCandidaturasComponent } from './listar-candidaturas.component';

const routes: Routes = [
  { path: '', component: ListarCandidaturasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarCandidaturasRoutingModule { }