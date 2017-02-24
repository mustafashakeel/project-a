import React from 'react';
import { translate } from 'react-i18next';

import Stepper from '../../common/stepper/Stepper';
import Step from '../../common/stepper/Step';
import SelectField from 'react-md/lib/SelectFields';
import InfinityMenu from "react-infinity-menu";
import ListCategory from "./ListCategory";
import ListService from "./ListService";



import './LocationServiceContent.scss';

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



class LocationServiceContent extends React.Component {

  state = {
    currentStep: 0,
    isTooltipActive: false,
    toolTipParent: "#testToolTip",
    location:"",
    provider:"Any Provider",
    tree: treeInit
  }

  nextStep = () => {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
    if (this.state.currentStep === 2){
      this.props.onFinish();
    }
  }
  
  onNodeMouseClick(event, tree, node, level, keyPath) {
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
    const { t } = this.props;
    return (
      <div className="LocationContainer">
        <button style={{display:"none"}} onClick={this.nextStep.bind(this)}>Next step</button>      

        <Stepper>
          <Step 
            style={{height: "55px"}}
            stepLine 
            completed={this.state.currentStep > 0 } 
            active={this.state.currentStep === 0}>

            <SelectField
              id="selectSelection"
              placeholder={t('application.location_service.select_location')}
              position={SelectField.Positions.BELOW}
              menuItems={['430 Seymour street', '480 Robson street', '300 Granville street']}
              value={this.state.location}
              onChange={this.onChangeLocation}
              className="dropdownSelect"
              iconChildren="keyboard_arrow_down"
            />
          </Step>          
          <Step
            completed={this.state.currentStep > 2} 
            active={this.state.currentStep === 2}
            >

            <h4>{t('application.location_service.choose_service')} <span>({t('application.location_service.categories_count', {count: 4})})</span></h4>
            

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
export default translate()(LocationServiceContent)