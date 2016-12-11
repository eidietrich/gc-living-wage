// Renders a d3-chart

import React from 'react';
import d3 from 'd3';

var sampleData = [
  {x: 1, y: 2}, {x: 2, y: 3}, {x: 2, y: 2.5}, {x: 1.5, y: 2.3}
]

var Chart = React.createClass({
  render: function(){
    let width = 400;
    let height = 200;

    let xScale = d3.scaleLinear()
      .domain([0, d3.max(sampleData, function(d){ return d.x; })])
      .range([0, width);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(sampleData, function(d){ return d.y; })])
      .range([0, height);

    // And this is where I get confused about how to implement this...

    return (
      <div>
        <svg width={width} height={height}></svg>
      </div>

    )


  }
});



export default Chart;
