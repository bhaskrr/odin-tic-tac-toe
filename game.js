const heading = document.querySelector("h2");
const dialog = document.querySelector('dialog');
const restartBtn = document.querySelector('.restart-btn');
const gridBtns = document.querySelectorAll(".board-grid button");
const output = document.querySelector(".output");

//the board
const board = new Array(9).fill(null);

const displayBoard = () => {
    for (let i = 0; i < gridBtns.length; i++) {
        gridBtns[i].textContent = board[i];
    }
};

displayBoard(); //intial render

//to store the choices
let playerChoice = null;
let computerChoice;

//to keep track of who's turn it is
let currentPlayer;

//handles a turn
const handleTurn = (position) => {
    if (board[position] === null) {
        board[position] = currentPlayer;
        console.table(board);
        displayBoard();

        if (checkWin()) {
            output.textContent = `${currentPlayer} wins!`;
            dialog.showModal(); //show the restart dialog

        } else if (checkTie()) {
            output.textContent = "It's a tie";
            dialog.showModal();
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

//handles a player turn
const playerTurn = (playerPos) => {
    currentPlayer = playerChoice;
    handleTurn(playerPos);
};

//handles a player turn
const computerTurn = () => {
    if(!checkWin() && !checkTie()){
        currentPlayer = computerChoice;
        let pos = computerLogic();
        handleTurn(pos);
    }
};

//gets a non occupied position
const computerLogic = () => {
    let computerPosition = 0;
    do {
        computerPosition = Math.floor(Math.random() * 9);
    } while (board[computerPosition] != null);

    return computerPosition;
};

//checks for a winner by matching if the same symbols in the board
//are in winning index position combinations
const checkWin = () => {
    const winCombinations = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;

        // 1. board[a]:Accesses the element at index a within an array or object called board.
        // The first && operator checks if this value is truthy (not null, undefined, 0, false, or an empty string).

        // 2. board[a] === board[b]:Compares the value at index a with the value at index b.
        // Checks if they are strictly equal (have the same value and type).

        // 3. board[a] === board[c]:Similarly compares the value at index a with the value at index c.

        // Combined Meaning:

        // The entire expression evaluates to true only if:
        // The value at index a in board is truthy (not empty or false-like).
        // The values at indices a, b, and c are all strictly equal to each other.

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const checkTie = () => {
    return board.every((cell) => cell !== null);
};

//DOM handling
const choiceBtns = document.querySelectorAll(".choice-btns button");
choiceBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //prevents choice switching mid game
        if (playerChoice === null) {
            playerChoice = e.target.getAttribute("choice");
            currentPlayer = playerChoice;
            heading.innerText = `Your choice: ${playerChoice}`;
            computerChoice = playerChoice == "X" ? "O" : "X";
        }
    });
});

gridBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (playerChoice) {
            const indexPosition = e.target.getAttribute("position");

            playerTurn(indexPosition);
            
            computerTurn();
        }
    });
});

function restart(){
    playerChoice = null;
    board.fill(null);
    displayBoard();
    heading.innerText = 'Make a choice:';
    output.textContent = '';
}

restartBtn.addEventListener('click', ()=>{
    dialog.close(); //close the restart dialog
    restart();
})