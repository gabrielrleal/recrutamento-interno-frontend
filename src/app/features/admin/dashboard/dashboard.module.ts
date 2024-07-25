import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardRoutingModule } from './dashboard.routing.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ]
})
export class DashboardModule { }