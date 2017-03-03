import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classNames from 'classnames';

import Switch from 'react-md/lib/SelectionControls/Switch';
import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';
import FontIcon from 'react-md/lib/FontIcons';

import FadeInOut from '../../../common/fade_in_out/FadeInOut';

import './AppointmentReminder.scss';

function mapStateToProps(state) {
  return {

  };
}

export class AppointmentReminder extends React.Component {

  state = {
    showReminderOptions: false,
    reminder: {
      channel: "email",
      phoneNumber: "",
      reminderTime: "",
    },
    timeReminder : 10,
    minHourReminder : "Minutes"
  }

  minHourArray() {
    let array = []
    for (let i=1; i < 25; i++){
      array.push(i);
    }
    return  array;
  }

  getClasses(defaultClass, channel) {
    return classNames({
      [defaultClass]: true,
      active: this.state.reminder.channel === channel
    });
  }

  changeChannel(val) {
    const reminder = this.state.reminder;
    reminder.channel = val;
    this.setState({ reminder });
  }

  render() {
    const {t} = this.props;
    return (
      <div className="AppointmentReminder">
        <div >
          <Switch 
          className="reminderSwitch" 
          id="reminderSwitch" 
          name="reminderSwitch" 
          checked={this.state.showReminderOptions}
          onChange={(val) => this.setState({showReminderOptions: val})}
          label={t('application.user_info.appointment_reminder')} 
          labelBefore />
        </div>
        <FadeInOut show={this.state.showReminderOptions}>

          <div className="outlinedTabsContainer">
            <div 
              className={this.getClasses('outlinedTabs', 'email')}
              onClick={this.changeChannel.bind(this, 'email')}
            >Email</div>
            <div 
              className={this.getClasses('outlinedTabs', 'sms')}
              onClick={this.changeChannel.bind(this, 'sms')}
            >Sms</div>
          </div>
          <FadeInOut show={this.state.reminder.channel === "sms"}>
            <TextField
              id="reminderPhone"
              placeholder="Phone number"
              className="inpuTextSmall"
              leftIcon={<FontIcon>phone</FontIcon>}

            />
          </FadeInOut>


          <div className="ReminderTiming">
            <div className="reminderCopy">Set a default reminder time</div>
            <div className="selectGroup">          
                <SelectField
                  id="timingSelect"
                  className="SelectSimpleBorder selectNotification"
                  menuItems={this.minHourArray()}
                  value={this.state.timeReminder}
                  position={SelectField.Positions.BELOW}
                  onChange={(timeReminder)=>this.setState({timeReminder})}
                  iconChildren="keyboard_arrow_down"
                />
                <SelectField
                  id="timingHM"
                  className="SelectSimpleBorder selectNotification"
                  menuItems={['Minutes', 'Hours']}
                  value={this.state.minHourReminder}
                  onChange={(minHourReminder)=>this.setState({minHourReminder})}
                  position={SelectField.Positions.BELOW}
                  iconChildren="keyboard_arrow_down"
                />
              </div>         
          </div>
        </FadeInOut>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(translate()(AppointmentReminder))
