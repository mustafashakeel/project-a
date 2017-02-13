import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';

export default class ListService extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="ServiceMenuService">
        <div className="SM_left">
          <span className="ServiceTitle">{this.props.name}</span>
          <FontIcon>info_outline</FontIcon>
          <FontIcon>label_outline</FontIcon>
        </div>
        <div className="SM_right">
          <span className="ServiceDetails">
            {this.props.data.length} • ${this.props.data.cost}
          </span>

        </div>

      </div>

    );
  }
}
