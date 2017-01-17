import React from 'react';
import {format} from 'd3-format';

import {annualFormat, hourlyFormat} from './helpers.js';

import CostTable from './CostTable.js';
import DropdownForm from './DropdownForm.js';
import FamilyButtonBar from './FamilyButtonBar.js';

const HOURS_PER_YEAR = 2080;

var CostContainer = React.createClass({
  render: function(){
    // let size = this.props.focusFamilySize;
    let data = this.props.familySizeData;

    let costs = data.expenses;
    let total_costs = data.total_expenses;
    let numIncomes = data.num_incomes;
    let label = data.label;

    let numIncomesText = "T";
    if (numIncomes === 1) {
      numIncomesText = "With one wage earner, t"
    } else if (numIncomes === 2) {
      numIncomesText = "With two wage earners, t"
    }

    let livingAnnualWage = total_costs / numIncomes;
    let livingHourlyWage = livingAnnualWage / HOURS_PER_YEAR;

    return (
      <div>
        <p>It depends, in part, on the size of family you're trying to support:</p>
        <FamilyButtonBar
          familySizes={this.props.familySizes}
          familySizeLabels={this.props.familySizeLabels}
          focusFamilySize={this.props.focusFamilySize}

          setFocusFamilySize={this.props.setFocusFamilySize}/>

        <CostTable data={data} />

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