import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CandidatoDashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    CandidatoDashboardRoutingModule
  ]
})
export class DashboardModule { }