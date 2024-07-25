import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCandidaturasComponent } from './listar-candidaturas/listar-candidaturas.component'; 
import { ListarCandidaturasRoutingModule } from './listar-candidaturas/listar-candidaturas.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListarCandidaturasComponent
    
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListarCandidaturasRoutingModule,
    RouterModule
  ]
})
export class CandidaturasModule { }