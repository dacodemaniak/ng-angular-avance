import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserFormComponent } from './components/user-form/user-form.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
