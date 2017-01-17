import React from 'react';

import {annualFormat, hourlyFormat} from './helpers.js';

const formatKey = {
  'annual': {
    'format': annualFormat,
    'label': ' a year',
    'factor': 1
  },
  'hourly': {
    'format': hourlyFormat,
    'label': ' an hour',
    'factor': 2080
  }
}

var WageLegend = React.createClass({
  describeWage: function(value){
    let key = this.props.wageDisplay;
    if (key in formatKey){
      let type = formatKey[key];
      return (
        <span>
          <span className="dynamic-text">
           {' ' + type.format(value / type.factor)}
          </span>
          {type.label}
        </span>
      );
    } else {
      throw 'bad wageDisplay';
    }
  },
  render: function(){
    return (
      <p className="legend">
        <span className="legend above-threshold">
          At or above
          {this.describeWage(this.props.highlightThreshold)}
        </span>/
        <span className="legend below-threshold">Below it</span>
      </p>
    );
  }
});

export default WageLegend;