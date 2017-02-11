import React from 'react';
import './TabsProgress.scss';

export default class TabsProgress extends React.Component {

  render() {
    return (
      <div className="TabsProgressContainer">
        {this.props.children}
        <div className="TabsProgressIndicator" style={{width: this.props.progress + "%"}}>          
        </div>
      </div>
    );
  }
}
