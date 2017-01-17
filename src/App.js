import React from 'react';

import './App.css';

import CostContainer from './CostContainer.js';
import WageContainer from './WageContainer.js';

import costData from './../data/mit-living-expenses-hand-cleaned.json'
import wageData from './../data/sw-mt-wages-hand-cleaned.json';



// Controls display order independently of source data
const familySizes = [
  "1 Adult", "1 Adult 1 Child", "1 Adult 2 Children", "1 Adult 3 Children",
  "2 Adults (2 Working)", "2 Adults (2 Working) 1 Child", "2 Adults (2 Working) 2 Children", "2 Adults (2 Working) 3 Children",
  "2 Adults (1 Working)", "2 Adults (1 Working) 1 Child", "2 Adults (1 Working) 2 Children", "2 Adults (1 Working) 3 Children",
];
const initFamilyIndex = 6;

const familySizeLabels = {};
familySizes.forEach(function(key){
  familySizeLabels[key] = {
    'label': costData[key].label
  }
});

// TODO: Refactor so state stores a focusFamily data object, not its various components

var App = React.createClass({
  getInitialState: function(){
    let initialFocusFamilyKey = familySizes[initFamilyIndex];
    let initialFocusFamilyData = costData[initialFocusFamilyKey];
    let initialLivingWage = initialFocusFamilyData['total_expenses'] /initialFocusFamilyData['num_incomes'];
    return {
      focusFamilyKey: initialFocusFamilyKey,
      focusFamilyData: initialFocusFamilyData,
      livingWage: initialLivingWage,
      numIncomes: initialFocusFamilyData['num_incomes'],
    }
  },
  setFocusFamilySize: function(newFocusFamilyKey){
    let newFocusFamily = costData[newFocusFamilyKey];
    let newLivingCost =  newFocusFamily['total_expenses'];
    let newNumIncomes = newFocusFamily['num_incomes'];
    let newLivingWage = newLivingCost / newNumIncomes;
    this.setState({
      focusFamilyKey: newFocusFamilyKey,
      focusFamilyData: newFocusFamily,
      livingWage: newLivingWage,

      numIncomes: newNumIncomes,
    });
  },
  render: function() {
    return (
      <div className="App container">
        <h2>What is a living wage in Bozeman?</h2>
        <CostContainer
          focusFamilySize={this.state.focusFamilyKey}
          familySizeData={this.state.focusFamilyData}
          familySizes={familySizes}
          familySizeLabels={familySizeLabels}

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