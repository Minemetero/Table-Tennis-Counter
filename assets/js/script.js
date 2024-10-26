let players = [];
let totalScores = {};
let currentMatchScores = {};
let currentMatch = [0, 1]; // Indexes of the players in the current match
let winBalls = 5;
let serveRule = -1;
let rotationalServes = 1;
let currentServe = -1;
let rotationalServesCounter = 0;
let matchHistory = [];

function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName === '' || players.includes(playerName)) {
        showSnackBar(lang('ui.tooltip.playerNameError'), 'PlayerNameError');
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
        showSnackBar(lang('ui.tooltip.playerAmountError'), 'PlayerAmountError');
        hideLoading();
        return;
    }
    winBalls = parseInt(document.getElementById('winBalls').value);
    if (isNaN(winBalls) || winBalls <= 0) {
        showSnackBar(lang('ui.tooltip.winningBallsError'), 'WinningBallsError');
        hideLoading();
        return;
    }
    serveRule = parseInt(document.getElementById('serveRule').selectedIndex);
    rotationalServes = parseInt(document.getElementById('rotationalServes').value);
    if (isNaN(serveRule) || serveRule < 0 || serveRule > 1) {
        showSnackBar(lang('ui.tooltip.serveRuleError'), 'ServeRuleError');
        hideLoading();
        return;
    }
    if (serveRule === 1 && (isNaN(rotationalServes) || rotationalServes <= 0)) {
        showSnackBar(lang('ui.tooltip.rotationalServesError'), 'RotationalServesError');
        hideLoading();
        return;
    }
    if (serveRule === 1) {
        currentServe = 0;
    }
    document.getElementById('setup').style.display = 'none';
    document.getElementById('gameBoardWrapper').classList.add('active');
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

function checkMatchPoint(playerName) {
    if (currentMatchScores[playerName] === winBalls - 1) {
        // Player is at match point
        document.getElementById('result').innerText = lang('ui.gameBoard.matchPoint', playerName);
    } else {
        // Clear the match point message if not at match point
        document.getElementById('result').innerText = '';
    }
}

function incrementCurrentMatchScore(playerName) {
    currentMatchScores[playerName]++;
    rotationalServesCounter++;
    if (serveRule === 1 && rotationalServesCounter >= rotationalServes) {
        rotationalServesCounter = 0;
        currentServe = currentServe === 0 ? 1 : 0;
    }
    checkMatchPoint(playerName); // Call the new function here
    updateCurrentMatch();
    if (currentMatchScores[playerName] >= winBalls) {
        // Clear any match point messages
        document.getElementById('result').innerText = '';
        totalScores[playerName]++;
        document.getElementById('result').innerText = lang('ui.gameBoard.winMessage', playerName);
        matchHistory.push(lang('ui.gameBoard.matchHistory.item', players[currentMatch[0]], players[currentMatch[1]], playerName));
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
            <div class="playerName">${player1}</div>
            <div class="playerTags">
                <s-chip class="player-serve ${serveRule === 1 && currentServe == 0 ? 'active': ''}" type="filled-tonal">
                    <s-icon slot="start" type="done"></s-icon>
                    ${lang('ui.gameBoard.serve')}
                </s-chip>
            </div>
            <div class="playerScore">${currentMatchScores[player1]}</div>
            <s-button type="filled-tonal" class="score-button" onclick="incrementCurrentMatchScore('${player1}')">
                ${lang('ui.gameBoard.score')}
            </s-button>
        </div>
        <div class="player">
            <div class="playerName">${player2}</div>
            <div class="playerTags">
                <s-chip class="player-serve ${serveRule === 1 && currentServe == 1 ? 'active': ''}" type="filled-tonal">
                    <s-icon slot="start" type="done"></s-icon>
                    ${lang('ui.gameBoard.serve')}
                </s-chip>
            </div>
            <div class="playerScore">${currentMatchScores[player2]}</div>
            <s-button type="filled-tonal" class="score-button" onclick="incrementCurrentMatchScore('${player2}')">
                ${lang('ui.gameBoard.score')}
            </s-button>
        </div>
    `;
}

function updatePlayerScoreList() {
    const playerScoreList = document.getElementById('playerScoreList');
    playerScoreList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="playerName">${player}</div>
            <div class="playerScore">${totalScores[player]}</div>
        `;
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
        li.textContent = lang('ui.gameBoard.matchOrder.item', player1, player2);
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
    document.getElementById('gameBoardWrapper').style.display = 'none';
    document.getElementById('initialSetup').style.display = 'block';
    document.getElementById('playerInputGroup').style.display = 'block';
    document.getElementById('playerListGroup').style.display = 'block';
    document.getElementById('initialButtons').style.display = 'block';
    document.getElementById('historyList').innerHTML = '';
}

window.incrementCurrentMatchScore = incrementCurrentMatchScore;
