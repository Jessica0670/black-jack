import React, { Component } from 'react';
import './App.css';
import Hand from './components/hand';
import DealerHand from './components/dealerHand';
class Deck extends Component {
  constructor() {
    super()
    this.state = {
      deck: [],
      hand: [],
      dealerHand: [],
      suits: ['Hearts ♥', 'Spades ♠', 'Clubs ♣', 'Diamonds ♦'],
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
    this.shuffle(deck)
    this.setState({ deck: deck })
    console.log(deck,'ttsting')
  }

  shuffle(deck) {
    // const deck = this.state.deck;
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
    this.setState({ hand: [...this.state.hand, card] })
  }

  stay() {

  }

  reset() {
    let newDeck = [];
    for (let suit in this.state.suits) {
      for (let value in this.state.values) {
        newDeck.push(this.state.values[value] + ' of ' + this.state.suits[suit]);
      }
    }
    this.shuffle(newDeck)
    this.setState({
      deck: newDeck,
      hand: [],
      dealerHand: []
    })
  }

  render() {
    return (
      <div className="Deck">
        <button onClick={() => this.stay()}>Stay</button>
        <button onClick={() => this.shuffle(this.state.deck)}>Shuffle</button>
        <button onClick={() => this.reset()}>Reset</button>
        <div className="game-container">
          <button className="start-button" onClick={() => this.deal()}>Start!</button>
          <h4>Your Hand</h4>
          <Hand hand={this.state.hand} hit={this.hit.bind(this)}/>
          <h4>Dealer Hand</h4>
          <DealerHand dealerHand={this.state.dealerHand} />
        </div>
      </div>
    );
  }
}

export default Deck;
