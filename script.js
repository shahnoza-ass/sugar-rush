const boardSize = 8;
const colors = ['candy-1', 'candy-2', 'candy-3', 'candy-4', 'candy-5'];
const gameBoard = document.getElementById('game-board');
let candies = [];

// O‘yin maydonini yaratish
function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const candy = document.createElement('div');
        candy.classList.add('cell', colors[Math.floor(Math.random() * colors.length)]);
        candy.setAttribute('draggable', true);
        candy.setAttribute('id', i);
        gameBoard.appendChild(candy);
        candies.push(candy);
    }
}

// Candy-larni almashtirish
let selectedCandy = null;
gameBoard.addEventListener('dragstart', (e) => {
    selectedCandy = e.target;
});

gameBoard.addEventListener('dragover', (e) => {
    e.preventDefault();
});

gameBoard.addEventListener('drop', (e) => {
    const targetCandy = e.target;
    const selectedId = parseInt(selectedCandy.id);
    const targetId = parseInt(targetCandy.id);

    const validMoves = [
        selectedId - 1, selectedId + 1,
        selectedId - boardSize, selectedId + boardSize
    ];

    if (validMoves.includes(targetId)) {
        const tempClass = selectedCandy.className;
        selectedCandy.className = targetCandy.className;
        targetCandy.className = tempClass;
    }
    checkMatches();
});

// Candy-lar bir xil bo‘lsa yo‘q qilish
function checkMatches() {
    // Gorizontal tekshiruv
    for (let i = 0; i < candies.length; i++) {
        if (
            i % boardSize < boardSize - 2 &&
            candies[i].className === candies[i + 1].className &&
            candies[i].className === candies[i + 2].className
        ) {
            candies[i].className = '';
            candies[i + 1].className = '';
            candies[i + 2].className = '';
        }
    }

    // Vertikal tekshiruv
    for (let i = 0; i < candies.length - 2 * boardSize; i++) {
        if (
            candies[i].className === candies[i + boardSize].className &&
            candies[i].className === candies[i + 2 * boardSize].className
        ) {
            candies[i].className = '';
            candies[i + boardSize].className = '';
            candies[i + 2 * boardSize].className = '';
        }
    }
}

createBoard();
