import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { CandidatoGuard } from './core/guards/candidato.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'admin/dashboard', loadChildren: () => import('./features/admin/dashboard/dashboard.routing.module').then(m => m.AdminDashboardRoutingModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'candidato/dashboard', loadChildren: () => import('./features/candidato/dashboard/dashboard.routing.module').then(m => m.CandidatoDashboardRoutingModule), canActivate: [AuthGuard, CandidatoGuard] },
  { path: 'vagas', loadChildren: () => import('./features/vagas/vagas.module').then(m => m.VagasModule), canActivate: [AuthGuard] },
  { path: 'candidaturas', loadChildren: () => import('./features/candidaturas/candidaturas.module').then(m => m.CandidaturasModule), canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }