import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OntologieComponent } from './ontologie/ontologie.component';
import { OntologieService } from './ontologie/ontologie.service';
import { MenuComponent } from './menu/menu.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    OntologieComponent,
    MenuComponent,
    HomepageComponent
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
