import { Component, OnInit } from '@angular/core';
import { OntologieService } from './ontologie.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { Observable, forkJoin } from 'rxjs';
import * as d3 from 'd3';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-ontologie',
  templateUrl: './ontologie.component.html',
  styleUrls: ['./ontologie.component.css']
})
export class OntologieComponent implements OnInit {

  private listOnto : any;
  private selected_hotel : string;
  private selected_hotel_old : string;
  private sub : any;
  private liste_commentaire : any;
  private noComment : boolean = false;
  private tempData :any;

  constructor(private service: OntologieService, private route: ActivatedRoute, private serviceAdmin: AdminService, private ngxService: NgxUiLoaderService ) { }
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
        this.selected_hotel = params['selected_hotel'];
    });
   }

  ngDoCheck(){
    // Evite Angular d'inonder de requête le server Node. Il fait la requête que si l'utilisateur choisi un autre hôtel
      if(this.selected_hotel_old != this.selected_hotel){ 
          this.traitement(this.selected_hotel);
          this.selected_hotel_old = this.selected_hotel;

      }

  }
  searchNode(d: any){
    for(let firstArray of this.tempData){
      for(let obj of firstArray){
        if((d.name+" ").includes(obj.mot.toLowerCase()+" "))
          return obj;
      }
    }
    for(let synonyme of d.synonymes){
      for(let firstArray of this.tempData){
        for(let obj of firstArray){
          if((synonyme+" ").includes(obj.mot.toLowerCase()+" "))
            return obj;
        }
      }
    }
    //console.log(d.name +" non trouvé dans l'ontologie.");
  }

  associatePola(root:any){
    var obj = this.searchNode(root);
    if(obj != undefined){
          if(root.numberOfCom == null){
            root.numberOfCom = 1;
            root.polarite = obj.pol;
          }
          else{
            //calcul de la nouvelle moyenne de la polarité
            root.polarite.neg = ((root.polarite.neg * root.numberOfCom) + obj.pol.neg)/(root.numberOfCom +1);
            root.polarite.neutre = ((root.polarite.neutre * root.numberOfCom) + obj.pol.neutre)/(root.numberOfCom +1);
            root.polarite.pos = ((root.polarite.pos * root.numberOfCom) + obj.pol.pos)/(root.numberOfCom +1);

            root.numberOfCom++;
          }
    }
    if(root.children){
      for(let child of root.children){
        this.associatePola(child);
      }
    }
  }

  propagationPola(root:any){
    if(root.children != null){
      let arrayOfPola = [];
      let newPola = {pos:0,neg:0,neutre:0};
      for(let child of root.children){
        this.propagationPola(child);
        if(child.data.polarite != null){
          arrayOfPola.push(child.data.polarite);
        }
      }
      if(arrayOfPola.length != 0){
        let index=1;
        for(let tempPola of arrayOfPola){

          newPola.pos = ((newPola.pos * index) + tempPola.pos)/(index+1);
          newPola.neg = ((newPola.neg * index) + tempPola.neg)/(index+1);
          newPola.neutre = ((newPola.neutre * index) + tempPola.neutre)/(index+1);
          index++;
        }
        if(root.data.polarite == null){
            root.data.polarite = newPola;
            root.data.numberOfCom = 1;
        }
        else{
          let nbCom = (root.data.numberOfCom ? root.data.numberOfCom : 1);

          root.data.polarite.pos = ((root.data.polarite.pos * nbCom) + newPola.pos)/(nbCom +1);
          root.data.polarite.neutre = ((root.data.polarite.neutre * nbCom) + newPola.neutre)/(nbCom +1);
          root.data.polarite.neg = ((root.data.polarite.neg * nbCom) + newPola.neg)/(nbCom +1);

        }
      }
    }
    else if(root._children != null){
      let arrayOfPola = [];
      let newPola = {pos:0,neg:0,neutre:0};
      for(let child of root._children){
        this.propagationPola(child);
        if(child.data.polarite != null){
          arrayOfPola.push(child.data.polarite);
        }
      }
      if(arrayOfPola.length != 0){
        let index = 1;
        for(let tempPola of arrayOfPola){

          newPola.pos = ((newPola.pos * index) + tempPola.pos)/(index+1);
          newPola.neg = ((newPola.neg * index) + tempPola.neg)/(index+1);
          newPola.neutre = ((newPola.neutre * index) + tempPola.neutre)/(index+1);
          index++;
        }
        if(root.data.polarite == null){
            root.data.polarite = newPola;
            root.data.numberOfCom = 1;
        }
        else{
          let nbCom = (root.data.numberOfCom ? root.data.numberOfCom : 1);

          root.data.polarite.pos = ((root.data.polarite.pos * nbCom) + newPola.pos)/(nbCom +1);
          root.data.polarite.neutre = ((root.data.polarite.neutre * nbCom) + newPola.neutre)/(nbCom +1);
          root.data.polarite.neg = ((root.data.polarite.neg * nbCom) + newPola.neg)/(nbCom +1);
  
          root.data.numberOfCom++;
        }
      }
    }
    else{
      //console.log(root);
    }
  }

  traitement(id : string){
      this.serviceAdmin.getCommentaireByIdATraiter(this.selected_hotel).subscribe(res =>{
        this.liste_commentaire = res;
        console.log(" HOTEL "+this.selected_hotel);
        console.log(this.liste_commentaire);
        if(this.liste_commentaire.length!=0){
          this.noComment = true;
          let tasks = [];
          this.ngxService.start();
          for (let key in this.liste_commentaire) {
            tasks.push(this.service.getPolariteCommentaire({"phrase":this.liste_commentaire[key]['commentaire']}));
          }

          forkJoin(...tasks).subscribe(
              data => { // Note: data is an array now
                this.ngxService.stop();
                console.log(data);
                this.tempData = data;
                this.service.getOntologie(this.selected_hotel).subscribe(res =>{
                  this.listOnto = res[0].ontologie;
                  this.ontologie();
                });
              }, err => console.log(err),
              () => console.log("Chargement des commentaires et de l'ontologie : ok")
            );
        }else{
          this.noComment=false;
          d3.select("svg").selectAll("*").remove();
          d3.select("svg").remove();
                this.service.getOntologie(this.selected_hotel).subscribe(res =>{
                  this.listOnto = res[0].ontologie;
                  this.ontologie();
                });
        }
      });
  }

  ontologie(){
  //Apparemment avec l'hotel montpellierain, cela appel deux fois l'ontologie, d'où le besoin d'effacer
  d3.select("svg").selectAll("*").remove();
  d3.select("svg").remove();
  console.log("Appel ontologie");
    var self = this;
// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(this.listOnto, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

if(this.noComment){
  this.associatePola(root.data);
  //this.propagationPola(root.data);
    for(let com of this.liste_commentaire){
      this.service.putCommentaireTraité(com.id_com).subscribe(res => {
        console.log(res);
      });
    }
    let data = {"id_hotel":this.selected_hotel,"ontologie":root.data};
    this.service.updateOntologie(data).subscribe(res => {
        console.log(res);
    });
    console.log("Commentaire traité, ontologie sauvegardé !");
}
this.propagationPola(root);
update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          //console.log(d);
          //return d._children ? "lightsteelblue" : "#fff";
      })
      .attr("style","fill: #fff;stroke: steelblue;stroke-width: 3px;");

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) {  return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", (d) => {
        if(d.data.polarite){
        var bg;
          if(d.data.polarite.neutre > d.data.polarite.neg && d.data.polarite.neutre > d.data.polarite.pos){
            if(d.data.polarite.neg >= d.data.polarite.pos){
                bg = 1 - (d.data.polarite.neutre - d.data.polarite.neg);
                return `rgba(220,20,60,${bg})`;
            }
            else{
                bg = 1 - (d.data.polarite.neutre - d.data.polarite.pos);
                return `rgba(0,128,0,${bg})`;
            }
          }
          else if(d.data.polarite.neg > d.data.polarite.pos){
                bg = 1 - (d.data.polarite.neutre + d.data.polarite.pos);
                return `rgba(220,20,60,${bg})`;
          }
          else{
                bg = 1 - (d.data.polarite.neutre + d.data.polarite.neg);
                return `rgba(0,128,0,${bg})`;
          }
        }
        else if(d._children){
          return "lightsteelblue";
        }
        else{
          return "#fff";
        }
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** context menu section *************************** 

  var existingMenu = false;
    d3.selectAll("g.node").on("contextmenu", function(data, index) {
    //handle right click
    console.log(data);
    console.log(index);
    if(!existingMenu){
      var contxt = d3.select("svg").append("g").attr("class","contextmenu").attr("transform", function(d, i) { return "translate(0,0)"; });;

      contxt.append("rect")
                  .attr("y",data.x)
                  .attr("x",data.y+105)
                  .attr("height",70)
                  .attr("width",300)
                  .attr("style","fill-opacity:0;stroke:steelblue;")
                  .on("contextmenu",function(){
                    existingMenu = false;
                    d3.select('.contextmenu').remove();
                    d3.event.preventDefault();
                  });
                  
      contxt.append("text")
                    .attr("y",data.x+25)
                    .attr("x",data.y+150)
                    .attr("font-family","sans-serif")
                    .attr("fill", "black")
                    .text(function(d) {  return "Afficher les commentaires" })
                    .on("contextmenu",function(){
                      existingMenu = false;
                      d3.select('.contextmenu').remove();
                      d3.event.preventDefault();
                    });

      contxt.append("text")
                    .attr("y",data.x+50)
                    .attr("x",data.y+185)
                    .attr("font-family","sans-serif")
                    .attr("fill", "black")
                    .text(function(d) {  return "Ajouter un noeud" })
                    .on("contextmenu",function(){
                      existingMenu = false;
                      d3.select('.contextmenu').remove();
                      d3.event.preventDefault();
                    });

      existingMenu = true;
     //stop showing browser menu
   }
   d3.event.preventDefault();
    });

    /*d3.select('svg').on('click', function() {
            console.log("prout");
            d3.select('rect').attr("y")+100
            console.log(d3.mouse(this));
            //d3.select('rect').remove();

    });*/

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0};
        return diagonal(o, o);
      })
      .attr("style","fill: none;stroke: #ccc;stroke-width: 2px;");

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    var path = `M ${s.y-8} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y+8} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
}
  ngOnDestroy(){
    d3.select("svg").selectAll("*").remove();
    d3.select("svg").remove();
  }

}
