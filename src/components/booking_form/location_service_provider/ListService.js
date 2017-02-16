import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import ToolTip from 'react-portal-tooltip';

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
    var id = "toolTip_" + this.props.data.id;
    return id;
  }

  render() {

    let style = {
      style: {
        margin: "auto",
        width: "90%",
        maxWidth: "220px",
        left: 0,
        right:0
      },
      arrowStyle: {
        color: '#ffffff'
      }
    }

    return (
      <div>
      <ToolTip active={this.state.isTooltipActive} position="top" arrow="right" parent={this.state.toolTipParent} style={style}>
          <div>
              <p>This is the content of the tooltip {this.getTooltipID()}</p>
              <img src="image.png"/>
          </div>
      </ToolTip>
      <div className="ServiceMenuService" onClick={this.props.onClick}>
        <div className="SM_left">
          <span className="ServiceTitle">{this.props.name}</span>
          <FontIcon 
            id={this.getTooltipID()} 
            onClick={()=>this.setState({isTooltipActive: !this.state.isTooltipActive})}
          >info_outline</FontIcon>
          <FontIcon>label_outline</FontIcon>
        </div>
        <div className="SM_right">
          <span className="ServiceDetails">
            {this.props.data.length} • ${this.props.data.cost}
          </span>

        </div>

      </div>
      </div>

    );
  }
}
