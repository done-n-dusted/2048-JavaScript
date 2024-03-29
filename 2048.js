var board;
var rows = 4;
var columns = 4;
var score = 0;

window.onload = function(){
    setGame();
}

function setGame(){
    score = 0;
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    spawn();
    spawn();
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + '#' + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
}

function renderBoard(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + '#' + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
}

function spawn(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c] == 0){
                if(Math.random() > 0.5){
                    board[r][c] = 2;
                    if(score > 32){
                        board[r][c] += 2*Math.floor(Math.random() * 2);
                    } 
                }
                return true; //spawn successful
            }
        }
    }
    return false; //spawn failed
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    // console.log("rendering tile, num = " + tile.id + " " + num.toString())
    // console.log("tile data = " + tile.innerText);
    if(num > 0){
        tile.innerText = num;
        if (num <= 2048){
            tile.classList.add("tile-" + num.toString());
        }
        else{
            tile.classList.add("tile-beyond");
        }
    }
}

function checkPossible(){
    for(let r = 1; r < rows - 1; r++){
        for(let c = 1; c < columns - 1; c++){
            let curr = board[r][c];
            if(curr == board[r-1][c] || curr == board[r+1][c] ||
                curr == board[r][c-1] || curr == board[r][c+1]){
                    return true;
                }
        }
    }
    return false;
}

document.addEventListener("keyup", (e) => {
    let spawn_status = false;
    if(e.code == "ArrowLeft"){
        console.log("left arrow");
        slideLeft();
        spawn_status = spawn();
    }

    else if(e.code == "ArrowRight"){
        console.log("right arrow");
        slideRight();
        spawn_status = spawn();
    }

    else if(e.code == "ArrowDown"){
        console.log("down arrow");
        slideDown();
        spawn_status = spawn();
    }

    else if(e.code == "ArrowUp"){
        console.log("up arrow");
        slideUp();
        spawn_status = spawn();
    }

    if(spawn_status == false){
        if(!checkPossible()){
            setGame();
        }    
    }
    document.getElementById("score").innerText = score;
    renderBoard();
})

function slideLeft(){
    for(let r = 0; r < rows; r++){
        // console.log("for r");
        var curr_row = board[r];
        // console.log("curr_row: " + curr_row);
        // remove zeros
        curr_row = curr_row.filter(num => num != 0);
        // console.log("rem zeros curr_row: " + curr_row)
        // update
        let i = 0;
        while(i < curr_row.length){
            if(curr_row[i] == curr_row[i+1]){
                curr_row[i] = 2*curr_row[i];
                curr_row[i+1] = 0;
                score += curr_row[i];
                i += 1;
            }
            i+=1;
        }
        // console.log("update curr_row: " + curr_row);

        // remove zeros
        curr_row = curr_row.filter(num => num != 0);
        // console.log("rem zeros again curr_row: " + curr_row);

        // update
        while(curr_row.length != columns){
            curr_row.push(0);
        }
        // console.log("final curr_row: " + curr_row);
        board[r] = curr_row;
        // console.log("board[r]: " + board[r]);
    }
}

function slideRight(){
    for(let r = 0; r < rows; r++){
        var curr_row = board[r];
        // console.log("curr_row: " + curr_row);
        
        // remove zeros
        curr_row = curr_row.filter(num => num != 0);
        // console.log("rem zeros curr_row: " + curr_row)
        
        //update 
        let i = curr_row.length - 1;
        while(i > 0){
            if(curr_row[i] == curr_row[i-1]){
                curr_row[i] = 2*curr_row[i];
                curr_row[i-1] = 0;
                score += curr_row[i];
                i -= 1;
            }
            i -= 1;
        }
        // console.log("update curr_row: " + curr_row);

        //remove zeros
        curr_row = curr_row.filter(num => num != 0);
        // console.log("rem zeros again curr_row: " + curr_row);

        while(curr_row.length != columns){
            curr_row.unshift(0);
        }

        // console.log("final curr_row: " + curr_row);
        board[r] = curr_row;
        // console.log("board[r]: " + board[r]);

    }
}

function slideUp(){
    for(let c = 0; c < columns; c++){
        let curr_col = [];
        for(let r = 0; r < rows; r++){
            curr_col.push(board[r][c]);
        }

        // console.log("curr_col: " + curr_col);
        // remove zeros
        curr_col = curr_col.filter(num => num != 0);
        // console.log("rem 0s curr_col: " + curr_col);

        //update
        let i = 0;
        while(i < curr_col.length){
            if(curr_col[i] == curr_col[i+1]){
                curr_col[i] *= 2;
                curr_col[i+1] = 0;
                score += curr_col[i];
                i += 1;
            }
            i += 1;
        }
        // console.log("addn curr_col: " + curr_col);

        //remove zeros
        curr_col = curr_col.filter(num => num != 0);

        // console.log("rem 0s curr_col: " + curr_col);

        //load zeros
        while(curr_col.length != columns){
            curr_col.push(0);
        }
        // console.log("final curr_col: " + curr_col);

        // update board
        for(let r = 0; r < rows; r++){
            board[r][c] = curr_col[r];
        }
    }
}

function slideDown(){
    for(let c = 0; c < columns; c++){
        let curr_col = [];
        for(let r = 0; r < rows; r++){
            curr_col.push(board[r][c]);
        }

        // console.log("curr_col: " + curr_col);
        // remove zeros
        curr_col = curr_col.filter(num => num != 0);
        // console.log("rem 0s curr_col: " + curr_col);

        //update
        let i = curr_col.length - 1;
        while(i > 0){
            if(curr_col[i] == curr_col[i-1]){
                curr_col[i] *= 2;
                curr_col[i-1] = 0;
                score += curr_col[i];
                i -= 1;
            }
            i -= 1;
        }
        // console.log("addn curr_col: " + curr_col);

        //remove zeros
        curr_col = curr_col.filter(num => num != 0);

        // console.log("rem 0s curr_col: " + curr_col);

        //load zeros
        while(curr_col.length != columns){
            curr_col.unshift(0);
        }
        // console.log("final curr_col: " + curr_col);

        // update board
        for(let r = 0; r < rows; r++){
            board[r][c] = curr_col[r];
        }
    }
}