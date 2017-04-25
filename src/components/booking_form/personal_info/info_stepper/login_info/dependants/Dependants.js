import React from 'react';
import { connect } from 'react-redux';

import FadeInOut from '../../../../../common/fade_in_out/FadeInOut';
import Radio from 'react-md/lib/SelectionControls/Radio';
import TextField from 'react-md/lib/TextFields';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import { SelectionControlGroup } from 'react-md/lib/SelectionControls';

import { setBookingDependant, getDependants, addDependant } from '../../../../../../actions/index';
import { checkFields } from '../../../../../../utils';


import './Dependants.scss';

function mapStateToProps(state) {
  return {
    user: state.user,
    selectedDependant: state.booking.dependant
  };
}

export class Dependants extends React.Component {
  state = {
    dependants: [],
    showNewDependant: false,
    fields: {
      firstName: {
        placeholder: "Dependant name",
        value:'',
        errorText: "Please complete.",
        required: true
      },
      lastName: {
        placeholder: "Dependant lastname",
        value:'',
        errorText: "Please complete.",
        required: true
      },
      dob: {
        placeholder: "Date of birth",
        value:'',
        required: false
      },
      gender: {
        placeholder: "Gender",
        value:'m',
        required: false
      }
    }
  }

  onChangeDependant(selectedDependant){
    this.props.setBookingDependant(selectedDependant);
  }

  onChangeFields(key, value) {
    if(key === "dob"){
      value = value.currentTarget.value;
    }
    var state = this.state.fields;
    state[key].value = value;
    this.setState({ fields: state});
  }

  saveDependant(){
    const fields = this.state.fields;
    const fieldsState = checkFields(fields)  

    this.setState({ fields: fieldsState.fields });

    if (fieldsState.valid){
      //change for final login as user
      console.log(fieldsState.fields);
      this.props.addDependant(fieldsState.fields);
      this.setState({ showNewDependant: false });
    }
  }

  renderDependants(){
    return this.props.user.dependants.map((dependant, index) => {
      return (
        <Radio
          key={'dependantRadio' + index}
          id={'dependantRadio' + index}
          name="dependantRadios"
          value={dependant.id}
          label={dependant.firstName + " " + dependant.lastName}
          checked={this.props.selectedDependant === dependant}
          onChange={this.onChangeDependant.bind(this, dependant)}
        />
      )
    });
  }

  componentWillMount() {
     this.props.getDependants();
  }

  render() {
    return (
      <div className="Dependants">
        { this.renderDependants() }
        { !this.state.showNewDependant &&
          <div className="pointer">
            <p 
              className="underline"
              onClick={()=>this.setState({showNewDependant: true})}
            >Add new dependant</p>
          </div>
        }
        { this.state.showNewDependant &&
          <div className="newDependant">
            <TextField 
              onChange={this.onChangeFields.bind(this, 'firstName')} 
              { ...this.state.fields.firstName}
              />
             <TextField 
              onChange={this.onChangeFields.bind(this, 'lastName')} 
              { ...this.state.fields.lastName}
              />
             <input 
              onChange={this.onChangeFields.bind(this, 'dob')}
              type="date"
              { ...this.state.fields.dob}
              />  
              
            <SelectionControlGroup
              id="controlGroupRadio"
              type="radio"
              name="simpleRadioGroup"
              label="Gender"
              defaultValue="m"
              onChange={this.onChangeFields.bind(this, 'gender')}
              controls={[{
                label: 'Male',
                value: 'm',
              }, {
                label: 'Female',
                value: 'f',
              }]}
            />
            <div className="align-center">
             <button className="saveDependant yocaleButton" onClick={this.saveDependant.bind(this)}>Save dependant</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { setBookingDependant, getDependants, addDependant }
)(Dependants)
