import React from 'react';

import './App.css';

import CostContainer from './CostContainer.js';
import WageContainer from './WageContainer.js';

import {objectSum} from './helpers.js';

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
    let initialLivingWage = objectSum(initialFocusFamilyData.expenses) / initialFocusFamilyData['num_incomes'];
    return {
      focusFamilyKey: initialFocusFamilyKey,
      focusFamilyData: initialFocusFamilyData,
      livingWage: initialLivingWage,
      customCosts: false
    }
  },
  setFocusFamilySize: function(newFocusFamilyKey){
    // Triggered by FamilyButtonBar selections
    let newFocusFamilyData = costData[newFocusFamilyKey];

    let newLivingCost =  objectSum(newFocusFamilyData.expenses);
    let newNumIncomes = newFocusFamilyData['num_incomes'];
    let newLivingWage = newLivingCost / newNumIncomes;
    this.setState({
      focusFamilyKey: newFocusFamilyKey,
      focusFamilyData: newFocusFamilyData,
      livingWage: newLivingWage,
      customCosts: false,
    });
  },
  setCustomCosts: function(newCostData){
    // This is triggered both by edit icon in FamilyButtonBar
    // also changes to forms in CustomCostTable
    let newFocusFamilyData = newCostData || this.state.focusFamilyData;

    let newLivingCost =  objectSum(newFocusFamilyData.expenses);
    let newNumIncomes = newFocusFamilyData['num_incomes'];
    let newLivingWage = newLivingCost / newNumIncomes;
    this.setState({
      customCosts: true,
      focusFamilyKey: 'custom',
      focusFamilyData: newFocusFamilyData,
      livingWage: newLivingWage
    });
  },
  render: function() {
    return (
      <div className="App container">
        <h2>What is a living wage in Bozeman?</h2>
        <CostContainer
          focusFamilySize={this.state.focusFamilyKey}
          familySizeData={this.state.focusFamilyData}
          customCosts={this.state.customCosts}

          familySizes={familySizes}
          familySizeLabels={familySizeLabels}

          setFocusFamilySize={this.setFocusFamilySize}
          setCustomCosts={this.setCustomCosts} />
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