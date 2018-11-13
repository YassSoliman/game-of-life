var cvs,
    ctx,
    UNIT = 20,
    grid;

window.addEventListener("load", start());

function start(){
    cvs = document.querySelector('canvas');    
    ctx = cvs.getContext('2d');
    cvs.addEventListener('click', clickHandler);
    generateGrid();
    window.setInterval(renderGrid, 1000/25);
}

function clickHandler(evt){
    var left = cvs.offsetLeft,
        top = cvs.offsetTop,
        x = evt.pageX - left,
        y = evt.pageY - top;

    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[i].length; j++){
            if(grid[i][j].x <= x && grid[i][j].x+UNIT >= x && grid[i][j].y <= y && grid[i][j].y+UNIT >= y){
                grid[i][j].color ='#2f7334';
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
            grid[j][i] = {x: i*UNIT, y: j*UNIT, color: 'white'};
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
