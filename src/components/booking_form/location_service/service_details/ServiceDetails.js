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
      const height = findDOMNode(this.refs.tooltip).clientHeight;
      const style = { top: this.props.toolTip.position.top - height - 15, left: 10};
      this.setState({
        style: style,
        heightUpdated: true 
      });    
    }
  }

  render() {
    return (
      <div className="toolTip" ref="tooltip" style={this.state.style}>
        <div className="arrow" style={this.state.arrowStyle}></div>
        <div className="ServiceDetails">
          <img role="presentation" src="/img/service_placeholder.jpg"/>
          <h2>{this.props.toolTip.data.name}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis arcu vel ultricies molestie. Proin sit amet sem ultricies, convallis nisi non, sollicitudin enim.</p>
        </div>
      </div>  
    );
  }
}
