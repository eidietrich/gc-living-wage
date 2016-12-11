import React from 'react';

import './App.css';

import PayTableContainer from './PayTableContainer.js';
import wageData from './../data/sw-mt-wages.json';
import mitLiving from './../data/mit-living-expenses.json'

// let familySize = "1 Adult";
// let costData = mitLiving[familySize];

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <PayTableContainer data={wageData} />
      </div>
    );
  }
});

export default App;
