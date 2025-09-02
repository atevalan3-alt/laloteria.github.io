const symbols = [
    { name: "Monja Blanca", fileName: "5.png" },
    { name: "Ceiba", fileName: "4.png" },
    { name: "Quetzal", fileName: "3.png" },
    { name: "Tecún Umán", fileName: "7.png" },
    { name: "Bandera de Guatemala", fileName: "1.png" },
    { name: "Escudo de Armas", fileName: "2.png" },
    { name: "Marimba", fileName: "6.png" },
    { name: "Tambor", fileName: "11.png" },
    { name: "Maracas", fileName: "10.png" },
    { name: "Volcán de Agua", fileName: "13.png" },
    { name: "Lago de Atitlán", fileName: "9.png" },
    { name: "Volcán de Fuego", fileName: "12.png" },
    { name: "Tikal", fileName: "8.png" },
    { name: "Antigua Guatemala", fileName: "14.png" },
    { name: "Popol Vuh", fileName: "15.png" },
    { name: "Traje Típico", fileName: "16.png" },
    { name: "Iglesia Santo Tomas", fileName: "17.png" },
    { name: "El Baile del Venado", fileName: "18.png" },
    { name: "La Antorcha", fileName: "19.png" },
    { name: "Los Platillos Tipicos", fileName: "20.png" }
];

const MAX_PLAYERS = 10;
let players = [];
let gameStarted = false;

const loginScreen = document.getElementById('login-screen');
const gameScreen = document.getElementById('game-screen');
const winnerScreen = document.getElementById('winner-screen');
const playerForm = document.getElementById('player-form');
const playerNameInput = document.getElementById('player-name');
const playerDisplay = document.getElementById('player-display');
const boardContainer = document.getElementById('board-container');
const loteriaMessage = document.getElementById('loteria-message');
const playerCounter = document.getElementById('player-counter');
const startButton = document.getElementById('start-button');
const otherPlayersList = document.getElementById('other-players');

function createRandomBoard() {
    const shuffledSymbols = symbols.sort(() => 0.5 - Math.random());
    return shuffledSymbols.slice(0, 9);
}

function renderBoard(board) {
    boardContainer.innerHTML = '';
    board.forEach(symbol => {
        const cell = document.createElement('div');
        cell.classList.add('card-cell');
        cell.dataset.name = symbol.name;
        
        const img = document.createElement('img');
        img.src = `./La Bandera/${symbol.fileName}`;
        img.alt = symbol.name;
        
        cell.appendChild(img);
        cell.addEventListener('click', handleCellClick);
        boardContainer.appendChild(cell);
    });
}

function handleCellClick(event) {
    if (!gameStarted) return; // No se puede marcar si el juego no ha empezado

    const cell = event.target.closest('.card-cell');
    if (!cell || cell.classList.contains('marked')) {
        return;
    }

    cell.classList.add('marked');
    const currentPlayer = players[0]; // Asumiendo que el jugador actual es el primero en la lista
    currentPlayer.markedCells++;

    if (currentPlayer.markedCells === 9) {
        loteriaMessage.classList.remove('hidden');

        setTimeout(() => {
            gameScreen.classList.add('hidden');
            winnerScreen.classList.remove('hidden');
            document.getElementById('winner-name').textContent = `¡${currentPlayer.name} ha ganado!`;
        }, 1500);
    }
}

playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPlayerName = playerNameInput.value;
    if (newPlayerName && players.length < MAX_PLAYERS) {
        const newPlayer = {
            name: newPlayerName,
            board: createRandomBoard(),
            markedCells: 0,
        };
        players.push(newPlayer);
        
        playerNameInput.value = '';
        updatePlayerCounter();
        
        // Simular que el primer jugador registrado es el que está jugando
        if (players.length === 1) {
            loginScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            playerDisplay.textContent = `Jugador: ${players[0].name}`;
            renderBoard(players[0].board);
        }

        // Si se alcanza el límite de jugadores, iniciar el juego
        if (players.length === MAX_PLAYERS) {
            startButton.classList.remove('hidden');
            playerCounter.textContent = '¡Todos los jugadores listos!';
        }
    }
});

function updatePlayerCounter() {
    playerCounter.textContent = `Jugadores registrados: ${players.length}/${MAX_PLAYERS}`;
    let otherPlayersHtml = '<h3>Otros jugadores:</h3><ul>';
    players.slice(1).forEach(player => {
        otherPlayersHtml += `<li>${player.name}</li>`;
    });
    otherPlayersHtml += '</ul>';
    otherPlayersList.innerHTML = otherPlayersHtml;
}

startButton.addEventListener('click', () => {
    gameStarted = true;
    startButton.classList.add('hidden');
    // Aquí podrías agregar lógica para mostrar el juego a todos los jugadores si fuera multijugador
});
