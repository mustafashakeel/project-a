import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import classNames from 'classnames';

import ServiceDetails from './ServiceDetails';

import './ListService.scss';

export default class ListService extends React.Component {

  state = {
    isTooltipActive: false,
    toolTipParent: ""
  }

  componentWillMount() {
    this.setState({
      toolTipParent: "#" + this.getTooltipID()
    })
  }


  getTooltipID = () => {
    var id = "toolTip_" + this.props.id;
    return id;
  }

  getToolTipClass(){
    return classNames({
      'toolTipContainer': true,
      'active': this.state.isTooltipActive
    })
  }

  getToolTipContent = () => {
    if (this.state.isTooltipActive)
      return (
        <div>
          <div className="maskHide" onClick={()=>this.setState({isTooltipActive: !this.state.isTooltipActive})}></div>
          <div className="toolTip">
            <ServiceDetails data={this.props}/>
          </div>
        </div>
      )
  }

  render() {
    return (
      <div>

        <div className="ServiceMenuService" onClick={this.props.onClick}>
          <div className="SM_left">
            <span className="ServiceTitle">{this.props.name}</span>
            <div className={this.getToolTipClass()}>
              {this.getToolTipContent()}
              <FontIcon 
                id={this.getTooltipID()} 
                onClick={()=>this.setState({isTooltipActive: !this.state.isTooltipActive})}
              >info_outline</FontIcon>
            </div>

          </div>
          <div className="SM_right">
            <span className="ServiceDetails">
              {this.props.length} • ${this.props.cost}
            </span>

          </div>

        </div>
      </div>

    );
  }
}
