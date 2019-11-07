//slots.js
var squares=['#a1', '#a2', '#a3', '#b1', '#b2', '#b3', '#c1', '#c2', '#c3']
var colors=["black", "red", "blue", "orange", "green", "yellow"]
var aRow=['#a1', '#a2', '#a3']
var bRow=['#b1', '#b2', '#b3']
var cRow=['#c1', '#c2', '#c3']
var money=100;

/** Run
 * Called by button input, calls other functions and updates html
 */
function run(){
  if(canBet()){
    for (i in squares){
      document.querySelector(squares[i]).style.backgroundColor=colors[generateColor()];
      document.querySelector(squares[i]).innerHTML="<center><b>"+generateNumber()+"</b></center>";
    }
    checkHorizontals();
    money=money+parseFloat(document.querySelector("#payout").innerText)
    document.querySelector("#money").innerText=money;
  }
  else{
    window.alert("You do not have enough money to bet!")
  }
}

/** Generate Color
 * returns a random integer from 0 to 5
 */
function generateColor(){
  do{
    x=Math.floor(Math.random()*10);
  }while(x>5);
  return x;
}

/** Generate Number
 * returns a random integer from 1 to 10
 */
function generateNumber(){
  x=Math.ceil(Math.random()*10);
  return x;
}

/** Check Diagonals
 * returns diagSum, the sum of matching Diagonals or bonus money
 * checks for mathcing colors in diagonal, blackout, and x patterns
 */
function checkDiagonals(){
  let diagSum=0;
  // negative slope diagonal
  if(allChecked()){
    if((color("#a1")==color("#b2"))&&(color("#a1")==color("#c3"))){
        diagSum=diagSum+parseFloat(document.querySelector("#a1").innerText);
        diagSum=diagSum+parseFloat(document.querySelector("#b2").innerText);
        diagSum=diagSum+parseFloat(document.querySelector("#c3").innerText);
    }
    // positive slope diagonal
    if((color("#a3")==color("#b2"))&&(color("#a3")==color("#c1"))){
        diagSum=diagSum+parseFloat(document.querySelector("#a3").innerText);
        diagSum=diagSum+parseFloat(document.querySelector("#b2").innerText);
        diagSum=diagSum+parseFloat(document.querySelector("#c1").innerText);
    }
    //Blackout bonus
    if(isBlackOut()){
      diagSum=1000000;
    }
    //X pattern bonus
    else if((color("#a3")==color("#b2"))&&(color("#a3")==color("#c1"))&&(color("#a3")==color("#a1"))&&(color("#a1")==color("#b2"))&&(color("#a1")==color("#c3"))){
      diagSum=100;
    }
  }
  return diagSum;
}

/** Check Horizontals
 * Checks which rows are of matching colors
 * calls checkDiagonals()
 * Updates payout with sum, the sum of all numbers in a matching row
 */
function checkHorizontals(){
  let sum=0;
  //check top row for matches if selected
  if(document.getElementById("aRow").checked==true){
    sum=sum-1;
    if((color("#a1")==color("#a2"))&&(color("#a1")==color("#a3"))){
      for(i in aRow){
        sum=sum+parseFloat(document.querySelector(aRow[i]).innerText);
      }
    }
  }
  //check middle row for matches if selected
  if(document.getElementById("bRow").checked==true){
    sum=sum-1;
    if((color("#b1")==color("#b2"))&&(color("#b1")==color("#b3"))){
      for(i in bRow){
        sum=sum+parseFloat(document.querySelector(bRow[i]).innerText);
      }
    }
  }
  //check bottom row for matches if selected
  if(document.getElementById("cRow").checked==true){
    sum=sum-1;
    if((color("#c1")==color("#c2"))&&(color("#c1")==color("#c3"))){
      for(i in cRow){
        sum=sum+parseFloat(document.querySelector(cRow[i]).innerText);
      }
    }
  }
  document.querySelector("#payout").innerText=sum+checkDiagonals();
}

/** Color
 * @param {string} n the id string of one of the squares
 * returns the color of the input's div id
 */
function color(n){
  return(document.querySelector(n).style.backgroundColor);
}

/** is Black Out
 * Checks if the entire board is the same color
 * returns boolean blackout
 */
function isBlackOut(){
  blackout=true;
  for(i in squares){
    if(i>0){
      if(color(squares[i])==color(squares[i-1])&&blackout==true){
        blackout=true;
      }
      else{
        blackout=false;
      }
    }
  }
  return blackout;
}

/** All checked
 * Checks if all checkboxes are marked
 * returns boolean checked
 */
function allChecked(){
  var checked=false;
  if(document.getElementById("aRow").checked==true){
      if(document.getElementById("bRow").checked==true){
          if(document.getElementById("cRow").checked==true){
            checked=true;
          }
      }
  }
  return checked;
}

/** Num checked
 * Checks amount of checkboxes marked
 * returns number of checked
 */
function numChecked(){
  var numChecked=0;
  if(document.getElementById("aRow").checked==true){
    numChecked=numChecked+1;
  }
  if(document.getElementById("bRow").checked==true){
  numChecked=numChecked+1;
  }
  if(document.getElementById("cRow").checked==true){
  numChecked=numChecked+1;
  }
  return numChecked;
}

/** Can Bet
 * Compares the amount of money the player has to how many checboxes are marked
 * returns boolean true or false if they can bet
 */
function canBet(){
  if(numChecked()==1&&money<1){
    return false;
  }
  else if(numChecked()==2&&money<2){
    return false;
  }
  else if(numChecked()==3&&money<3){
    return false;
  }
  else{
    return true;
  }
}
