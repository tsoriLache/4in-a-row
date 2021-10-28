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
    console.log(columnNumber);
    console.log(this.finished );
    if (this.finished ) { return false; }
    const rowNumber = this.board[columnNumber].findIndex(element => element===undefined)
    //if(rowNumber<0)...
    console.log(columnNumber,rowNumber,this.currentPlayer);
    // this.board[columnNumber][rowNumber] = this.currentPlayer;
    this.updateCellEvent.trigger({columnNumber,rowNumber,player:this.currentPlayer} );
    this.finished = this.victory(columnNumber,rowNumber,this.currentPlayer) || this.draw();

    if (!this.finished) { this.switchPlayer(); }

    return true;
  }
  
  victory(c,r,color) {
      
    const victory = rowCheck(c,r,color,this.board)||
                    columnCheck(c,r,color,this.board)||
                    diagonalCheck(c,r,color,this.board)||
                    OppositeDiagonalCheck(c,r,color,this.board);
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
        this.column.addEventListener('click', () => {
          this.playEvent.trigger(i);});
        for (let j = 0; j <= 6; j++) {
          const cell = this.createElement('span',['cell'],{id:`c${i}r${j}`}) 
          this.column.appendChild(cell)
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

  updateCell({columnNumber, rowNumber, player}) {
    console.log(columnNumber, rowNumber, player);
    document.getElementById(`c${columnNumber}r${rowNumber}`).style.backgroundColor = player;
  }

  victory(winner) {
    this.message.innerHTML = `${winner} wins!`;
  }

  draw() {
    this.message.innerHTML = "It's a draw!";
  }
  
}


class Controller{
  constructor() {
    this.model = new Model();
    this.view = new View();

    this.view.playEvent.addListener(columnNumber => { this.model.play(columnNumber); });
    this.model.updateCellEvent.addListener((data) => { this.view.updateCell(data); });
    this.model.victoryEvent.addListener(winner => { this.view.victory(winner); });
    this.model.drawEvent.addListener(() => { this.view.draw(); });
  }
}

const app = new Controller();
