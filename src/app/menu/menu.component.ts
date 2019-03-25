import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  private nom: string = "LOOK";
  private prenom: string = "CODE";
  private login: string;
  private isLogged: boolean = false;
  private isAdmin: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(){
  }

  logOut(){
  	this.isLogged = false;
    //sessionStorage.removeItem('user');
    this.isAdmin=false;
  }

}
