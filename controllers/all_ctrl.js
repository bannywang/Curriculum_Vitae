const path = require('path')
const model = require('../models/model')

async function get_main_html(req, res) {
    // 渲染名為 'ejs-example' 的 EJS 模板，並傳遞動態數據
    res.render('index', {
        pageTitle: '王瀚邑的個人履歷',
        username: '王瀚邑',
    })
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

        // 渲染 register.ejs 並傳遞 registrationResult 變數
        res.render('register', { registrationResult })
    } catch (error) {
        // 處理錯誤
        console.error('HTTP请求处理失败：', error)
        res.status(500).send('伺服器錯誤')
    }
}

// 取得用戶資訊
async function get_info(req, res) {
    try {
        const account = req.query.account
        const password = req.query.password

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
            `
            res.send(userDataHTML)
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
