import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { OntologieComponent } from './admin/ontologie/ontologie.component';
import { OntologieService } from './admin/ontologie.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    OntologieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [OntologieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
