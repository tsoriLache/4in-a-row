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
    constructor() {
      this.playEvent = new Event();
      this.app = this.getElement("#board");
      for (let i = 0; i < 6; i++) {
          this.column = this.createElement('div',['column'],{id:`c${i}`}) 
          this.app.appendChild(this.column)
          for (let j = 0; j < 6; j++) {
            this.cell = this.createElement('span',['cell']) 
            this.column.appendChild(this.cell)
          }
      }
    }
    
    getElement(selector) {
      const element = document.querySelector(selector);
      return element;
    }
    
    createElement(tagName, classes = [], attributes = {}) {
        const el = document.createElement(tagName);
        // Classes
        for(const cls of classes) {
          el.classList.add(cls);
        }
        // Attributes
        for (const attr in attributes) {
          el.setAttribute(attr, attributes[attr]);
        }
        
        return el;
    }

    render() {
    const board = document.createElement('div');
    board.className = 'board';

    this.cells = Array(9).fill().map((_, i) => {
      const cell = document.createElement('div');
      cell.className = 'cell';

      cell.addEventListener('click', () => {
        this.playEvent.trigger(i);
      });

      board.appendChild(cell);

      return cell;
    });

    this.message = document.createElement('div');
    this.message.className = 'message';

    document.body.appendChild(board);
    document.body.appendChild(this.message);
  }

  updateCell(data) {
    this.cells[data.move].innerHTML = data.player;
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