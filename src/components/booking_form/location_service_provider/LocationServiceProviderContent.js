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
                length: "30 min",
                children: [
                    {
                        name: "item2-1",
                        id: 1554
                    }
                ]
            }
        ]
    },
    {
        name: "Botox and Filters", /*require*/
        id: 25333, /*require*/
        isOpen: false, /*require*/
        customComponent: ListCategory,
        children: [
            {
                name: "Service Name",
                customComponent: ListService,
                cost: "120.00",
                length: "30 min",
                id: 1123
            }
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
      this.setState({
          tree: tree
      });
  }

  render() {
    return (
      <div className="LocationContainer">
        <button style={{display:"none"}} onClick={this.nextStep.bind(this)}>Next step</button>      

        <Stepper activeStep={0}>
          <Step 
            style={{height: "55px"}}
            stepLine 
            completed={this.state.currentStep > 0} 
            active={this.state.currentStep == 0}>

            <SelectField
              id="selectButtonNumbers"
              placeholder="Select a location"
              position={SelectField.Positions.BELOW}
              menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              className="SelectLocation"
              iconChildren="keyboard_arrow_down"
            />
          </Step>
          <Step
            completed={this.state.currentStep > 1} 
            active={this.state.currentStep == 1}
            >

            <h4>Choose a service <span>(4 categories)</span></h4>
            

            <InfinityMenu
                className="ServiceMenu"
                disableDefaultHeaderContent={true}
                onNodeMouseClick={this.onNodeMouseClick.bind(this)}
                tree={this.state.tree}
            />
          </Step>
          <Step
            noIndicator
            completed={this.state.currentStep > 2} 
            style={{height: "200px", textAlign: "center"}}
            >
            <SelectField
              id="selectButtonNumbers"
              active={this.state.currentStep == 2}            
              placeholder="Select a provider"
              position={SelectField.Positions.BELOW}
              menuItems={['Any Provider', 2, 3, 4, 5, 6, 7, 8, 9]}
              defaultValue={'Any Provider'}
              className="SelectProvider"
              iconChildren="keyboard_arrow_down"
            />
          </Step>
        </Stepper>
      </div>
    );
  }
}
