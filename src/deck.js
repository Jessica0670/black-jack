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

  shuffle() {
    const deck = this.state.deck;
    let m = deck.length, i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }
  }

  deal() {
    let card1 = this.state.deck.pop()
    let card2 = this.state.deck.pop()
    this.setState({hand: [card1, card2]})
  }

  // hit() {
  //   let card = this.deck.pop()
  //   this.hand.push(card)
  //   return this.hand
  // }


  // reset(){
  //   this.deck = [];

  //   const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
  //   const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

  //   for (let suit in suits) {
  //     for (let value in values) {
  //       this.deck.push(values[value] + ' of ' + suits[suit]);
  //     }
  //   }
  // }

  render() {
    return (
      <div className="Deck">
      <button onClick={()=>this.deal()}>Deal</button>
      <button>Hit</button>
      <button>Stay</button>
      {this.state.hand}
      <button onClick={()=>this.shuffle()}>Shuffle</button>
      <button>Reset</button>
      </div>
    );
  }
}

export default Deck;
