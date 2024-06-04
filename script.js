let players = [];
let scores = {};
let currentMatch = [0, 1]; // Indexes of the players in the current match
let winBalls = 5;

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
    document.getElementById('scoreboard').style.display = 'block';
    document.getElementById('input-group').style.display = 'none';
    document.getElementById('player-input-group').style.display = 'none';
    document.getElementById('player-list').style.display = 'none';
    document.getElementById('buttons').style.display = 'none';
    document.getElementById('selected-players').style.display = 'block';
    updateSelectedPlayerList();
    updateScoreboard();
    updateCurrentMatch();
}

function updateSelectedPlayerList() {
    const selectedPlayerList = document.getElementById('selectedPlayerList');
    selectedPlayerList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        selectedPlayerList.appendChild(li);
    });
}

function incrementScore(playerName) {
    scores[playerName]++;
    updateScoreboard();
    if (scores[playerName] >= winBalls) {
        document.getElementById('result').innerText = `${playerName} Wins this round!`;
        setTimeout(() => {
            document.getElementById('result').innerText = '';
            updateCurrentMatch();
        }, 2000);
    }
}

function updateScoreboard() {
    const playerScores = document.getElementById('playerScores');
    playerScores.innerHTML = '';
    players.forEach(player => {
        const div = document.createElement('div');
        div.className = 'player';
        div.innerHTML = `
            <label>${player}: <span>${scores[player]}</span></label>
        `;
        playerScores.appendChild(div);
    });
}

function updateCurrentMatch() {
    const match = document.getElementById('currentMatch');
    const player1 = players[currentMatch[0]];
    const player2 = players[currentMatch[1]];
    match.innerHTML = `
        <div class="player">
            <label>${player1}: <span>${scores[player1]}</span></label>
            <button class="score-button" onclick="incrementScore('${player1}')">Score</button>
        </div>
        <div class="player">
            <label>${player2}: <span>${scores[player2]}</span></label>
            <button class="score-button" onclick="incrementScore('${player2}')">Score</button>
        </div>
    `;
    currentMatch = [(currentMatch[0] + 1) % players.length, (currentMatch[1] + 1) % players.length];
}

function resetScores() {
    players = [];
    scores = {};
    currentMatch = [0, 1];
    document.getElementById('playerList').innerHTML = '';
    document.getElementById('scoreboard').style.display = 'none';
    document.getElementById('input-group').style.display = 'block';
    document.getElementById('player-input-group').style.display = 'block';
    document.getElementById('player-list').style.display = 'block';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('selected-players').style.display = 'none';
    document.getElementById('result').innerText = '';
}
