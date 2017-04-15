import React from 'react';
import { connect } from 'react-redux';
import FontIcon from 'react-md/lib/FontIcons';
import './TakenForms.scss';

function mapStateToProps(state) {
  return {
    booking: state.booking
  };
}

export class TakenForms extends React.Component {

  renderForms(){
    return this.props.booking.intake_forms.completed.map((form, index) => {
      return (
        <div className="takenForm completed" key={index}>
          <p><strong>{form.formName}</strong></p>
          <FontIcon>check</FontIcon>
        </div>
      )
    })
  }

  render() {
    console.log(this.props.booking.intake_forms.completed);
    return (
      <div className="TakenForms">
        {this.renderForms()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(TakenForms)
