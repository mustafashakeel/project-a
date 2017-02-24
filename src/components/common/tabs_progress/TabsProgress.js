import React from 'react';
import './TabsProgress.scss';

export default class TabsProgress extends React.Component {

  getProgress = () => {
    return ((this.props.currentTab + 1) / 3) * 100;
  }

  newChildren = () => {
    var self = this;
    return React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, { 
        active: self.props.currentTab === child.props.index,
        onClick: self.props.onTabClick.bind(self, child.props.index)
      })
    });
  }

  render() {
    return (
      <div className="TabsProgressContainer">
        {this.newChildren()}
        <div className="TabsProgressIndicator" style={{width: this.getProgress() + "%"}}>          
        </div>
      </div>
    );
  }
}
