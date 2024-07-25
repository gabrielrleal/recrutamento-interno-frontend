import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { CandidatoGuard } from './core/guards/candidato.guard';
import { ListarCandidaturasComponent } from './features/candidaturas/listar-candidaturas/listar-candidaturas.component';
import { DetalhesVagaComponent } from './features/vagas/detalhes-vaga/detalhes-vaga.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'login', loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'vagas', loadChildren: () => import('./features/vagas/vagas.module').then(m => m.VagasModule), canActivate: [AuthGuard] },
  { path: 'admin/dashboard', loadChildren: () => import('./features/admin/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'candidato/dashboard', loadChildren: () => import('./features/candidato/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard, CandidatoGuard] },
  { path: 'administrador/dashboard', loadChildren: () => import('./features/admin/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'vagas/detalhes/:id', component: DetalhesVagaComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'candidaturas/listar', component: ListarCandidaturasComponent, canActivate: [AuthGuard, CandidatoGuard] },
  { path: 'candidaturas', loadChildren: () => import('./features/candidaturas/candidaturas.module').then(m => m.CandidaturasModule), canActivate: [AuthGuard, CandidatoGuard] },

  // Adicione outras rotas aqui
];