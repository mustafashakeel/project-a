import React from 'react';

import './ServiceDetails.scss';

export default class ServiceDetails extends React.Component {
  render() {
    return (
      <div className="ServiceDetails">
        <img src="http://lorempixel.com/200/100/nature"/>
        <h2>{this.props.data.name}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis arcu vel ultricies molestie. Proin sit amet sem ultricies, convallis nisi non, sollicitudin enim. Sed vel dapibus nunc, eu iaculis metus. Aenean id vestibulum tellus. Nunc tempus ornare ligula, sit amet rutrum est pulvinar non. Donec libero sem, ultricies sed nisi at, euismod convallis ante. Aliquam a mi turpis. Nulla sagittis scelerisque blandit.</p>
      </div>
    );
  }
}
