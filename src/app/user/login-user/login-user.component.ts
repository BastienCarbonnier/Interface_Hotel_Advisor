import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

	private login : string;
	private passwd : string;
	private isLogged : boolean = false;

	constructor(private router: Router) { }

	ngOnInit() {
		if(sessionStorage.getItem('user') != null){
      		if(JSON.parse(sessionStorage.getItem('user')).length != 0)
        		this.router.navigate(['/profil']);
    	}
	}

  	onSubmit(){
	  	if(this.login != null && this.passwd != null){
	  	}
  	}

  	logOut(){
  		this.isLogged = false;
  	  sessionStorage.removeItem('user');
  	}

}
