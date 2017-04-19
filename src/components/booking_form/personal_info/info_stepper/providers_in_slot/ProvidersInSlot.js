import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { setBookingProvider } from '../../../../../actions/index';

import Avatar from 'react-md/lib/Avatars';

import './ProvidersInSlot.scss';

function mapStateToProps(state) {
  return {
    booking: state.booking,
    business: state.business
  };
}

export class ProvidersInSlot extends React.Component {

  state = {
    providers: [],
    active: null
  }

  componentWillMount() {
    let providers = [];
    this.props.booking.providersInSlot.map((providerId) => {
      const findProvider = this.props.business.providers.find((provider) => provider.providerId === providerId );
      providers.push(findProvider);
    })
    const selectedProvider = providers.find((provider) => provider.providerId === this.props.booking.lease.providerId );
    this.selectProvider(selectedProvider);
    this.setState({ providers });

  }

  getClasses(providerId){
    return classNames({
      "providerItem": true,
      "active": providerId == this.state.active
    })
  }

  selectProvider(provider){
      this.setState({active: provider.providerId});
      this.props.setBookingProvider(provider);
  }

  renderProviders(){
    return this.state.providers.map((provider,index) => {
      return (
        <div 
          className={this.getClasses(provider.providerId)} 
          onClick={this.selectProvider.bind(this, provider)}
          key={index}>
          <Avatar src={provider.picture} alt={provider.fullName}  />
          <p>{provider.fullName}</p>
        </div>
      )
    })
  }
  render() {
    return (
      <div className="ProvidersInSlot">
        { this.renderProviders() }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { setBookingProvider }
)(ProvidersInSlot)
