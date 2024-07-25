import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesVagaComponent } from './detalhes-vaga.component';

const routes: Routes = [
  { path: 'detalhes/:id', component: DetalhesVagaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhesVagaRoutingModule { }
