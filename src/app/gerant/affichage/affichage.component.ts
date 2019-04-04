import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-affichage',
  templateUrl: './affichage.component.html',
  styleUrls: ['./affichage.component.css']
})
export class AffichageComponent implements OnInit {

  private hotels : Object[];
  private selected_hotel : string ;

  constructor(private serviceHotel: UserService) { }

  ngOnInit() {
  	this.serviceHotel.getHotel().subscribe(res =>{
        this.hotels = res;
    });
  }

}
