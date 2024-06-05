let players = [];
let totalScores = {};
let currentMatchScores = {};
let currentMatch = [0, 1]; // Indexes of the players in the current match
let winBalls = 5;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addPlayerButton').addEventListener('click', addPlayer);
    document.getElementById('startGameButton').addEventListener('click', startGame);
    document.getElementById('resetButton').addEventListener('click', resetScores);
});

function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName === '' || players.includes(playerName)) {
        alert('Please enter a unique valid player name');
        return;
    }
    players.push(playerName);
    totalScores[playerName] = 0;
    updatePlayerList();
    document.getElementById('playerName').value = '';
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        playerList.appendChild(li);
    });
}

function startGame() {
    if (players.length < 2) {
        alert('Please add at least two players');
        return;
    }
    winBalls = parseInt(document.getElementById('winBalls').value);
    if (isNaN(winBalls) || winBalls <= 0) {
        alert('Please enter a valid number of winning balls');
        return;
    }
    document.getElementById('initialSetup').style.display = 'none';
    document.getElementById('playerInputGroup').style.display = 'none';
    document.getElementById('playerListGroup').style.display = 'none';
    document.getElementById('initialButtons').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'flex';
    updatePlayerScoreList();
    updateMatchOrderList();
    startNewMatch();
}

function startNewMatch() {
    currentMatchScores = {};
    players.forEach(player => {
        currentMatchScores[player] = 0;
    });
    updateCurrentMatch();
}

function incrementScore(playerName) {
    currentMatchScores[playerName]++;
    updateCurrentMatch();
    if (currentMatchScores[playerName] >= winBalls) {
        totalScores[playerName]++;
        document.getElementById('result').innerText = `${playerName} Wins this round!`;
        setTimeout(() => {
            document.getElementById('result').innerText = '';
            endMatch();
        }, 2000);
    }
}

function updateCurrentMatch() {
    const match = document.getElementById('currentMatch');
    match.innerHTML = '';
    players.forEach(player => {
        const score = currentMatchScores[player] || 0;
        const div = document.createElement('div');
        div.className = 'player';
        div.innerHTML = `
            <label>${player}: <span>${score}</span></label>
            <button class="score-button" onclick="incrementScore('${player}')">Score</button>
        `;
        match.appendChild(div);
    });
}

function endMatch() {
    Object.keys(currentMatchScores).forEach(player => {
        totalScores[player] = totalScores[player] || 0;
        totalScores[player] += currentMatchScores[player];
    });
    updatePlayerScoreList();
    updateMatchOrder();
    updateMatchOrderList();
    startNewMatch();
}

function updatePlayerScoreList() {
    const playerScoreList = document.getElementById('playerScoreList');
    playerScoreList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player}: ${totalScores[player]}`;
        playerScoreList.appendChild(li);
    });
}

function updateMatchOrderList() {
    const matchOrderList = document.getElementById('matchOrderList');
    matchOrderList.innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        const player1 = players[i];
        const player2 = players[(i + 1) % players.length];
        const li = document.createElement('li');
        li.textContent = `${player1} vs ${player2}`;
        matchOrderList.appendChild(li);
    }
}

function updateMatchOrder() {
    currentMatch[0] = (currentMatch[0] + 1) % players.length;
    currentMatch[1] = (currentMatch[1] + 1) % players.length;
    if (currentMatch[0] === currentMatch[1]) {
        currentMatch[1] = (currentMatch[1] + 1) % players.length;
    }
}

function resetScores() {
    players = [];
    totalScores = {};
    currentMatchScores = {};
    currentMatch = [0, 1];
    document.getElementById('playerList').innerHTML = '';
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('initialSetup').style.display = 'block';
    document.getElementById('playerInputGroup').style.display = 'block';
    document.getElementById('playerListGroup').style.display = 'block';
    document.getElementById('initialButtons').style.display = 'block';
}
