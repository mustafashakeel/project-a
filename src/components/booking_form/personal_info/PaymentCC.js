import React from 'react';
import { connect } from 'react-redux';

import './PaymentCC.scss';

function mapStateToProps(state) {
  return {

  };
}

export class PaymentCC extends React.Component {
  state = {
    paymentDetails : false
  }
  render() {
    return (
      <div className="Payment">
        {!this.state.paymentDetails ?

          <div className="md-grid">
            <div className="md-cell--12 ">
              <p><strong>Infrared Sauna</strong> - 1 Class</p>
            </div>
            <div className="md-cell--6 md-cell--2-phone">
              <p>Subtotal:</p>
              <p>Tax:</p>
              <p>Total:</p>
            </div>
            <div className="md-cell--6 md-cell--2-phone">
              <p>$20.00</p>
              <p>$1.00</p>
              <p>$21.00</p>
            </div>
            <div className="md-cell--12 align-center pointer">
              <p 
                className="underline"
                onClick={()=>this.setState({paymentDetails: !this.state.paymentDetails})}
              >Enter your payment info</p>
            </div>
          </div>
        :
        <div className="md-grid">
          <div class="md-cell--6 md-cell--2-phone">
          <p>Total: $21.00<br/>
          Visa *************3425
          </p>
          </div>
          <div className="md-cell--right md-cell--6 md-cell--2-phone">
            <div 
              className="pointer editPayment align-right" 
              onClick={()=>this.setState({paymentDetails: !this.state.paymentDetails})}
            >Edit</div>
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
)(PaymentCC)
