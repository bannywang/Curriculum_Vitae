const tool = require('../models/tool')
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
    try {
        // 因為你已經使用了 check_login 中間件來驗證登入狀態，所以可以確保使用者已登入
        const user_id = req.session.user.user_id

        // 獲取使用者資訊
        const userInfoResult = await model.use_id_get_user_info(user_id)

        if (userInfoResult.success) {
            // 渲染 main.ejs 並傳遞使用者資訊
            res.render('main', {
                pageTitle: '詳細資訊',
                user: req.session.user, // 使用者基本資訊
                userInfo: userInfoResult.user, // 使用者詳細資訊
            })
        } else {
            // 處理獲取使用者資訊失敗的情況
            console.error('ctrl回：獲取使用者資訊失敗：', userInfoResult.message)
            res.status(500).json({ success: false, message: '獲取使用者資訊失敗' })
        }
    } catch (error) {
        // 處理錯誤
        console.error('ctrl回：HTTP請求處理失敗：', error)
        res.status(500).json({ success: false, message: '伺服器錯誤' })
    }
}

// 聊天室頁面
async function get_chat_room_ejs(req, res) {
    try {
        const user_id = req.session.user.user_id
        // 獲取使用者資訊
        const userInfoResult = await model.use_id_get_user_info(user_id)

        if (userInfoResult.success) {
            res.render('chat_room_page', {
                pageTitle: '聊天室',
                userName: userInfoResult.user.name,
            })
        }
    } catch (error) {
        // 處理錯誤
        console.error('ctrl回：HTTP請求處理失敗：', error)
        res.status(500).json({ success: false, message: '伺服器錯誤' })
    }
}

// 前端傳回文字加以處理回傳
async function handle_nodejs_post_request(req, res) {
    const userInput = req.body.userInput
    const processedData = `伺服器：您輸入的文字是：${userInput}`

    console.log(`ctrl回： ${processedData}`)

    // 將處理後的數據回傳給前端
    res.json({ message: processedData })
}

// 取得登入頁面
async function get_login_page(req, res) {
    res.render('login_page', {
        pageTitle: '登入頁面',
    })
}

// 忘記密碼頁面
async function get_forgot_password_page(req, res) {
    res.render('forgot_password_page', {
        pageTitle: '忘記密碼',
    })
}

// ----------------------------------------------------------------

// 註冊
async function perform_registration(req, res) {
    try {
        const name = req.body.new_name
        const mail = req.body.new_email
        const password = req.body.new_password

        const registrationResult = await model.user_register(name, mail, password)

        // 如果註冊成功，自動登錄
        if (registrationResult.success) {
            req.body.email = mail
            req.body.password = password
            await perform_login(req, res)
        } else {
            res.redirect('/login_page')
        }
    } catch (error) {
        // 處理錯誤
        console.error('ctrl回：HTTP請求處理失敗：', error)
        res.redirect('/login_page')
    }
}

// 改密碼或名字
async function perform_update_password_or_name(req, res) {
    try {
        // 從請求中獲取當前用戶信息和要更新的信息
        const current_user = req.session.user
        const current_password = req.body.current_password
        const new_password = req.body.new_password
        const new_name = req.body.new_name

        // 檢查是否有用戶已登入
        if (!current_user) {
            return res.status(401).json({ success: false, message: '用戶未登入' })
        }

        // 調用 model 中的函數執行更新操作
        const result = await model.update_password_or_name(current_user.mail, current_password, new_password, new_name)

        // 根據結果返回適當的響應
        if (result.success) {
            // 清除 session，以使使用者需要重新登入
            req.session.destroy((err) => {
                if (err) {
                    console.error('ctrl回：清除 session 失敗：', err)
                    return res.status(500).json({ success: false, message: '清除 session 失敗' })
                }

                return res.redirect('/login_page')
            })
        } else {
            return res.status(400).json({ success: false, message: result.message })
        }
    } catch (error) {
        console.error('更新密碼或名稱失敗：', error)
        return res.status(500).json({ success: false, message: '更新密碼或名稱失敗' })
    }
}

// 登入
async function perform_login(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password

        const loginResult = await model.user_login(email, password)

        if (loginResult.success) {
            console.log('ctrl回：登入成功')

            // 存儲使用者信息在 session 中
            req.session.user = loginResult.user
            res.redirect('/main')
        } else {
            console.log('ctrl回：登入失敗')

            // 登入失敗，將訊息返回到前端
            res.redirect('/login_page')
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
            // 獲取使用者的 user_id
            const user_id = req.session.user.user_id

            // 在資料庫中將使用者的登入狀態設置為 0，表示已登出
            const logoutResult = await model.user_logout(user_id)

            if (logoutResult.success) {
                // 從 session 中移除使用者資訊
                req.session.user = null
                console.log('ctrl回：登出成功')
                res.redirect('/') // 重定向到主頁或其他適當的頁面
            } else {
                res.status(500).json({ success: false, message: '登出失敗' })
            }
        } else {
            res.status(400).json({ success: false, message: '使用者未登入' })
        }
    } catch (error) {
        // 處理錯誤
        console.error('ctrl回：登出失敗：', error)
        res.status(500).json({ success: false, message: '登出失敗' })
    }
}

// 忘記密碼
async function handle_forgot_password(req, res) {
    try {
        const email = req.body.email // 從 POST 請求中獲取電子郵件地址

        // 查詢使用者的密碼
        const userPassword = await model.use_mail_get_user_pass(email)

        if (userPassword) {
            // 發送純文字郵件
            const subject = '使用者密碼' // 郵件主題
            const text =
                '親愛的用戶，\n\n' +
                '我們收到了您找回密碼的請求。\n\n' +
                '您的密碼是：' +
                userPassword +
                ' (請勿將您的密碼告知他人)\n\n' +
                '\n\n' +
                '感謝您使用我們的服務！\n\n' +
                '祝您一天愉快！\n\n' +
                '順頌時期，\n\n' +
                '您的服務團隊' // 郵件內容

            const emailResult = await tool.sendEmail(email, subject, text)

            if (emailResult.success) {
                // 在成功發送時存儲一個訊息到 session 中
                req.session.successMessage = '密碼已發送到您的電子郵件'
                res.redirect('/login_page')
            } else {
                return res.status(500).json({ success: false, message: '無法發送電子郵件' })
            }
        } else {
            req.session.successMessage = '找不到使用者'
            res.redirect('/forgot_password')
        }
    } catch (error) {
        console.error('處理忘記密碼請求失敗：', error)
        return res.status(500).json({ success: false, message: '處理請求失敗' })
    }
}

module.exports = {
    get_index_ejs,
    get_main_ejs,
    handle_nodejs_post_request,
    get_login_page,
    get_forgot_password_page,
    get_chat_room_ejs,
    perform_registration,
    perform_update_password_or_name,
    perform_login,
    perform_logout,
    handle_forgot_password,
}
