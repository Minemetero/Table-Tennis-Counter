import { lang } from './lang';
import { hideLoading, showLoading, showSnackBar, showWinnerConfetti } from './ui';

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
let lastScoringPlayer = null;
let lastRotationalServesCounter = 0;
let lastServe = -1;
export function addWinBalls() {
    const value = parseInt(document.getElementById('winBalls').value);
    if (!isNaN(value)) {
        document.getElementById('winBalls').value = value + 1;
    } else {
        document.getElementById('winBalls').value = 1;
    }
}
export function minusWinBalls() {
    const value = parseInt(document.getElementById('winBalls').value);
    // winBall's minimum is 0
    if (!isNaN(value) && value > 0) {
        document.getElementById('winBalls').value = value - 1;
    }
}
export function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName === '' || players.includes(playerName)) {
        showSnackBar(lang('ui.tooltip.playerNameError'), 'PlayerNameError', 'error');
        return;
    }
    players.push(playerName);
    totalScores[playerName] = 0;
    updatePlayerList();
    document.getElementById('playerName').value = '';
}

export function updatePlayerList() {
    showLoading();
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    players.forEach((player) => {
        const li = document.createElement('li');
        li.textContent = player;
        playerList.appendChild(li);
    });
    hideLoading();
}

export function startGame() {
    showLoading();
    if (players.length < 2) {
        showSnackBar(lang('ui.tooltip.playerAmountError'), 'PlayerAmountError', 'error');
        hideLoading();
        return;
    }
    winBalls = parseInt(document.getElementById('winBalls').value);
    if (isNaN(winBalls) || winBalls <= 0) {
        showSnackBar(lang('ui.tooltip.winningBallsError'), 'WinningBallsError', 'error');
        hideLoading();
        return;
    }
    const strictMode = document.getElementById('strictMode').checked;
    serveRule = parseInt(document.getElementById('serveRule').selectedIndex);
    rotationalServes = parseInt(document.getElementById('rotationalServes').value);
    if (isNaN(serveRule) || serveRule < 0 || serveRule > 1) {
        showSnackBar(lang('ui.tooltip.serveRuleError'), 'ServeRuleError', 'error');
        hideLoading();
        return;
    }
    if (serveRule === 1 && (isNaN(rotationalServes) || rotationalServes <= 0)) {
        showSnackBar(lang('ui.tooltip.rotationalServesError'), 'RotationalServesError', 'error');
        hideLoading();
        return;
    }
    if (strictMode) {
        serveRule = 1;
        rotationalServes = 2;
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

export function startNewMatch() {
    showLoading();
    currentMatchScores = {};
    players.forEach((player) => {
        currentMatchScores[player] = 0;
    });
    updateCurrentMatch();
    hideLoading();
}

export function checkMatchPoint(playerName) {
    const strictMode = document.getElementById('strictMode').checked;
    const playerScore = currentMatchScores[playerName];
    // Get the other player's name
    const otherPlayer = Object.keys(currentMatchScores).find((p) => p !== playerName);
    const otherScore = currentMatchScores[otherPlayer];

    let isMatchPoint = false;

    if (strictMode) {
        if (playerScore >= 10 && otherScore >= 10) {
            // Both at least 10, match point if leading by 1
            isMatchPoint = Math.abs(playerScore - otherScore) === 1 && playerScore > otherScore;
        } else {
            // Normal match point
            isMatchPoint = playerScore === winBalls - 1;
        }
    } else {
        isMatchPoint = playerScore === winBalls - 1;
    }

    if (isMatchPoint) {
        document.getElementById('result').innerText = lang('ui.gameBoard.matchPoint', playerName);
        setTimeout(() => {
            document.getElementById('result').innerText = '';
        }, 1500);
    }
}

export function incrementCurrentMatchScore(playerName) {
    lastScoringPlayer = playerName;
    lastRotationalServesCounter = rotationalServesCounter;
    lastServe = currentServe;

    currentMatchScores[playerName]++;
    rotationalServesCounter++;
    const strictMode = document.getElementById('strictMode').checked;
    let currentRotationalServes = rotationalServes;
    if (strictMode) {
        // If both players have 10 or more, change serve every ball
        const scores = Object.values(currentMatchScores);
        if (scores[0] >= 10 && scores[1] >= 10) {
            currentRotationalServes = 1;
        } else {
            currentRotationalServes = 2;
        }
    }
    if (serveRule === 1 && rotationalServesCounter >= currentRotationalServes) {
        rotationalServesCounter = 0;
        currentServe = currentServe === 0 ? 1 : 0;
    }
    checkMatchPoint(playerName);
    updateCurrentMatch();

    // Get the other player's name
    const otherPlayer =
        players[currentMatch[0]] === playerName
            ? players[currentMatch[1]]
            : players[currentMatch[0]];

    // Check win condition based on strict mode
    const hasWon = strictMode
        ? currentMatchScores[playerName] >= winBalls &&
          (currentMatchScores[playerName] - currentMatchScores[otherPlayer] >= 2 ||
              currentMatchScores[playerName] >= winBalls + 2)
        : currentMatchScores[playerName] >= winBalls;

    if (hasWon) {
        const player1 = players[currentMatch[0]];
        const player2 = players[currentMatch[1]];
        const player1Score = currentMatchScores[player1];
        const player2Score = currentMatchScores[player2];

        totalScores[playerName]++;

        matchHistory.push({
            player1,
            player2,
            player1Score,
            player2Score,
            player1SetScore: totalScores[player1],
            player2SetScore: totalScores[player2],
            winner: playerName,
        });

        document.getElementById('result').innerText = lang('ui.gameBoard.winMessage', playerName);
        disableScoreButtons();

        // Wining Animation
        showWinnerConfetti();

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

export function disableScoreButtons() {
    document.querySelectorAll('.score-button').forEach((button) => {
        button.disabled = true;
    });
}

export function enableScoreButtons() {
    document.querySelectorAll('.score-button').forEach((button) => {
        button.disabled = false;
    });
}

export function updateCurrentMatch() {
    const match = document.getElementById('currentMatch');
    const player1 = players[currentMatch[0]];
    const player2 = players[currentMatch[1]];
    match.innerHTML = `
        <div class="player">
            <div class="playerName">${player1}</div>
            <div class="playerTags">
                <s-chip class="player-serve ${
                    serveRule === 1 && currentServe == 0 ? 'active' : ''
                }" type="elevated">
                    <s-icon slot="start" name="done"></s-icon>
                    ${lang('ui.gameBoard.serve')}
                </s-chip>
            </div>
            <div class="playerScore">${currentMatchScores[player1]}</div>
            <s-button type="filled-tonal" class="score-button player1">
                ${lang('ui.gameBoard.score')}
            </s-button>
        </div>
        <div class="player">
            <div class="playerName">${player2}</div>
            <div class="playerTags">
                <s-chip class="player-serve ${
                    serveRule === 1 && currentServe == 1 ? 'active' : ''
                }" type="elevated">
                    <s-icon slot="start" name="done"></s-icon>
                    ${lang('ui.gameBoard.serve')}
                </s-chip>
            </div>
            <div class="playerScore">${currentMatchScores[player2]}</div>
            <s-button type="filled-tonal" class="score-button player2">
                ${lang('ui.gameBoard.score')}
            </s-button>
        </div>
    `;
    document
        .querySelector('.score-button.player1')
        .addEventListener('click', () => incrementCurrentMatchScore(player1));
    document
        .querySelector('.score-button.player2')
        .addEventListener('click', () => incrementCurrentMatchScore(player2));
}

export function updatePlayerScoreList() {
    const playerScoreList = document.getElementById('playerScoreList');
    playerScoreList.innerHTML = '';
    players.forEach((player) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="playerName">${player}</div>
            <div class="playerScore">${totalScores[player]}</div>
        `;
        playerScoreList.appendChild(li);
    });
}

export function updateMatchOrderList() {
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

export function updateHistoryList() {
    const historyTable = document.getElementById('historyTable');
    const tbody = historyTable.querySelector('s-tbody');
    tbody.innerHTML = '';

    matchHistory.forEach((match) => {
        let matchUp;
        let scoreLine;
        let setScoreLine;
        let winner;

        if (typeof match === 'string') {
            const matchParts = match.split(' vs ');
            const player1 = matchParts[0]?.trim?.() ?? '';
            const player2 = matchParts[1]?.split(':')[0]?.trim?.() ?? '';

            matchUp = `${player1} vs ${player2}`.trim();
            scoreLine = `${totalScores[player1] ?? 0}:${totalScores[player2] ?? 0}`;
            setScoreLine = '—';

            const afterColon = match.substring(match.lastIndexOf(':') + 1).trim();
            const winnerParts = afterColon.split(' ');
            winner = winnerParts.length > 1 ? winnerParts.slice(0, -1).join(' ') : afterColon;
        } else {
            matchUp = `${match.player1} vs ${match.player2}`;
            scoreLine = `${match.player1Score}:${match.player2Score}`;
            setScoreLine = `${match.player1SetScore}:${match.player2SetScore}`;
            winner = match.winner;
        }

        const tr = document.createElement('s-tr');

        const tdMatch = document.createElement('s-td');
        tdMatch.textContent = matchUp;

        const tdScore = document.createElement('s-td');
        tdScore.textContent = scoreLine;

        const tdSetScore = document.createElement('s-td');
        tdSetScore.textContent = setScoreLine;

        const tdWinner = document.createElement('s-td');
        tdWinner.textContent = winner;

        tr.appendChild(tdMatch);
        tr.appendChild(tdScore);
        tr.appendChild(tdSetScore);
        tr.appendChild(tdWinner);
        tbody.appendChild(tr);
    });
}

export function updateMatchOrder() {
    currentMatch[0] = (currentMatch[0] + 1) % players.length;
    currentMatch[1] = (currentMatch[1] + 1) % players.length;
    if (currentMatch[0] === currentMatch[1]) {
        currentMatch[1] = (currentMatch[1] + 1) % players.length;
    }
}

export function resetScores() {
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

export function undoLastScore() {
    if (!lastScoringPlayer ||
      currentMatchScores[lastScoringPlayer] <= 0) {
        showSnackBar(lang('ui.tooltip.noScoreToUndo'), 'NoScoreToUndo', 'warning');
        return;
    }

    currentMatchScores[lastScoringPlayer]--;
    rotationalServesCounter = lastRotationalServesCounter;
    currentServe = lastServe;
    lastScoringPlayer = null;

    updateCurrentMatch();
}

window.incrementCurrentMatchScore = incrementCurrentMatchScore;

console.log({ matchHistory });
console.log({ totalScores });
