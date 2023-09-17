const model = require('../models/model')
const { jwtMiddleware, createToken } = require('../middlewares/jwtMiddleware')

// 主頁
async function get_index_ejs(req, res) {
    // 渲染名為 'ejs-example' 的 EJS 模板，並傳遞動態數據
    res.render('index', {
        pageTitle: '王瀚邑的個人履歷',
        username: '王瀚邑',
    })
}

// 個人更多頁
async function get_main_ejs(req, res) {
    res.render('main', {
        pageTitle: '詳細資訊',
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

// 取得登入頁面
async function get_login_page(req, res) {
    res.render('login_page', {
        pageTitle: '登入頁面',
    })
}

// 註冊
async function perform_registration(req, res) {
    try {
        const name = req.body.new_name
        const mail = req.body.new_email
        const password = req.body.new_password

        const registrationResult = await model.user_register(name, mail, password)

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

// 登入
async function perform_login(req, res) {
    try {
        const mail = req.body.new_email
        const password = req.body.new_password

        const login_result = await model.user_login(mail, password)

        if (login_result.success) {
            // 驗證 JWT 令牌
            jwtMiddleware(req, res, (err) => {
                if (err) {
                    // JWT 驗證失敗，返回錯誤消息或執行其他操作
                    return res.redirect('/login_page')
                }

                // JWT 驗證成功，繼續處理請求
                const token = createToken(login_result.user)
                res.json({ success: true, token }) // 或者您可以根據需求返回其他用戶信息
            })
        } else {
            // 登入失敗，返回錯誤消息
            res.json({ success: false, message: login_result.message })
        }
    } catch (error) {
        // 處理錯誤
        console.error('登入失敗：', error)
        res.json({ success: false, message: '登入失敗' })
    }
}

module.exports = {
    get_index_ejs,
    get_main_ejs,
    handle_nodejs_post_request,
    get_login_page,
    perform_registration,
    perform_login,
}
