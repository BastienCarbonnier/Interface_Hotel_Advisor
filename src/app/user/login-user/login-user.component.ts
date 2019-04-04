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
	private alreadyLogged : boolean;
	private resultat : Object[];
	private reussi : boolean = true;
	private admin : boolean = false;
	private gerant : boolean = false;
	private uti : boolean = false;

	constructor(private service: UserService, private router: Router, private alertConfig: NgbAlertConfig) { }

	ngOnInit() {
		this.alreadyLogged=false;
		this.admin= false;
		this.gerant= false;
		this.uti= false;
		if(sessionStorage.getItem('user') != null){
      		if(JSON.parse(sessionStorage.getItem('user')).length != 0){
      			if(JSON.parse(sessionStorage.getItem('user'))[0]['type']=="emetteur"){
      				this.admin= false;
					this.gerant= false;
					this.uti= true;
      			}else if(JSON.parse(sessionStorage.getItem('user'))[0]['type']=="admin")
      			{
      				this.admin= true;
					this.gerant= false;
					this.uti= false;
      			}else{
      				this.admin= false;
					this.gerant= true;
					this.uti= false;
      			}
      			this.alreadyLogged = true;
      			this.router.navigate(['/']);
      		}else{
      			this.alreadyLogged=false;
      		}
    	}else{
    		this.alreadyLogged==false;
    	}
	}

  	onSubmit(){
	  	if(this.login != null && this.passwd != null){
	  		this.service.loginIn(this.login, this.passwd).subscribe(res =>{
		        this.resultat = res;
		        if(this.resultat.length==1){
		        	sessionStorage.setItem('user',JSON.stringify(this.resultat));
		        	this.reussi = true;
		          	this.alreadyLogged = true;
		          	this.router.navigate(['/']);
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
