import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class FadeInOut extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        component='div'>
        {this.props.show &&
          <div className={this.props.className}>{this.props.children}</div>
        }
      </ReactCSSTransitionGroup>
    );
  }
}
