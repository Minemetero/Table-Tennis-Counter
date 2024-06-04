let players = [];
let scores = {};
let currentMatch = [0, 1]; // Indexes of the players in the current match
let winBalls = 5;
let currentMatchScores = {}; // Stores scores of current match

function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName === '') {
        alert('Please enter a valid player name');
        return;
    }
    players.push(playerName);
    scores[playerName] = 0;
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
    document.getElementById('scoreboard').style.display = 'block';
    updatePlayerScoreList();
    startMatch();
}

function startMatch() {
    currentMatchScores = {};
    updateCurrentMatch();
}

function incrementScore(playerName) {
    currentMatchScores[playerName] = currentMatchScores[playerName] || 0;
    currentMatchScores[playerName]++;
    updateCurrentMatch();
    const totalScore = Object.values(currentMatchScores).reduce((total, score) => total + score, 0);
    if (totalScore >= winBalls) {
        endMatch();
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
        scores[player] = scores[player] || 0;
        scores[player] += currentMatchScores[player];
    });
    updatePlayerScoreList();
    startMatch();
}

function updatePlayerScoreList() {
    const playerScoreList = document.getElementById('playerScoreList');
    playerScoreList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player}: ${scores[player] || 0}`;
        playerScoreList.appendChild(li);
    });
}

function resetScores() {
    players = [];
    scores = {};
    currentMatch = [0, 1];
    document.getElementById('playerList').innerHTML = '';
    document.getElementById('scoreboard').style.display = 'none';
    document.getElementById('result').innerText = '';
    document.getElementById('initialSetup').style.display = 'block';
    document.getElementById('playerInputGroup').style.display = 'block';
    document.getElementById('playerListGroup').style.display = 'block';
    document.getElementById('initialButtons').style.display = 'block';
}
