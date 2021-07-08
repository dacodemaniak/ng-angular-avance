import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserGuard } from '../core/guards/user.guard';
import { LoginGuard } from '../core/guards/login.guard';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserResolver } from '../core/resolvers/user-resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'detail/:id',
    component: UserDetailComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [UserGuard]
  },
  {
    path: '**',
    redirectTo: 'admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
