import React from 'react';
import { connect } from 'react-redux';

import TextField from 'react-md/lib/TextFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import SelectField from 'react-md/lib/SelectFields';

import './IntakeForm.scss';

function mapStateToProps(state) {
  return {
    intakeForms: state.booking.intake_forms
  };
}

export class IntakeForm extends React.Component {
  state = {
    value: ''
  };

  _handleChange(value) {
    this.setState({ value });
  }

  render() {
    console.log(this.props.intakeForms);
    return (
      <div>
          <p className="align-center">The following form(s) are required before booking your appointment</p>
          <div className="intakeForms">
              <button className="doneIntakeFormBtn" onClick={this.props.onSave}>Done</button>  
          </div>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(IntakeForm)
