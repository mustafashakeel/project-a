import React from 'react';
import { connect } from 'react-redux';

import TextField from 'react-md/lib/TextFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import SelectField from 'react-md/lib/SelectFields';

import './IntakeForm.scss';

function mapStateToProps(state) {
  return {

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
    return (
      <div>
          <p className="align-center">The following form(s) are required before booking your appointment</p>
          <div className="md-grid">
            <TextField
              id="maxLenTitle"
              label="Allergies"
              placeholder="A description about this field."
              value={this.state.value}
              onChange={this._handleChange.bind(this)}
              rows={2}
              maxRows={5}
            />
            <div  className="md-cell">
                <p>Select an option</p>
                <SelectionControl
                  id="readDocumentationPage"
                  name="simpleCheckboxes[]"
                  defaultChecked
                  label="Option 1"
                  type="checkbox"
                  value="docPage"
                />
                <SelectionControl
                  id="readMDSpec"
                  name="simpleCheckboxes[]"
                  label="Option 2"
                  type="checkbox"
                  value="mdSpec"
                />       
              </div> 
              <div className="md-cell">
                <SelectField
                id="numbers"
                label="Some Number"
                placeholder="0"
                defaultValue={1}
                menuItems={[1,2,3,4,5,6,7,8,9,10]}
                />  
              </div>     
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
