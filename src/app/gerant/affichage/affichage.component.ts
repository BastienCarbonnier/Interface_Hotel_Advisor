import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affichage',
  templateUrl: './affichage.component.html',
  styleUrls: ['./affichage.component.css']
})
export class AffichageComponent implements OnInit {

  private hotels : Object[];
  private selected_hotel : string ;
  private selected_hotel_old : string ;

  constructor(private serviceHotel: UserService, private router : Router) { }

  ngOnInit() {
  	this.serviceHotel.getHotel().subscribe(res =>{
        this.hotels = res;
    });
  }

  ngDoCheck(){
    // Evite Angular d'inonder de requête le server Node. Il fait la requête que si l'utilisateur choisi un autre hôtel
    if(this.selected_hotel_old != this.selected_hotel){ 
        this.router.navigate(['/gerant',this.selected_hotel]);
        this.selected_hotel_old = this.selected_hotel;
      }     
    }

}
