var cvs,
    ctx,
    UNIT = 20,
    grid,
    deadColor = '#b9d4bb',
    aliveColor = '#4b614d',
    generation = 0,
    speed = 1,
    startBtn,
    stopBtn,
    clearBtn,
    speedInput,
    interval,
    generationText,
    speedText;

window.addEventListener("load", start());

function start(){
    cvs = document.querySelector('canvas');    
    ctx = cvs.getContext('2d');
    cvs.addEventListener('click', clickHandler);
    generateGrid();
    speedInput = document.querySelector('#speed');
    speedText = document.querySelector('#speedNb');
    generationText = document.querySelector("#generation");
    startBtn = document.querySelector('#start');
    stopBtn = document.querySelector('#stop');
    clearBtn = document.querySelector('#clear');
    startBtn.addEventListener('click', startGame);
    stopBtn.addEventListener('click', stopGame);
    speedInput.addEventListener('change', speedHandler);
    clearBtn.addEventListener('click', clearGrid);
    window.setInterval(renderGrid, 1000/60);
}

function clearGrid(){
    stopGame();
    generateGrid();
    renderGrid();
    generation = 0;
    generationText.innerText = generation;

}

function speedHandler(){
    speedText.innerText = speedInput.value;
}

function startGame(){
    speed = speedInput.value; 
    if(speed > 20)
        speed = 20;
    startBtn.style.display = 'none';
    stopBtn.style.display = '';
    interval = window.setInterval(logic, 1000/speed);
}

function stopGame(){
    stopBtn.style.display = 'none';
    startBtn.style.display = '';
    clearInterval(interval);
}

function logic(){
    var liveCells = 0;
    generation++;
    generationText.innerText = generation;
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid[i].length; j++){
            if(i != grid.length-1){
                if(grid[i+1][j].color == aliveColor){
                    liveCells++;
                }
            }
            if(i != 0){
                if(grid[i-1][j].color == aliveColor){
                    liveCells++;
                }
            }
            if(j != grid[i].length-1){
                if(grid[i][j+1].color == aliveColor){
                    liveCells++;
                }
            }
            if(j != 0){
                if(grid[i][j-1].color == aliveColor){
                    liveCells++;
                }
            }
            if(i != grid.length-1 && j != grid[i].length-1){
                if(grid[i+1][j+1].color == aliveColor){
                    liveCells++;
                }
            }
            if(i != grid.length-1 && j != 0){
                if(grid[i+1][j-1].color == aliveColor){
                    liveCells++;
                }
            }
            if(i != 0 && j != grid[i].length-1){
                if(grid[i-1][j+1].color == aliveColor){
                    liveCells++;
                }
            }
            if(i != 0 && j != 0){
                if(grid[i-1][j-1].color == aliveColor){
                    liveCells++;
                }
            }
            grid[i][j].liveCells = liveCells;
            liveCells = 0;
        }
    }
    // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid[i].length; j++){
            if(grid[i][j].color == aliveColor && grid[i][j].liveCells < 2){
                grid[i][j].color = deadColor; 
            } else if (grid[i][j].color == aliveColor && (grid[i][j].liveCells == 2 || grid[i][j].liveCells == 3)) { 
                grid[i][j].color = aliveColor;
            } else if (grid[i][j].color == aliveColor && grid[i][j].liveCells > 3) {
                grid[i][j].color = deadColor;
            } else if (grid[i][j].liveCells == 3 && grid[i][j].color == deadColor) { 
                grid[i][j].color = aliveColor;
            }
        }
    }
    
}

function clickHandler(evt){
    var left = cvs.offsetLeft,
        top = cvs.offsetTop,
        x = evt.pageX - left,
        y = evt.pageY - top;

    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[i].length; j++){
            if(grid[i][j].x <= x && grid[i][j].x+UNIT >= x && grid[i][j].y <= y && grid[i][j].y+UNIT >= y){
                if(grid[i][j].color == deadColor){
                    grid[i][j].color = aliveColor;
                } else {
                    grid[i][j].color = deadColor;
                }
            }
        }
    }
}

function generateGrid(){
   var ROWS = cvs.height/UNIT,
       COLS  = cvs.width/UNIT;
   grid = [...Array(ROWS)].map(e => Array(COLS));
   for(var i=0; i<COLS; i++){
        for(var j=0; j<ROWS; j++){
            grid[j][i] = {x: i*UNIT, y: j*UNIT, color: deadColor, liveCells: 0};
        }
   } 
}

function renderGrid(){
    ctx.strokeStyle = '#869a88';
    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[i].length; j++){
            ctx.fillStyle = grid[i][j].color;
            ctx.fillRect(grid[i][j].x+1, grid[i][j].y+1, UNIT-1, UNIT-1);
            ctx.strokeRect(grid[i][j].x, grid[i][j].y, UNIT, UNIT);
        }
    }
}
