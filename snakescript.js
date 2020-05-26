const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 20;
var scoreDoc = document.getElementById("scoredoc");



var snake = [];
snake[0] = {
    x : 9 * box,
    y : 9 * box
}

let food = {
    x : Math.floor(Math.random()*17 + 1)*box,
    y : Math.floor(Math.random()*15 + 3)*box
}

let score = 0;

var  d;

document.addEventListener("keydown",direction);

function direction(event){
    if(event.keyCode === 37 && d!="RIGHT"){
         d = "LEFT";
    }
    else if(event.keyCode === 38 && d!="DOWN"){
        d = "UP";
    }
    else if(event.keyCode === 39 && d!="LEFT"){
        d = "RIGHT";
    }
    else if(event.keyCode === 40 && d!="UP"){
        d = "DOWN";
    }
}


function collision(head, array){
    for(let i=0; i<snake.length; i++)
    {
        if(head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    ctx.clearRect(0, 0, 380, 380);
    for(let i=0; i< snake.length; i++){
        ctx.fillStyle = (i === 0) ? "orange" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

   

    if(snakeX == food.x && snakeY == food.y){
        score++;
        document.getElementById("scoredoc").innerHTML = score;
        food = {
            x : Math.floor(Math.random()*17 + 1)*box,
            y : Math.floor(Math.random()*17 + 1)*box
        }
    } else {
        snake.pop();
    }

    if(d == "LEFT") snakeX-=box;
    if(d == "RIGHT") snakeX+=box;
    if(d == "UP") snakeY-=box;
    if(d == "DOWN") snakeY+=box;

    if(snakeX < 0){
        snakeX = 18*box;
    }
    if(snakeY < 0){
        snakeY = 18*box;
    }
    if(snakeX > 18*box)
    {
        snakeX = 0;
    }
    if(snakeY > 18*box)
    {
        snakeY = 0;
    }

    var newHead = {
        x : snakeX,
        y : snakeY
    }

  


    if(collision(newHead, snake))
    {
        clearInterval(game);

    }
   

   
    snake.unshift(newHead);

     ctx.fillStyle = "#DE5E2B";
     ctx.fillRect(food.x, food.y, 20, 20);
     
     
     
}

var game = setInterval(draw,100);

function dothis()
{
    clearInterval(game);
    snake = [];
    snake[0] = {
        x : 9 * box,
        y : 9 * box
    }
    score=0;
    document.getElementById("scoredoc").innerHTML = score;
    game = setInterval(draw,100);
}

