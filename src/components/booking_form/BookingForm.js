import React from 'react';
import { translate } from 'react-i18next';

import { connect } from 'react-redux';
import { updateTab } from '../../actions/index';

import HeaderWidget from './partials/HeaderWidget';
import TabsProgress from '../tabs_progress/TabsProgress';
import TabHeader from '../tabs_progress/TabHeader';

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
    const { t } = this.props;
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

  getProgress = () => {
    let progress = ((this.props.currentTab + 1) / 3) * 100;
    return progress;
  }

  render() {
    var { steps } = this.state;
    const { t } = this.props;
    return (
      <div className="booking-form">
        <div className="mainHeader">
          <HeaderWidget />    
          <TabsProgress progress={this.getProgress()}>
            <TabHeader label={steps.step1.label} icon="home" onClick={this.changeTab.bind(this, 0)} />
            <TabHeader label={steps.step2.label} isCenter icon="date_range" onClick={this.changeTab.bind(this, 1)}  />
            <TabHeader label={steps.step3.label} icon="perm_identity" onClick={this.changeTab.bind(this, 2)}  />
          </TabsProgress>
        </div>

        <SwipeableViews
          index={this.props.currentTab}          
          disabled={false}
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
        <div style={{display:"none"}}><button onClick={this.changeTab}>Test</button>
        <p>Business ID: <strong>{this.settings.businessID}</strong></p></div>
      </div>          
    );
  }
}

export default 
connect(
  mapStateToProps,
  { updateTab }
)(translate()(BookingForm))
