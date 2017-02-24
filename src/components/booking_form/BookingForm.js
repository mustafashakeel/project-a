import React from 'react';
import { translate } from 'react-i18next';

import { connect } from 'react-redux';
import { updateTab } from '../../actions/index';

import HeaderWidget from './partials/HeaderWidget';
import TabsProgress from '../common/tabs_progress/TabsProgress';
import TabHeader from '../common/tabs_progress/TabHeader';

import LocationServiceContent from './location_service/LocationServiceContent';
import PersonalInfoContent from './personal_info/PersonalInfoContent';
import ProviderTimeContent from './provider_time/ProviderTimeContent';

import SwipeableViews from 'react-swipeable-views';

import './BookingForm.scss';
import widgetSettings from '../../widgetSettings';

function mapStateToProps(state) {
  return {
    currentTab: state.ui.currentTab
  };
}

class BookingForm extends React.Component {

  

  constructor(props) {
    super(props);
    this.settings = widgetSettings.getValue();
    this.state = {
      steps: {
        step1: {
          label: "",
        },
        step2: {
          label: "",
        },
        step3: {
          label: "",
        }
      }
    }
  }

  shouldComponentUpdate =() => {
    const { t } = this.props;
    const steps = {
        step1: {
          label: t('application.steps.step1'),
        },
        step2: {
          label: t('application.steps.step2'),
        },
        step3: {
          label: t('application.steps.step3'),
        }
    }
    this.setState({steps})


    return true;
  }

  changeTab = (tabIndex) => {
    this.props.updateTab(tabIndex);
  }

  render() {
    var { steps } = this.state;
    return (
      <div className="booking-form">
        <div className="mainHeader">
          <HeaderWidget />    
          <TabsProgress currentTab={this.props.currentTab} onTabClick={this.changeTab}>
            <TabHeader 
              label={steps.step1.label} 
              index={0}
              icon="home" 
            />
            <TabHeader 
              label={steps.step2.label} 
              index={1} 
              isCenter 
              icon="date_range" 
            />
            <TabHeader 
              label={steps.step3.label} 
              index={2} 
              icon="perm_identity" 
            />
          </TabsProgress>
        </div>

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
    );
  }
}

export default 
connect(
  mapStateToProps,
  { updateTab }
)(translate()(BookingForm))
