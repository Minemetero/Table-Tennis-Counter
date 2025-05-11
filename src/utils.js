// 万恶的util...

// 字符串格式化
// 绝对不是从 https://www.cnblogs.com/soymilk2019/p/15388984.html 抄的（
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
/**
 * 从localStorage读取配置项，找不到返回defaultValue
 * @param {String} key 项名
 * @param {*} [defaultValue=null] 找不到时返回的默认值
 * @returns {*} 获取到的配置项
 */
export function readConfig(key, defaultValue = null) {
    try {
        let configString = localStorage.getItem('Table-Tennis-Counter');
        if (typeof configString == 'string' && configString !== null) {
            let config = JSON.parse(configString);
            if (typeof config == 'object' && typeof config[key] != 'undefined' && config[key] !== null) {
                return config[key];
            } else {
                return defaultValue;
            }
        } else {
            return defaultValue;
        }
    } catch (error) {
        return defaultValue;
    }
}

/**
 * 将配置项写入到localStorage
 * @param {String} key 项名
 * @param {*} value 要写入的内容
 */
export function writeConfig(key, value) {
    let configString = localStorage.getItem('Table-Tennis-Counter');
    let config = {};
    if (typeof configString == 'string' && config !== null) {
        try {
            config = JSON.parse(configString);
            if (!(typeof config == 'object' && config !== null)) {
                config = {};
            }
        } catch (error) {
            config = {};
        }
    } else {
        config = {};
    }
    config[key] = value;
    localStorage.setItem('Table-Tennis-Counter', JSON.stringify(config));
}
