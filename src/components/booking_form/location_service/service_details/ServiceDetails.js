import React from 'react';
import {findDOMNode} from 'react-dom';

import './ServiceDetails.scss';

export default class ServiceDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style: {
        top: this.props.toolTip.position.top,
        left: 10
      },
      arrowStyle:{
        top: this.props.toolTip.position.top - 10,
        left: this.props.toolTip.position.left
      },
      heightUpdated: false
    }
  }

  componentDidMount(){
    if (this.state.heightUpdated === false){
      const tooltipNode = findDOMNode(this.refs.tooltip);
      const height = tooltipNode.clientHeight;
      const contentHeight = tooltipNode.querySelector('.ServiceDetails').clientHeight;
      const style = { top: this.props.toolTip.position.top - contentHeight - 15, left: 10, height: contentHeight};
      this.setState({
        style: style,
        heightUpdated: true 
      });    
    }
  }

  render() {
    const service = this.props.toolTip.data;
    return (
      <div className="toolTip" ref="tooltip" style={this.state.style}>
        <div className="arrow" style={this.state.arrowStyle}></div>
        <div className="ServiceDetails">
          {service.image !== "" &&
            <img role="presentation" src={service.image}/>
          }
          <h2>{service.name}</h2>
          {service.description !== null && service.description !== "" &&
            <p className="ServiceDescription">{service.description}</p>
          }
        </div>
      </div>  
    );
  }
}
