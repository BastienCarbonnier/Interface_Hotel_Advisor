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

  getOntologie(): Observable<any>{
  	return this.http.get("http://localhost:8888/ontologie");
  }

  getPolariteCommentaire(commentaire : string): Observable<any>{
  	return this.http.get("http://localhost:3000/?phrase="+commentaire);
  }
}
