import React, { Component } from 'react';
import './App.css';

class Deck extends Component {
  constructor() {
    super()
    this.state = {
      deck: [],
      hand: [],
      suits: ['Hearts', 'Spades', 'Clubs', 'Diamonds'], 
      values: ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
    }
  }

  componentWillMount() {
    let deck = [];
    for (let suit in this.state.suits) {
      for (let value in this.state.values) {
        deck.push(this.state.values[value] + ' of ' + this.state.suits[suit]);
      }
    }
    this.setState({deck: deck})
  }

  render() {
    return (
      <div className="Deck">
        {this.state.deck}
      </div>
    );
  }
}

export default Deck;
