import React from 'react';

import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

var NumberForm = React.createClass({
  handleChange: function(e){
    console.log('change', e);
  },
  render: function(){
    let value = this.props.value;

    return (
      <form>
        <FormGroup>
          <ControlLabel>{this.props.label}</ControlLabel>
          <FormControl
            value={value}
            placeholder={value}
            onChange={this.props.onChange} />
        </FormGroup>
      </form>
    );
  }
});

export default NumberForm;