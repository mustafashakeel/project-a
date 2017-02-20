import React from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/index';

import Dialog from 'react-md/lib/Dialogs';

import Stepper from '../../stepper/Stepper';
import Step from '../../stepper/Step';

import IntakeForm from './IntakeForm';
import PaymentCC from './PaymentCC';

import './InfoStepper.scss';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export class InfoStepper extends React.Component {
  state = {
    intakeFormOpen: false,
    intakeFormTaken: false
  }

  toggleIntakeForm = () => {
    this.setState({intakeFormOpen: !this.state.intakeFormOpen})
  }

  intakeFormSave = () => {
    this.setState({
      intakeFormOpen: !this.state.intakeFormOpen,
      intakeFormTaken: true
    });
  }

  render() {
    return (
        <Stepper className="infoStepper">
          <Step
            completed={true}
            stepLine
            >

            <h4>You've been logged in!</h4>
            <div className="stepContent">
              <p>{this.props.user.credentials.email}</p>
            </div>
          </Step>
          <Step
            completed={this.state.intakeFormTaken}
            stepLine
            >

            <h4>Intake Form</h4>
            <div className="stepContent">
              <p>This service requires that a form be filled out and will be emailed to you. <span className="linkIntakeForm" onClick={this.toggleIntakeForm.bind(this)}>Fill out now.</span></p>
              <Dialog
                id="intakeForm"
                visible={this.state.intakeFormOpen}
                title="Intake Form"
                focusOnMount={false}
                modal              
                onHide={this.intakeFormHide}
                actions={[{
                  onClick: this.intakeFormSave.bind(this),
                  primary: true,
                  label: 'Save',
                }]}
              >
                <IntakeForm />
              </Dialog>
            </div>
          </Step>
          <Step
            completed={false}         
            >
            <h4>Payment</h4>
            <div className="stepContentBorder">
              <PaymentCC />            
            </div>
          </Step>
        </Stepper>
    );
  }
}

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(InfoStepper)
