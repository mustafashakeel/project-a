import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
    return this.priceItems.map((item)=>{
      return <p><span>{item.name}: </span> <span>${item.amount.toFixed(2)}</span></p>
    });
  }

  renderTotal(){
    let total = 0;
    this.priceItems.map((item)=>{
      total = total + item.amount;
    });
    return total.toFixed(2);
  }

  componentWillMount() {
    if (this.props.booking.location.tax) {
      const offeringPrice = this.props.booking.service.OfferingPrice
      this.priceItems.push({name:"Subtotal", amount: offeringPrice})
      const taxes = this.props.booking.location.tax;
      return taxes.map((tax)=>{
        const taxPrice = ((offeringPrice * tax.rate) / 100);
        this.priceItems.push({name: tax.name + "(" + tax.rate + "%)", amount: taxPrice})
      });
    }
  }

  render() {
    const {t, booking, business} = this.props;
    console.log(this.props);
    return (
      <div className="Payment">
        {!this.state.paymentDetails ?

          <div className="md-grid">
            <div className="md-cell--12 ">
              <p><strong>{booking.service.name}</strong></p>
            </div>
            <div className="md-cell--12 priceSummary">
              {this.renderPriceItem()}   
              <p><span>Total:</span> <span>${this.renderTotal()}</span></p>          
            </div>
            <div className="md-cell--12 align-center pointer">
              <p 
                className="underline"
                onClick={()=>this.setState({paymentDetails: !this.state.paymentDetails})}
              >{t('application.user_info.enter_payment_info')}</p>
            </div>
          </div>
        :
        <div className="md-grid">
          <div className="md-cell--6 md-cell--2-phone">
          <p>Total: ${this.renderTotal()}<br/>
          Visa *************3425
          </p>
          </div>
          <div className="md-cell--right md-cell--6 md-cell--2-phone">
            <div 
              className="pointer editPayment align-right" 
              onClick={()=>this.setState({paymentDetails: !this.state.paymentDetails})}
            >{t('application.user_info.edit')}</div>
          </div>
        </div>
      }
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(translate()(PaymentCC))
