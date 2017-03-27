import React from 'react';
import { translate } from 'react-i18next';
// import widgetSettings from '../../widgetSettings';

import { connect } from 'react-redux';
import { updateTab, toggleTooltip, addErrorMsg } from '../../actions/index';

import HeaderWidget from './partials/HeaderWidget';
import TabsProgress from '../common/tabs_progress/TabsProgress';
import TabHeader from '../common/tabs_progress/TabHeader';
import SwipeableViews from 'react-swipeable-views';

import LocationServiceContent from './location_service/LocationServiceContent';
import PersonalInfoContent from './personal_info/PersonalInfoContent';
import ProviderTimeContent from './provider_time/ProviderTimeContent';
import ServiceDetails from './location_service/service_details/ServiceDetails';

import YocaleTooltip from '../common/yocale_tooltip/YocaleTooltip';
import ErrorMessage from '../common/error_message/ErrorMessage';

import LoadingBar from 'react-redux-loading-bar'


import './BookingForm.scss';

function mapStateToProps(state) {
  return {
    currentTab: state.ui.currentTab,
    toolTip: state.ui.toolTip,
    booking: state.booking
  };
}

class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      step1: {
        label: t('application.steps.step1'),
        label2: ""
      },
      step2: {
        label: t('application.steps.step2')
      },
      step3: {
        label: t('application.steps.step3')
      }
    }
  }

  changeTab = (tabIndex) => {
    this.props.updateTab(tabIndex);
  }

  componentWillReceiveProps(nextProps) {
    const {booking} = nextProps;
    const newSteps = this.state;
    if (booking.location.address && booking.service.name){
      newSteps.step1.label = booking.location.address;
      newSteps.step1.label2 = booking.service.name;
    }
    if (booking.timestamp){
      newSteps.step2.label = booking.timestamp.format("dddd MMMM Do");
    }

    this.setState(newSteps)
  }

  render() {
    var { step1, step2, step3 } = this.state;
    return (
      <div className="booking-form">
        <div className="mainHeader">
          <LoadingBar className="loadingBar" />
          <HeaderWidget />    
          <TabsProgress currentTab={this.props.currentTab} onTabClick={this.changeTab}>
            <TabHeader 
              label={step1.label} 
              label2={step1.label2}
              index={0}
              icon="home" 
            />
            <TabHeader 
              label={step2.label} 
              index={1} 
              isCenter 
              icon="date_range" 
            />
            <TabHeader 
              label={step3.label} 
              index={2} 
              icon="perm_identity" 
            />
          </TabsProgress>
        </div>
        <div className="mainContent">
          <SwipeableViews
            index={this.props.currentTab}          
            onChangeIndex={this.changeTab}
          >
            <div className="TabContainer">
              <LocationServiceContent onFinish={this.changeTab.bind(this, 1)}/>
            </div>
            <div className="TabContainer">
              <ProviderTimeContent onFinish={this.changeTab.bind(this, 2)}/>
            </div>
            <div className="TabContainer">
              <PersonalInfoContent />
            </div>
          </SwipeableViews>
        </div>
        <YocaleTooltip>
          <ServiceDetails />
        </YocaleTooltip>
        <ErrorMessage />
      </div>          
    );
  }
}

export default 
connect(
  mapStateToProps,
  { updateTab, toggleTooltip, addErrorMsg }
)(translate()(BookingForm))
