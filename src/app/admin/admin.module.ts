import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisComponent } from './avis/avis.component';
import { InstanciationComponent } from './instanciation/instanciation.component';

@NgModule({
  declarations: [AvisComponent, InstanciationComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
