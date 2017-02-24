import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
    const {t} = this.props;
    return (
        <Stepper className="infoStepper">
          <Step
            completed={true}
            stepLine
            >

            <h4>{t('application.user_info.logged_in')}</h4>
            <div className="stepContent">
              <p>{this.props.user.credentials.email}</p>
            </div>
          </Step>
          <Step
            completed={this.state.intakeFormTaken}
            stepLine
            >

            <h4>{t('application.user_info.intake_form')}</h4>
            <div className="stepContent">
              <p>{t('application.user_info.intake_form_copy')} <span className="linkIntakeForm" onClick={this.toggleIntakeForm.bind(this)}>{t('application.user_info.fill_out_intake')}.</span></p>
              <Dialog
                id="intakeForm"
                visible={this.state.intakeFormOpen}
                title={t('application.user_info.intake_form')}
                focusOnMount={false}
                modal              
                onHide={this.intakeFormHide}
                actions={[{
                  onClick: this.intakeFormSave.bind(this),
                  primary: true,
                  label: t('application.user_info.save')
                }]}
              >
                <IntakeForm />
              </Dialog>
            </div>
          </Step>
          <Step
            completed={false}         
            >
            <h4>{t('application.user_info.payment')}</h4>
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
)(translate()(InfoStepper))
