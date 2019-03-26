import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private _options = new HttpHeaders({'Content-Type':'application/json'});

  	constructor(private http: HttpClient) { }

  	getUsers(): Observable<any>{
  		let observable: Observable<any> = this.http.get("http://localhost:8888/user");
  		return observable;
  	}

  	loginIn(login:string, mdp:string): Observable<any> {
    	let url = "http://localhost:8888/login";
    	let data = {"mail":login, "mdp":mdp};
    	return this.http.post(url,data);
  	}

  	addUser(mail:string, nom:string, prenom:string, mdp:string): Observable<any> {
  		let url= "http://localhost:8888/addUser"
  		let data = {"mail":mail,"nom":nom,"prenom":prenom, "mdp":mdp,"type":"emetteur"};

  		return this.http.post(url,data);
  	}


}
