import React from 'react';

import {annualFormat} from './helpers.js';

const MONTHS_PER_YEAR = 12;

var CostTable = React.createClass({
  render: function(){
    let tableData = this.props.data; // cost data
    let expenses = tableData.expenses;

    let tableHeaders = (
      <tr>
        <th className="cost-label">Expense</th>
        <th className="cost-monthly">Per month</th>
        <th className="cost-annual">Per year</th>
      </tr>
    );

    let tableRows = Object.keys(expenses).map(function(label){
      let annualCost = expenses[label];
      let monthlyCost = expenses[label] / MONTHS_PER_YEAR;
      return (
        <tr key={label}>
          <td className="cost-label">{label}</td>
          <td className="cost-monthly">{annualFormat(monthlyCost)}</td>
          <td className="cost-annual">{annualFormat(annualCost)}</td>
        </tr>
      );
    });

    // Add total row
    let annualTotal = tableData.total_expenses;
    let monthlyTotal = tableData.total_expenses / MONTHS_PER_YEAR;
    tableRows.push(
      <tr key={'total'}>
        <td className="cost-label">Total</td>
        <td className="cost-monthly">{annualFormat(monthlyTotal)}</td>
        <td className="cost-annual">{annualFormat(annualTotal)}</td>
      </tr>
    );

    return (
      <div>
        <p>They say a <span className="dynamic-text">{tableData.label}</span> living in Gallatin County has these expenses:</p>
        <table className="table cost-table">
          <thead>{tableHeaders}</thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
});

export default CostTable;