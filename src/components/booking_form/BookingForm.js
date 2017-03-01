import React from 'react';
import { translate } from 'react-i18next';
import widgetSettings from '../../widgetSettings';

import { connect } from 'react-redux';
import { updateTab, toggleTooltip } from '../../actions/index';

import HeaderWidget from './partials/HeaderWidget';
import TabsProgress from '../common/tabs_progress/TabsProgress';
import TabHeader from '../common/tabs_progress/TabHeader';
import SwipeableViews from 'react-swipeable-views';

import LocationServiceContent from './location_service/LocationServiceContent';
import PersonalInfoContent from './personal_info/PersonalInfoContent';
import ProviderTimeContent from './provider_time/ProviderTimeContent';
import ServiceDetails from './location_service/ServiceDetails';

import './BookingForm.scss';

function mapStateToProps(state) {
  return {
    currentTab: state.ui.currentTab,
    toolTip: state.ui.toolTip
  };
}

class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      steps: {
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
    }
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
        {this.props.toolTip && this.props.toolTip.shown &&
          <ServiceDetails {...this.props.toolTip.data} />
        }
      </div>          
    );
  }
}

export default 
connect(
  mapStateToProps,
  { updateTab, toggleTooltip }
)(translate()(BookingForm))
