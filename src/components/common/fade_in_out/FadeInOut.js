import React from 'react';
import {findDOMNode} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class FadeInOut extends React.Component {

  scrollToElement(){
    var self = this;
    setTimeout(function(){
      var node = findDOMNode(self.refs.fade_children);
      if(node){
        node.scrollIntoView({behavior: "smooth", block: "end"});      
      }
    }, 100)
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.scroll){
      this.scrollToElement();
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={350}
        component='div'>
        {this.props.show &&
          <div ref="fade_children" className={this.props.className}>{this.props.children}</div>
        }
      </ReactCSSTransitionGroup>
    );
  }
}

FadeInOut.defaultProps = {
  scroll: true
};
