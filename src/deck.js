import React, { Component } from 'react';
import './App.css';
import Hand from './components/hand';

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

  hit() {
    let card = this.state.deck.pop()
    this.setState({hand: [...this.state.hand, card]})
  }


  reset(){
    let newDeck = [];
    for (let suit in this.state.suits) {
      for (let value in this.state.values) {
        newDeck.push(this.state.values[value] + ' of ' + this.state.suits[suit]);
      }
    }
    this.setState({
      deck: newDeck,
      hand: []
    })
    console.log(this.state.deck)
  }

  render() {
    return (
      <div className="Deck">
        <button onClick={()=>this.hit()}>Hit</button>
        <button>Stay</button>
        <button onClick={()=>this.shuffle()}>Shuffle</button>
        <button onClick={()=>this.reset()}>Reset</button>
        <div className="game-container">
          <button className="start-button" onClick={()=>this.deal()}>Start!</button>
          <Hand hand={this.state.hand} />
        </div>
      </div>
    );
  }
}

export default Deck;
