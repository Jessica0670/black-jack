import React, { Component } from 'react';
import '../App.css';

class DealerHand extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="Deck">
        {this.props.dealerHand.map((card, i) => {
          return <li key={i}>{card}</li>
        })}
      </div>
    );
  }
}

export default DealerHand;
