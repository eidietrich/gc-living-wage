import React from 'react';

import singleAdult from './icons/single-adult.svg';
import dualAdult from './icons/dual-adult.svg';
import dualAdultTwoKids from './icons/dual-adult-two-kids.svg';
import singleAdultTwoKids from './icons/one-adult-two-kids.svg';
import singleAdultOneKid from './icons/one-adult-one-kid.svg';

import {ButtonGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';

// Family size categories to include in the icon bar
var iconBarItems = [
  {
    'key': '1 Adult',
    'icon': singleAdult,
    'label': 'Single adult'
  },
  {
    'key': '2 Adults (2 Working)',
    'icon': dualAdult,
    'label': 'Childless couple'
  },
  {
    'key': '2 Adults (2 Working) 2 Children',
    'icon': dualAdultTwoKids,
    'label': 'Couple, two kids'
  },
  {
    'key': '1 Adult 1 Child',
    'icon': singleAdultOneKid,
    'label': 'Single parent, one kid'
  },
];

var FamilyButtonBar = React.createClass({
  handleButtonClick: function(e){
    let value = e.target.getAttribute('value');
    this.props.setFocusFamilySize(value);
  },
  render: function(){

    let that = this;

    let iconButtons = iconBarItems.map(function(item){
      let isActive = (item.key === that.props.focusFamilySize);
      let activeClass = isActive ? ' active' : '';
      return (
        <Button
          className={"family-button" + activeClass}
          key={item.key}
          value={item.key}
          onClick={that.handleButtonClick} >
          <img
            className="family-icon"
            src={item.icon}
            alt={item.label} />
        </Button>
      );
    });

    let dropdownItems = this.props.familySizes.map(function(item){
      return (
        <MenuItem key={item} value={item}
          onClick={that.handleButtonClick}>
          {item}
        </MenuItem>
      );
    });

    let buttonGroup = (
      <ButtonGroup
        className="family-button-bar">
        {iconButtons}
        <DropdownButton pullRight
          className="family-button"
          title="Other"
          id="bg-nested-dropdown" >
          {dropdownItems}
        </DropdownButton>
      </ButtonGroup>
    );

    return (
      <div className="family-button-bar-container">
        {buttonGroup}
      </div>
    );

  }
});

export default FamilyButtonBar;