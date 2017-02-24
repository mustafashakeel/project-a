import React from 'react';
import { connect } from 'react-redux';

import TextField from 'react-md/lib/TextFields';

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
          </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(IntakeForm)
