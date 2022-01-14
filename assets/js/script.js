let intro = "Click to play";
let board;
let board_size = 0;
let board_name = '';
let WINNING_SET = [];

    /*
let new_array = [];
/**
 * for a default 3 X 3 board the min moves the players can make
 * before a winner emerges is 5. the larger the board the higher the number.
 * e.g 4 X 4 board requires a minimum of 7 moves.
 */
let min_moves = (board_size * 2) - 1;
let moves = 0;
let cells = document.querySelectorAll('.cell');

let players = {
    x : {
        marker: 'X',
        score: 0,
        moves: []
    },
    o : {
        marker: 'O',
        score: 0,
        moves: []
    }
}
let ties = 0;

let current_player = players.o;
let game_draw = false;
let play_on =  true;

/**
 * Returns a N*2+2 by N array of
 * the possible winning sets for a given grid size of N.
 * For example: 
 * Given a grid size of 3 it returns an 8 by 3 multi-dimensional array.
 *
 * @param int grid_size
 * @returns [][]
 */
function createWinningSet(grid_size)
{
    let array_grid = [];
    let row;
    
    //first possible set WA. This is named WA just for reference in the comments.
    for (let i = 0; i<grid_size; i++) {
        array_grid[i] = [];
        for (let j=0; j<grid_size; j++) {
            array_grid[i][j] = i * grid_size + j;
        }
        row = i;
    }

    //Tranpose the first set (WA) of array generated to get the next possible set
    for (let i = 0; i < grid_size; i++) {
        let idx = i + grid_size;
        array_grid[idx] = [];
        for (let j=0; j<grid_size; j++) {
            array_grid[idx][j] = array_grid[j][i];
        }
        row = idx;
    }
    
  //last two rows are the diagnoals of the first set of array (WA) generated.
    array_grid[row+1] = [];
    array_grid[row+2] = [];
   
    let cols = grid_size - 1;
    for (let i =0; i<grid_size; i++) {
        array_grid[row+1][i] = array_grid[i][i];
        array_grid[row+2][i] = array_grid[i][cols];
        cols--;
    }

    return array_grid;
}

/**
 * Set the value on the cell to the current player if empty.
 * When player clicks on an empty cell the board is also updated.
 */
function markCell() {
    let div = this;
    let idx = div.getAttribute("data-cell-index");
    if (board[idx] === null) {
        board[idx] = current_player.marker;
        div.innerText = current_player.marker;
        moves++;
        updateStatus();
        current_player = current_player === players.o ? players.x : players.o;

    }
}

function startGame(level = 3)
{
    setWiningSet(level);
    board_size = level;
    let size = board_size ** 2;
    board = new Array(size).fill(null);
    clearBoard();
}

function setWiningSet(level)
{
  
    if (WINNING_SET.length !== level*2+2) {
        WINNING_SET = createWinningSet(level);
    }

}

function resetGame()
{
    if (Array.isArray(board) && board.length === board_size ** 2) {
        board.fill(null);
        clearBoard();
    } else {
        startGame(board_size);
    }
    document.getElementById('game_status').innerText = intro;
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => cell.addEventListener('click', markCell));
}

function clearBoard()
{
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

/**
 * checks the board to see if a game has been won, lost or drawn by current player.
 * Check for a win if moves made so far is equal or more than min moves
 */
function updateStatus()
{
   if (gameWon()) {
       game_draw = false;
       updateScoreBoard(current_player);
       endGame(current_player.marker + ' has won!');
      
   } else if(!board.some((elts) => elts === null)) {
        game_draw = true;
        updateScoreBoard(current_player);
        endGame(`It's a DRAW!!!`);
   }
}

function updateScoreBoard(current_player)
{
    if (game_draw) {
        ties++;
        document.getElementById("score_board_tie").innerText = ties;
    } else {
        current_player.score++;
        board_name = current_player == players.o ? 'score_board_o' : 'score_board_x';
        document.getElementById(board_name).innerText = current_player.score;
    }
}

function gameWon()
{
    if (moves >= min_moves) {
        return WINNING_SET.some((combination) => {
            if (current_player.marker == board[combination[0]]) {
                for (let i = 0; i < board_size; i++) {
                    if (current_player.marker != board[combination[i]])
                        return false;
                }
                return true;
            }
            return false;
        });
    }
}

/**
 * Set board size when before game play starts or after it ends
 * resizes the board using the selected board size and
 * calls the function to create a new winning set if the board size selected is different
 *
 * @param {int} size 
 */
function setBoard(size)
{
    let parent = document.getElementById("game-board");
    let lastChild = parent.lastElementChild;
    let attr_value = lastChild.getAttribute("data-cell-index");
    let n = (size * size) -1;
   
    if (attr_value === n) {
        return;
    }

    new_class = `cell-${size}`;
    parent.classList.replace(parent.classList[1],new_class);

    if (attr_value < n) { 
        //add cells
        while (attr_value < n) {
            attr_value++;

            let node = document.createElement('div');
            node.setAttribute("data-cell-index", attr_value);
            node.setAttribute("class" , "cell");
            parent.appendChild(node);
        }
   
    } else {
         //remove cells
        while (attr_value > n) {
            parent.removeChild(parent.lastChild);
            attr_value--;
        }
        
    }

    //document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");
    
   board_size = size;
   resetGame();
        // <div data-cell-index="8" class="cell"></div>
        //var x = document.getElementById("myList").lastChild.innerHTML;
        //document.getElementById("myId").getAttribute("class");
        //<div data-cell-index="8" class="cell"></div>
        //game-board
    
}

/**
 * Prevents player from making another move.
 * When a ends as a result of a win or draw,
 * the event listener on the boxes are removed
 * and player can continue playing by clicking on the restart button.
 */
function endGame(message)
{
    cells.forEach((cell) => cell.removeEventListener('click', markCell));
    let elt = document.getElementById('game_status');
    elt.innerText = message;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("board_option").addEventListener('change', function(evt){
        let size = parseInt((evt.target.value));
        size = isNaN(size) ? 3 : size;
        setBoard(size);   
    })

    startGame();
    cells.forEach((cell) => cell.addEventListener('click', markCell));

    let restart_button = document.getElementById('restart_game');
    restart_button.addEventListener('click', resetGame);
});

