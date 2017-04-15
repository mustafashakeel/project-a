import React from 'react';
import { connect } from 'react-redux';

import TextField from 'react-md/lib/TextFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
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
    completedForms: 0,
    isDone: false
  }

  changeForm(index) {
    this.setState({activeForm: index});
  }

  completedForm(){
    const completed = this.state.completedForms;
    this.setState({completedForms: completed + 1})
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
    return this.props.intakeForms.map((form, index)=>{
      return <h3 
        key={index} 
        onClick={this.changeForm.bind(this, index)} 
        className={(this.state.activeForm == index)? "active" : ""}>{form.formName}</h3>
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.completedForms === this.props.intakeForms.length){
      nextState.isDone = true;
    }
  }

  render() {
    return (
      <div className="intakeForms">
          <p className="align-center">The following form(s) are required before booking your appointment</p>
          <div className="formTitles">
            {this.mapFormNames()}
          </div>
          <div className="formContent">
            {this.mapFormsContent() }
          </div>
          {this.state.isDone && 
            <button className="doneIntakeFormBtn" onClick={this.props.onSave}>Done</button>  
          }

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(IntakeForm)
