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
import { AvisComponent } from './admin/avis/avis.component';
import { InstanciationComponent } from './admin/instanciation/instanciation.component';
import { AffichageComponent } from './gerant/affichage/affichage.component';

import { GuardGerantService } from './gerant/guard-gerant.service';
import { GuardAdminService } from './admin/guard-admin.service';
import { GuardEmetteurService } from './user/guard-emetteur.service';


const routes: Routes = [
  {
   path:'', 
   component: LoginUserComponent
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
   component: EmetteurComponent,
   canActivate : [GuardEmetteurService]
  },
  {
    path:'gerant',
    component: AffichageComponent,
    canActivate : [GuardGerantService],
    children:[
      {path:':selected_hotel', component: OntologieComponent}
    ]
  },
  {
    path:'admin',
    component : AvisComponent,
    canActivate : [GuardAdminService]
  },
  {
    path:'instanciation',
    component : InstanciationComponent,
    canActivate : [GuardAdminService]
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
    HomepageComponent,
    AvisComponent,
    AffichageComponent,
    InstanciationComponent
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
  providers: [OntologieService,GuardGerantService,GuardAdminService,GuardEmetteurService],
  bootstrap: [AppComponent]
})
export class AppModule { }
