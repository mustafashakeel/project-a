/*globals Stripe */

import React from 'react';
import { connect } from 'react-redux';
import { setPaymentsDetails, toggleLoadingBar } from '../../../../../../actions/index';


import TextField from 'react-md/lib/TextFields';

import './StripeForm.scss';

const stripe = Stripe('pk_test_uIyy0QTwMOFQQxnZjiGDRDie');
const elements = stripe.elements();

var card = elements.create('card', {
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#8898AA',
      color: '#525252',
      lineHeight: '32px',
      fontWeight: 300,
      fontFamily: 'Helvetica Neue',
      fontSize: '16px',

      '::placeholder': {
        color: '#8898AA',
      },
    },
    invalid: {
      iconColor: '#e85746',
      color: '#e85746',
    }
  },
  classes: {
    focus: 'is-focused',
    empty: 'is-empty',
  },
});

function mapStateToProps(state) {
  return {

  };
}

export class StripeForm extends React.Component {

  state = {
    name: "",
    card: "",
    ccv: "",
    error: false,
    errorMsg: ""
  }

  getStripeToken() {
    
    const extraDetails = {
      name: this.state.name
    };
    this.props.toggleLoadingBar(true);
    stripe.createToken(card, extraDetails).then((result) => {
      this.props.toggleLoadingBar(false);
      this.setState({error: false})
      if(result.error){
        this.setState({error: true, errorMsg: result.error.message})
      }else{
        // this.props.setPaymentsDetails(result);
        this.props.onSave(result);

      }
    });
  }

  // onChangeCard(result) {
  //   console.log(result)
  // }

  componentDidMount() {
    card.mount('#card-element');
    // card.on('change', this.onChangeCard);
  }

  componentWillUnmount() {
    card.unmount();
  }

  render() {
    return (
      <div className="StripeForm">
        <h4>Credit card information</h4>
        <TextField
          name="cardholder-name"
          id="cardholder-name"
          placeholder="Name"
          className="inpuTextSmall"
          onChange={(name)=>this.setState({name})}
        />
        <div id="card-element"></div>
        {this.state.error && 
          <div className="error">
            {this.state.errorMsg}
          </div>
        }
        <div className="align-center">
          <button 
            className="saveCardBtn yocaleButton" 
            onClick={this.getStripeToken.bind(this)}>
            Save card
          </button>
        </div>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { setPaymentsDetails, toggleLoadingBar }
)(StripeForm)
