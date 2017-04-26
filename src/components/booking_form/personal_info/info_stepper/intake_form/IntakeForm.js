import React from 'react';
import { connect } from 'react-redux';

import SelectField from 'react-md/lib/SelectFields';

import SingleForm from './SingleForm'

import './IntakeForm.scss';
import './materialPureCss.scss';

function mapStateToProps(state) {
  return {
    intakeForms: state.booking.intake_forms.source
  };
}

export class IntakeForm extends React.Component {
  state = {
    activeForm: 0,
    activeFormId: "",
    completedForms: 0,
    isDone: false
  }

  changeSelect(newValue, newValueIndex) {
    this.setState({activeFormId: newValue, activeForm: newValueIndex});
  }

  completedForm(){
    const completed = this.state.completedForms;
    let activeForm = this.state.activeForm;
    if (this.state.activeForm < this.props.intakeForms.length-1){
      activeForm = activeForm + 1;
    }
    this.setState({completedForms: completed + 1, activeForm: activeForm});
  }

  mapFormsContent(){
    return this.props.intakeForms.map((form, index)=>{
      return <SingleForm 
        key={index} 
        form={form}
        onCompleted={this.completedForm.bind(this)} 
        active={this.state.activeForm == index}
      />
    })
  }

  mapFormNames(){
    return <SelectField
          id="selectSelection"
          placeholder={"Select a form"}
          position={SelectField.Positions.BELOW}
          menuItems={this.props.intakeForms}
          itemLabel="formName"
          itemValue="id"
          value={this.state.activeFormId}
          onChange={this.changeSelect.bind(this)}
          className="dropdownSelect"
          iconChildren="keyboard_arrow_down"
        />

    {/*return this.props.intakeForms.map((form, index)=>{
      return <h3 
        key={index} 
        onClick={this.changeForm.bind(this, index)} 
        className={(this.state.activeForm == index)? "active" : ""}>{form.formName}</h3>
    })*/}
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.completedForms === this.props.intakeForms.length){
      this.props.onSave();
    }
  }
  componentWillMount() {
    this.setState({ activeFormId : this.props.intakeForms[0].id });
  }

  render() {
    return (
      <div className="intakeForms">
          <p className="align-center">The following form(s) are required before booking your appointment</p>
          <div className="formTitles">
            {this.mapFormNames()}
          </div>
          <p className="formStatus">
            Completed forms: {this.state.completedForms} out of {this.props.intakeForms.length}
          </p>
          <div className="formContent">
            {this.mapFormsContent() }
          </div>          

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(IntakeForm)
