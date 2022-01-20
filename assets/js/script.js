let intro = "Who's playing next?";
let board;
let boardSize = 0;
let boardName = '';
let winningSet = [];

/**
 * for a default 3 X 3 board the min moves the players can make
 * before a winner emerges is 5. the larger the board the higher the number.
 * e.g 4 X 4 board requires a minimum of 7 moves.
 */
let minimumMoves = (boardSize * 2) - 1;
let totalMovesByPlayers = 0;
let cells = document.querySelectorAll('.cell');

let players = {
    x : {
        marker: 'X',
        score: 0,
        color: 'red'
    },
    o : {
        marker: 'O',
        score: 0,
        color: 'blue'
    }
};

let ties = 0;
let currentPlayer = players.o;
let isTie = false;
let playOn =  false;
let vsBot = false;

/**
 * If a game isn't already started then set the game mode
 * and update the button to show so players know which one is on.
 * When game mode is set to bot then the player takes the first turn.
 * X is assigned as the bot's marker while player is assigned the marker o.
 */
function setGameMode()
{
  let buttonClicked = this;
  let prevMode = document.getElementsByClassName("selected-btn")[0];
 
  if (playOn === false && prevMode.id != buttonClicked.id) {
    vsBot = buttonClicked.id == 'bot';
    prevMode.classList.remove("selected-btn");
    buttonClicked.classList.add("selected-btn");
    if (vsBot) {
        currentPlayer = players.o;
    }
  }
}

/**
 * Returns a N*2+2 by N array of
 * the possible winning sets for a given grid size of N.
 * For example: 
 * Given a grid size of 3 it returns an 8 by 3 multi-dimensional array
 * [[0, 1, 2], [3, 4, 5], [6, 7, 8],
 * [0, 3, 6], [1, 4, 7], [2, 5, 8], 
 * [0, 4, 8], [2, 4, 6]]
 * 
 * - create the horizontal array set for a 3 X3 that would be [0, 1, 2], [3, 4, 5], [6, 7, 8]
 * - given the first array which is the gorizontal array created, transpose that to get the next set, [0, 3, 6], [1, 4, 7], [2, 5, 8]
 * - get the diagonals from the first array ([0, 1, 2], [3, 4, 5], [6, 7, 8]) which will result to [0, 4, 8], [2, 4, 6]
 *
 * @param int gridSize
 * @returns [][]
 */
function createWinningSet(gridSize)
{
    let arrayGrid = [];
    let row;
    
    //first set of arrayGrid. This is named WA just for reference in the comments.
    for (let i = 0; i<gridSize; i++) {
        arrayGrid[i] = [];
        for (let j=0; j<gridSize; j++) {
            arrayGrid[i][j] = i * gridSize + j;
        }
        row = i;
    }

    //Tranpose the first set (WA) of array generated to get the next possible set
    for (let i = 0; i < gridSize; i++) {
        let idx = i + gridSize;
        arrayGrid[idx] = [];
        for (let j=0; j<gridSize; j++) {
            arrayGrid[idx][j] = arrayGrid[j][i];
        }
        row = idx;
    }
    
  //last two rows are the diagnoals of the first set of array (WA) generated.
    arrayGrid[row+1] = [];
    arrayGrid[row+2] = [];
   
    let cols = gridSize - 1;
    for (let i =0; i<gridSize; i++) {
        arrayGrid[row+1][i] = arrayGrid[i][i];
        arrayGrid[row+2][i] = arrayGrid[i][cols];
        cols--;
    }

    return arrayGrid;
}

/**
 * Set the value on the cell to the current player if empty.
 * When player clicks on an empty cell the board is also updated.
 */
function play() {
    playOn = true;
    let idx = this.getAttribute("data-cell-index"); 
    markCell(idx, currentPlayer);
    if (vsBot) {
        markCell(bestMove(), currentPlayer);
    }
}

/**
 * Updates board to display the marker of the player passed 
 * in the given the location (idx) on the board.
 * It also updates game status so player knows whose turn it is to play next.
 * 
 * @param {int} idx position on the board e.g 0 - 9 for a 3X3 board
 * @param {object} player 
 */
function markCell(idx, player)
{
    if (!isFullBoard()) {
        updateGameBoard(idx, player);
        board[idx] = player.marker;
        totalMovesByPlayers++;
        updateStatus();
        currentPlayer = player === players.o ? players.x : players.o;
        toggleTurn();
    }
    
}

function updateGameBoard(idx, player)
{
    let selectedSquare = document.getElementById(idx);
    selectedSquare.innerText = player.marker;
    selectedSquare.style.color = player.color;
}

function toggleTurn()
{
    let turn = document.getElementById("turn");

    if (null !== turn) {
        turn.innerText = currentPlayer.marker;
    }
}

/**
 * returns a random index from the available squares on the board
 */
function bestMove()
{
    let emptySquares = getEmptySquares();
    return emptySquares[Math.floor(Math.random()*emptySquares.length)];

}

/**
 * Returns a boolean to indicate whether or not all squares on the board have been marked.
 *
 * @returns boolean
 */
function isFullBoard()
{
    return getEmptySquares().length === 0;
}

/**
 * Returns an array of all empty squares on the board.
 * A board has no empty square if it's value is a number
 * cos the markers used to updated the board are X and O which are both string.
 * 
 * @returns array
 */
function getEmptySquares()
{
    return board.filter(elt => typeof elt == 'number');
}

/**
 * 
 * @param {int} level 
 */
function startGame(level = 3)
{
    setWiningSet(level);
    boardSize = level;
    let size = getTotalSquares(boardSize);
    fillBoard(size);
   clearGameBoard();
}

/**
 * 
 * @param {int} level 
 */
function setWiningSet(level)
{
    if (winningSet.length !== level*2+2) {
        winningSet = createWinningSet(level);
    }
}

/**
 * 
 * @param {int} size 
 */
function fillBoard(size)
{
    board = Array.from(Array(size).keys());
}

/**
 * Given a grid which is an integer value
 * return total squares expected on the board which is double the value passed in.
 * For example a 3 X 3 grid the expected input value is 3 and
 * expected result is 9
 *
 * @param {int} grid 
 * @returns int
 */
function getTotalSquares(grid)
{
    return grid * grid;
}

function resetGame()
{
    let totalSquares = getTotalSquares(boardSize);
    if (Array.isArray(board) && board.length === totalSquares) {
        fillBoard(totalSquares);
    } else {
        startGame(boardSize);
    }
    document.getElementById('game__status').innerHTML = `${intro} <span id="turn">${currentPlayer.marker}</span>`; 
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => cell.addEventListener('click', play));
    clearGameBoard();
}

function clearGameBoard()
{
    playOn = false;
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
   if (isGameWon()) {
       isTie = false;
       updateScoreBoard(currentPlayer);
       endGame(currentPlayer.marker + ' wins!!!');

   } else if(isFullBoard()) {
        isTie = true;
        updateScoreBoard(currentPlayer);
        endGame(`It's a DRAW!!!`);
   }
}

function updateScoreBoard(currentPlayer)
{
    if (isTie) {
        ties++;
        document.getElementById("score-board__tie").innerText = ties;
    } else {
        currentPlayer.score++;
        boardName = currentPlayer == players.o ? 'score-board__o' : 'score-board__x';
        document.getElementById(boardName).innerText = currentPlayer.score;
    }
}

/**
 * Checks enough moves have been made for a possible win to occur, if not then returns false.
 * E.g for a 3x3 board both players combined must have made at least 5 moves for the game to be won.
 * - If the total moves by both players is less than minimum moves in the case of a 3X3 board
 *   that would be 5 it returns false otherwise it checks if a winning match has been found and returns true | false.
 * - returns false if current player has not marked the first index.
 * 
 * @returns boolean
 */
function isGameWon()
{
    if (totalMovesByPlayers < minimumMoves) {
        return false;
    }
    return winningSet.some((combination) => {
        if (currentPlayer.marker !== board[combination[0]]) {
            return false;
        }
        for (let i = 0; i < boardSize; i++) {
            if (currentPlayer.marker != board[combination[i]])
                return false;
        }
        return true;
    });
    
}

/**
 * Set board size when before game play starts or after it ends
 * resizes the board using the selected board size and
 * calls the function to create a new winning set if the board size selected is different
 *
 * @param {int} size 
 */
function setGameBoard(size)
{
    let parent = document.getElementById("game-board");
    let lastChild = parent.lastElementChild;
    let attrValue = lastChild.getAttribute("data-cell-index");
    let n = (size * size) -1;
   
    if (attrValue === n) {
        return;
    }

    parent.classList.replace(parent.classList[1], `cell-${size}`);

    if (attrValue < n) { 
        //add cells
        while (attrValue < n) {
            attrValue++;

            let node = document.createElement('div');
            node.setAttribute("data-cell-index", attrValue);
            node.setAttribute("class" , "cell");
            node.setAttribute("id" , attrValue);
            parent.appendChild(node);
        }
   
    } else {
         //remove cells
        while (attrValue > n) {
            parent.removeChild(parent.lastChild);
            attrValue--;
        }
        
    }
    
   boardSize = size;
   resetGame();
}

/**
 * Prevents player from making another move.
 * When a ends as a result of a win or draw,
 * the event listener on the boxes are removed
 * and player can continue playing by clicking on the restart button.
 */
function endGame(message)
{
    cells.forEach((cell) => cell.removeEventListener('click', play));
    let elt = document.getElementById('game__status');
    elt.innerText = message;
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("game-div__option-board").addEventListener('change', function(evt){
        let size = parseInt((evt.target.value));
        size = isNaN(size) ? 3 : size;
        setGameBoard(size);   
    });

    startGame();
    cells.forEach((cell) => cell.addEventListener('click', play));

    document.getElementById('game__btn-restart').addEventListener('click', resetGame);
    document.getElementById('bot').addEventListener('click', setGameMode);
    document.getElementById('human').addEventListener('click', setGameMode);
});