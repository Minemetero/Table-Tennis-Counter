let players = [];
let totalScores = {};
let currentMatchScores = {};
let currentMatch = [0, 1]; // Indexes of the players in the current match
let winBalls = 5;

function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName === '') {
        alert('Please enter a valid player name');
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
    document.getElementById('scoreboard').style.display = 'block';
    updatePlayerScoreList();
    startNewMatch();
}

function startNewMatch() {
    currentMatchScores = {};
    players.forEach(player => {
        currentMatchScores[player] = 0;
    });
    updateCurrentMatch();
}

function incrementCurrentMatchScore(playerName) {
    currentMatchScores[playerName]++;
    updateCurrentMatch();
    if (currentMatchScores[playerName] >= winBalls) {
        totalScores[playerName]++;
        document.getElementById('result').innerText = `${playerName} Wins this round!`;
        setTimeout(() => {
            document.getElementById('result').innerText = '';
            updatePlayerScoreList();
            updateMatchOrder();
            startNewMatch();
        }, 2000);
    }
}

function updateCurrentMatch() {
    const match = document.getElementById('currentMatch');
    const player1 = players[currentMatch[0]];
    const player2 = players[currentMatch[1]];
    match.innerHTML = `
        <div class="player">
            <label>${player1}: <span>${currentMatchScores[player1]}</span></label>
            <button class="score-button" onclick="incrementCurrentMatchScore('${player1}')">Score</button>
        </div>
        <div class="player">
            <label>${player2}: <span>${currentMatchScores[player2]}</span></label>
            <button class="score-button" onclick="incrementCurrentMatchScore('${player2}')">Score</button>
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

function updateMatchOrder() {
    currentMatch = [(currentMatch[0] + 1) % players.length, (currentMatch[1] + 1) % players.length];
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
    document.getElementById('scoreboard').style.display = 'none';
    document.getElementById('result').innerText = '';
    document.getElementById('initialSetup').style.display = 'block';
    document.getElementById('playerInputGroup').style.display = 'block';
    document.getElementById('playerListGroup').style.display = 'block';
    document.getElementById('initialButtons').style.display = 'block';
}
