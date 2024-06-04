let score1 = 0;
let score2 = 0;

function incrementScore(player) {
    const winBalls = document.getElementById('winBalls').value;
    if (player === 1) {
        score1++;
        document.getElementById('score1').innerText = score1;
        if (score1 >= winBalls) {
            document.getElementById('result').innerText = 'Player 1 Wins!';
            disableButtons();
        }
    } else {
        score2++;
        document.getElementById('score2').innerText = score2;
        if (score2 >= winBalls) {
            document.getElementById('result').innerText = 'Player 2 Wins!';
            disableButtons();
        }
    }
}

function disableButtons() {
    document.querySelectorAll('.input-group button').forEach(button => {
        button.disabled = true;
    });
}

function resetScores() {
    score1 = 0;
    score2 = 0;
    document.getElementById('score1').innerText = score1;
    document.getElementById('score2').innerText = score2;
    document.getElementById('result').innerText = '';
    document.querySelectorAll('.input-group button').forEach(button => {
        button.disabled = false;
    });
}
