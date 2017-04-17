import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { setGrantTotal} from '../../../../../actions';

import StripeForm from './stripe/StripeForm';
import SavedCards from './SavedCards';

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

  // priceItems = []

  // renderPriceItem(){
  //   return this.priceItems.map((item, index)=>{
  //     return <p key={index}><span>{item.name}: </span> <span>${item.amount.toFixed(2)}</span></p>
  //   });
  // }

  // getTotal(){
  //   if (this.props.booking.grantTotal === 0){
  //     let total = 0;
  //     this.priceItems.forEach((item)=>{
  //       total = total + item.amount;
  //     });
  //     this.props.setGrantTotal(total.toFixed(2));
  //   }    
  // }

  // componentWillMount() {
  //     const price = this.props.booking.service.price
  //     this.priceItems.push({name:"Subtotal", amount: price})
  //   if (this.props.booking.location.tax) {
  //     const taxes = this.props.booking.location.tax;
  //     taxes.map((tax)=>{
  //       const taxPrice = ((price * tax.rate) / 100);
  //       this.priceItems.push({name: tax.name + "(" + tax.rate + "%)", amount: taxPrice})
  //     });
  //   }
  //   this.getTotal();

  // }

  render() {
    const {t, booking, business} = this.props;
    const payment = booking.lease.paymentInfoModel;
    return (
      <div className="Payment">
        <div>  
          <p><strong>{booking.service.name}</strong></p>
          <div className="priceSummary">
            <p><span>Price:</span> <span>${booking.lease.paymentInfoModel.price}</span></p> 
            {payment.tax1 !== 0 &&
              <p><span>{payment.tax1Name} ({payment.tax1Rate}%)</span> <span>${payment.tax1}</span></p> 
            }
            {payment.tax2 !== 0 &&
              <p><span>{payment.tax2Name} ({payment.tax2Rate}%)</span> <span>${payment.tax2}</span></p> 
            }
            {payment.other !== 0 &&
              <p><span>{payment.otherName} ({payment.otherRate}%)</span> <span>${payment.other}</span></p> 
            }
            <p><span>Total:</span> <span>${payment.totalAmount}</span></p>          
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
          <SavedCards />
        }

        {/*booking.payment && !this.state.paymentDetails &&
          <div>
            <p>
              {booking.payment.cardType} **************{booking.payment.cardLastFour}
              <span 
                className="pointer editPayment" 
                onClick={()=>this.setState({paymentDetails: !this.state.paymentDetails})}
              >{t('application.user_info.edit')}</span>
            </p>

          </div>
        */}
    
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { setGrantTotal }
)(translate()(PaymentCC))
