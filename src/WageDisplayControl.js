import React from 'react';

import {ButtonGroup, Button, MenuItem} from 'react-bootstrap';

const menuItems = [
  {
    'key': 'annual',
    'label': 'Annual salary'
  },
  {
    'key': 'hourly',
    'label': 'Hourly wage'
  }
]

var WageDisplayControl = React.createClass({
  handleButtonClick: function(e){
    let value = e.target.getAttribute('value');
    this.props.handleWageDisplayChange(value);
  },
  render: function(){
    let that = this;
    let buttons = menuItems.map(function(item){
      let isActive = (item.key === that.props.wageDisplay);
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
        <h5>Display as</h5>
        <ButtonGroup className="wage-display-toggle-bar">
          {buttons}
        </ButtonGroup>
      </div>
    );
  }
});

export default WageDisplayControl;