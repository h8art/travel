<template lang="pug">
.bubbles-cont(@click='check')
  #bubbles
</template>
<script>
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import data from '@/assets/tags.js'
export default {
  methods: {
    check: function(e) {
      if(e.target !== e.currentTarget) return
      else this.$emit('close')
    }
  },
  mounted() {
    var width = 800,
      height = 500,
      padding = 1.5,
      clusterPadding = 6, 
      maxRadius = 12;

    d3.scale.ordinal()
      .range(["#7A99AC", "#E4002B"]);
    data.forEach(function(d) {
      d.size = 20;
    });

    var cs = [];
    var n = data.length

    //create clusters and nodes
    var nodes = [];
    for (var i = 0; i<n; i++){
      nodes.push(create_nodes(data,i));
    }

    var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(.04)
      .charge(0)
      .on("tick", tick)
      .start();

    var svg = d3.select("#bubbles").append("svg").attr("width", width).attr("height", height);
    var mousedownID = -1;
    var node = svg.selectAll("circle")
      .data(nodes)
      .enter().append("g").call(force.drag)
      .on("mousedown", function(d, i){
        if(mousedownID==-1)  mousedownID = setInterval(()=>{
          d3.select(this).selectAll('circle').attr("r", d.radius++)
        }, 100)
      })
      .on("mouseup", function(d, i){
        if(mousedownID!=-1) {
          clearInterval(mousedownID)
          mousedownID=-1
        }
      });


    node.append("circle")
      .style("fill", '#C02A45')
      .attr("r", function(d){return d.radius})
    node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text(function(d) { return d.text.substring(0, d.radius / 3); });

    function create_nodes(data,node_counter) {
      var r = Math.sqrt(-Math.log(Math.random())) * maxRadius,
        d = {
          radius: data[node_counter].size*2,
          text: data[node_counter].name,
          x: Math.cos(Math.PI) * 200 + width / 2 + Math.random(),
          y: Math.sin(Math.PI) * 200 + height / 2 + Math.random()
        };
      return d;
    }
    function tick(e) {
      node.each(collide(.5))
      .attr("transform", function (d) {
        var k = "translate(" + d.x + "," + d.y + ")";
        return k;
      })
    }
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function (d) {
        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }

    Array.prototype.contains = function(v) {
      for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
      }
      return false;
    };
  }
}
</script>

<style lang="sass" scoped>
.bubbles-cont
  align-items: center
  justify-content: center
</style>
