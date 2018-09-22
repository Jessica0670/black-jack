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
      tally: [0,0],
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
    let res = 0;
    let arr = this.state.hand.concat(card)
    arr.forEach(elem => {
      if(elem[0] === 'A') {
        res = res + 11
      } else if(elem[1] === '0') {
        res = res + 10
      } else if (elem[0] == 'K' || elem[0] == 'Q' || elem[0] == 'J') {
        res = res + 10 
      } else {
        res = parseInt(elem[0]) + res
      }
    })
  }

  stay(dealerHand, myHand) {
    console.log(this.state.deck.length, 'length of deck')
    if(dealerScore >= 17) {
      return;
    }
    if(this.state.deck.length === 1) {
      console.log('need to reset')
    }
    let myScore = 0;
    let dealerScore = 0;
    console.log(dealerHand, myHand)
    dealerHand.forEach(elem => {
      if(elem[0] === 'A') {
        dealerScore = dealerScore + 11
      } else if(elem[1] === '0') {
        dealerScore = dealerScore + 10
      } else if (elem[0] == 'K' || elem[0] == 'Q' || elem[0] == 'J') {
        dealerScore = dealerScore + 10 
      } else {
        dealerScore = parseInt(elem[0]) + dealerScore
      }
    })
    myHand.forEach(elem => {
      if(elem[0] === 'A') {
        myScore = myScore + 11
      } else if(elem[1] === '0') {
        myScore = myScore + 10
      } else if (elem[0] == 'K' || elem[0] == 'Q' || elem[0] == 'J') {
        myScore = myScore + 10 
      } else {
        myScore = parseInt(elem[0]) + myScore
      }
    })
    console.log(myScore, dealerScore)
    if(dealerScore < 17) {
      let card = this.state.deck.pop()
      this.setState({dealerHand: [...this.state.dealerHand, card]})
      let newDealerHand = this.state.dealerHand.concat(card)
      this.stay(newDealerHand, this.state.hand)
    } 
    else if( dealerScore >= 17) {
      if (myScore > dealerScore && myScore <= 21) {
        this.setState({tally: [this.state.tally[0] + 1, this.state.tally[1]]})
        console.log('I win')
      }
      else if (dealerScore > myScore && dealerScore <= 21) {
        this.setState({tally: [this.state.tally[0], this.state.tally[1] + 1]})
        console.log('dealer wins')
      }
      else if(dealerScore === myScore) {
        console.log('push')
      } 
      else if (myScore > 21) {
        this.setState({tally: [this.state.tally[0], this.state.tally[1] + 1]})
        console.log('I bust, dealer wins')
      }
      else if (dealerScore > 21) {
        this.setState({tally: [this.state.tally[0] + 1, this.state.tally[1]]})
        console.log('dealer bust, I win')
      }
      else if (myScore === 21) {
        this.setState({tally: [this.state.tally[0] + 1, this.state.tally[1]]})
        console.log('BLACKJACK')
      }
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
        <br></br>
        <button className="start-button" onClick={() => this.deal()}>Start!</button>
        <div className="game-container">
          <div className="my-hand hands">
            <h4>Your Hand</h4>
            <Hand
              hand={this.state.hand} hit={this.hit.bind(this)}
            stay={this.stay.bind(this)} myHand={this.state.hand} dealerHand={this.state.dealerHand}
            />
          </div>
          <div>
            <h5>Your Wins</h5>
            {this.state.tally[0]}
            <h5>Dealer Wins</h5>
            {this.state.tally[1]}
          </div>
          <div className="dealer-hand hands">
            <h4>Dealer Hand</h4>
            <DealerHand dealerHand={this.state.dealerHand} />
          </div>
        </div>
      </div>
    );
  }
}

export default Deck;
