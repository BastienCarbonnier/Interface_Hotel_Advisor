import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

	private mdp : string;
	private mail : string;
	private nom : string;
	private prenom : string;

	private notAdded: boolean=true;
	private submitted : boolean=false;

  	constructor() { }

  	ngOnInit() {
  	}

  	onSubmit(){
  	if(this.mail != undefined && this.mdp != undefined && this.nom != undefined && this.prenom != undefined){
	  	this.mail = "";
	  	this.mdp = "";
	  	this.nom = "";
	  	this.prenom = "";
  	}
  }

}
