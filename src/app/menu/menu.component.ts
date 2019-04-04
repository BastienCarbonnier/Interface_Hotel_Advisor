import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  private nom: string ;
  private prenom: string ;
  private login: string;
  private isLogged: boolean = false;
  private isAdmin: boolean = false;
  private isGerant: boolean = false;
  private isEmetteur: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngDoCheck(){
      this.login = sessionStorage.getItem('user');
      if(this.login != null){
        let item = JSON.parse(sessionStorage.getItem('user'));
        this.nom = item[0].nom;
        this.prenom = item[0].prenom;
        this.isLogged=true; 
        if(item[0].type == "admin"){
          this.isAdmin=true;
        } else if(item[0].type == "gerant"){
          this.isGerant=true;
        } else{
          this.isEmetteur = true;
        }
      }
  }

  logOut(){
  	this.isLogged = false;
    sessionStorage.removeItem('user');
    this.isAdmin = false;
    this.isGerant = false;
    this.isEmetteur = false;
    this.router.navigate(['/login']);
  }

}
