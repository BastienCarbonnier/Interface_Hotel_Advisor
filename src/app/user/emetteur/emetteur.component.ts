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
  private selected_hotel : number ;
  private commentaire: string="";
  private saisie_incorrecte : boolean = false;
  private saisie_ok :boolean = false;
  private mail : string;

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
  	if(this.commentaire!="" && this.selected_hotel!= undefined){

  		console.log()

  		this.saisie_incorrecte = false;
  		this.saisie_ok = true;
  	}else{
  		this.saisie_incorrecte = true;
  		this.saisie_ok=false;
  	}
  }
}
