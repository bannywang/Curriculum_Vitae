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
    const processedData = `伺服器：您輸入的文字是：${userInput}`

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

        // 如果註冊成功，返回 JSON 響應
        if (registrationResult.success) {
            return res.json({ success: true, message: '註冊成功', name: registrationResult.name })
        } else {
            return res.status(400).json({ success: false, message: registrationResult.message || '註冊失敗' })
        }
    } catch (error) {
        // 處理錯誤
        console.error('HTTP請求處理失敗：', error)
        res.status(500).json({ success: false, message: '伺服器錯誤' })
    }
}

// 取得用戶資訊
async function get_info(req, res) {
    try {
        const account = req.query.account // 使用者帳號
        const password = req.query.password // 使用者密碼

        let result = await model.get_user_info(account, password) // 獲取使用者資訊
        let infoMessage = result ? '取得成功' : '取得失敗' // 根據 result 的值設定 infoMessage

        // 將結果封裝為一個 JSON 物件並發送給客戶端
        res.json({ result, infoMessage })
    } catch (error) {
        console.error('ctrl:獲取使用者信息時發生錯誤：', error)
        res.status(500).json({ error: '伺服器錯誤，請稍後再試。' }) // 返回錯誤訊息
    }
}

module.exports = {
    get_main_html,
    handle_nodejs_post_request,
    perform_registration,
    get_info,
}
