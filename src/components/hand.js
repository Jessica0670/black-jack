import React, { Component } from 'react';
import '../App.css';

class Hand extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="Deck">
        <button onClick={() => this.props.hit()}>Hit</button>
        <button onClick={() => this.props.stay(this.props.dealerHand, this.props.hand)}>Stay</button>
        {this.props.hand.map((card, i) => {
          return <li key={i}>{card}</li>
        })}
      </div>
    );
  }
}

export default Hand;
