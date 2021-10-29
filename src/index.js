"use strict";

function columnCheck(c,r,color,board){
  let count = 0;
  for (let r=0; r < 7; r++){
      if(checkContent(c,r,color,board)){
          count++;
          if(count===4)return true;
      }else{
          count = 0;
      }
      if(count+2<r){
          break
      }
  }
  return false;
}

//row check
function rowCheck(c,r,color,board){
  let count = 0;
  for (let c=0; c < 7; c++){
      if(checkContent(c,r,color,board)){
          count++;
          if(count===4)return true;
      }else{
          count = 0;
      }
      if(count+2<c){
          break
      }
  }
  return false;
}
//up to bottom
function diagonalCheck(col,row,color,board){
  let count = 0;
  let c = col-row>=0?col-row:0;
  let r = row-col>=0?row-col:0;
  while(c<7&&r<7){
      if(checkContent(c,r,color,board)){
          count++;
          if(count===4)return true;
      }else{
          count = 0;
      }
      //break check
      c++;
      r++;
  }
  return false
}
//bottom up
function OppositeDiagonalCheck(col,row,color,board){
  let count = 0;
  let r = col+row<=6?col+row:6;
  let c = col+row-6>=0?row+col-6:0;
  while(c<=6&&c>=0&&r<=6&&r>=0){
      if(checkContent(c,r,color,board)){
          count++;
          if(count===4)return true;
      }else{
          count = 0;
      }
      //break check
      c++;
      r--;
  }
  return false
}


function checkContent(c,r,content,board){
  console.log(c,r,content,board);
  if(board[c][r]===`${content}`){
      return true
  }
  return false
}

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
    this.board = [[,,,,,,],
                  [,,,,,,],
                  [,,,,,,],
                  [,,,,,,],
                  [,,,,,,],
                  [,,,,,,],
                  [,,,,,,]]
    this.currentPlayer = 'red';
    this.finished = false;

    this.updateCellEvent = new Event();
    this.victoryEvent = new Event();
    this.drawEvent = new Event();

  }
  
  play(columnNumber) {
    if (this.finished ) { return false; }
    const rowNumber = this.board[columnNumber].findIndex(element => element===undefined)
    //if(rowNumber<0)...
    this.board[columnNumber][rowNumber] = this.currentPlayer;
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
    console.log(this.board);
    const draw = this.board.every(columnArr =>columnArr[6]==='red'||columnArr[6]==='yellow');    
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
        this.column.addEventListener('click', () => {this.playEvent.trigger(i);
        });
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

    this.view.playEvent.addListener(columnNumber => {this.model.play(columnNumber); });
    this.model.updateCellEvent.addListener((data) => { this.view.updateCell(data); });
    this.model.victoryEvent.addListener(winner => { this.view.victory(winner); });
    this.model.drawEvent.addListener(() => { this.view.draw(); });
  }
}

const app = new Controller();
