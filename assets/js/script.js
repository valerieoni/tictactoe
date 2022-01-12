
let board;
let board_size = 3;
let cells = document.querySelectorAll('.cell');
let players = {
    x : 'X',
    o : 'O'
}

let current_player = players.o;

/**
 * Set the value on the cell to the current player if empty.
 * When player clicks on an empty cell the board is also updated.
 */
function markCell() {
    let div = this;
    let idx = div.getAttribute("data-cell-index");
    if (board[idx] === null) {
        board[idx] = current_player;
        div.innerText = current_player;
       
        current_player = current_player === players.o ? players.x : players.o;
    }
}

function startGame(level = 3)
{
    board_size = level;
    let size = board_size ** 2;
    board = new Array(size).fill(null);
    clearBoard();

}

function resetGame()
{
    if (Array.isArray(board)) {
        board.fill(null);
    } else {
        startGame();
    }
    clearBoard();
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
 * 
 */
function checkStatus()
{

}

/**
 * Prevents player from making another move.
 * When a ends as a result of a win or draw,
 * the event listener on the boxes are removed
 * and player can continue playing by clicking on the restart button.
 */
function endGame()
{
    cells.forEach((cell) => cell.removeEventListener('click', markCell));
}

cells.forEach((cell) => cell.addEventListener('click', markCell));