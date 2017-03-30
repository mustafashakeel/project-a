import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { setGrantTotal} from '../../../../../actions';

import StripeForm from './stripe/StripeForm';

import './PaymentCC.scss';

function mapStateToProps(state) {
  return {
    booking: state.booking,
    business: state.business.info
  };
}

export class PaymentCC extends React.Component {
  state = {
    paymentDetails : false
  }

  priceItems = []

  renderPriceItem(){
    return this.priceItems.map((item, index)=>{
      return <p key={index}><span>{item.name}: </span> <span>${item.amount.toFixed(2)}</span></p>
    });
  }

  getTotal(){
    if (this.props.booking.grantTotal === 0){
      let total = 0;
      this.priceItems.forEach((item)=>{
        total = total + item.amount;
      });
      this.props.setGrantTotal(total.toFixed(2));
    }    
  }

  componentWillMount() {
      const price = this.props.booking.service.price
      this.priceItems.push({name:"Subtotal", amount: price})
    if (this.props.booking.location.tax) {
      const taxes = this.props.booking.location.tax;
      taxes.map((tax)=>{
        const taxPrice = ((price * tax.rate) / 100);
        this.priceItems.push({name: tax.name + "(" + tax.rate + "%)", amount: taxPrice})
      });
    }
    this.getTotal();

  }

  render() {
    const {t, booking, business} = this.props;

    return (
      <div className="Payment">
        <div>  
          <p><strong>{booking.service.name}</strong></p>
          <div className="priceSummary">
            {this.renderPriceItem()}   
            <p><span>Total:</span> <span>${booking.grantTotal}</span></p>          
          </div>

          {!this.state.paymentDetails && booking.payment.card == null && 
            <div className="align-center pointer">
              <p 
                className="underline"
                onClick={()=>this.setState({paymentDetails: !this.state.paymentDetails})}
              >{t('application.user_info.enter_payment_info')}</p>
            </div>
          }

        </div>
            
        {this.state.paymentDetails && 
          <StripeForm onSave={()=>this.setState({paymentDetails: false})}/>
        }

        {booking.payment.card && !this.state.paymentDetails &&
          <div>
            <p>
              {booking.payment.card.brand} **************{booking.payment.card.last4}
              <span 
                className="pointer editPayment" 
                onClick={()=>this.setState({paymentDetails: !this.state.paymentDetails})}
              >{t('application.user_info.edit')}</span>
            </p>

          </div>
        }
    
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { setGrantTotal }
)(translate()(PaymentCC))
