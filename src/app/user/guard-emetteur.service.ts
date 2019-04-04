import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardEmetteurService implements CanActivate{

  constructor(private router: Router) { }
	canActivate(): boolean{
	  	let item = JSON.parse(sessionStorage.getItem('user'));
	  	if(item == null) {
	      this.router.navigate(['login']);
	      return false;
	    }
	    else if(item[0]['type']!="emetteur"){
	    	this.router.navigate(['login']);
	      	return false;
	    }
	    return true;
	  }
}
