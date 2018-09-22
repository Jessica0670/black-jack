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
      myScore: 0,
      dealerScore: 0,
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
    console.log(deck, 'ttsting')
  }

  shuffle(deck) {
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

  stay(dealerHand, myHand) {
    console.log(dealerHand, myHand)
    let myScore = 0;
    let dealerScore = 0;
    dealerHand.forEach(elem => {
      dealerScore = parseInt(elem[0]) + dealerScore
    })
    myHand.forEach(elem => {
      myScore = parseInt(elem[0]) + myScore
    })
    console.log(myScore, dealerScore)
    if (myScore > dealerScore) {
      console.log('i win')
    }
    if (dealerScore > myScore) {
      console.log('dealer wins')
    }
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
        <button onClick={() => this.shuffle(this.state.deck)}>Shuffle</button>
        <button onClick={() => this.reset()}>Reset</button>
        <div className="game-container">
          <button className="start-button" onClick={() => this.deal()}>Start!</button>
          <h4>Your Hand</h4>
          <button onClick={() => this.stay(this.state.dealerHand, this.state.hand)}>Stay</button>
          <Hand
            hand={this.state.hand} hit={this.hit.bind(this)}
          // stay={this.stay.bind(this)} 
          // myHand={this.state.myHand} dealerHand={this.state.dealerHand} 
          />
          <h4>Dealer Hand</h4>
          <DealerHand dealerHand={this.state.dealerHand} />
        </div>
      </div>
    );
  }
}

export default Deck;
