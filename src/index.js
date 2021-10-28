"use strict";
const {rowCheck,columnCheck,diagonalCheck,OppositeDiagonalCheck} = require('./victoryCheck') 

class Event {
    constructor() {
      this.listeners = [];
    }
  
    addListener(listener) {
      this.listeners.push(listener);
    }
  
    trigger(params) {
      this.listeners.forEach(listener => { listener(params); });
    }
}


class Model{
  constructor(){
      this.board = Array(7).fill(Array(7));
      this.currentPlayer = 'red';
      this.finished = false;
  
      this.updateCellEvent = new Event();
      this.victoryEvent = new Event();
      this.drawEvent = new Event();
  }
  play(columnNumber) {
      if (this.finished || columnNumber < 0 || columnNumber > 6 ||this.board[columnNumber][6]) { return false; }
      const rowNumber = this.board[columnNumber].findIndex(element => element===undefined)
      this.board[columnNumber][rowNumber] = this.currentPlayer;
      this.updateCellEvent.trigger({ columnNumber,rowNumber, player: this.currentPlayer });
      this.finished = this.victory([columnNumber,rowNumber],this.currentPlayer) || this.draw();
  
      if (!this.finished) { this.switchPlayer(); }
  
      return true;
    }
  
    victory([c,r],color) {
        
      const victory = rowCheck([c,r],color)||
                      columnCheck([c,r],color)||
                      diagonalCheck([c,r],color)||
                      OppositeDiagonalCheck([c,r],color);
      if (victory) {
        this.victoryEvent.trigger(this.currentPlayer);
      }
      return victory;
    }
  
    draw() {
      const draw = board[6].every(cell =>cell==='r');    
      if (draw) {
        this.drawEvent.trigger();
      }
      return draw;
    }
  
    switchPlayer() {
      this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
    }
  }
    

class View{
  constructor(){

        
  }
    
    // createElement(tagName, classes = [], attributes = {}, eventListeners = {}) {
    //     const el = document.createElement(tagName);
    //     // Classes
    //     for(const cls of classes) {
    //       el.classList.add(cls);
    //     }
    //     // Attributes
    //     for (const attr in attributes) {
    //       el.setAttribute(attr, attributes[attr]);
    //     }
    //     // Event Listeners
    //     for (const listener in eventListeners) {
    //         el.addEventListener(listener, eventListeners[listener]);
    //       }
    //     return el;
    // }
    
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
      }
}

class Controller{
    constructor(){
        
    }
}
