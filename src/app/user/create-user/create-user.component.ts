import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

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

  	constructor(private service: UserService) { }

  	ngOnInit() {
  	}

  	onSubmit(){
  	if(this.mail != undefined && this.mdp != undefined && this.nom != undefined && this.prenom != undefined){
  		this.service.addUser(this.mail, this.nom, this.prenom, this.mdp).subscribe(res =>{
	        if(res!="Inscription réussie"){
	          this.notAdded=false;
	        }
	        else{
	          this.submitted = true;
	          this.notAdded=true;
	        }
  		});
	  	this.mail = "";
	  	this.mdp = "";
	  	this.nom = "";
	  	this.prenom = "";
  	}
  }

}
