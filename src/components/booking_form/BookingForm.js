import React from 'react';

import Toolbar from 'react-md/lib/Toolbars';
import SelectField from 'react-md/lib/SelectFields';
import { TabsContainer, Tabs, Tab } from 'react-md/lib/Tabs';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

import './BookingForm.scss';
import widgetSettings from '../../widgetSettings';
import FontIcon from 'react-md/lib/FontIcons';

const headerToolBar =  <Toolbar colored title="Appointment Booking" />
const phone = <FontIcon>phone</FontIcon>;
const favorites = <FontIcon style={{ width: 24 }}>favorites</FontIcon>; // it's 48 for some reason
const nearby = <FontIcon>person</FontIcon>;

// const listChildren = () => {
//   return 
//   <ListItem primaryText="Inbox" />
//   <ListItem primaryText="Starred" />
//   <ListItem primaryText="Sent Mail" />
  
// }

export default class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    
    this.settings = widgetSettings.getValue();
  }

  onTabChangeFunc = (newActiveTabIndex, tabId, tabControlsId, tabChildren, event) => {
    // event.preventDefault();
    // return false;
    // console.log(newActiveTabIndex, tabId, tabControlsId, tabChildren, event)
  }

  render() {
    return (
        <div className="booking-form">
          <Toolbar
            colored
            title="Appointment Booking"            
          >
          </Toolbar>
          <TabsContainer onTabChange={this.onTabChangeFunc} colored panelClassName="md-grid phone-tab-content">
            <Tabs tabId="phone-stuffs" activeTabIndex={2}>
              <Tab label="Recents" icon={phone}>
                <p className="md-cell md-cell--12 md-text-container">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </Tab>
              <Tab label="Favorites" icon={favorites}>
                <p className="md-cell md-cell--12 md-text-container">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </Tab>
              <Tab label="Nearby" icon={nearby}>
                <p className="md-cell md-cell--12 md-text-container">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </Tab>
            </Tabs>
          </TabsContainer>

          <ExpansionList>
            <ExpansionPanel label="Service 1" >
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </ExpansionPanel>
            <ExpansionPanel label="Service 2" >
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </ExpansionPanel>
            <ExpansionPanel label="Service 3" >
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </ExpansionPanel>
          </ExpansionList>

          <List className="md-cell md-paper md-paper--1">
            <ListItem primaryText="Inbox" />
            <ListItem primaryText="Starred" />
            <ListItem primaryText="Sent Mail" />
            <ListItem primaryText="Drafts" />
          </List>

          <FontIcon>home</FontIcon>
          <FontIcon>date_range</FontIcon>
          <FontIcon>perm_identity</FontIcon>
          <div className="md-grid">
            <SelectField
              id="selectButtonNumbers"
              placeholder="Number"
              position={SelectField.Positions.BELOW}
              menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              className="md-cell"
            />
          </div>
          <p>Business ID: <strong>{this.settings.businessID}</strong></p>
          <p className="md-cell md-cell--12 md-text-container">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    );
  }
}
