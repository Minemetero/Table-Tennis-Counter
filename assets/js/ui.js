
document.addEventListener('DOMContentLoaded', () => { // 虽然但是，onclick：？
    let pageEl = document.getElementById('page');
    
    document.getElementById('sober').addEventListener('load', function () {
        e_toggleTheme('auto')
        setTimeout(function () { // 等Sober执行完
            document.getElementById('main').style.visibility = 'visible';
            document.getElementById('top-bar').style.visibility = 'visible';
            hideLoading();
        }, 500);
    });
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
            showSnackBar('Theme set to auto', 'Theme');
            break;
        case 'light':
            pageEl.theme = 'light';
            themeIconEl.type = 'light_mode';
            themeIconEl.innerHTML = '';
            showSnackBar('Theme set to light', 'Theme');
            break;
        case 'dark':
            pageEl.theme = 'dark';
            themeIconEl.type = 'dark_mode';
            themeIconEl.innerHTML = '';
            showSnackBar('Theme set to dark', 'Theme');
            break;
    } 
}
function e_gotoGitHub() {
    showSnackBar('Issues and PRs are welcome!!!', 'RepoTips');
    window.open('https://github.com/Minemetero/Table-Tennis-Counter', '_blank');
}