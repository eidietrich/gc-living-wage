// React component for rendering json object --> react-bootstrap table
// Assumes value keys in colKeys are present in every row in data

// TODO: Add formating here
// Classes - row-label,

var colKeys = {
  'OCC_TITLE': {
    colClassName: 'col-occupation',
    displayName: 'Occupation',
  },
  'TOT_EMP': {
    colClassName: 'col-employment',
    displayName: 'Regional workers',
  },
  'A_PCT10': {
    colClassName: 'col-salary',
    displayName: '10th percentile salary',
  },
  'A_PCT25': {
    colClassName: 'col-salary',
    displayName: '25th percentile salary',
  },
  'A_MEDIAN': {
    colClassName: 'col-salary',
    displayName: 'Median salary',
  },
  'A_PCT75': {
    colClassName: 'col-salary',
    displayName: '75th percentile salary',
  },
  'A_PCT90': {
    colClassName: 'col-salary',
    displayName: '90th percentile salary',
  },
}
var highlightThreshold = 40000; // TODO: Highlight salary cells green if above this value, red if below it

import React from 'react';
import {format} from 'd3-format';

// TODO: Add handling for null values -- currently returning '$'
var salaryFormat = format('$,');

var Table = React.createClass({
  classifyCell: function(value) {
    if (isNaN(value)) { return null; }
    if (value > highlightThreshold) {
      return 'above-threshold';
    } else {
      return 'below-threshold';
    }
  },
  render: function(){
    let that = this;

    let tableData = this.props.data;
    let headers = Object.keys(colKeys);

    let tableHeaders = headers.map(function(colKey) {return (<th key={colKey}>{colKeys[colKey].displayName}</th>); });

    let tableRows = tableData.map(function(item, i){
      let row = headers.map(function(colKey) {
        let cellValue = item[colKey];
        let colClass = colKeys[colKey].colClassName;
        let valueClass = null;
        if (colClass === 'col-salary') {
          valueClass = that.classifyCell(cellValue)
          cellValue = salaryFormat(cellValue);
        };
        let cellClass = [colClass, valueClass].join(" ")

        return (<td key={colKey} className={cellClass}>{cellValue}</td>);
      });
      return (<tr key={i.toString()}>{row}</tr>);
    });

    return (
      <div>
        <table className="table-bordered">
          <thead><tr>{tableHeaders}</tr></thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
});

export default Table;

