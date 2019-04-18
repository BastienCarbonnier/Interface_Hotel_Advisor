import { Component, OnInit } from '@angular/core';
import { OntologieService } from './ontologie.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import * as d3 from 'd3';

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
  private liste_commentaire : Object[] = [];
  private noComment : boolean = false;

  constructor(private service: OntologieService, private route: ActivatedRoute, private serviceAdmin: AdminService ) { }
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
        this.selected_hotel = params['selected_hotel'];
    });

  	this.service.getOntologie().subscribe(res =>{
   		this.listOnto = res;
      console.log(this.listOnto[0]);
      this.ontologie();
  	});
   }
  ngDoCheck(){
    // Evite Angular d'inonder de requête le server Node. Il fait la requête que si l'utilisateur choisi un autre hôtel
      if(this.selected_hotel_old != this.selected_hotel){ 
          this.traitement(this.selected_hotel);
          this.selected_hotel_old = this.selected_hotel;

      }

  }

  traitement(id : string){
      this.serviceAdmin.getCommentaireByIdNoTraiter(this.selected_hotel).subscribe(res =>{
        this.liste_commentaire = res;
        if(this.liste_commentaire.length!=0){
          this.noComment = true;
          let commentaire : Object[] = [];
          for (let key in this.liste_commentaire) {
              commentaire[key]=this.liste_commentaire[key]['commentaire'];
          }
          
          //changer ici
          this.service.getOntologie().subscribe(res =>{
            this.listOnto = res;
            this.ontologie();
          });
        }else{
          this.noComment=false;
          d3.select("svg").selectAll("*").remove();
          d3.select("svg").remove();
        }
        console.log(this.liste_commentaire);
      });
  }

  ontologie(){
  
	  	var treeData = 
		  {
		    "name": "Top Level",
		    "children": [
		      {
		        "name": "Level 2: A",
		        "children": [
		          {
		            "name": "Son of A",
		            "children":[
		            {
		            	"name":"Samson"
		            },
		            {
		            	"name":"Sam le Brave"
		            },
		            {
		            	"name":"Sans Gluten"
		            }
		            ],
		          },
		          {
		            "name": "Daughter of A",
		            "children":[
		            {
		            	"name":"Samson"
		            },
		            {
		            	"name":"Sam le Brave"
		            },
		            {
		            	"name":"Sans Gluten"
		            }
		            ]
		          }
		        ]
		      },
		      {
		        "name": "Level 2: B",
		        "children":[
		            {
		            	"name":"Samson"
		            },
		            {
		            	"name":"Sam le Brave"
		            },
		            {
		            	"name":"Sans Gluten"
		            }
		            ]
		      }
		    ]
		  };
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
root = d3.hierarchy(this.listOnto[0], function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

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
          console.log(d);
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
      .text(function(d) { return d.data.name; });

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
    .style("fill", function(d) {
        if(d.data.polarite){
        var bg;
          if(d.data.polarite[1] > d.data.polarite[0] && d.data.polarite[1] > d.data.polarite[2]){
            if(d.data.polarite[0] >= d.data.polarite[2]){
                bg = 1 - ((d.data.polarite[1] - d.data.polarite[0])/100)%2;
                return `rgba(220,20,60,${bg})`;
            }
            else{
                bg = 1 - ((d.data.polarite[1] - d.data.polarite[2])/100)%2;
                return `rgba(0,128,0,${bg})`;
            }
          }
          else if(d.data.polarite[0] > d.data.polarite[2]){
                bg = 1 - ((d.data.polarite[1] + d.data.polarite[2])/100)%2;
                return `rgba(220,20,60,${bg})`;
          }
          else{
                bg = 1 - ((d.data.polarite[1] + d.data.polarite[0])/100)%2;
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

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
      //console.log(d);
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
