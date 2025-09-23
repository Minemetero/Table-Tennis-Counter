import { e_reloadPage } from "./ui";
import { writeConfig } from "./utils";

/**
 * 存储语言文本
 * @type {Object<Object>}
 */
export const languages = {
    'en-US': {
        'language.LanguageName': 'English',
        'ui.title': 'Table Tennis Counter',
        'ui.theme.themeName.auto': 'auto',
        'ui.theme.themeName.light': 'light',
        'ui.theme.themeName.dark': 'dark',
        'ui.topbar.language': 'Languages',
        'ui.topbar.theme': 'Theme',
        'ui.topbar.more': 'More',
        'ui.topbar.reload': 'Reload',
        'ui.topbar.github': 'GitHub',
        'ui.setup.winningBalls': 'Set Winning Balls',
        'ui.setup.playerName': 'Player Name',
        'ui.setup.addPlayer': 'Add Player',
        'ui.setup.serveRule': 'Serve Rule',
        'ui.setup.serveRule.none': 'None',
        'ui.setup.serveRule.inTurn': 'In Turn',
        'ui.setup.rotationalServes': 'Rotational Serves Number',
        'ui.setup.strictMode': 'Strict Mode',
        'ui.setup.playerListHint': 'Players:',
        'ui.setup.startGame': 'Start Game',
        'ui.gameBoard.tab.score': 'Score',
        'ui.gameBoard.tab.history': 'History',
        'ui.gameBoard.tab.info': 'Info',
        'ui.gameBoard.playerScores': 'Player Scores',
        'ui.gameBoard.matchHistory': 'Match History',
        'ui.gameBoard.currentMatch': 'Current Match',
        'ui.gameBoard.matchOrder': 'Match Order',
        'ui.gameBoard.serve': 'Serve',
        'ui.gameBoard.score': 'Score',
        'ui.gameBoard.matchPoint': '{0} is at match point!',
        'ui.gameBoard.winMessage': '{0} Wins this round!',
        'ui.gameBoard.matchHistory.item': '{0} vs {1}: {2} won',
        'ui.gameBoard.matchOrder.item': '{0} vs {1}',
        'ui.gameBoard.undo': 'Undo',
        'ui.tooltip.themeSetTo': 'Theme set to {0}',
        'ui.tooltip.playerNameError': 'Please enter a unique valid player name',
        'ui.tooltip.playerAmountError': 'Please add at least two players',
        'ui.tooltip.winningBallsError': 'Please enter a valid number of winning balls',
        'ui.tooltip.serveRuleError': 'Please choose a valid serve rule',
        'ui.tooltip.rotationalServesError': 'Please enter a valid number of rotational serves number',
        'ui.tooltip.repoTip': 'Issues and PRs are welcome!!!',
        'ui.tooltip.noScoreToUndo': 'No score to undo',
        'ui.gameBoard.matchHistory.match': 'Match',
        'ui.gameBoard.matchHistory.score': 'Score',
        'ui.gameBoard.matchHistory.setScore': 'Set Score',
        'ui.gameBoard.matchHistory.winner': 'Winner',
    },
    'zh-CN': {
        'language.LanguageName': '简体中文',
        'ui.title': '乒乓球计数器',
        'ui.theme.themeName.auto': '自动',
        'ui.theme.themeName.light': '亮色',
        'ui.theme.themeName.dark': '暗色',
        'ui.topbar.language': '语言',
        'ui.topbar.theme': '主题',
        'ui.topbar.more': '更多',
        'ui.topbar.reload': '重载',
        'ui.topbar.github': 'GitHub',
        'ui.setup.winningBalls': '设置制胜球数',
        'ui.setup.playerName': '玩家名',
        'ui.setup.addPlayer': '添加玩家',
        'ui.setup.serveRule': '发球规则',
        'ui.setup.serveRule.none': '无',
        'ui.setup.serveRule.inTurn': '轮流',
        'ui.setup.rotationalServes': '轮换发球数',
        'ui.setup.strictMode': '严格模式',
        'ui.setup.playerListHint': '玩家:',
        'ui.setup.startGame': '开始比赛',
        'ui.gameBoard.tab.score': '计分',
        'ui.gameBoard.tab.history': '历史',
        'ui.gameBoard.tab.info': '信息',
        'ui.gameBoard.playerScores': '玩家分数',
        'ui.gameBoard.matchHistory': '比赛历史',
        'ui.gameBoard.currentMatch': '当前比赛',
        'ui.gameBoard.matchOrder': '比赛顺序',
        'ui.gameBoard.serve': '发球',
        'ui.gameBoard.score': '得分',
        'ui.gameBoard.matchPoint': '{0} 处于赛点！',
        'ui.gameBoard.winMessage': '{0} 本轮获胜！',
        'ui.gameBoard.matchHistory.item': '{0} vs {1}: {2} 获胜',
        'ui.gameBoard.matchOrder.item': '{0} vs {1}',
        'ui.gameBoard.undo': '撤销',
        'ui.tooltip.themeSetTo': '主题已设为 {0}',
        'ui.tooltip.playerNameError': '请填入唯一且有效的玩家名',
        'ui.tooltip.playerAmountError': '请添加至少两个玩家',
        'ui.tooltip.winningBallsError': '请填入有效的制胜球数',
        'ui.tooltip.serveRuleError': '请选择一个有效的发球规则',
        'ui.tooltip.rotationalServesError': '请填入有效的轮换发球数',
        'ui.tooltip.repoTip': '欢迎 Issue 和 PR！！！',
        'ui.tooltip.noScoreToUndo': '没有可撤销的分数',
        'ui.gameBoard.matchHistory.match': '比赛',
        'ui.gameBoard.matchHistory.score': '比分',
        'ui.gameBoard.matchHistory.setScore': '局分',
        'ui.gameBoard.matchHistory.winner': '获胜者',
    },
    'zh-TW': {
        'language.LanguageName': '繁體中文',
        'ui.title': '乒乓球計數器',
        'ui.theme.themeName.auto': '自動',
        'ui.theme.themeName.light': '亮色',
        'ui.theme.themeName.dark': '暗色',
        'ui.topbar.language': '語言',
        'ui.topbar.theme': '主題',
        'ui.topbar.more': '更多',
        'ui.topbar.reload': '重新載入',
        'ui.topbar.github': 'GitHub',
        'ui.setup.winningBalls': '設定勝球數',
        'ui.setup.playerName': '玩家名稱',
        'ui.setup.addPlayer': '新增玩家',
        'ui.setup.serveRule': '發球規則',
        'ui.setup.serveRule.none': '無',
        'ui.setup.serveRule.inTurn': '輪流',
        'ui.setup.rotationalServes': '輪換發球數',
        'ui.setup.strictMode': '嚴格模式',
        'ui.setup.playerListHint': '玩家:',
        'ui.setup.startGame': '開始比賽',
        'ui.gameBoard.tab.score': '計分',
        'ui.gameBoard.tab.history': '歷史',
        'ui.gameBoard.tab.info': '資訊',
        'ui.gameBoard.playerScores': '玩家得分',
        'ui.gameBoard.matchHistory': '比賽歷史',
        'ui.gameBoard.currentMatch': '當前比賽',
        'ui.gameBoard.matchOrder': '比賽順序',
        'ui.gameBoard.serve': '發球',
        'ui.gameBoard.score': '得分',
        'ui.gameBoard.matchPoint': '{0} 處於賽點!',
        'ui.gameBoard.winMessage': '{0} 贏得了這一局！',
        'ui.gameBoard.matchHistory.item': '{0} 對 {1}: {2} 獲勝',
        'ui.gameBoard.matchOrder.item': '{0} 對 {1}',
        'ui.gameBoard.undo': '撤銷',
        'ui.tooltip.themeSetTo': '主題已設定為 {0}',
        'ui.tooltip.playerNameError': '請輸入唯一且有效的玩家名稱',
        'ui.tooltip.playerAmountError': '請至少添加兩個玩家',
        'ui.tooltip.winningBallsError': '請輸入有效的勝球數',
        'ui.tooltip.serveRuleError': '請選擇一個有效的發球規則',
        'ui.tooltip.rotationalServesError': '請輸入有效的輪換發球數',
        'ui.tooltip.repoTip': '歡迎提交 Issue 和 PR！！！',
        'ui.tooltip.noScoreToUndo': '沒有可撤銷的分數',
        'ui.gameBoard.matchHistory.match': '比賽',
        'ui.gameBoard.matchHistory.score': '比分',
        'ui.gameBoard.matchHistory.setScore': '局分',
        'ui.gameBoard.matchHistory.winner': '獲勝者',
    },
    'ja-JP': {
        'language.LanguageName': '日本語',
        'ui.title': '卓球カウンター',
        'ui.theme.themeName.auto': '自動',
        'ui.theme.themeName.light': 'ライト',
        'ui.theme.themeName.dark': 'ダーク',
        'ui.topbar.language': '言語',
        'ui.topbar.theme': 'テーマ',
        'ui.topbar.more': 'その他',
        'ui.topbar.reload': '再読み込み',
        'ui.topbar.github': 'GitHub',
        'ui.setup.winningBalls': '勝利点数を設定',
        'ui.setup.playerName': 'プレイヤー名',
        'ui.setup.addPlayer': 'プレイヤーを追加',
        'ui.setup.serveRule': 'サーブルール',
        'ui.setup.serveRule.none': 'なし',
        'ui.setup.serveRule.inTurn': '順番',
        'ui.setup.rotationalServes': 'サーブ交代数',
        'ui.setup.strictMode': '厳格モード',
        'ui.setup.playerListHint': 'プレイヤー:',
        'ui.setup.startGame': 'ゲーム開始',
        'ui.gameBoard.tab.score': 'スコア',
        'ui.gameBoard.tab.history': '履歴',
        'ui.gameBoard.tab.info': '情報',
        'ui.gameBoard.playerScores': 'プレイヤースコア',
        'ui.gameBoard.matchHistory': '試合履歴',
        'ui.gameBoard.currentMatch': '現在の試合',
        'ui.gameBoard.matchOrder': '試合順序',
        'ui.gameBoard.serve': 'サーブ',
        'ui.gameBoard.score': '得点',
        'ui.gameBoard.matchPoint': '{0} がマッチポイントです!',
        'ui.gameBoard.winMessage': '{0} がこのラウンドに勝利しました！',
        'ui.gameBoard.matchHistory.item': '{0} 対 {1}: {2} が勝利',
        'ui.gameBoard.matchOrder.item': '{0} 対 {1}',
        'ui.gameBoard.undo': 'アンドゥ',
        'ui.tooltip.themeSetTo': 'テーマが {0} に設定されました',
        'ui.tooltip.playerNameError': 'ユニークで有効なプレイヤー名を入力してください',
        'ui.tooltip.playerAmountError': '少なくとも2人のプレイヤーを追加してください',
        'ui.tooltip.winningBallsError': '有効な勝利点数を入力してください',
        'ui.tooltip.serveRuleError': '有効なサーブルールを選択してください',
        'ui.tooltip.rotationalServesError': '有効なサーブ交代数を入力してください',
        'ui.tooltip.repoTip': 'IssueやPRをお待ちしています！！！',
        'ui.tooltip.noScoreToUndo': '取り消すスコアはありません',
        'ui.gameBoard.matchHistory.match': '試合',
        'ui.gameBoard.matchHistory.score': 'スコア',
        'ui.gameBoard.matchHistory.setScore': 'セットスコア',
        'ui.gameBoard.matchHistory.winner': '勝者',
    },
    'el-GR': {
        'language.LanguageName': 'Ελληνικά',
        'ui.title': 'Μετρητής Σκορ Πινγκ-Πονγκ',
        'ui.theme.themeName.auto': 'Αυτόματο',
        'ui.theme.themeName.light': 'Φωτεινό',
        'ui.theme.themeName.dark': 'Σκοτεινό',
        'ui.topbar.language': 'Γλώσσες',
        'ui.topbar.theme': 'Θεμα',
        'ui.topbar.more': 'Άλλο',
        'ui.topbar.reload': 'Επαναφόρτωση',
        'ui.topbar.github': 'GitHub',
        'ui.setup.winningBalls': 'Σετ Κερδισμένων μπαλών',
        'ui.setup.playerName': 'Όνομα παίκτη',
        'ui.setup.addPlayer': 'Πρόσθεσε παίκτη',
        'ui.setup.serveRule': 'Serve Κανόνας',
        'ui.setup.serveRule.none': 'Κανένα',
        'ui.setup.serveRule.inTurn': 'Με σειρά',
        'ui.setup.rotationalServes': 'Αριθμός περιστροφικών σερβίς',
        'ui.setup.strictMode': 'Συμπεριφορά Συμπαγούς',
        'ui.setup.playerListHint': 'Παίκτες:',
        'ui.setup.startGame': 'Εκκίνηση',
        'ui.gameBoard.tab.score': 'Σκορ',
        'ui.gameBoard.tab.history': 'Ιστορικό',
        'ui.gameBoard.tab.info': 'Πληροφορίες',
        'ui.gameBoard.playerScores': 'Σκορ Παίκτη',
        'ui.gameBoard.matchHistory': 'Ιστορικό Match',
        'ui.gameBoard.currentMatch': 'Τρέχων Match',
        'ui.gameBoard.matchOrder': 'Σειρά Match',
        'ui.gameBoard.serve': 'Σερβίς',
        'ui.gameBoard.score': 'Σκορ',
        'ui.gameBoard.matchPoint': '{0} βρίσκεται σε match point!',
        'ui.gameBoard.winMessage': '{0} Κέρδισε αυτόν τον γύρο!',
        'ui.gameBoard.matchHistory.item': '{0} vs {1}: {2} κέρδισε',
        'ui.gameBoard.matchOrder.item': '{0} vs {1}',
        'ui.gameBoard.undo': 'ξεκάνω',
        'ui.tooltip.themeSetTo': 'Το θέμα τέθηκε στον/στην {0}',
        'ui.tooltip.playerNameError': 'Παρακαλώ εισάγετε ένα μοναδικό έγκυρο όνομα παίκτη',
        'ui.tooltip.playerAmountError': 'Παρακαλώ εισάγετε τουλάχιστον δύο παίκτες',
        'ui.tooltip.winningBallsError': 'Παρακαλω εισάγετε έναν έγκυρο αριθμό κερδισμένων μπαλων ',
        'ui.tooltip.serveRuleError': 'Παρακαλώ να επιλέξετε έναν έγκυρο κανόνα σερβίς',
        'ui.tooltip.rotationalServesError': 'Παρακαλώ εισάγετε εναν εγκυρο αριθμό περιστροφικών σερβις',
        'ui.tooltip.repoTip': 'Για κάθε πρόβλημα ή PRs επικοινωνήστε μαζί μας!!!',
        'ui.tooltip.noScoreToUndo': 'Δεν υπάρχει σκορ για αναίρεση',
        'ui.gameBoard.matchHistory.match': 'Αγώνας',
        'ui.gameBoard.matchHistory.score': 'Σκορ',
        'ui.gameBoard.matchHistory.setScore': 'Σκορ σετ',
        'ui.gameBoard.matchHistory.winner': 'Νικητής',
    },
};
/**
 * 当前语言
 * @type {String}
 */
let currentLanguage = 'en-US';

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
export function getLanguageList() {
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
export function lang(key, ...args) {
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
export function langForce(lang, key, ...args) {
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
export function setLanguage(language) {
    console.log(`Language set to ${language}`);
    writeConfig('language', language);
    e_reloadPage();
}

/**
 * 获取当前语言
 * @returns {String} 当前语言
 */
export function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * 设置当前语言（不刷新）
 * @param {String} language 语言名称
 */
export function setCurrentLanguage(language) {
    currentLanguage = language;
}

/**
 * 更新元素的语言（被动更新）
 * 根据元素的 `data-lang` 属性匹配键，并将属性 `data-lang-prop` 对应的属性名设置为此值
 * **此函数执行较慢，非必要不随意调用！**
 */
export function updateElementLanguages() {
    // 这个函数费了我至少一个半小时...改bug太麻烦了
    console.log('Update Element Languages Start');
    console.time('Update Element Languages'); // 耗时操作，计个时不过分吧
    let elements = document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        // 遍历每个元素
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
                let foundTextNode = false;
                // 经测试影子根不会被误认成文本，无需倒序遍历
                for (let j = 0; j <= element.childNodes.length - 1; j++) {
                    if (element.childNodes[j].nodeName === '#text') {
                        element.childNodes[j].nodeValue = lang(
                            element.dataset.lang
                        );
                        foundTextNode = true;
                        break;
                    }
                }
                // 如果没有找到文本节点，则在最后添加一个文本节点
                if (!foundTextNode) {
                    let textNode = document.createTextNode(
                        lang(element.dataset.lang)
                    );
                    element.appendChild(textNode);
                }
                console.debug(
                    `Update Element Languages: key '${element.dataset.lang}' %o`,
                    element
                );
            }
        }
    }
    console.timeEnd('Update Element Languages');
}
