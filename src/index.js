"use strict";

class Model{
    constructor(){
        
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
