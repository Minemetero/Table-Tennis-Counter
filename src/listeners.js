import { addPlayer, addWinBalls, minusWinBalls, startGame, undoLastScore } from './script';
import { e_boardSelectChange, e_gotoGitHub, e_load, e_reloadPage, e_toggleTheme } from './ui';

export function listen() {
    document.addEventListener('DOMContentLoaded', () => {
        registerListeners();
        e_load();
    });
}

export function registerListeners() {
    /** @type {document['getElementById']} */
    const geb = document.getElementById.bind(document);

    geb('topbar-theme-toggle').addEventListener('click', () => e_toggleTheme());
    geb('topbar-reload-page').addEventListener('click', e_reloadPage);
    geb('topbar-github-link').addEventListener('click', e_gotoGitHub);

    geb('setup-winBalls-add').addEventListener('click', addWinBalls);
    geb('setup-winBalls-minus').addEventListener('click', minusWinBalls);

    geb('setup-addPlayer').addEventListener('click', addPlayer);

    geb('startGameButton').addEventListener('click', startGame);

    geb('gameBoardSelector').addEventListener('change', e_boardSelectChange);
    geb('undoButton').addEventListener('click', undoLastScore);

    // Strict Mode: set winBalls to 11 and disable the field when checked
    const strictModeCheckbox = geb('strictMode');
    const winBallsField = geb('winBalls');
    strictModeCheckbox.addEventListener('change', function () {
        if (strictModeCheckbox.checked) {
            winBallsField.value = 11;
            winBallsField.disabled = true;
        } else {
            winBallsField.disabled = false;
        }
    });
}
