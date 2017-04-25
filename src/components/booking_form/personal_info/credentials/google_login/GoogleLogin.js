/*globals gapi */
import React from 'react';
const auth2 = null;
export default class GoogleLogin extends React.Component {
  
  componentWillMount() {
    const script = document.createElement("script");
    script.onload = this.initializeAuth.bind(this);
    script.src = "https://apis.google.com/js/platform.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
  }

  initializeAuth(){
    var self = this;
    gapi.load('auth2', function() {
      auth2 = gapi.auth2.init({
        client_id: self.props.clientId
      });
      self.bindGoogleButton();
    });
  }

  bindGoogleButton(){
    const element = this.refs.googleButton;
    auth2.attachClickHandler(element, {},
      this.props.onSuccess,
      this.props.onFailure
    );
  }
  render() {
    return (
      <button ref="googleButton" className={this.props.className}>{this.props.buttonText}</button>
    );
  }
}
