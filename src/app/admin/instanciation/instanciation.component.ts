import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-instanciation',
  templateUrl: './instanciation.component.html',
  styleUrls: ['./instanciation.component.css']
})
export class InstanciationComponent implements OnInit {

	private gerants : Object[];
  	private selected_gerant : string ;
  	private nb_capacite: number = 100;
  	private nom : string;
  	private type : string;
	private lieu : string;
	private saisie_incorrecte : boolean = false;
  	private saisie_ok :boolean = false;
  	private erreur_bdd = false;

  constructor(private service: AdminService) { }

  ngOnInit() {

  	this.service.getGerant().subscribe(res =>{
  	    this.gerants = res;
    });
  }

  addHotel(){
  	if(this.nom!="" && this.type!=""  && this.lieu!=""  && this.selected_gerant!="" ){
  		this.service.addHotel(this.nom, this.selected_gerant, this.nb_capacite, this.type, this.lieu).subscribe(res =>{
	        if(res!="Insertion réussie"){

		  		//reset
		  		this.nom="";
		  		this.type = "";
		  		this.lieu = "";
		  		this.saisie_ok=true;
		  		this.saisie_incorrecte = false;
		  		this.erreur_bdd = false;
	        }
	        else{
	          this.erreur_bdd = true;
		  	  this.saisie_ok=false;
		  	  this.saisie_incorrecte = false;
	        }
  		});


  	}else{
  		this.saisie_incorrecte = true;
  		this.saisie_ok=false;
  		this.erreur_bdd = false;
  	}
  }

}
