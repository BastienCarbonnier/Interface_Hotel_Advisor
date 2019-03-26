import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

	private login : string;
	private passwd : string;
	private isLogged : boolean = false;
	private resultat : Object[];
	private reussi : boolean = true;

	constructor(private service: UserService, private router: Router, private alertConfig: NgbAlertConfig) { }

	ngOnInit() {
		if(sessionStorage.getItem('user') != null){
      		if(JSON.parse(sessionStorage.getItem('user')).length != 0)
        		this.router.navigate(['/profil']);
    	}
	}

  	onSubmit(){
	  	if(this.login != null && this.passwd != null){
	  		this.service.loginIn(this.login, this.passwd).subscribe(res =>{
		        this.resultat = res;
		        if(this.resultat.length==1){
		        	sessionStorage.setItem('user',JSON.stringify(this.resultat));
		        	this.reussi = true;
		          	this.isLogged = true;
		          	this.router.navigate(['/profil']);
		        }
		        else{
		        	this.reussi = false;
		        	this.alertConfig.type='danger';
		        	this.alertConfig.dismissible = true;
		        }
      		});
	  	}
  	}

}
