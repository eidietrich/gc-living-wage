// React container for table
// Includes filtering logic

import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import Table from './Table.js';


var filterToMajorGroups = function(row) { return row['OCC_GROUP'] === 'major'; };
var filterToMajorGroup = function(id){
  return function(row) {
    return row['OCC_CODE'].includes(id + '-') &&
      row['OCC_CODE'] !== (id + '-0000'); }
}
var jobCategories = [
  {
    'label': 'Occupation Types',
    'filterFunction': filterToMajorGroups
  },
  {
    'label': 'Management',
    'filterFunction': filterToMajorGroup('11')
  },
  {
    'label': 'Business and Financial',
    'filterFunction': filterToMajorGroup('13')
  },
  {
    'label': 'Computer and Mathematical',
    'filterFunction': filterToMajorGroup('15')
  },
  {
    'label': 'Architecture and Engineering',
    'filterFunction': filterToMajorGroup('17')
  },
  {
    'label': 'Life, Physical and Social Science',
    'filterFunction': filterToMajorGroup('19')
  },
  {
    'label': 'Community and Social Service',
    'filterFunction': filterToMajorGroup('21')
  },
  {
    'label': 'Legal',
    'filterFunction': filterToMajorGroup('23')
  },
  {
    'label': 'Education, Training and Library',
    'filterFunction': filterToMajorGroup('25')
  },
  {
    'label': 'Arts, Design, Entertainment, Sports, and Media',
    'filterFunction': filterToMajorGroup('27')
  },
  {
    'label': 'Healthcare Practitioners and Technical',
    'filterFunction': filterToMajorGroup('29')
  },
  {
    'label': 'Healthcare Support',
    'filterFunction': filterToMajorGroup('31')
  },
  {
    'label': 'Protective Service',
    'filterFunction': filterToMajorGroup('33')
  },
  {
    'label': 'Food Preparation and Serving',
    'filterFunction': filterToMajorGroup('35')
  },
  {
    'label': 'Building and Grounds Cleaning and Maintenance',
    'filterFunction': filterToMajorGroup('37')
  },
  {
    'label': 'Personal Care and Service',
    'filterFunction': filterToMajorGroup('39')
  },
  {
    'label': 'Sales and Related',
    'filterFunction': filterToMajorGroup('41')
  },
  {
    'label': 'Office and Administrative Support',
    'filterFunction': filterToMajorGroup('43')
  },
  {
    'label': 'Farming, Fishing, and Forestry',
    'filterFunction': filterToMajorGroup('45')
  },
  {
    'label': 'Construction and Extraction',
    'filterFunction': filterToMajorGroup('47')
  },
  {
    'label': 'Installation, Maintenance, and Repair',
    'filterFunction': filterToMajorGroup('49')
  },
  {
    'label': 'Production',
    'filterFunction': filterToMajorGroup('51')
  },
  {
    'label': 'Transportation and Material Moving',
    'filterFunction': filterToMajorGroup('53')
  },
]

var PayTableContainer = React.createClass({
  getInitialState: function(){
    return {
      focusCategory: 'Occupation Types'
    }
  },
  parseData: function() {
    let that = this;
    // let incRows = filterToMajorGroups;
    // let incRows = filterToMajorGroup('37')
    let incRows = filterToMajorGroups;
    jobCategories.forEach(function(cat){
      if (cat.label === that.state.focusCategory){
        incRows = cat.filterFunction;
      }
    });

    // let incRows = jobCategories[5].filterFunction

    let incCols = ['OCC_TITLE','TOT_EMP','A_PCT10','A_PCT25','A_MEDIAN','A_PCT75','A_PCT90'];
    let sortFunction = function(a, b) { return b['A_MEDIAN'] - a['A_MEDIAN']}

    // Copy data to new object
    let fullData = this.props.data.slice();

    // Filter rows
    let rowsFiltered = fullData.filter(incRows);

    // Filter columns
    let colsFiltered = rowsFiltered.map(function(row) {
      let output = {}
      incCols.forEach(function(key) {
        return output[key] = row[key];
      });
      return output;
    });

    // Sort rows
    let sorted = colsFiltered.sort(sortFunction);

    return colsFiltered;
  },
  handleDropDownSelect: function(e) {
    console.log('handleDropDownSelect called!', e.target.value);
    this.setState({
      focusCategory: e.target.value
    })

    // this.state.focusCategory = e.target.value;
    // this.render();
  },
  render: function(){
    // console.log(this.props.data);
    let formOptions = jobCategories.map(function(category, i){
      let label = category.label;
      return (<option value={label} key={String(i)}>{label}</option>);
    });

    return (
      <div>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder={this.state.focusCategory}
            onChange={this.handleDropDownSelect}>
              {formOptions}
          </FormControl>
        </FormGroup>
        <Table data={this.parseData()} />
      </div>
    )
  }
});

export default PayTableContainer;