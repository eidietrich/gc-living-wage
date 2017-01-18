import React from 'react';

// import {FormGroup, FormControl, InputGroup} from 'react-bootstrap';

import FormBox from './FormBox.js';
import CustomCostControl from './CustomCostControl.js';
import {annualFormat, clone, objectSum} from './helpers.js';

const MONTHS_PER_YEAR = 12;

var CostTable = React.createClass({
  handleCostUpdate: function(formKey, newValue){
    // Sets new custom cost
    let newData = clone(this.props.data);
    newData.label = 'custom';
    newData.expenses[formKey] = newValue * MONTHS_PER_YEAR; // Costs stored as annual values
    this.props.setCustomCosts(newData);
  },
  handleNumIncomeUpdate: function(newNumIncomes){
    let newData = clone(this.props.data);
    newData.label = 'custom';
    newData.num_incomes = newNumIncomes;
    this.props.setCustomCosts(newData);
  },
  render: function(){
    let that = this;

    let tableData = this.props.data; // cost data
    let expenses = tableData.expenses;

    let tableHeaders = (
      <tr>
        <th className="cost-label">Expense</th>
        <th className="cost-monthly">Monthly cost</th>
      </tr>
    )

    // TODO: Add dual/single income toggle
    let tableRows = Object.keys(expenses).map(function(label){
      // let annualCost = expenses[label];
      let monthlyCost = Math.round(expenses[label] / MONTHS_PER_YEAR);

      return (
        <tr key={label}>
          <td className="cost-label">{label}</td>
          <td className="cost-monthly form-container">
            <FormBox
              label={label}
              value={monthlyCost}
              upperBound={10000}
              setCustomCost={that.handleCostUpdate}
            />
          </td>
        </tr>
      );
    });

    // Add total row
    let annualTotal = objectSum(expenses);
    let monthlyTotal = annualTotal / MONTHS_PER_YEAR;
    tableRows.push(
      <tr key={'total'}>
        <td className="cost-label">Total monthly budget</td>
        <td className="cost-monthly custom-total">
          <div className="custom-total">
            {annualFormat(monthlyTotal)}
          </div>
        </td>
      </tr>
    );

    return (
      <div>
        <p>Enter your own costs below:</p>
        <table className="table cost-table">
          <thead>{tableHeaders}</thead>
          <tbody>{tableRows}</tbody>
        </table>
        <CustomCostControl
          numIncomes={tableData.num_incomes}
          setNumIncome={this.handleNumIncomeUpdate}
        />
      </div>
    );
  }
});

export default CostTable;