import React from 'react';

import './App.css';

import WageContainer from './WageContainer.js';
import CostContainer from './CostContainer.js';

import wageData from './../data/sw-mt-wages.json';
import costData from './../data/mit-living-expenses.json'

// let familySize = "1 Adult";
// let costData = mitLiving[familySize];

const familySizes = ["1 Adult", "1 Adult 1 Child", "1 Adult 2 Children", "1 Adult 3 Children", "2 Adults (1 Working)", "2 Adults (1 Working) 1 Child", "2 Adults (1 Working) 2 Children", "2 Adults (1 Working) 3 Children", "2 Adults", "2 Adults 1 Child", "2 Adults 2 Children", "2 Adults 3 Children"];

var App = React.createClass({
  getInitialState: function(){
    return {
      focusFamilySize: familySizes[0],
      livingWage: 21570, // Highlight salary cells green if above this value, red if below it
    }
  },
  setFocusFamilySize: function(e){
    console.log(e.target.value);
    let newFocusFamilySize = e.target.value;
    let newLivingWage = costData[newFocusFamilySize]['Required post-tax income'];
    this.setState({
      focusFamilySize: newFocusFamilySize,
      livingWage: newLivingWage
    });
  },
  render: function() {
    return (
      <div className="App container">
        <h2>What is a living wage in Bozeman?</h2>
        <CostContainer
          data={costData}
          familySizes={familySizes}
          focusFamilySize={this.state.focusFamilySize}
          setFocusFamilySize={this.setFocusFamilySize}
          updateLivingWage={this.setLivingWage}/>
        <hr />
        <h2>And who actually makes it?</h2>
        <WageContainer
          data={wageData}
          highlightThreshold={this.state.livingWage} />
      </div>
    );
  }
});

export default App;