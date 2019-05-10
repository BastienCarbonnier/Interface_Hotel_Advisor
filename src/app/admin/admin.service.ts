import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
	private _options = new HttpHeaders({'Content-Type':'application/json'});

  	constructor(private http: HttpClient) { }

  	getCommentaireById(id: string): Observable<any>{
  		let observable: Observable<any> = this.http.get("http://localhost:8888/comHotelMoreInfo/hotelId="+id);
  		return observable;
  	}

    getCommentaireByIdNoTraiter(id: string): Observable<any>{
      let observable: Observable<any> = this.http.get("http://localhost:8888/comHotelNoTraite/hotelId="+id);
      return observable;
    }

    getCommentaireByIdATraiter(id: string): Observable<any>{
      let observable: Observable<any> = this.http.get("http://localhost:8888/comHotelATraite/hotelId="+id);
      return observable;
    }

    putCommentaireATraité(id:any){
      let url = "http://localhost:8888/comATraiter/";
      let data = {"id":id};
      return this.http.put(url,data);
    }

  	getHotel() :Observable<any>{
  		let observable: Observable<any> = this.http.get("http://localhost:8888/allHotel");
  		return observable;
  	}

    deleteCom(id : string) :Observable<any>{
      let observable: Observable<any> = this.http.delete("http://localhost:8888/deleteCom/comID="+id);
      return observable;
    }
}
