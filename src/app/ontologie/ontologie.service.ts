import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OntologieService {

  private _options = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  getOntologie(id:any): Observable<any>{
  	let observable: Observable<any> = this.http.get("http://localhost:8888/ontologie?id="+id);
  	return observable;
  }

  getPolariteCommentaire(data:any): Observable<any>{
  	let url = "http://localhost:3000/";
  	return this.http.post(url,data);
  }
  putCommentaireTraité(id:any){
  	let url = "http://localhost:8888/comTraiter/";
  	let data = {"id":id};
  	return this.http.put(url,data);
  }
  updateOntologie(onto:any){
  let url = "http://localhost:8888/ontologie/update";
  	let data = onto;
  	return this.http.put(url,data);
  }
}
