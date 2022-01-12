let intro = "Click to play";
let board;
let board_size = 3;
const WINNING_SET = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];


/**
 * for a default 3 X 3 board the min moves the players can make
 * before a winner emerges is 5. the larger the board the higher the number.
 * e.g 4 X 4 board requires a minimum of 7 moves.
 */
let min_moves = (board_size * 2) - 1;
let moves = 0;
let cells = document.querySelectorAll('.cell');
let players = {
    x : 'X',
    o : 'O'
}

let current_player = players.o;

let PLAY_ON = true;
let WINNER_FOUND = false;
let GAME_DRAW = false;

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
        moves++;
        updateStatus();
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
    document.getElementById('game_status').innerText = intro;
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
    endGame(current_player + ' has won!');
   } else if(!board.some((elts) => elts === null)) {
    endGame(`It's a DRAW!!!`);
   }
}

function gameWon()
{
    if (moves >= min_moves) {
        return WINNING_SET.some((combination) => {
            if (current_player == board[combination[0]] && board[combination[0]] == board[combination[1]] && board[combination[0]] == board[combination[2]]) {
                return true;
            }
            return false;
        });
    }
}

function boardFilled()
{

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
    console.log(message);
}

document.addEventListener("DOMContentLoaded", function() {
    startGame();
    cells.forEach((cell) => cell.addEventListener('click', markCell));

    let restart_button = document.getElementById('restart_game');
    restart_button.addEventListener('click', resetGame);
});
