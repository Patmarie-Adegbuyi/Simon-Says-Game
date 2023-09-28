/*I used the following link as a refernce for my code
https://www.youtube.com/watch?v=n_ec3eowFLQ */

let order = []; //will keep track of the order of the lights' flashes
let playerOrder = [];  //will keep track of the order the player is pressing the lights in
let flash;
let round; //keep track of what round we're on
let good; //whether player has hit all the colours in the right order or not
let compTurn; //indicates whether its the computer's turn or not
let intervalId;
let win; //indicates whether player has won or not

const green = document.querySelector("#frontTopLeft");
const red = document.querySelector("#frontTopRight");
const yellow = document.querySelector("#frontBottomLeft");
const blue = document.querySelector("#frontBottomRight");

const progress = document.querySelector("#progress");
const highestScore = document.querySelector("#highestScore");
const isOnLight = document.querySelector('.isOnLight');
const start = document.getElementById('start');

/*when start button is clicked, game status indicator will change from red to green*/
start.addEventListener('click', () => {
    isOnLight.style.backgroundColor = 'green';
    // game will begin 3 seconds after light turns green
    const myTimeout = setTimeout(play, 3000);
});
  
function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    round = 1;
    progress.innerHTML = 1;
    good = true;
    //will create a random sequence of the four colours to fit an array of size 20, for the 20 rounds of the game
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    //game starts with the computer flashing the lights
    compTurn = true;
    //will run the gameTurn function every 800 miliseconds
    intervalId = setInterval(gameTurn, 800);
}
  
function gameTurn() {
    /*If the number of times the computer has flashed the ;ights
    is equal to the round, the computer's turn is over */
    if (flash == round) {
      clearInterval(intervalId);
      compTurn = false;
      clearColor();
    }
  
    if (compTurn) {
      clearColor();
      setTimeout(() => {
        if (order[flash] == 1) one(); //flash green
        if (order[flash] == 2) two(); //flash red
        if (order[flash] == 3) three(); //flash yellow
        if (order[flash] == 4) four(); //flash blue
        flash++; 
      }, 200);
    }
}

  
function one() {
    green.style.backgroundColor = "rgb(14, 241, 14)";
}
  
function two() {
    red.style.backgroundColor = "rgb(235, 20, 20)";
}
  
function three() {
    yellow.style.backgroundColor = "rgba(255, 255, 13, 0.925)";
}
  
function four() {
    blue.style.backgroundColor = "rgba(32, 32, 224, 0.966)";
}

//colour of buttons when not clicked on
function clearColor() {
    green.style.backgroundColor = "rgba(24, 156, 24, 0.781)";
    red.style.backgroundColor = "rgb(201, 45, 45)";
    yellow.style.backgroundColor = "rgba(231, 231, 22, 0.842)";
    blue.style.backgroundColor = "rgba(8, 8, 151, 0.637)";
}

//colour of buttons when clicked on
function flashColor() {
    green.style.backgroundColor = "rgb(14, 241, 14)";
    red.style.backgroundColor = "rgb(250, 5, 5)";
    yellow.style.backgroundColor = "rgba(255, 255, 13, 0.986)";
    blue.style.backgroundColor = "rgba(32, 32, 224, 0.966)";
}

//if green button is clicked on, flash it and check if its right
green.addEventListener('click', () => {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
    setTimeout(() => {
        clearColor();
    }, 300);
    }
})
  
//if red button is clicked on, flash it and check if its right
red.addEventListener('click', () => {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
    setTimeout(() => {
        clearColor();
    }, 300);
    }
})
  
//if yellow button is clicked on, flash it and check if its right
yellow.addEventListener('click', () => {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
    setTimeout(() => {
        clearColor();
    }, 300);
    }
})

//if blue button is clicked on, flash it and check if its right
blue.addEventListener('click', () => {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
    setTimeout(() => {
        clearColor();
    }, 300);
    }
})
  
function check() {
    //if what the player pressed is not what the computer generated...
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
        good = false;
    }

    //if player has won every round and not made any mistakes, they win the game
    if (playerOrder.length == 20 && good) {
      winGame();
    }

    //...all buttons will simultaneously flash 
    if (good == false) {
        flashColor();
        clearColor();
        flashColor();
        clearColor();
        flashColor();
        clearColor();
        flashColor();
        clearColor();
        flashColor();
        
        setTimeout(() => {
        clearColor();

        //progress goes back to zero
        progress.innerHTML = "00";

        //game status indicator will go back to red
        isOnLight.style.backgroundColor = 'rgb(226, 26, 26)';
      }, 800);
    }

    /*when a player has successfully passed a round, but havent won the game yet, 
    they will move to the next round and their progress will go up by 1*/
    if (round == playerOrder.length && good && !win) {
      round++;
      playerOrder = [];
      compTurn = true;
      flash = 0;
      progress.innerHTML = round;
      intervalId = setInterval(gameTurn, 800);
    }
  
}

//when the player wins the game, all 4 of the buttons will light up
function winGame() {
    flashColor();
    win = true;
}
