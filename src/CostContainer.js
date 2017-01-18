import React from 'react';

import {annualFormat, hourlyFormat, objectSum} from './helpers.js';

import CostTable from './CostTable.js';
import CustomCostTable from './CustomCostTable.js';
import FamilyButtonBar from './FamilyButtonBar.js';

const HOURS_PER_YEAR = 2080;

var CostContainer = React.createClass({
  render: function(){
    let data = this.props.familySizeData;

    let costs = data.expenses;
    // let totalCosts = data.total_expenses;
    let totalCosts = objectSum(costs);
    let numIncomes = data.num_incomes;

    let numIncomesText = "T";
    if (numIncomes === 1) {
      numIncomesText = "With one wage earner, t"
    } else if (numIncomes === 2) {
      numIncomesText = "With two wage earners, t"
    }

    let livingAnnualWage = totalCosts / numIncomes;
    let livingHourlyWage = livingAnnualWage / HOURS_PER_YEAR;

    const controlBar = (
      <FamilyButtonBar
        familySizes={this.props.familySizes}
        familySizeLabels={this.props.familySizeLabels}
        focusFamilySize={this.props.focusFamilySize}

        setFocusFamilySize={this.props.setFocusFamilySize}
        setCustomCosts={this.props.setCustomCosts}
      />
    );

    const presetCostTable = (
      <CostTable data={data} />
    );
    const customCostTable = (
      <CustomCostTable
        data={data}
        setCustomCosts={this.props.setCustomCosts}
      />
    );

    return (
      <div>
        <p>It depends on the size of family you're trying to support, as well as how many adults are working. Researchers at MIT, though, <a href="http://livingwage.mit.edu/counties/30031">have estimated</a> cost of living figures for a variety of family arrangements.</p>
        {controlBar}
        {this.props.customCosts ? customCostTable : presetCostTable}
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