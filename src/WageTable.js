// React component for rendering json object --> react-bootstrap table
// Assumes value keys in colKeys are present in every row in data

// TODO: Add formating here
// Classes - row-label,

// Inputs -

import React from 'react';
import {format} from 'd3-format';

import firstQuartile from './icons/one-of-four.svg';
import median from './icons/two-of-four.svg';
import thirdQuartile from './icons/three-of-four.svg';

// TODO: Add handling for null values -- currently returning '$'
// var salaryFormat = format('$,');

const NULL_DISPLAY = '-';
var empNumFormat = format(',');
var salaryFormat = function(value){
  if (value === null) {
    return NULL_DISPLAY;
  } else {
    return format('$,')(value);
  }
}

var colKeys = {
  // 'A_PCT10': {
  //   colClassName: 'col-salary',
  //   displayName: '10th percentile salary',
  // },
  'A_PCT25': {
    colClassName: 'col-salary',
  },
  'A_MEDIAN': {
    colClassName: 'col-salary',
  },
  'A_PCT75': {
    colClassName: 'col-salary',
  },
  // 'A_PCT90': {
  //   colClassName: 'col-salary',
  //   displayName: '90th percentile salary',
  // },
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
    let headers = Object.keys(colKeys); // Doesn't include row label cols

    let displayHeaders = (
      <thead>
        <tr>
          <th><h4>Job type</h4></th>
          <th colSpan="3"><h4>Typical salary range</h4></th>
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
            {salaryFormat(cellValue)}
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
        <p className="small"> Notes: Half of workers in a field make more than median pay, half make less. "Lower pay" represents the first quartile salary, where a quarter of workers in a field make less and three-quarters make more. "Higher pay" represents the third quartile salary, where a quarter of workers make more and three-quarters make less. Data represents the May 2015 BLS <a href="https://www.bls.gov/oes/current/oes_3000003.htm">Area Occupational Employment and Wage Estimates</a> for the Southwest Montana nonmetropolitan area.</p>
      </div>
    );
  }
});

export default WageTable;

