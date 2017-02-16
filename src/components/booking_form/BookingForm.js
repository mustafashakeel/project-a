import React from 'react';

import HeaderWidget from './partials/HeaderWidget';
import TabsProgress from '../tabs_progress/TabsProgress';
import TabHeader from '../tabs_progress/TabHeader';
import LocationServiceProviderContent from './location_service_provider/LocationServiceProviderContent';

import SwipeableViews from 'react-swipeable-views';

import './BookingForm.scss';
import widgetSettings from '../../widgetSettings';

export default class BookingForm extends React.Component {

  state = {
    currentTab : 0,
    steps: {
      step1: {
        label: "Pick a location, service & provider",
        icon : "home"
      },
      step2: {
        label: "Find a date & time",
        icon: "date_range"
      },
      step3: {
        label: "Enter your info & contact",
        icon: "perm_identity"
      }
    }
  }

  constructor(props) {
    super(props);
    
    this.settings = widgetSettings.getValue();
    // this.changeTab = this.changeTab.bind(this);
  }

  changeTab = (tabIndex) => {
    // console.log(tabIndex);
    this.setState({
      currentTab: tabIndex
    });
  }

  getProgress = () => {
    let progress = ((this.state.currentTab + 1) / 3) * 100;
    // console.log('progress', progress );
    return progress;
  }

  render() {
    var { steps } = this.state;

    return (
      <div className="booking-form">
        <div className="mainHeader">
          <HeaderWidget />    
          <TabsProgress progress={this.getProgress()}>
            <TabHeader label={steps.step1.label} icon={steps.step1.icon} onClick={this.changeTab.bind(this, 0)} />
            <TabHeader label={steps.step2.label} isCenter icon={steps.step2.icon} onClick={this.changeTab.bind(this, 1)}  />
            <TabHeader label={steps.step3.label} icon={steps.step3.icon} onClick={this.changeTab.bind(this, 2)}  />
          </TabsProgress>
        </div>

        <SwipeableViews
          index={this.state.currentTab}          
        >
          <div className="TabContainer">
            <LocationServiceProviderContent onFinish={this.changeTab.bind(this, 1)}/>
          </div>
          <div className="TabContainer">
            Tab 2
          </div>
          <div className="TabContainer">
            Tab 3
          </div>

        </SwipeableViews>
        <div style={{display:"none"}}><button onClick={this.changeTab}>Test</button>
        <p>Business ID: <strong>{this.settings.businessID}</strong></p></div>
      </div>          
    );
  }
}
