"use strict";


// import {rowCheck,columnCheck,diagonalCheck,OppositeDiagonalCheck} from './victoryCheck'; 

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
    const draw = board[6].every(cell =>cell==='red'||cell==='yellow');    
    if (draw) {
      this.drawEvent.trigger();
    }
    return draw;
  }
  
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red';
  }
}
  
  
class View{
  constructor() {
    this.playEvent = new Event();
    this.app = this.getElement("#board");
    for (let i = 0; i <= 6; i++) {
        this.column = this.createElement('div',['column'],{id:`c${i}`}) 
        this.app.appendChild(this.column)
        for (let j = 0; j <= 6; j++) {
          this.cell = this.createElement('span',['cell'],{id:`c${i}r${j}`}) 
          this.column.appendChild(this.cell)
        }
    }
    this.message = this.createElement('div',['message']);
  document.body.appendChild(this.message);
  }
  
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
  
  createElement(tagName, classes = [], attributes = {}) {
      const el = document.createElement(tagName);
      for(const cls of classes) {
        el.classList.add(cls);
      }
      for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
      }
    return el;
  } 

  updateCell([c,r],playerColor) {
    document.getElementById(`c${c}r${r}`).style.backgroundColor = playerColor;
  }

  victory(winner) {
    this.message.innerHTML = `${winner} wins!`;
  }

  draw() {
    this.message.innerHTML = "It's a draw!";
  }
  
}


class Controller{
  constructor(){
      
  }
}

const view = new View();