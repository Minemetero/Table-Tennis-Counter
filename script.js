let players = [];
let scores = {};
let currentPlayerIndex = 0;

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
    document.getElementById('scoreboard').style.display = 'block';
    updateScoreboard();
}

function incrementScore(playerName) {
    const winBalls = parseInt(document.getElementById('winBalls').value);
    if (isNaN(winBalls) || winBalls <= 0) {
        alert('Please enter a valid number of winning balls');
        return;
    }
    scores[playerName]++;
    updateScoreboard();
    if (scores[playerName] >= winBalls) {
        document.getElementById('result').innerText = `${playerName} Wins!`;
        disableButtons();
    }
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function updateScoreboard() {
    const playerScores = document.getElementById('playerScores');
    playerScores.innerHTML = '';
    players.forEach(player => {
        const div = document.createElement('div');
        div.className = 'player';
        div.innerHTML = `
            <label>${player}: <span>${scores[player]}</span></label>
            <button class="score-button" onclick="incrementScore('${player}')">Score</button>
        `;
        playerScores.appendChild(div);
    });
}

function disableButtons() {
    document.querySelectorAll('.score-button').forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
    });
}

function resetScores() {
    players = [];
    scores = {};
    currentPlayerIndex = 0;
    document.getElementById('playerList').innerHTML = '';
    document.getElementById('scoreboard').style.display = 'none';
    document.getElementById('result').innerText = '';
}
