const model = require('../models/model')
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
            return res.status(200).json({ success: true, message: '註冊成功', name: registrationResult.name })
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
        const email = req.body.email
        const password = req.body.password

        const loginResult = await model.user_login(email, password)

        if (loginResult.success) {
            console.log('登入成功')

            // 存储用户信息在 session 中
            req.session.user = loginResult.user
            res.redirect('/main')
        } else {
            console.log('登入失敗')
            res.status(401).json({ success: false, message: loginResult.message })
        }
    } catch (error) {
        // 处理错误
        console.error('登入失敗：', error)
        res.status(500).json({ success: false, message: '登入失敗' })
    }
}

// 登出
async function perform_logout(req, res) {
    try {
        if (req.session.user) {
            // 获取用户的 user_id
            const user_id = req.session.user.user_id

            // 在数据库中将用户的登录状态设置为 0，表示已登出
            const logoutResult = await model.user_logout(user_id)

            if (logoutResult.success) {
                // 从 session 中移除用户信息
                req.session.user = null
                console.log('登出成功')
                res.redirect('/') // 重定向到主页或其他适当的页面
            } else {
                res.status(500).json({ success: false, message: '登出失败' })
            }
        } else {
            res.status(400).json({ success: false, message: '用户未登录' })
        }
    } catch (error) {
        // 处理错误
        console.error('登出失败：', error)
        res.status(500).json({ success: false, message: '登出失败' })
    }
}

module.exports = {
    get_index_ejs,
    get_main_ejs,
    handle_nodejs_post_request,
    get_login_page,
    perform_registration,
    perform_login,
    perform_logout,
}
