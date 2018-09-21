import React, { Component } from 'react';
import './App.css';
import Hand from './components/hand';

class Deck extends Component {
  constructor() {
    super()
    this.state = {
      deck: [],
      hand: [],
      dealerHand: [],
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
    let card3 = this.state.deck.pop()
    let card4 = this.state.deck.pop()
    this.setState({
      hand: [card1, card3],
      dealerHand: [card2, card4]
    })
  }

  hit() {
    let card = this.state.deck.pop()
    this.setState({hand: [...this.state.hand, card]})
  }

  stay() {

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
      hand: [],
      dealerHand: []
    })
    console.log(this.state.deck)
  }

  render() {
    return (
      <div className="Deck">
        <button onClick={()=>this.hit()}>Hit</button>
        <button onClick={()=>this.stay()}>Stay</button>
        <button onClick={()=>this.shuffle()}>Shuffle</button>
        <button onClick={()=>this.reset()}>Reset</button>
        <div className="game-container">
          <button className="start-button" onClick={()=>this.deal()}>Start!</button>
          <h4>Your Hand</h4>
          <Hand hand={this.state.hand} />
          <h4>Dealer Hand</h4>
          {this.state.dealerHand}
        </div>
      </div>
    );
  }
}

export default Deck;
