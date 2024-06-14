let players = [];
let totalScores = {};
let currentMatchScores = {};
let currentMatch = [0, 1]; // Indexes of the players in the current match
let winBalls = 5;
let matchHistory = [];

document.addEventListener('DOMContentLoaded', () => {
    // 虽然但是，onclick：？
});

function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName === '' || players.includes(playerName)) {
        showSnackBar('Please enter a unique valid player name', 'PlayerNameError');
        return;
    }
    players.push(playerName);
    totalScores[playerName] = 0;
    updatePlayerList();
    document.getElementById('playerName').value = '';
}

function updatePlayerList() {
    showLoading();
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        playerList.appendChild(li);
    });
    hideLoading();
}

function startGame() {
    showLoading();
    if (players.length < 2) {
        showSnackBar('Please add at least two players', 'PlayerAmountError');
        hideLoading();
        return;
    }
    winBalls = parseInt(document.getElementById('winBalls').value);
    if (isNaN(winBalls) || winBalls <= 0) {
        showSnackBar('Please enter a valid number of winning balls', 'WinningBallsError');
        hideLoading();
        return;
    }
    document.getElementById('setup').style.display = 'none';
    document.getElementById('gameBoard').classList.add('active');
    updatePlayerScoreList();
    updateMatchOrderList();
    startNewMatch();
    hideLoading();
}

function startNewMatch() {
    showLoading();
    currentMatchScores = {};
    players.forEach(player => {
        currentMatchScores[player] = 0;
    });
    updateCurrentMatch();
    hideLoading();
}

function incrementCurrentMatchScore(playerName) {
    currentMatchScores[playerName]++;
    updateCurrentMatch();
    if (currentMatchScores[playerName] >= winBalls) {
        totalScores[playerName]++;
        document.getElementById('result').innerText = `${playerName} Wins this round!`;
        matchHistory.push(`${players[currentMatch[0]]} vs ${players[currentMatch[1]]}: ${playerName} won`);
        disableScoreButtons();
        setTimeout(() => {
            document.getElementById('result').innerText = '';
            updatePlayerScoreList();
            updateMatchOrder();
            updateMatchOrderList();
            updateHistoryList();
            enableScoreButtons();
            startNewMatch();
        }, 2000);
    }
}

function disableScoreButtons() {
    document.querySelectorAll('.score-button').forEach(button => {
        button.disabled = true;
    });
}

function enableScoreButtons() {
    document.querySelectorAll('.score-button').forEach(button => {
        button.disabled = false;
    });
}

function updateCurrentMatch() {
    const match = document.getElementById('currentMatch');
    const player1 = players[currentMatch[0]];
    const player2 = players[currentMatch[1]];
    match.innerHTML = `
        <div class="player">
            <label>${player1}: <span>${currentMatchScores[player1]}</span></label>
            <s-button type="filled-tonal" class="score-button" onclick="incrementCurrentMatchScore('${player1}')">Score</s-button>
        </div>
        <div class="player">
            <label>${player2}: <span>${currentMatchScores[player2]}</span></label>
            <s-button type="filled-tonal" class="score-button" onclick="incrementCurrentMatchScore('${player2}')">Score</s-button>
        </div>
    `;
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

function updateHistoryList() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    matchHistory.forEach(match => {
        const li = document.createElement('li');
        li.textContent = match;
        historyList.appendChild(li);
    });
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
    matchHistory = [];
    document.getElementById('playerList').innerHTML = '';
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('initialSetup').style.display = 'block';
    document.getElementById('playerInputGroup').style.display = 'block';
    document.getElementById('playerListGroup').style.display = 'block';
    document.getElementById('initialButtons').style.display = 'block';
    document.getElementById('historyList').innerHTML = '';
}

window.incrementCurrentMatchScore = incrementCurrentMatchScore;
