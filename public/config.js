const fs = require('fs');
const path = require('path');
let configDir = path.join(utools.getPath('userData'), 'ascii-view');;
// 检查文件夹是否存在
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
}
const configPath = path.join(configDir, 'config.json');
/**
 * 读取配置文件
 * @returns {any}
 */
function readConfig() {
    // 检查文件是否存在
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, '{}');
        return {};
    }
    const config = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(config);
}

/**
 * 写入配置文件
 * @param config
 */
function writeConfig(config) {
    // 检查文件夹是否存在
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir);
    }
    console.log("更新配置文件",config);
    // 检查文件是否存在
    fs.writeFileSync(configPath, JSON.stringify(config));
}
module.exports =  {
    /**
     * 设置本地存储
     * @param {string} key 键
     * @param {any} value 值
     */
    setItem(key, value) {
        const config = readConfig();
        config[key] = value;
        writeConfig(config);
    },
    /**
     * 根据指定的键获取本地存储
     * @param {string} key
     * @returns {any}
     */
    getItem(key) {
        const config = readConfig();
        return config[key];
    },
    /**
     * 根据指定的键删除本地存储
     * @param {string} key
     */
    removeItem(key) {
        const config = readConfig();
        delete config[key];
        writeConfig(config);
    },
    /**
     * 更新本地存储
     * @param {Function}handler 更新处理器
     */
    updateItem(key,handler){
        const config = readConfig();
        config[key] = handler(config[key]);
        writeConfig(config);
    },
    /**
     * 获取所有的键
     * @returns {string[]} 所有的键
     */
    getAllKeys(){
        const config = readConfig();
        return Object.keys(config);
    }

}
