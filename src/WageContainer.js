// React container for table
// Includes filtering logic

import React from 'react';

import WageLegend from './WageLegend.js';
import WageTable from './WageTable.js';
import WageDisplayControl from './WageDisplayControl.js';


var filterToMajorGroups = function(row) { return row['OCC_GROUP'] === 'major'; };
// var filterToMajorGroup = function(id){
//   return function(row) {
//     return row['OCC_CODE'].includes(id + '-') &&
//       row['OCC_CODE'] !== (id + '-0000'); }
// }

var jobCategories = [
  {
    'label': 'Occupation Types',
    'filterFunction': filterToMajorGroups
  },
  // {
  //   'label': 'Management',
  //   'filterFunction': filterToMajorGroup('11')
  // },
  // {
  //   'label': 'Business and Financial',
  //   'filterFunction': filterToMajorGroup('13')
  // },
  // {
  //   'label': 'Computer and Mathematical',
  //   'filterFunction': filterToMajorGroup('15')
  // },
  // {
  //   'label': 'Architecture and Engineering',
  //   'filterFunction': filterToMajorGroup('17')
  // },
  // {
  //   'label': 'Life, Physical and Social Science',
  //   'filterFunction': filterToMajorGroup('19')
  // },
  // {
  //   'label': 'Community and Social Service',
  //   'filterFunction': filterToMajorGroup('21')
  // },
  // {
  //   'label': 'Legal',
  //   'filterFunction': filterToMajorGroup('23')
  // },
  // {
  //   'label': 'Education, Training and Library',
  //   'filterFunction': filterToMajorGroup('25')
  // },
  // {
  //   'label': 'Arts, Design, Entertainment, Sports, and Media',
  //   'filterFunction': filterToMajorGroup('27')
  // },
  // {
  //   'label': 'Healthcare Practitioners and Technical',
  //   'filterFunction': filterToMajorGroup('29')
  // },
  // {
  //   'label': 'Healthcare Support',
  //   'filterFunction': filterToMajorGroup('31')
  // },
  // {
  //   'label': 'Protective Service',
  //   'filterFunction': filterToMajorGroup('33')
  // },
  // {
  //   'label': 'Food Preparation and Serving',
  //   'filterFunction': filterToMajorGroup('35')
  // },
  // {
  //   'label': 'Building and Grounds Cleaning and Maintenance',
  //   'filterFunction': filterToMajorGroup('37')
  // },
  // {
  //   'label': 'Personal Care and Service',
  //   'filterFunction': filterToMajorGroup('39')
  // },
  // {
  //   'label': 'Sales and Related',
  //   'filterFunction': filterToMajorGroup('41')
  // },
  // {
  //   'label': 'Office and Administrative Support',
  //   'filterFunction': filterToMajorGroup('43')
  // },
  // {
  //   'label': 'Farming, Fishing, and Forestry',
  //   'filterFunction': filterToMajorGroup('45')
  // },
  // {
  //   'label': 'Construction and Extraction',
  //   'filterFunction': filterToMajorGroup('47')
  // },
  // {
  //   'label': 'Installation, Maintenance, and Repair',
  //   'filterFunction': filterToMajorGroup('49')
  // },
  // {
  //   'label': 'Production',
  //   'filterFunction': filterToMajorGroup('51')
  // },
  // {
  //   'label': 'Transportation and Material Moving',
  //   'filterFunction': filterToMajorGroup('53')
  // },
]

var WageContainer = React.createClass({
  getInitialState: function(){
    return {
      focusCategory: 'Occupation Types',
      rowFilterFunction: filterToMajorGroups,
      tableSortKey: 'A_MEDIAN',
      wageDisplay: 'annual'
    }
  },
  handleDropdownSelect: function(e) {
    this.handleFocusCatChange(e.target.value);
  },
  handleFocusCatChange: function(newFocusCategory){
    console.log(newFocusCategory);
    let filterFunction = jobCategories.filter(function(category){
      return category.label === newFocusCategory;
    })[0].filterFunction;

    this.setState({
      focusCategory: newFocusCategory,
      rowFilterFunction: filterFunction
    });
  },
  handleWageDisplayChange: function(newWageDisplay){
    this.setState({
      wageDisplay: newWageDisplay
    });
  },
  render: function(){
    let wageContainerDisplay = (
      <div>
        <p>Typical salary ranges for different industries in Bozeman, based on U.S. Bureau of Labor Statistics data:</p>
        <WageLegend
          highlightThreshold={this.props.highlightThreshold}
          wageDisplay={this.state.wageDisplay} />
        <WageTable
          data={this.props.data}
          highlightThreshold={this.props.highlightThreshold}
          rowFilterFunction={this.state.rowFilterFunction}
          sortKey={this.state.tableSortKey}
          wageDisplay={this.state.wageDisplay}
          handleFocusCatChange={this.handleFocusCatChange} />
        <WageDisplayControl
          wageDisplay={this.state.wageDisplay}
          handleWageDisplayChange={this.handleWageDisplayChange}/>
        <p className="small"> Notes: Half of workers in a field make more than median pay, half make less. "Low" end of range represents the first quartile salary, where a quarter of workers in a field make less and three-quarters make more. "Higher" represents the third quartile salary, where a quarter of workers make more and three-quarters make less. Data represents the May 2015 BLS <a href="https://www.bls.gov/oes/current/oes_3000003.htm">Area Occupational Employment and Wage Estimates</a> for the Southwest Montana nonmetropolitan area.</p>
      </div>

    )
    return wageContainerDisplay;
  }
});

export default WageContainer;

        // <DropdownForm
        //   label="Type of work"
        //   value={this.state.focusCategory}
        //   onDropdownSelect={this.handleDropdownSelect}
        //   formOptions={formOptions} />