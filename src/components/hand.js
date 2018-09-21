import React, { Component } from 'react';
import '../App.css';

class Deck extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="Deck">
        {this.props.hand.map((card, i) => {
          return <li key={i}>{card}</li>
        })}
      </div>
    );
  }
}

export default Deck;
