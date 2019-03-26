import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-emetteur',
  templateUrl: './emetteur.component.html',
  styleUrls: ['./emetteur.component.css']
})
export class EmetteurComponent implements OnInit {

  private nom: string ;
  private prenom: string ;
  private hotels : Object[];
  private selected_hotel : string ;
  private commentaire: string="";
  private saisie_incorrecte : boolean = false;
  private saisie_ok :boolean = false;
  private mail : string;
  private la_date_choisi;
  private nb_jour : number = 1;
  private erreur_bdd = false;

  constructor(private service: UserService) { }

  ngOnInit() {
  	this.service.getHotel().subscribe(res =>{
  	    this.hotels = res;
    });

    let item = JSON.parse(sessionStorage.getItem('user'));
    this.mail = item[0].mail;
  }

  ngDoCheck(){
      let login : string = sessionStorage.getItem('user');
      if(login != null){
        let item = JSON.parse(sessionStorage.getItem('user'));
        this.nom = item[0].nom;
        this.prenom = item[0].prenom;
      }
  }

  addCommentaire(){
  	if(this.commentaire!="" && this.selected_hotel!= undefined && this.la_date_choisi!=undefined){
  		let jour = this.la_date_choisi.day;
  		let mois = this.la_date_choisi.month;
  		let annee = this.la_date_choisi.year;
  		let date = jour+"/"+mois+"/"+annee;

  		this.service.addCommentaire(this.mail, this.selected_hotel, this.commentaire, date, this.nb_jour).subscribe(res =>{
	        if(res!="Insertion réussie"){

		  		//reset
		  		this.nb_jour=1;
		  		this.saisie_incorrecte = false;
		  		this.saisie_ok = true;
		  		this.la_date_choisi = [];
		  		this.commentaire="";
	        }
	        else{
	          this.erreur_bdd = true;
	        }
  		});


  	}else{
  		this.saisie_incorrecte = true;
  		this.saisie_ok=false;
  	}
  }
}
