import React from 'react';

import Stepper from '../../stepper/Stepper';
import Step from '../../stepper/Step';
import SelectField from 'react-md/lib/SelectFields';
import InfinityMenu from "react-infinity-menu";
import ListCategory from "./ListCategory";
import ListService from "./ListService";



import './LocationServiceProviderContent.scss';

const treeInit = [
    {
        name: "Packages", /*require*/
        id: 1234324, /*require*/
        isOpen: false, /*require*/
        customComponent: ListCategory,
        children: [
            {
                name: "Service Name",
                id: 1535,
                isOpen: false,
                customComponent: ListService,
                cost: "120.00",
                length: "30 min"
            },
            {
                name: "Service Name",
                id: 235535,
                isOpen: false,
                customComponent: ListService,
                cost: "120.00",
                length: "30 min"
            }
        ]
    },
    {
        name: "Botox and Filters (5)", /*require*/
        id: 25333, /*require*/
        isOpen: false, /*require*/
        customComponent: ListCategory,
        children: [
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11233
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11232
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11231
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11235
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11237
            }
        ]
    },
    {
        name: "Infrared Sauna (7)", /*require*/
        id: 25443, /*require*/
        isOpen: false, /*require*/
        customComponent: ListCategory,
        children: [
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11233
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11232
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11231
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11235
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 11237
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 112873
            },
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 112832
            },
        ]
    }
];



export default class LocationServiceProviderContent extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  state = {
    currentStep: 0,
    isTooltipActive: false,
    toolTipParent: "#testToolTip",
    location:"",
    provider:"Any Provider",
    tree: treeInit
  }
  constructor(props) {
    super(props);
    
  }

  nextStep = () => {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
    if (this.state.currentStep == 2){
      this.props.onFinish();
    }
  }
  
  onNodeMouseClick(event, tree, node, level, keyPath) {
      console.log(level);
      this.setState({
          tree: tree
      });
  }

  onLeafMouseClick(event,leaf){
    this.props.onFinish();
  }

  onChangeLocation = (newValue) => {
    this.setState({
      location: newValue
    })
    this.setState({
      currentStep: 1
    })
  }

  onChangeProvider = (newValue) => {
    this.setState({
      provider: newValue
    })
    this.setState({
      currentStep: 2
    })
  }

  render() {
    return (
      <div className="LocationContainer">
        <button style={{display:"none"}} onClick={this.nextStep.bind(this)}>Next step</button>      

        <Stepper activeStep={0}>
          <Step 
            style={{height: "55px"}}
            stepLine 
            completed={this.state.currentStep > 0 } 
            active={this.state.currentStep == 0}>

            <SelectField
              id="selectSelection"
              placeholder="Select a location"
              position={SelectField.Positions.BELOW}
              menuItems={['430 Seymour street', '480 Robson street', '300 Granville street']}
              value={this.state.location}
              onChange={this.onChangeLocation}
              className="SelectLocation"
              iconChildren="keyboard_arrow_down"
            />
          </Step>          
          <Step
            style={{height: "55px"}}
            stepLine
            active={this.state.currentStep == 1}            
            completed={this.state.currentStep > 1}
            >
            <SelectField
              id="selectProvider"
              placeholder="Select a provider"
              position={SelectField.Positions.BELOW}
              menuItems={['Any Provider', 'Kate Hudson', 'Jennifer Smith', 'Brian Roberts']}
              value={this.state.provider}
              onChange={this.onChangeProvider}
              className="SelectProvider"
              iconChildren="keyboard_arrow_down"
            />
          </Step>
          <Step
            completed={this.state.currentStep > 2} 
            active={this.state.currentStep == 2}
            >

            <h4>Choose a service <span>(4 categories)</span></h4>
            

            <InfinityMenu
                className="ServiceMenu"
                disableDefaultHeaderContent={true}
                onNodeMouseClick={this.onNodeMouseClick.bind(this)}
                onLeafMouseClick={this.onLeafMouseClick.bind(this)}
                tree={this.state.tree}
            />
          </Step>
        </Stepper>
      </div>
    );
  }
}
