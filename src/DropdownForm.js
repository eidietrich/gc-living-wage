import React from 'react';

import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

var DropdownForm = React.createClass({
  handleChange: function(e){
    console.log('change', e);
  },
  makeOptions: function(optionList){
    return optionList.map(function(option, i){
      return (<option value={option} key={String(i)}>{option}</option>);
    });
  },
  render: function(){
    let formOptions = this.makeOptions(this.props.formOptions);
    return (
      <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>{this.props.label}</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder={this.props.value}
            onChange={this.props.onDropdownSelect}>
              {formOptions}
          </FormControl>
        </FormGroup>
      </form>
    );
  }
});

export default DropdownForm;