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
    
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { setGrantTotal }
)(translate()(PaymentCC))
