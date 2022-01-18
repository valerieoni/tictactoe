let intro = "Click to play";
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
let moves = 0;
let cells = document.querySelectorAll('.cell');

let players = {
    x : {
        marker: 'X',
        score: 0
    },
    o : {
        marker: 'O',
        score: 0
    }
}
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
 * Given a grid size of 3 it returns an 8 by 3 multi-dimensional array.
 *
 * @param int gridSize
 * @returns [][]
 */
function createWinningSet(gridSize)
{
    let arrayGrid = [];
    let row;
    
    //first possible set WA. This is named WA just for reference in the comments.
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

function markCell(idx, player)
{
    if (isFullBoard()) {
        document.getElementById(idx).innerText = player.marker;
        board[idx] = player.marker;
        moves++;
        updateStatus();
        currentPlayer = player === players.o ? players.x : players.o;
    }
    
}

/**
 * returns a random spot from the available spots on the board
 */
function bestMove()
{
    let emptySquares = getEmptySquares();
    return emptySquares[Math.floor(Math.random()*emptySquares.length)];

}

function isFullBoard()
{
    return getEmptySquares().length != 0;
}

function getEmptySquares()
{
    return board.filter(elt => typeof elt == 'number');
}

/**
 * 
 * @param {*} level 
 */
function startGame(level = 3)
{
    setWiningSet(level);
    boardSize = level;
    let size = boardSize ** 2;
    fillBoard(size);
   clearGameBoard();
}

function setWiningSet(level)
{
    if (winningSet.length !== level*2+2) {
        winningSet = createWinningSet(level);
    }
}

function fillBoard(size)
{
    board = Array.from(Array(size).keys());
}

function resetGame()
{
    if (Array.isArray(board) && board.length === boardSize ** 2) {
        fillBoard(boardSize ** 2);
    } else {
        startGame(boardSize);
    }
    document.getElementById('game__status').innerText = intro;
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => cell.addEventListener('click', play));
    clearGameBoard();
}

function clearGameBoard()
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
   if (isGameWon()) {
       isTie = false;
       updateScoreBoard(currentPlayer);
       endGame(currentPlayer.marker + ' wins!!!');

   } else if(!isFullBoard()) {
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

function isGameWon()
{
    if (moves >= minimumMoves) {
        return winningSet.some((combination) => {
            if (currentPlayer.marker == board[combination[0]]) {
                for (let i = 0; i < boardSize; i++) {
                    if (currentPlayer.marker != board[combination[i]])
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
    playOn = false;
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("game-div__option-board").addEventListener('change', function(evt){
        let size = parseInt((evt.target.value));
        size = isNaN(size) ? 3 : size;
        setGameBoard(size);   
    })

    startGame();
    cells.forEach((cell) => cell.addEventListener('click', play));

    document.getElementById('game__btn-restart').addEventListener('click', resetGame);
    document.getElementById('bot').addEventListener('click', setGameMode);
    document.getElementById('human').addEventListener('click', setGameMode);
});

