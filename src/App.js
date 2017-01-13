import React from 'react';

import './App.css';

import WageContainer from './WageContainer.js';
import CostContainer from './CostContainer.js';

import wageData from './../data/sw-mt-wages-hand-cleaned.json';
import costData from './../data/mit-living-expenses-hand-cleaned.json'

// let familySize = "1 Adult";
// let costData = mitLiving[familySize];

const familySizes = [
  "1 Adult", "1 Adult 1 Child", "1 Adult 2 Children", "1 Adult 3 Children",
  "2 Adults (2 Working)", "2 Adults (2 Working) 1 Child", "2 Adults (2 Working) 2 Children", "2 Adults (2 Working) 3 Children",
  "2 Adults (1 Working)", "2 Adults (1 Working) 1 Child", "2 Adults (1 Working) 2 Children", "2 Adults (1 Working) 3 Children",
];

const DUAL_INCOMES =  ["2 Adults (2 Working)", "2 Adults  (2 Working) 1 Child", "2 Adults (2 Working) 2 Children", "2 Adults (2 Working) 3 Children"] // Hacky -- TODO: Consolidate this sort of data

var App = React.createClass({
  getInitialState: function(){
    return {
      focusFamilySize: familySizes[6],
      numIncomes: 2,
      livingWage: 32684,
    }
  },
  setFocusFamilySize: function(newFocusFamilySize){
    console.log(newFocusFamilySize);
    let newLivingWage = costData[newFocusFamilySize]['Total'];
    let newNumIncomes = (DUAL_INCOMES.indexOf(newFocusFamilySize) >= 0) ? 2 : 1;
    this.setState({
      focusFamilySize: newFocusFamilySize,
      livingWage: newLivingWage / newNumIncomes,
      numIncomes: newNumIncomes,
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
          numIncomes={this.state.numIncomes}
          setFocusFamilySize={this.setFocusFamilySize} />
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