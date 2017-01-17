// Assumes value keys in colKeys are present in every row in data

import React from 'react';

import {annualFormat, hourlyFormat} from './helpers.js'

const HOURS_PER_YEAR = 2080;
const NULL_DISPLAY = '-';
const colKeys = ['A_PCT25','A_MEDIAN','A_PCT75'];

var salaryFormat = function(value, wageDisplay){
  if (value === null) {
    return NULL_DISPLAY;
  } else {
    if (wageDisplay == 'hourly'){
      return hourlyFormat(value);
    } else if (wageDisplay == 'annual') {
      return annualFormat(value);
    } else {
      throw "invalid wageDisplay value" + wageDisplay;
      return null;
    }
  }
}

var WageTable = React.createClass({
  classifyCell: function(value) {
    if (value === null) { return 'null-value'; }
    if (value >= this.props.highlightThreshold) {
      return 'above-threshold';
    } else {
      return 'below-threshold';
    }
  },
  handleRowClick: function(e){
    let category = e.target.getAttribute('value');
    this.props.handleFocusCatChange(category);
  },
  buildRowLabelCells: function(dataRow){
    let labelContents = (
      <td className="col-label" key="0">
        {dataRow['display_label'] || dataRow['OCC_TITLE']}
      </td>
    );
    return [labelContents]
  },
  parseData: function(data) {
    let fullData = data.slice();

    // Filter to desired rows
    let rowsFiltered = fullData.filter(this.props.rowFilterFunction)

    // Sort rows
    let sortKey = this.props.sortKey;
    let sortFunction = function(a, b) { return b[sortKey] - a[sortKey]}
    let sorted = rowsFiltered.sort(sortFunction);

    return sorted;
  },
  render: function(){
    let that = this;

    let tableData = this.parseData(this.props.data);
    let headers = colKeys;

    let displayFactor = this.props.wageDisplay === 'hourly' ? HOURS_PER_YEAR : 1;

    let displayHeaders = (
      <thead>
        <tr>
          <th><h4>Job type</h4></th>
          <th colSpan="3"><h4>Typical pay range</h4></th>
        </tr>
        <tr>
          <td></td>
          <td className="col-salary">Low</td>
          <td className="col-salary">Median</td>
          <td className="col-salary">High</td>
        </tr>
      </thead>
    );

    // Table rows
    // For each row in filtered data, loop through, add label cell & data cells
    let displayRows = tableData.map(function(dataRow, i){
      let labelCells = that.buildRowLabelCells(dataRow); // Needs to be an array
      let dataCells = headers.map(function(colKey) {
        let isMedian = (colKey === 'A_MEDIAN');
        let cellValue = dataRow[colKey];
        let cellClass = 'col-salary ' + that.classifyCell(cellValue);
        if (isMedian) { cellClass += ' median'; }
        return (
          <td key={colKey} className={cellClass}>
            {salaryFormat(cellValue / displayFactor, that.props.wageDisplay)}
          </td>
        );
      })
      let displayRow = labelCells.concat(dataCells);
      return (<tr key={i.toString()}>{displayRow}</tr>);
    });

    return (
      <div>
        <table className="table">
          {displayHeaders}
          <tbody>{displayRows}</tbody>
        </table>
      </div>
    );
  }
});

export default WageTable;

