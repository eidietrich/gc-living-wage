import React from 'react';

// Icons
import singleAdult from './icons/single-adult.svg';
import dualAdult from './icons/dual-adult.svg';
import dualAdultTwoKids from './icons/dual-adult-two-kids.svg';
import singleAdultOneKid from './icons/one-adult-one-kid.svg';
import menuIcon from './icons/menu.svg';
import editIcon from './icons/edit.svg';

import {sentenceCase} from './helpers.js';

import {ButtonGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';

// Family size categories to include in the icon bar
const iconBarItems = [
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
  handleEditButtonClick: function(e){
    this.props.setCustomCosts(null);
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

    let menuImg = (
      <img
        className="family-icon"
        src={menuIcon}
        alt="menu"
      />
    );

    let isActive = ('custom' === this.props.focusFamilySize)
    let activeClass = isActive ? ' active' : '';
    let editButton = (
      <Button
        className={"family-button" + activeClass}
        onClick={this.handleEditButtonClick}>
        <img className="family-icon" src={editIcon} alt="edit" />
      </Button>
    );

    let dropdownItems = this.props.familySizes.map(function(item){
      return (
          <MenuItem
            className="family-dropdown-item"
            key={item}
            value={item}
            onClick={that.handleButtonClick}>
            {sentenceCase(that.props.familySizeLabels[item].label)}
          </MenuItem>
      );
    });

    let dropdownButton = (
      <DropdownButton pullRight
        className="family-button"
        title={menuImg}
        noCaret={true}
        id="bg-nested-dropdown" >
        {dropdownItems}
      </DropdownButton>
    );

    return (
      <div className="family-button-bar-container">
        <ButtonGroup
          className="family-button-bar">
          {iconButtons}
          {editButton}
          {dropdownButton}
        </ButtonGroup>
      </div>
    );

  }
});

export default FamilyButtonBar;