const { assert } = require('console')
const path = require('path')
const model = require('../models/model')

// 取得主頁
async function get_main_html(req, res) {
    // 獲取 index.html 的路徑，使用 'path' 模塊的 'join' 方法
    const indexPath = path.join(process.cwd(), 'index.html')

    // 使用 'res.sendFile' 方法將 index.html 發送到客戶端
    res.sendFile(indexPath)
}

// 前端傳回文字加以處理回傳
async function handle_nodejs_post_request(req, res) {
    const userInput = req.body.userInput
    const processedData = `後端伺服器：您輸入的文字是：${userInput}`

    console.log(processedData)

    // 將處理後的數據回傳給前端
    res.json({ message: processedData })
}

// 註冊
async function perform_registration(req, res) {
    try {
        const account = req.body.new_account
        const name = req.body.new_name
        const phone = req.body.new_phone
        const password = req.body.new_password

        const registrationResult = await model.register(account, name, phone, password)

        if (registrationResult.success) {
            res.send(`
                <html>
                <head>
                    <title>註冊成功</title>
                </head>
                <body>
                    <h1>註冊成功</h1>
                    <p>恭喜 ${registrationResult.name} 成功註冊！</p>
                    <!-- 这里可以放一些其他内容或链接 -->
                </body>
                </html>
            `)
        } else {
            // 注册失败，返回包含错误提示的HTML页面
            res.send(`
                <html>
                <head>
                    <title>註冊失敗</title>
                </head>
                <body>
                    <h1>註冊失敗</h1>
                    <p>${registrationResult.message}</p>
                    <!-- 这里可以放一些其他内容或链接 -->
                </body>
                </html>
            `)
        }
    } catch (error) {
        console.error('HTTP请求处理失败：', error)
        res.status(500).send(`
            <html>
            <head>
                <title>伺服器錯誤</title>
            </head>
            <body>
                <h1>伺服器錯誤</h1>
                <p>很抱歉，伺服器發生錯誤。</p>
                <!-- 这里可以放一些其他内容或链接 -->
            </body>
            </html>
        `)
    }
}

// 取得用戶資訊
async function get_info(req, res) {
    try {
        const account = req.body.account
        const password = req.body.password

        let result = await model.get_user_info(account, password)
        if (result) {
            const userDataHTML = `
                <html>
                <head>
                    <title>用戶資料</title>
                </head>
                <body>
                    <h1>用戶資料</h1>
                    <p>ID: ${result.id}</p>
                    <p>帳號: ${result.account}</p>
                    <p>姓名: ${result.name}</p>
                    <p>電話: ${result.phone}</p>
                    <p>建立時間: ${result.create_time}</p>
                </body>
                </html>
            `;
            res.send(userDataHTML);
        } else {
            console.error('ctrl：帳號或密碼不正確')
            res.status(500).json({ error: '查無帳號，請提供正確的帳號密碼' }) // 返回錯誤消息
        }
    } catch (error) {
        console.error('ctrl:註冊時發生錯誤：', error)
        res.status(500).json({ error: '伺服器錯誤，請稍後再試。' }) // 返回錯誤消息
    }
}

module.exports = {
    get_main_html,
    handle_nodejs_post_request,
    perform_registration,
    get_info,
}
