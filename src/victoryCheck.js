const board = Array(7).fill(Array(7))
const play = [3,3]
//column check
function columnCheck(){
    let count = 0;
    for (let r=0; r < 7; r++){
        if(checkContent([play[0],r],color)){
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
function rowCheck(){
    let count = 0; 
    for (let c=0; c < 7; c++){
        if(checkContent([c,play[1]],color)){
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
function diagonalCheck(){
    let count = 0;
    let c = play[0]-play[1]>=0?play[0]-play[1]:0;
    let r = play[1]-play[0]>=0?play[1]-play[0]:0;
    while(c<7&&r<7){
        if(checkContent([c,r],color)){
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
function OppositeDiagonalCheck(){
    let count = 0;
    let r = play[0]+play[1]<=6?play[0]+play[1]:6;
    let c = play[0]+play[2]-6>=0?play[1]+play[0]-6:0;
    while(c>=0&&r<=6&&r>=0){
        console.log(c,r);
        if(checkContent([c,r],color)){
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


function checkContent([c,r],content){
    if(board[c][r]===`${content}`){
        return true
    }
    return false
}

module.export = {rowCheck,columnCheck,diagonalCheck,OppositeDiagonalCheck} ;