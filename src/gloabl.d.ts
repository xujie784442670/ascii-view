interface Ascii {
    /**
     * 十进制
     */
    dec: number
    /**
     * 注释
     */
    comment: string
    /**
     * 缩写/字符
     */
    characters: string
    /**
     * 二进制
     */
    bin: string
    /**
     * 八进制
     */
    oct: string
    /**
     * 十六进制
     */
    hex: string
}

interface Config{
    /**
     * 设置配置
     * @param key
     * @param value
     */
    setItem(key:string, value:any): void

    /**
     * 获取配置
     * @param key
     */
    getItem(key:string): any

    /**
     * 删除配置
     * @param key
     */
    removeItem(key:string): void

    /**
     * 更新配置
     * @param key
     * @param handler
     */
    updateItem(key:string,handler:Function): void
}

declare var config: Config
