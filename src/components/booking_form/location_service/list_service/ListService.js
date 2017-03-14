import React from 'react';
import {findDOMNode} from 'react-dom';
import FontIcon from 'react-md/lib/FontIcons';

import { connect } from 'react-redux';
import { updateTab, setBookingService } from '../../../../actions/index';

import './ListService.scss';

function mapStateToProps(state) {
  return {
    currentTab: state.ui.currentTab
  };
}

class ListService extends React.Component {

  onHoverIcon = (ref, shown) => {
    this.props.toggleTooltip({
      data:this.props,
      shown: shown,
      position: findDOMNode(this.refs[ref]).getBoundingClientRect()
    })

  }

  selectService = (self, e) => {
    if (self.target.tagName.toLowerCase() !== "i") {
      this.props.setBookingService(this.props);
      this.props.updateTab(1);
    }
  }

  render() {
    return (
      <div>
        <div className="ServiceMenuService" onClick={this.selectService.bind(this)}>
          <div className="SM_left">
            <span className="ServiceTitle">{this.props.name}</span>
            <div className="toolTipContainer">
              <FontIcon 
                ref="service_icon"
                className="info"
                onMouseEnter={this.onHoverIcon.bind(this, "service_icon", true)}
                onMouseLeave={this.onHoverIcon.bind(this, "service_icon", false)}
              >info_outline</FontIcon>
              <FontIcon>label_outline</FontIcon>
            </div>

          </div>
          <div className="SM_right">
            <span className="ServiceDetails">
              {this.props.OfferingDuration} min • ${this.props.OfferingPrice}
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
  { updateTab, setBookingService }
)(ListService)
