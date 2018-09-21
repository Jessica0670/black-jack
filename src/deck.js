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

  // deal() {
  //   let card1 = this.deck.pop()
  //   let card2 = this.deck.pop()
  //   this.hand.push(card1, card2);
  //   console.log(this.deck, 'remaining cards', this.deck.length)
  //   return this.hand;
  // }

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
      <button>Deal</button>
      <button>Hit</button>
      <button>Stay</button>

      <button onClick={()=>this.shuffle()}>Shuffle</button>
      <button>Reset</button>
      </div>
    );
  }
}

export default Deck;
