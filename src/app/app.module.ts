import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { OntologieComponent } from './ontologie/ontologie.component';
import { OntologieService } from './ontologie/ontologie.service';
import { MenuComponent } from './menu/menu.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { EmetteurComponent } from './user/emetteur/emetteur.component';


const routes: Routes = [
  {
   path:'', 
   component: HomepageComponent
  },
  {
   path:'subscription', 
   component: CreateUserComponent
  },
  {
   path:'login',
   component: LoginUserComponent
  },
  {
   path:'emetteur',
   component: EmetteurComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    OntologieComponent,
    MenuComponent,
    CreateUserComponent,
    LoginUserComponent,
    EmetteurComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [OntologieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
