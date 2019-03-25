import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginUserComponent } from './login-user/login-user.component';

@NgModule({
  declarations: [CreateUserComponent, LoginUserComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
