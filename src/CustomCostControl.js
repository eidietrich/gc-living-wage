import React from 'react';

import {ButtonGroup, Button} from 'react-bootstrap';

const menuItems = [
  {
    'key': 1,
    'label': 'Single-income'
  },
  {
    'key': 2,
    'label': 'Dual-income'
  }
]

var CustomCostControl = React.createClass({
  handleButtonClick: function(e){
    let value = e.target.getAttribute('value');
    this.props.setNumIncome(value);
  },
  render: function(){
    let that = this;

    console.log('button', this.props.numIncomes);

    let buttons = menuItems.map(function(item){
      let isActive = (+item.key === +that.props.numIncomes);
      let activeClass = isActive ? ' active': '';
      return (
        <Button
          className={'wage-display-button' + activeClass}
          key={item.key}
          value={item.key}
          onClick={that.handleButtonClick} >
          {item.label}
        </Button>
      )
    });

    return (
      <div className="wage-display-control-container">
        <ButtonGroup className="wage-display-toggle-bar">
          {buttons}
        </ButtonGroup>
      </div>
    );
  }
});

export default CustomCostControl;