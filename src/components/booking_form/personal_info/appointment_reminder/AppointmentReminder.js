import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import { setReminderOpts } from '../../../../actions/index';


import Switch from 'react-md/lib/SelectionControls/Switch';
import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';
import FontIcon from 'react-md/lib/FontIcons';

import FadeInOut from '../../../common/fade_in_out/FadeInOut';

import './AppointmentReminder.scss';

function mapStateToProps(state) {
  return {
    reminder: state.booking.reminder
  };
}

export class AppointmentReminder extends React.Component {

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
      active: this.props.reminder.channel === channel
    });
  }

  updateReducerState(key, val){
    this.props.setReminderOpts(key, val);
  }

  render() {
    const {t, reminder} = this.props;
    return (
      <div className="AppointmentReminder">
        <div >
          <Switch 
          className="reminderSwitch" 
          id="reminderSwitch" 
          name="reminderSwitch" 
          checked={reminder.enableReminder}
          onChange={(val) => this.updateReducerState("enableReminder", val)}
          label={t('application.user_info.appointment_reminder')} 
          labelBefore />
        </div>
        <FadeInOut show={reminder.enableReminder}>

          <div className="outlinedTabsContainer">
            <div 
              className={this.getClasses('outlinedTabs', 'email')}
              onClick={this.props.setReminderOpts.bind(null, 'channel','email')}
            >Email</div>
            <div 
              className={this.getClasses('outlinedTabs', 'sms')}
              onClick={this.props.setReminderOpts.bind(null, 'channel','sms')}
            >Sms</div>
          </div>
          <FadeInOut show={reminder.channel === "sms"}>
            <TextField
              id="reminderPhone"
              placeholder="Phone number"
              className="inpuTextSmall"
              onChange={(phoneNumber)=>this.props.setReminderOpts('phoneNumber', phoneNumber)}
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
                  value={reminder.timeReminder}
                  position={SelectField.Positions.BELOW}
                  onChange={(timeReminder)=>this.props.setReminderOpts('timeReminder', timeReminder)}
                  iconChildren="keyboard_arrow_down"
                />
                <SelectField
                  id="timingHM"
                  className="SelectSimpleBorder selectNotification"
                  menuItems={['Minutes', 'Hours']}
                  value={reminder.minHourReminder}
                  onChange={(minHourReminder)=>this.props.setReminderOpts('minHourReminder', minHourReminder)}
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
  {setReminderOpts}
)(translate()(AppointmentReminder))
