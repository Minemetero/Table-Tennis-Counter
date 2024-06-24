
document.addEventListener('DOMContentLoaded', () => { // 虽然但是，onclick：？
    setTimeout(function () { // 等Sober执行完
        document.getElementById('main').style.visibility = 'visible';
        document.getElementById('top-bar').style.visibility = 'visible';
        hideLoading();
    }, 500);
    currentLanguage = readConfig('language', 'en-US');
    document.documentElement.lang = currentLanguage;
    e_toggleTheme(readConfig('theme', 'auto'));
    let langList = getLanguageList();
    let languageMenuEl = document.getElementById('language-menu');
    langList.forEach(function(currentValue) {
        languageMenuEl.innerHTML += `
<s-menu-item onclick="setLanguage('${currentValue}')">
    ${langForce(currentValue, 'language.LanguageName')}
</s-menu-item>`;
    });
    updateElementLanguages();
});

function showSnackBar(message, id = 'snackbar') {
    let snackBarEl = document.getElementById('snackbar-' + id);
    if (snackBarEl === null) {
        snackBarEl = document.createElement('s-snackbar');
        snackBarEl.id ='snackbar-' + id;
        document.getElementById('tooltips').appendChild(snackBarEl);
    }
    snackBarEl.innerText = message;
    snackBarEl.show();
}
function showLoading() {
    document.getElementById('top-loading').style.visibility = 'visible';
}
function hideLoading() {
    document.getElementById('top-loading').style.visibility = 'hidden';
}

function e_toggleTheme(theme) {
    let pageEl = document.getElementById('page');
    let themeIconEl = document.getElementById('theme-icon');
    if (!theme) {
        switch (pageEl.theme) {
            case 'auto':
                theme = 'light';
                break;
            case 'light':
                theme = 'dark';
                break;
            case 'dark':
                theme = 'auto';
                break;
            default:
                theme = 'light';
                break;
        } 
    }
    switch (theme) {
        case 'auto':
            pageEl.theme = 'auto';
            themeIconEl.type = '';
            themeIconEl.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="M312-320h64l32-92h146l32 92h62L512-680h-64L312-320Zm114-144 52-150h4l52 150H426Zm54 
    436L346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 
    134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 
    380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"></path>
</svg>`;
            break;
        case 'light':
            pageEl.theme = 'light';
            themeIconEl.type = 'light_mode';
            themeIconEl.innerHTML = '';
            break;
        case 'dark':
            pageEl.theme = 'dark';
            themeIconEl.type = 'dark_mode';
            themeIconEl.innerHTML = '';
            break;
    }
    writeConfig('theme', theme);
    showSnackBar(lang('ui.tooltip.themeSetTo', lang(`ui.theme.themeName.${theme}`)), 'Theme');
}

function e_reloadPage() {
    showLoading();
    window.location.reload();
}

function e_gotoGitHub() {
    showSnackBar(lang('ui.tooltip.repoTip'), 'RepoTips');
    window.open('https://github.com/Minemetero/Table-Tennis-Counter', '_blank');
}

function e_boardSelectChange() {
    let selectedIndex = document.getElementById('gameBoardSelector').selectedIndex;
    let boards = document.querySelectorAll('#gameBoard>div');
    boards.forEach(function(currentValue) {
        currentValue.classList.remove('active');
    });
    if (selectedIndex >= 0 && selectedIndex < boards.length) {
        boards[selectedIndex].classList.add('active');
    }
}