import React from 'react';
import {format} from 'd3-format';

const annualFormat = format('$,.0f');

const MONTHS_PER_YEAR = 12;

var CostTable = React.createClass({
  render: function(){
    let tableData = this.props.data; // cost data
    // let headers = ['Expense', 'A month', 'A year'];
    //

    // let tableHeaders = headers.map(function(header) {
    //   return (<th key={header}>{header}</th>);
    // });

    let tableHeaders = (
      <tr>
        <th className="cost-label">Expense</th>
        <th className="cost-monthly">Per month</th>
        <th className="cost-annual">Per year</th>
      </tr>
    )

    let tableRows = Object.keys(tableData).map(function(label){
      let annualCost = tableData[label];
      let monthlyCost = tableData[label] / MONTHS_PER_YEAR;
      return (
        <tr key={label}>
          <td className="cost-label">{label}</td>
          <td className="cost-monthly">{annualFormat(monthlyCost)}</td>
          <td className="cost-annual">{annualFormat(annualCost)}</td>
        </tr>
      );
    });

    return (
      <div>
        <table className="table cost-table">
          <thead>{tableHeaders}</thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
});

export default CostTable;