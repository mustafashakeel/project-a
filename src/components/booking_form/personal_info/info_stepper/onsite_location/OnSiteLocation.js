import React from 'react';
import { connect } from 'react-redux';

import FadeInOut from '../../../../common/fade_in_out/FadeInOut';
import Radio from 'react-md/lib/SelectionControls/Radio';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import { getUserLocations, setUserLocation } from '../../../../../actions';

import './OnSiteLocation.scss';


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export class OnSiteLocation extends React.Component {
  state = { 
    address: '',
    selectedAddress: "",
    showNewAddress: false,
    locations: []
  }

  onChange(address){
    this.setState({ address });
  }

  setLocation(address){
    if (address !== ""){
      const self = this;
      geocodeByAddress(address,  (err, { lat, lng }) => {
        if(lat && lng){
          const location = {
            fullAddress: address,
            latitude: lat,
            longitude: lng
          }
          self.props.setUserLocation(location);
        }
      });
    }
  }


  onChangeLocation(selectedAddress){
    this.setState({ selectedAddress });
  }

  renderLocations(){
    return this.state.locations.map((location, index) => {
      return (
        <Radio
          key={'locationRadio' + index}
          id={'locationRadio' + index}
          name="locationRadios"
          value={location}
          label={location}
          checked={this.state.selectedAddress === location}
          onChange={this.onChangeLocation.bind(this)}
        />
      )
    });
  }

  saveAddress() {

      if (this.state.locations == null) {
          this.state.locations = [];
      }

    const locations = this.state.locations;
    locations.push(this.state.address)
    this.setState({ 
      address: '',
      selectedAddress: this.state.address,
      locations: locations,
      showNewAddress: false
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.selectedAddress !== nextState.selectedAddress){
      this.setLocation(nextState.selectedAddress);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({locations: nextProps.user.userLocations})
  }

  componentWillMount() {
    this.props.getUserLocations();
    
  }

  render() {
    const cssClasses = {
      root: 'autoCompleteLocation',
      autocompleteContainer: 'autoCompleteContainer',
      autocompleteItem: 'autocompleteItem',
      autocompleteItemActive: 'autocompleteItemActive'
    };

    return (
                   
      <div className="OnSiteLocation">

          {this.state.locations !== null &&
                this.renderLocations()
            }
        {!this.state.showNewAddress &&
          <p 
            className="yocaleBlue pointer underline newAddressBtn"
            onClick={()=> this.setState({ showNewAddress: true})}
            >
            Add new address
          </p>
        }
        <FadeInOut show={this.state.showNewAddress} scroll={false}>
          <PlacesAutocomplete
              value={this.state.address}
              onChange={this.onChange.bind(this)}
              classNames={cssClasses}
            />
          <div className="align-center">
            <button className="saveAddress yocaleButton" onClick={this.saveAddress.bind(this)}>Save address</button>
          </div>
        </FadeInOut>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getUserLocations, setUserLocation }
)(OnSiteLocation)
