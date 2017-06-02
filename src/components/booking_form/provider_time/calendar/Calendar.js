import React from 'react';
import { findDOMNode } from 'react-dom';

import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'underscore';

import { setBookingTime, fetchAvailabilities, changeMonthCalendar, allowConfirmedBooking, leaseBooking } from '../../../../actions/index';

import Datetime from 'react-datetime';
import FadeInOut from '../../../common/fade_in_out/FadeInOut';
import TimeSlots from '../timeslots/TimeSlots';

import './Calendar.scss';
import $ from 'jquery';

function mapStateToProps(state) {
  return {
    booking: state.booking,
    availabilities: state.business.availabilities,
    isLoggedIn: state.user.isLoggedIn
  };
}

export class Calendar extends React.Component {

  // constructor(props){
  //   super(props);
  //   console.log('FROM CONSTRUCTOR:', this.props.booking.provider.nextAvailableTime);
  // }
  state = {
    selectedDateObject: null,
    filteredDates: [],
    initialYear: '', // parsed from header
    initialMonth: '',// parsed from header
    selectedYear: '',
    selectedMonth: '',
    dayView: true,
    monthView : false,
    yearView : false,
    decadeView : false,
    defaultMonthX: ''
  }

  isValidDate(current) {

    if (!this.state.dayView) {
      let yesterday = Datetime.moment().subtract(1, 'day');
      return current.isAfter(yesterday);
    } else {
      // let yesterday = Datetime.moment().subtract(1, 'day');
      // return current.isAfter(yesterday);
      const timezone = (this.props.booking.userTimezone !== '') ? this.props.booking.userTimezone.utc : '';
      return this.props.availabilities.some((availabilityDate) => {
        return availabilityDate.timeSlots.length > 0 && (current.format('YYYY-MM-DD') === moment(availabilityDate.startDate).utcOffset(timezone).format('YYYY-MM-DD'))
      })
    }


    // if (this.state.initialMonth == '' && this.state.initialYear == '') // replace this with month/year view flag (if false, add/substr shouldn't work)
    // {
    //   const timezone = (this.props.booking.userTimezone !== '')? this.props.booking.userTimezone.utc : '';
    //   return this.props.availabilities.some((availabilityDate) => {
    //     return availabilityDate.timeSlots.length > 0 && (current.format('YYYY-MM-DD') === moment(availabilityDate.startDate).utcOffset(timezone).format('YYYY-MM-DD'))
    //   })
    // }else{
    //   let yesterday = Datetime.moment().subtract(1, 'day');
    //   return current.isAfter( yesterday );
    // }
  }
  getStatusColor(dayObj) {
    if (!dayObj || dayObj.timeSlots.length === 0) {
      return 'red';
    }
    if (dayObj.timeSlots.length > 5) {
      return 'green';
    } else {
      return 'orange';
    }
  }
  renderDay(props, currentDate, selectedDate) {
    // console.log('AVA:',this.props.availabilities)

    let theDay = this.props.availabilities.find((day) => {
      return moment(day.startDate).format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD');
    });


    return (
      <td {...props} >
        <span className={"circleAvailability " + this.getStatusColor(theDay)}></span>
        {currentDate.date()}
      </td>
    );
  }

  onSelectedTimeSlot(slot) {

    console.log('selected slot:', slot.time);


    this.props.setBookingTime(moment(slot.time), slot.providers);
    this.props.allowConfirmedBooking(slot.allowConfirmedBookings);
    this.props.onSlotSelected();
    if (this.props.isLoggedIn && this.props.booking.lease !== null) {
      this.props.leaseBooking(true);
    }
  }

  onChangeDate(selectedDate) {
    console.log('changed date>>>:', selectedDate._d);
    //console.log('@@@@@@@ ', moment(this.props.booking.provider.nextAvailableTime).format('YYYY-MM-DD'));
    console.log('####### ', this);

    const selectedDateObject = this.props.availabilities.find((availabilityDate) => {

      return moment(availabilityDate.startDate).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
    })
    this.setState({ selectedDateObject })
    this.props.setBookingTime(selectedDate)
  }

  componentWillReceiveProps(np) {
    this.setState({
      defaultMonthX:moment(this.props.booking.provider.nextAvailableTime).format('YYYY-MM-DD')
    })
  }

  componentDidMount() {
    //console.log('Did Mount ', moment(this.props.booking.provider.nextAvailableTime).format('YYYY-MM-DD'));
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  clickCalendar(self, e) {
    const clickedElementClass = self.target.parentElement.className;


    // NEXT BUTTON
    var newTempYear;
    if (clickedElementClass === 'rdtNext') {
      if (this.state.dayView) {
        this.props.changeMonthCalendar('add', 1);
        this.resetSelectedDate()
      }
      if (this.state.monthView) {
        if (this.state.selectedYear === '') {
          newTempYear = parseInt(this.state.initialYear) + 1
          console.log('empty')
          this.setState({
            selectedYear: newTempYear
          })
          this.resetSelectedDate()
        } else if (this.state.selectedYear !== '') {
          console.log('!empty')
          newTempYear = parseInt(this.state.selectedYear) + 1
          this.setState({
            selectedYear: newTempYear
          })
          this.resetSelectedDate()
        }
        console.log(newTempYear)
      }
      console.log('next')
    } else if (clickedElementClass === 'rdtPrev') { // PREVIOUS BUTTON
      if (this.state.dayView) {
        this.props.changeMonthCalendar('subtract', 1);
        this.resetSelectedDate()
      }
      if (this.state.monthView) {
        if (this.state.selectedYear === '') {
          newTempYear = parseInt(this.state.initialYear) - 1
          console.log('empty')
          this.setState({
            selectedYear: newTempYear
          })
          this.resetSelectedDate()
        } else if (this.state.selectedYear !== '') {
          console.log('!empty')
          newTempYear = parseInt(this.state.selectedYear) - 1
          this.setState({
            selectedYear: newTempYear
          })
          this.resetSelectedDate()
        }
        console.log(newTempYear)
      }
      console.log('previous')
    }

    const elmSwitch = self.target.className;

    // ON MONTH CLICK - also entering day view
    if (elmSwitch === 'rdtMonth') {
      console.log('-----Month Clicked------entering DAY view');

      this.setState({
        dayView : true,
        monthView : false,
        yearView : false,
        decadeView : false,
      })

      // getting initial state year and month
      // console.log('=====Initial/Prev Year====', this.state.initialYear)
      // console.log('=====Initial/Prev Month===', this.state.initialMonth)

      // parsing selected/initial dates
      let monthSelected = parseInt(self.target.getAttribute('data-value'));
      let selectedMonth = (moment().month(monthSelected).format("MMMM")).toString();
      // console.log('=====Selected/Curr Month===', selectedMonth)

      let tempYear = '';
      if (this.state.selectedYear === '') {
        this.setState({
          selectedYear: this.state.initialYear
        })
        tempYear = this.state.initialYear;
        // console.log('=====Selected/Curr Year===', this.state.initialYear)
      } else {
        tempYear = this.state.selectedYear;
        // console.log('=====Selected/Curr Year===', this.state.selectedYear)
      }


      let initialDateString = `${this.state.initialYear}-${this.state.initialMonth}-01`;
      let selectedDateString = `${tempYear}-${selectedMonth}-01`;

      let initialDateMoment = moment(initialDateString)._d;
      let selectedDateMoment = moment(selectedDateString)._d;

      console.log('initialDateString', initialDateMoment);
      console.log('selectedDateString', selectedDateMoment);

      // calculating diffs
      let diffInMonth = moment(selectedDateMoment).diff(moment(initialDateMoment), 'months');
      console.log('====Diff In Months==>>>>>', diffInMonth)


      // calling add function in order to reload the days from api
      if (diffInMonth > 0) {
        console.log('adding..........')
        this.props.changeMonthCalendar('add', diffInMonth);

      } else if (diffInMonth < 0) {
        console.log('Subtracting.....')
        this.props.changeMonthCalendar('subtract', Math.abs(diffInMonth));

      } else { // clicking on same month

      }

      this.resetSelectedDate()

    }

    // ON YEAR CLICK - also entering month view
    if (elmSwitch === 'rdtYear') {
      console.log('we know that is ', this.state.selectedYear)
      console.log('-----Year Clicked------entering MONTH view');
      this.setState({ selectedYear: '' })
      let selectedYear = self.target.getAttribute('data-value').toString();
      this.setState({ selectedYear })

      this.resetSelectedDate()

    }

    // ON HEADER CLICK
    if (elmSwitch === 'rdtSwitch') {



      const elm = $(self.target);
      let elmIndex = elm.text().lastIndexOf('20');
      let lastPageElmIndex = elm.text().lastIndexOf('-');
      let indexOfMay = elm.text().indexOf('May');


      // Entering Month View - first time click
      if ((elmIndex > 3 && lastPageElmIndex !== 4) || indexOfMay === 0) {
      this.setState({
        dayView : false,
        monthView : true,
        yearView : false,
        decadeView : false,
      })
        console.log(this.state.dayView)
        console.log('-----Header------entering MONTH view');



        let initialYear = elm.text().substr(-4).trim();
        let monthIndex = elm.text().indexOf(' ');
        let initialMonth = elm.text().substr(0, monthIndex).trim();
        this.setState({ initialYear, initialMonth })

        // console.log('-----initial-year------', initialYear);
        // console.log('-----initial-month-----', initialMonth);

      }

      // Entering Year View
      if (elm.text().length === 4) {
      this.setState({

        monthView : false,
        yearView : true,
        decadeView : false,
      })
        console.log('-----Header------entering YEAR view')
        this.setState({ selectedYear: '' })
      }

      ///enter decade view
      //if()

    }

  }

  resetSelectedDate() {
    this.setState({ selectedDateObject: null })
  }

  resetCustomSelectedDate() {
    this.setState({ customSelectedDateObject: [] })
  }



  render() {
    const dd = this.state.defaultMonthX.toString();
    console.log('wwwwwwww ', this.props.bizP);
    return (
      <div >
        <FadeInOut className="fades" show={this.props.booking.provider.fullName}>
          <div onClick={this.clickCalendar.bind(this)} >
            <Datetime
              input={false}
              timeFormat={false}
              onChange={this.onChangeDate.bind(this)}
              renderDay={this.renderDay.bind(this)}
              isValidDate={this.isValidDate.bind(this)}
              value={moment(this.props.booking.provider.nextAvailableTime)}
            />
          </div>
        </FadeInOut>
        <FadeInOut show={this.state.selectedDateObject && this.state.selectedDateObject !== null}>
          <TimeSlots selectedDateObject={this.state.selectedDateObject} onSelected={this.onSelectedTimeSlot.bind(this)} />
        </FadeInOut>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { setBookingTime, fetchAvailabilities, changeMonthCalendar, allowConfirmedBooking, leaseBooking }
)(Calendar)


// isValidDate={this.state.calendarIsValid ? this.isValidDate.bind(this) : this.isNotValidDate.bind(this)}
// isValidDate={this.isValidDate.bind(this)}
