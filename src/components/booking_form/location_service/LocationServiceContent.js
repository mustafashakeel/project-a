import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import { fetchBiz, fetchLocationServices, setBookingLocation } from '../../../actions/index';

import Stepper from '../../common/stepper/Stepper';
import Step from '../../common/stepper/Step';
import SelectField from 'react-md/lib/SelectFields';

import ListCategory from "./ListCategory";
import ListService from "./ListService";
import MenuServices from './MenuServices';



import './LocationServiceContent.scss';

function mapStateToProps(state) {
  return {
    business: state.business.info,
    services: state.business.services,
    booking: state.booking
  };
}

class LocationServiceContent extends React.Component {

  state = {
    currentStep: 0,
    location: {}
  }

  onChangeLocation = (newValue, newValueIndex) => {
    this.props.setBookingLocation(this.props.business.locations[newValueIndex]);
    this.setState({
      currentStep: 1
    })
  }

  componentWillMount() {
      this.props.fetchBiz(152);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.business.locations && nextProps.business.locations.length === 1){
      this.props.setBookingLocation(this.props.business.locations[0]);
      this.setState({
          currentStep: 1
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentStep === 1 ){
      const locationId = this.props.booking.location.id;
      console.log("Getting service for location:", locationId);
      this.props.fetchLocationServices(locationId);
    }  
  }

  render() {
    const { t } = this.props;
    return (
      <div className="LocationContainer">
        <Stepper>
          <Step 
            style={{height: "55px"}}
            stepLine 
            completed={this.props.booking.location.address !== undefined} 
            active={this.state.currentStep === 0}>

            <SelectField
              id="selectSelection"
              placeholder={t('application.location_service.select_location')}
              position={SelectField.Positions.BELOW}
              menuItems={this.props.business.locations}
              itemLabel="address"
              itemValue="address"
              value={this.props.booking.location.address}
              onChange={this.onChangeLocation.bind(this)}
              className="dropdownSelect"
              iconChildren="keyboard_arrow_down"
            />
          </Step>          
          <Step
            completed={this.state.currentStep > 1} 
            active={this.state.currentStep === 1}
            >
            <h4>{t('application.location_service.choose_service')} <span>({t('application.location_service.categories_count', {count: 4})})</span></h4>
            <MenuServices
                className="ServiceMenu" 
                parentComponent={ListCategory} 
                childComponent={ListService}
                list={this.props.services}
            />
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchBiz, fetchLocationServices, setBookingLocation }
)(translate()(LocationServiceContent))