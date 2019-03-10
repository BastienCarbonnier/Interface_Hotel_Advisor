import { Component, OnInit } from '@angular/core';
import { OntologieService } from '../ontologie.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-ontologie',
  templateUrl: './ontologie.component.html',
  styleUrls: ['./ontologie.component.css']
})
export class OntologieComponent implements OnInit {

  private tree : any;

  constructor(private service: OntologieService) { }

  private listOnto : Object[];
  ngOnInit() {
  	this.service.getOntologie().subscribe(res =>{
  		this.listOnto = res;
  	});
  this.ontologie();
  }
  ngAfterContentInit(){
  	
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
		          },
		          {
		            "name": "Daughter of A",
		          }
		        ]
		      },
		      {
		        "name": "Level 2: B",
		      }
		    ]
		  };
		  // set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// declares a tree layout and assigns the size
var treemap = d3.tree()
    .size([height, width]);

//  assigns the data to a hierarchy using parent-child relationships
var nodes = d3.hierarchy(treeData, function(d) {
    return d.children;
  });

// maps the node data to the tree layout
nodes = treemap(nodes);

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom),
    g = svg.append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// adds the links between the nodes
var link = g.selectAll(".link")
    .data(nodes.descendants().slice(1))
 	.enter()
 	.append("path")
    .attr("class", "link")
    .attr("d", function(d) {
       return "M" + d.y + "," + d.x
         + "C" + (d.y + d.parent.y) / 2 + "," + d.x
         + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
         + " " + d.parent.y + "," + d.parent.x;
       })
    .attr("style","fill: none;stroke: #ccc; stroke-width: 2px;");

// adds each node as a group
var node = g.selectAll(".node")
    .data(nodes.descendants())
  	.enter()
  	.append("g")
    .attr("class", function(d) { 
      return "node" + 
        (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function(d) { 
      return "translate(" + d.y + "," + d.x + ")"; })
    .attr("style","text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;");

// adds the circle to the node
node.append("circle")
  .attr("r", 10)
  .attr("style","fill: #fff;stroke: steelblue;stroke-width: 3px;");

// adds the text to the node
node.append("text")
  .attr("dy", ".35em")
  .attr("x", function(d) { return d.children ? -13 : 13; })
  .attr("style","font: 12px sans-serif;")
  .style("text-anchor", function(d) { 
    return d.children ? "end" : "start"; })
  .text(function(d) { return d.data.name; });


		/*var root = d3.hierarchy(treeData);
		this.tree = d3.tree().size([100,150]);
		this.tree = this.tree(root);

		var svg = d3.select(".ontologie").append("svg").attr("width","300px").attr("height","350px");
		var g = svg.append("g").attr("transform","translate(5,5)");
		var nodes = g.append("g").attr("class","nodes");
		var links = g.append("g").attr("class","links");

		// Links
		d3.select('g.links')
		  .selectAll('line.link')
		  .data(root.links())
		  .enter()
		  .append('line')
		  .classed('link', true)
		  .attr('x1', function(d) {return d.source.x;})
		  .attr('y1', function(d) {return d.source.y;})
		  .attr('x2', function(d) {return d.target.x;})
		  .attr('y2', function(d) {return d.target.y;})
		  .attr('style','fill: none;stroke: #ccc;stroke-width: 2px;');

		var nodeText = d3.select('g.nodes')
		  .selectAll('circle.node')
		  .data(root.descendants())
		  .enter();

		  nodeText.append('circle')
		  .classed('node', true)
		  .attr('cx', function(d) {return d.x;})
		  .attr('cy', function(d) {return d.y;})
		  .attr('r', 6)
		  .attr('style','fill: #fff;stroke: steelblue;stroke-width: 2px;');

		  nodeText.append('text')
		  .attr('y',function(d){return d.y;}).attr('x',function(d){return d.x;})
		  .attr("text-anchor", "start")
		  .style("font","12px sans-serif")
		  .style("fill","black")
		  .text(function(d) {
		        return d.data.name;
		      });*/

		  /*var node = g.selectAll(".node");
		  node.append("text")
		      .attr("dy", 3)
		      .attr("x", function(d) { return d.children ? -8 : 8; })
		      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
		      .style("font","12px sans-serif")
		      .text(function(d) { 
		      	console.log(d.data.name);
		        return d.data.name;
		      });*/
		
	}

		/*margin = { top: 20, right: 20, bottom: 30, left: 40 };
		width = 960 - this.margin.left - this.margin.right;
		height = 500 - this.margin.top - this.margin.bottom;

		left_chart = d3.tree().size([this.height, this.width]);
		right_chart = d3.tree().size([this.height, this.width]);
		svg;
		treeData: object;
		i = 0;
		duration = 750;
		left;
		right;
		state;
		constructor() { }


		ngOnInit() {
		 this.getData();
		 this.loadChart();
		}

		loadChart() {
		this.svg = d3.select('#treeView').append('svg')
		  .attr('width', this.width + this.margin.right + this.margin.left)
		  .attr('height', this.height + this.margin.top + this.margin.bottom)
		  .append('g')
		  .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');


		this.left = d3.hierarchy(this.treeData, (d: any) => d.left);
		this.left.x0 = this.height / 2;
		this.left.y0 = this.width;
		this.left.children.forEach(this.collapse);
		this.update(this.left);

		//previously commented

		 this.right = d3.hierarchy(this.treeData, (d: any) => d.right);
		 this.right.x0 = this.height / 2;
		 this.right.y0 = this.width;
		 this.right.children.forEach(this.collapse1);
		 this.state = 'Right';
		 this.update(this.right);
		}

		collapse(d) {
		if (d.children) {
		  d._children = d.children;
		  d.children = null;
		}
		}
		collapse1 = (d) => {
		if (d.children) {
		  d._children = d.children;
		  d._children.forEach(this.collapse1);
		  d.children = null;
		} else if (d.children) {
		  d.children.forEach(this.collapse1);

		}
		}


		update(source) {
		let treeData;
		if (this.state === 'Right') {
		  treeData = this.right_chart(this.right);
		} else {
		  treeData = this.left_chart(this.left);
		}


		const nodes = treeData.descendants(),
		  links = treeData.descendants().slice(1);

		if (this.state === 'Right') {
		  nodes.forEach((d) => { d.y = d.depth * 180; });

		} else {
		  nodes.forEach((d) => { d.y = this.width - (d.depth * 180); });
		}


		const node = this.svg.selectAll('g.node')
		  .data(nodes, (d: any) => d.id || (d.id = ++this.i));

		const nodeEnter = node.enter().append('g')
		  .attr('class', 'node')
		  .attr('transform', (d) => {
		    return 'translate(' + source.y0 + ',' + source.x0 + ')';
		  })
		  .on('click', (d) => {
		    this.click(d);
		  });

		nodeEnter.append('circle')
		  .attr('class', 'node')
		  .attr('r', 1e-6)
		  .style('fill', function (d: any) {
		    return d._children ? 'lightsteelblue' : '#fff';
		  });

		nodeEnter.append('text')
		  .attr('dy', '.35em')
		  .attr('x', function (d: any) {
		    return d.children || d._children ? -13 : 13;
		  })
		  .attr('text-anchor', function (d: any) {
		    return d.children || d._children ? 'end' : 'start';
		  })
		  .text(function (d: any) { return d.data.name; });

		const nodeUpdate = nodeEnter.merge(node);

		if (this.state === 'Right') {
		  nodeUpdate.transition()
		    .duration(this.duration)
		    .attr('transform', function (d) {
		      if (d.parent === 'null') {
		        d.y = this.right.y0;
		        d.x = this.right.x0;
		      }
		      return 'translate(' + d.y + ',' + d.x + ')';
		    });

		} else {
		  nodeUpdate.transition()
		    .duration(this.duration)
		    .attr('transform', function (d) {
		      if (d.parent === 'null') {
		        d.y = this.left.y0;
		        d.x = this.left.x0;
		      }
		      return 'translate(' + d.y + ',' + d.x + ')';
		    });
		}

		nodeUpdate.select('circle.node')
		  .attr('r', 10)
		  .style('fill', function (d: any) {
		    return d._children ? 'lightsteelblue' : '#fff';
		  })
		  .attr('cursor', 'pointer');


		const nodeExit = node.exit().transition()
		  .duration(this.duration)
		  .attr('transform', function (d) {
		    return 'translate(' + source.y + ',' + source.x + ')';
		  })
		  .remove();

		nodeExit.select('circle')
		  .attr('r', 1e-6);

		nodeExit.select('text')
		  .style('fill-opacity', 1e-6);

		const link = this.svg.selectAll('path.link')
		  .data(links, function (d: any) { return d.id; });


		const linkEnter = link.enter().insert('path', 'g')
		  .attr('class', 'link')
		  .attr('d', (d) => {
		    const o = { x: source.x0, y: source.y0 };
		    return this.diagonal(o, o);
		  });

		const linkUpdate = linkEnter.merge(link);

		linkUpdate.transition()
		  .duration(this.duration)
		  .attr('d', (d) => this.diagonal(d, d.parent));

		const linkExit = link.exit().transition()
		  .duration(this.duration)
		  .attr('d', (d) => {
		    const o = { x: source.x, y: source.y };
		    return this.diagonal(o, o);
		  })
		  .remove();

		  nodes.forEach(function (d: any) {
		   d.x0 = d.x;
		   d.y0 = d.y;
		 });
		}

		diagonal(s, d) {
		  const path = `M ${s.y} ${s.x}
		              C ${(s.y + d.y) / 2} ${s.x},
		                ${(s.y + d.y) / 2} ${d.x},
		                ${d.y} ${d.x}`;

		  return path;
		 }

		click(d) {
		   if (d.children) {
		   d._children = d.children;
		   d.children = null;
		 } else {
		   d.children = d._children;
		   d._children = null;
		 }
		 this.update(d);
		}


		 getData() {
			   this.treeData = {
			  'name': 'Source',
			  'left': [
			    {
			      'name': 'L-1',
			      'children': [
			        {
			          'name': 'L-1-1',
			        }
			      ]
			    },
			    {
			      'name': 'L-2',
			      'children': [
			        {
			          'name': 'l-2-1',
			        }
			      ]
			    },
			  ],
			  'right': [
			    {
			      'name': 'R-1',
			      'children': [
			        {
			          'name': 'r-1-1',
			        }
			      ]
			    },
			    {
			      'name': 'R-2',
			      'children': [
			        {
			          'name': 'r-2-1',
			        }
			      ]
			    },
			  ],
			 };
		}*/


}
