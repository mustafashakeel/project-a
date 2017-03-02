import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class FadeInOut extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={350}
        component='div'>
        {this.props.show &&
          <div className={this.props.className}>{this.props.children}</div>
        }
      </ReactCSSTransitionGroup>
    );
  }
}
