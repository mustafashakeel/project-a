import React from 'react';
import {findDOMNode} from 'react-dom';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { getCurrentUser, isLoggedIn, getIntakeForms } from '../../../../actions/index';

import Dialog from 'react-md/lib/Dialogs';

import Stepper from '../../../common/stepper/Stepper';
import Step from '../../../common/stepper/Step';

import LoginInfo from './login_info/LoginInfo';
import IntakeForm from './intake_form/IntakeForm';
import TakenForms from './intake_form/TakenForms';
import PaymentCC from './payment_cc/PaymentCC';
import ProvidersInSlot from './providers_in_slot/ProvidersInSlot';
import OnSiteLocation from './onsite_location/OnSiteLocation';


import './InfoStepper.scss';

function mapStateToProps(state) {
  return {
    user: state.user,
    booking: state.booking
  };
}

export class InfoStepper extends React.Component {
  state = {
    intakeFormOpen: false,
    intakeFormTaken: false,
    renderProviders: false
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

  componentWillMount() {
    if (this.props.booking.provider.providerId == ""){
      this.setState({ renderProviders: true})
    }
  }

  componentDidMount() {
    var node = findDOMNode(this);
    node.scrollIntoView();
  }

  render() {
    const {t, booking} = this.props;
    return (
        <Stepper className="infoStepper">
          <Step
            completed={true}
            stepLine >
            <LoginInfo />            
          </Step>
          {this.state.renderProviders &&
          <Step
            completed={true}
            stepLine>
            <h4>Select a provider</h4>
            <ProvidersInSlot />
          </Step>
          }
          {booking.location.locationType == "On-Site" &&
          <Step
            completed={booking.clientLocation && booking.clientLocation.fullAddress !== ""}
            stepLine>
            <h4>Select an address</h4>
            <OnSiteLocation />
          </Step>
          }
          {booking.allowConfirmedBooking &&  
            <div>
              <Step
                completed={this.state.intakeFormTaken}
                stepLine >
                <h4>{t('application.user_info.intake_form')}</h4>
                <div className="stepContent">
                  {!this.state.intakeFormTaken ?
                    <div>
                      <p>
                        {t('application.user_info.intake_form_copy')} 
                        <span 
                        className="linkIntakeForm" 
                        onClick={this.toggleIntakeForm.bind(this)}
                        >{t('application.user_info.fill_out_intake')}.</span>
                      </p>
                      <Dialog
                        aria-describedby="accessibleContent"
                        id="intakeForm"
                        visible={this.state.intakeFormOpen}
                        focusOnMount={false}
                        modal >
                        <IntakeForm id="accessibleContent" onSave={this.intakeFormSave}/>
                      </Dialog>
                    </div>
                    :
                    <TakenForms />
                  }
                  </div>
              </Step>
              <Step
                completed={false} >
                <h4>{t('application.user_info.payment')}</h4>
                <div className="stepContentBorder">
                  <PaymentCC />            
                </div>
              </Step>
            </div>
          }

        </Stepper>
    );
  }
}

export default connect(
  mapStateToProps,
  { getCurrentUser, isLoggedIn, getIntakeForms }
)(translate()(InfoStepper))
