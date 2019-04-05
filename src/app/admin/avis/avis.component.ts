import { Component, OnInit, DoCheck} from '@angular/core';
import { AdminService } from '../admin.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit, DoCheck {

	private hotels : Object[];
  	private liste_commentaire : Object[] = [];
  	private selected_hotel : string ;
  	private selected_hotel_old : string ;
  	private erreurSup : boolean = false;

	constructor(private service: AdminService) { }

	updateTable() : void {
		this.service.getCommentaireById(this.selected_hotel).subscribe(res =>{
    		this.liste_commentaire = res;
		});
	}

	ngOnInit() {
		this.service.getHotel().subscribe(res =>{
  	    	this.hotels = res;
    	});
	}

	ngDoCheck(){
		let idHotel : number = Number(this.selected_hotel);
		// Evite Angular d'inonder de requête le server Node. Il fait la requête que si l'utilisateur choisi un autre hôtel
		if(this.selected_hotel_old != this.selected_hotel){ 
			this.erreurSup = false;
			if(this.selected_hotel!=undefined && Number.isInteger(idHotel)){
				this.updateTable();
			}			
		}
		this.selected_hotel_old = this.selected_hotel;
	}

	supprimerCommentaire(id:string){
		let response;
		this.service.deleteCom(id).subscribe(res =>{
    		response = res;
    		if(response=="\nSuppression réussie !\n"){
    			this.erreurSup=false;
    			this.updateTable();
    		}else{
    			this.erreurSup = true;
    		}
		});
	}

}
