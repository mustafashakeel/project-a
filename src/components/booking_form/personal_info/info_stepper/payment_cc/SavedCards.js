import React from 'react';
import { connect } from 'react-redux';

import FadeInOut from '../../../../common/fade_in_out/FadeInOut';
import Radio from 'react-md/lib/SelectionControls/Radio';
import StripeForm from './stripe/StripeForm';
import { setPaymentsDetails } from '../../../../../actions/index';

import './SavedCards.scss';

function mapStateToProps(state) {
  return {
    booking: state.booking
  };
}

export class SavedCards extends React.Component {

  state = {
    selectedCard: {},
    cards: [],
    showStripe: false
  }

  renderCards(){
    return this.state.cards.map((card, index) => {
      return (
        <Radio
          key={'saveCardsRadio' + index}
          id={'saveCardsRadio' + index}
          name="saveCardsRadios"
          value={card.paymentCustomerId}
          label={card.cardType + " **************" + card.cardLastFour}
          checked={this.state.selectedCard === card}
          onChange={this.onChangeCard.bind(this, card)}
        />
      )
    });
  }

  onChangeCard(selectedCard){
    this.setState({ selectedCard });
    this.props.setPaymentsDetails(selectedCard);
  }

  onSaveStripe(card){
    this.setState({ showStripe: false});
    const cards = this.state.cards;
    const cardObj = {
      paymentCustomerId: "",
      cardType: card.token.card.brand,
      cardLastFour: card.token.card.last4,
      token: card.token
    };
    cards.push(cardObj);
    this.setState({ selectedCard: cardObj, cards: cards });
    this.props.setPaymentsDetails(cardObj);
  }

  componentWillMount() {
      this.setState({cards: this.props.booking.lease.customerPaymentDetails})
  }

  render() {
    return (
      <div className='savedCards'>
        <h4>Payment options</h4>
        {this.renderCards()}
        {this.state.showStripe ?
          <StripeForm onSave={this.onSaveStripe.bind(this)}/>
          :
          <p 
            className="yocaleBlue pointer underline newCardBtn"
            onClick={()=> this.setState({ showStripe: true})}
            >
            Add new card
          </p>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {setPaymentsDetails}
)(SavedCards)
