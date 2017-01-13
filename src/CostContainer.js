import React from 'react';
import {format} from 'd3-format';

import CostTable from './CostTable.js';
import DropdownForm from './DropdownForm.js';
import FamilyButtonBar from './FamilyButtonBar.js';

const annualFormat = format('$,.0f');
const hourlyFormat = format('$,.2f');

const HOURS_PER_YEAR = 2080;

var CostContainer = React.createClass({
  render: function(){
    let size = this.props.focusFamilySize;
    let costs = this.props.data[size];
    let numIncomes = this.props.numIncomes;

    let numIncomesText = "T";
    if (numIncomes === 1) {
      numIncomesText = "With one wage earner, t"
    } else if (numIncomes === 2) {
      numIncomesText = "With two wage earners, t"
    }

    let livingAnnualWage = costs['Total'] / numIncomes;
    let livingHourlyWage = livingAnnualWage / HOURS_PER_YEAR;

    return (
      <div>
        <p>It depends, in part, on the size of family you're trying to support:</p>
        <FamilyButtonBar
          familySizes={this.props.familySizes}
          focusFamilySize={this.props.focusFamilySize}
          setFocusFamilySize={this.props.setFocusFamilySize}/>
        <p>For Gallatin County, a household of <span className="dynamic-text">{this.props.focusFamilySize}</span> has these expenses, according to MIT's <a href="http://livingwage.mit.edu/counties/30031">living wage calculator</a>:</p>
        <CostTable data={costs} />
        <div className="wage-box">
          <p>{numIncomesText}hat equates to a living wage of:</p>
          <h3>{annualFormat(livingAnnualWage)} <small>a year</small></h3>
          <p className="or-text">or</p>
          <h3>{hourlyFormat(livingHourlyWage)} <small>an hour</small></h3>
        </div>
      </div>
    );
  }
});

export default CostContainer;