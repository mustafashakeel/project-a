import React from 'react';

import './ServiceDetails.scss';

export default class ServiceDetails extends React.Component {
  render() {
    return (
      <div className="ServiceDetails">
        <img src="/img/service_placeholder.jpg"/>
        <h2>{this.props.data.name}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis arcu vel ultricies molestie. Proin sit amet sem ultricies, convallis nisi non, sollicitudin enim.</p>
      </div>
    );
  }
}
