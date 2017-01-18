// Includes validation logic internally

import React from 'react';

import {validateNum} from './helpers.js';

import {FormControl, InputGroup} from 'react-bootstrap';

var FormBox = React.createClass({
  handleChange: function(e){
    let newValue = e.target.value;
    let formKey = this.props.label;

    console.log(newValue);

    // Pass new data up only if it passes validation
    if (newValue === ""){
      console.log(1);
      this.props.setCustomCost(formKey, 0);
    } else if (newValue >= this.props.upperBound) {
      console.log(2);
      this.props.setCustomCost(formKey, this.props.upperBound);
    } else if (validateNum(newValue)) {
      console.log(3);
      this.props.setCustomCost(formKey, newValue);
    } else {
      console.log(4);
      this.props.setCustomCost(formKey, this.props.value);
    }
  },
  render: function() {
    return (
      <InputGroup>
        <InputGroup.Addon>$</InputGroup.Addon>
        <FormControl
          type="text"
          value={this.props.value}
          placeholder={null}
          onChange={this.handleChange}
        />
      </InputGroup>
    );
  }
});

export default FormBox;