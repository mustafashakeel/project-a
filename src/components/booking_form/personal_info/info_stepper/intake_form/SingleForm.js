import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import classNames from 'classnames';

import { saveIntakeForm } from '../../../../../actions/index';

function mapStateToProps(state) {
  return {
    completed: state.booking.intake_forms.completed
  };
}

class SingleForm extends React.Component {

  state = {
    completed: false
  }

  createMarkup(){
    return {__html: this.props.form.formHtml}
  }

  submitForm(e){
    e.preventDefault();
    const values = this.getFormValues();
    this.props.saveIntakeForm(values);
    this.setState({completed:true});
    this.props.onCompleted();
  }

  getFormValues(){
    var elements = this.refs.theForm.elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
      var item = elements.item(i);
      if(item.id !== ""){
        switch(item.type){
          case "checkbox":
            obj[item.id] = item.checked;
          break;
          case "radio":
            obj[item.id] = item.checked;
          break;
          default:
            obj[item.id] = item.value;
          break;
        }
      }
        
    }
    return { 
      id: this.props.form.id,
      formName: this.props.form.formName,
      data : obj 
    };
  }

  setFormValues(){
    const elements = this.refs.theForm.elements;
    const formValues = this.props.completed[this.props.form.id];
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        for (var completedItem in formValues){
            if (item.id === completedItem){
              switch(item.type){
                case "checkbox":
                case "radio":
                  item.checked = formValues[completedItem];
                break;
                default:
                  item.value = formValues[completedItem];
                break;
              }
            }
        }
    }
  }

  getClassNames(){
    return classNames({
      'SingleForm': true,
      'completed': this.state.completed,
      'active': this.props.active
    })
  }

  componentDidMount() {
    this.setFormValues();
  }

  render() {
    return (
      <div className={this.getClassNames()}>
        <form onSubmit={this.submitForm.bind(this)} ref="theForm">
          <p>{this.props.form.description}</p>
          <div style={{position:'relative'}} dangerouslySetInnerHTML={this.createMarkup()} />
          <input type="submit" value="Submit"/>
        </form>
        <div className="onCompleted">Completed</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { saveIntakeForm }
)(translate()(SingleForm))

SingleForm.defaultProps = {
  active: false
};