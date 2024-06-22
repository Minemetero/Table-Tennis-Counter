/**
 * 存储语言文本
 * @type {Object<Object>}
 */
const languages = {
    'en-US': {
        'language.LanguageName': 'English',
        'ui.title': 'Table Tennis Counter',
        'ui.theme.themeName.auto': 'auto',
        'ui.theme.themeName.light': 'light',
        'ui.theme.themeName.dark': 'dark',
        'ui.topbar.language': 'Languages',
        'ui.topbar.theme': 'Theme',
        'ui.topbar.github': 'GitHub',
        'ui.setup.winningBalls': 'Set Winning Balls',
        'ui.setup.playerName': 'Player Name',
        'ui.setup.addPlayer': 'Add Player',
        'ui.setup.playerListHint': 'Players:',
        'ui.setup.startGame': 'Start Game',
        'ui.gameBoard.playerScores': 'Player Scores',
        'ui.gameBoard.matchHistory': 'Match History',
        'ui.gameBoard.currentMatch': 'Current Match',
        'ui.gameBoard.matchOrder': 'Match Order',
        'ui.gameBoard.score': 'Score',
        'ui.gameBoard.winMessage': '{0} Wins this round!',
        'ui.gameBoard.matchHistory.item': '{0} vs {1}: {2} won',
        'ui.gameBoard.matchOrder.item': '{0} vs {1}',
        'ui.tooltip.themeSetTo': 'Theme set to {0}',
        'ui.tooltip.playerNameError': 'Please enter a unique valid player name',
        'ui.tooltip.playerAmountError': 'Please add at least two players',
        'ui.tooltip.winningBallsError': 'Please enter a valid number of winning balls',
        'ui.tooltip.repoTip': 'Issues and PRs are welcome!!!',
    },
    'zh-CN': {
        'language.LanguageName': '简体中文',
        'ui.title': '乒乓球计数器',
        'ui.theme.themeName.auto': '自动',
        'ui.theme.themeName.light': '亮色',
        'ui.theme.themeName.dark': '暗色',
        'ui.topbar.language': '语言',
        'ui.topbar.theme': '主题',
        'ui.topbar.github': 'GitHub',
        'ui.setup.winningBalls': '设置制胜球数',
        'ui.setup.playerName': '玩家名',
        'ui.setup.addPlayer': '添加玩家',
        'ui.setup.playerListHint': '玩家:',
        'ui.setup.startGame': '开始比赛',
        'ui.gameBoard.playerScores': '玩家分数',
        'ui.gameBoard.matchHistory': '比赛历史',
        'ui.gameBoard.currentMatch': '当前比赛',
        'ui.gameBoard.matchOrder': '比赛顺序',
        'ui.gameBoard.score': '得分',
        'ui.gameBoard.winMessage': '{0} 本轮获胜！',
        'ui.gameBoard.matchHistory.item': '{0} vs {1}: {2} 获胜',
        'ui.gameBoard.matchOrder.item': '{0} vs {1}',
        'ui.tooltip.themeSetTo': '主题已设为 {0}',
        'ui.tooltip.playerNameError': '请填入唯一且有效的玩家名',
        'ui.tooltip.playerAmountError': '请添加至少两个玩家',
        'ui.tooltip.winningBallsError': '请填入有效的制胜球数',
        'ui.tooltip.repoTip': '欢迎 Issue 和 PR！！！',
    },
};
/**
 * 当前语言
 * @type {String}
 */
var currentLanguage = 'en-US'; // 这里得用var定义全局变量



/**
 * 这里是逻辑部分
 * 不要乱动，说不定啥时候就炸了（
 * 
 * 不要乱动啊啊啊啊啊
 */

/**
 * 获取语言列表，返回语言代码的数组
 * @returns {Array<String>} 
 */
function getLanguageList() {
    let list = [];
    for (let language in languages) {
        list.push(language);
    }
    return list;
}

/**
 * 从语言文件中取回当前语言 `key` 对应的值，并进行格式化（主动更新）
 * 如果当前语言没有此键，则返回英语的内容
 * 如果英语也没有，则返回键名称
 * @param {String} key 键名称
 * @param {String} args 格式化的参数
 * @returns {String} 取回并格式化后的字符串
 */
function lang(key, ...args) {
    return langForce(currentLanguage, key, ...args);
}

/**
 * 从指定的语言文件中取回 `key` 对应的值，并进行格式化（主动更新）
 * 如果指定语言没有此键，则返回英语的内容
 * 如果英语也没有，则返回键名称
 * @param {String} lang 语言代码
 * @param {String} key 键名称
 * @param {String} args 格式化的参数
 * @returns {String} 取回并格式化后的字符串
 */
function langForce(lang, key, ...args) {
    if (
        typeof languages[lang] != 'object' ||
        typeof languages[lang][key] != 'string'
    ) {
        lang = 'en-US';
    }
    if (lang === 'en-US' && typeof languages[lang][key] != 'string') {
        return key;
    }
    return languages[lang][key].format(...args);
}

/**
 * 设置为某语言，并重新加载页面
 * @param {String} language 语言名称
 */
function setLanguage(language) {
    console.log(`Language set to ${language}`);
    writeConfig('language', language);
    window.location.reload();
}

/**
 * 更新元素的语言（被动更新）  
 * 根据元素的 `data-lang` 属性匹配键，并将属性 `data-lang-prop` 对应的属性名设置为此值  
 * **此函数执行较慢，非必要不随意调用！**
 */
function updateElementLanguages() {
    // 这个函数费了我至少一个半小时...改bug太麻烦了
    console.log('Update Element Languages Start');
    console.time('Update Element Languages'); // 耗时操作，计个时不过分吧
    let elements = document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) { // 遍历每个元素
        let element = elements[i];
        if (element.dataset?.lang) {
            // 根据data-lang属性来匹配值
            if (
                element.dataset.langProp || // 如果指定了data-lang-prop则使用此属性
                element.childNodes.length === 0 || // 或者没有子节点（内容是空的）
                (element.childNodes.length === 1 && // 或者如果只有一个子节点（只包含文本）
                    element.childNodes[0].nodeName === '#text')
            ) {
                let property = element.dataset.langProp ?? 'innerText';
                element[property] = lang(element.dataset.lang);
                console.debug(
                    `Update Element Languages: key '${element.dataset.lang}' property '${property}' %o`,
                    element
                );
            } else {
                // 如果元素子节点不止一个（除了文本还包含其他元素）
                // 则遍历所有子节点，找到文本节点并设置其值
                // 为了防止影子根被误认成文本必须倒序遍历
                // 血泪的教训啊
                for (let j = element.childNodes.length - 1; j >= 0; j--) {
                    if (element.childNodes[j].nodeName === '#text') {
                        element.childNodes[j].nodeValue = lang(
                            element.dataset.lang
                        );
                        console.debug(
                            `Update Element Languages: key '${element.dataset.lang}' %o`,
                            element
                        );
                        break;
                    }
                }
            }
        }
    }
    console.timeEnd('Update Element Languages');
}
