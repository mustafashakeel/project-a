import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { updateTab } from '../../../actions/index';

import ServiceDetails from './ServiceDetails';

import './ListService.scss';

function mapStateToProps(state) {
  return {
    currentTab: state.ui.currentTab
  };
}

class ListService extends React.Component {

  state = {
    isTooltipActive: false,
    toolTipParent: ""
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
        <div className="toolTip">
          <ServiceDetails data={this.props}/>
        </div>
      )
  }

  selectService = (self, e) => {
    if (self.target.tagName.toLowerCase() !== "i") {
      this.props.updateTab(1);
    }
  }

  render() {
    return (
      <div>
        <div className="ServiceMenuService" onClick={this.selectService.bind(this)}>
          <div className="SM_left">
            <span className="ServiceTitle">{this.props.name}</span>
            <div className={this.getToolTipClass()}>
              {this.getToolTipContent()}
              <FontIcon 
                className="info"
                onMouseEnter={()=>this.setState({isTooltipActive: !this.state.isTooltipActive})}
                onMouseLeave={()=>this.setState({isTooltipActive: !this.state.isTooltipActive})}
              >info_outline</FontIcon>
              <FontIcon>label_outline</FontIcon>
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

export default 
connect(
  mapStateToProps,
  { updateTab }
)(ListService)
