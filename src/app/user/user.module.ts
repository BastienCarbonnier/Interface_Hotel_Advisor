import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { EmetteurComponent } from './emetteur/emetteur.component';

@NgModule({
  declarations: [CreateUserComponent, LoginUserComponent, EmetteurComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
