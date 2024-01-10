//the board
const board = new Array(9).fill(null);

const drawBoard = () => {
    console.clear();
    console.log(`${board[0]} | ${board[1]} | ${board[2]} \n------------------\n
${board[3]} | ${board[4]} | ${board[5]} \n------------------\n
${board[6]} | ${board[7]} | ${board[8]}`);
}

//to store the choices
let playerChoice;
let computerChoice;

//to keep track of who's turn it is
let currentPlayer;

//handles a turn
const handleTurn = (position) => {
    if (board[position] === null) {
        board[position] = currentPlayer;
        drawBoard();

        if(checkWin()){
            console.log(`${currentPlayer} wins!`);
        }
        else if(checkTie()){
            console.log("It's a tie");
        }
        else{
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
    else {
        console.log('Cell is already occupied!');
    }
}

//handles a player turn
const playerTurn = (playerPos) => {
    handleTurn(playerPos, playerChoice);
}

//handles a player turn
const computerTurn = () => {
    let pos = computerLogic();
    handleTurn(pos, computerChoice);
}

//gets a non occupied position
const computerLogic = () => {
    let computerPosition = 0;
    do{
        computerPosition = Math.floor(Math.random() * 8);
    }while(board[computerPosition] != null);

    return computerPosition;
}

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
        [6, 7, 8]
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
}

const checkTie = () => {
    return board.every((cell) => cell !== null);
}

drawBoard();

//the IIFE
(function playGame(){
    playerChoice = prompt('Enter your choice(X or O): ');
    
    computerChoice = playerChoice == 'X' ? 'O' : 'X';
    while (!checkWin() && !checkTie()) {
        const playerPosition = prompt(`Player ${playerChoice}, Enter a position(0-8): `);

        if (playerPosition >= 0 && playerPosition <= 8){
            if(board[playerPosition] === null) {
                
                currentPlayer = playerChoice;
                playerTurn(playerPosition);

                computerTurn();
            }
            else{
                console.log('Position chosen by the player is occupied!');
            }
        }
        else {
            console.log('Invalid choice!');
        }
    }
})();