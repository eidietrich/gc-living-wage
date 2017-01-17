import React from 'react';

import {ButtonGroup, Button, MenuItem} from 'react-bootstrap';

const menuItems = [
  {
    'key': true,
    'label': 'Annual salary'
  },
  {
    'key': false,
    'label': 'Hourly wage'
  }
]

var WageDisplayControl = React.createClass({
  handleButtonClick: function(e){
    let value = e.target.getAttribute('value');
    console.log(e);
    this.props.setIsDisplayAnnual(value);
  },
  render: function(){
    let that = this;
    let buttons = menuItems.map(function(item){
      return (
        <Button
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

export default WageDisplayControl;