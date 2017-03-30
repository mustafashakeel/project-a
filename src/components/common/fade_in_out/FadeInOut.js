import React from 'react';
import {findDOMNode} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class FadeInOut extends React.Component {


  scrollToElement(){
    var self = this;

    setTimeout(function(){
      var node = findDOMNode(self.refs.fade_children);
      if(node){
        var parent = node.closest('.react-swipeable-view-container > div');
        parent.scrollTop = node.offsetTop + node.clientHeight;
      }
    }, 100)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.scroll && nextProps.show){
      this.scrollToElement();
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        className="fadeInOutContainer"
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
