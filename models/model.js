const { connection } = require('../database/connection')
const { format_date_time } = require('../models/tool') // 格式化時間

// 取得全部使用者資訊
async function get_all_user_info() {
    try {
        const query = 'SELECT * FROM user_info'
        const [results] = await connection.query(query)
        const formatted_results = results.map((user_info) => {
            user_info.create_time = format_date_time(user_info.create_time)
            return user_info
        })
        console.log('用戶資料', formatted_results)
        return formatted_results // 回傳用戶資料
    } catch (error) {
        console.error('無法獲取用戶資料:', error)
        return [] // 回傳空陣列表示發生錯誤或沒有用戶資料
    }
}

// 取得用戶資訊
async function get_user_info(mail, password) {
    try {
        // 查詢用戶資訊
        const [users] = await connection.execute('SELECT * FROM user_info WHERE mail = ? AND password = ?', [
            mail,
            password,
        ])

        if (users.length === 1) {
            // 找到匹配的用戶資訊，返回用戶資料
            const user = users[0]
            // 在這裡可以選擇返回需要的用戶資訊字段
            return { success: true, user: user }
        } else {
            // 找不到匹配的用戶資訊
            return { success: false, message: '電子郵件或密碼不正確' }
        }
    } catch (error) {
        // 處理錯誤
        console.error('取得用戶資訊失敗：', error)
        return { success: false, message: '取得用戶資訊失敗' }
    }
}

async function use_id_get_user_info(user_id) {
    try {
        // 查詢用戶資訊
        const [users] = await connection.execute('SELECT * FROM user_info WHERE user_id = ?', [user_id])

        if (users.length === 1) {
            // 找到匹配的用戶資訊，返回用戶資料
            const user = users[0]
            // 在這裡可以選擇返回需要的用戶資訊字段
            return { success: true, user: user }
        } else {
            // 找不到匹配的用戶資訊
            return { success: false, message: '用戶ID不存在' }
        }
    } catch (error) {
        // 處理錯誤
        console.error('根據用戶ID取得用戶資訊失敗：', error)
        return { success: false, message: '根據用戶ID取得用戶資訊失敗' }
    }
}

// 註冊 (account,name不能重複)
async function user_register(name, mail, password) {
    try {
        // 檢查是否存在相同的電子郵件
        const [existingUsers] = await connection.execute('SELECT * FROM user_info WHERE mail = ?', [mail])

        if (existingUsers.length > 0) {
            // 電子郵件已存在，註冊失敗
            return { success: false, message: '電子郵件已存在，註冊失敗' }
        }

        // 在資料庫中插入新用戶的資訊
        const [results] = await connection.execute('INSERT INTO user_info (name, mail, password) VALUES (?, ?, ?)', [
            name,
            mail,
            password,
        ])

        if (results.affectedRows === 1) {
            // 註冊成功
            return { success: true, message: '註冊成功', name: name }
        } else {
            // 註冊失敗
            return { success: false, message: '註冊失敗' }
        }
    } catch (error) {
        // 處理錯誤
        console.error('註冊失敗：', error)
        return { success: false, message: '註冊失敗' }
    }
}

// 登入
async function user_login(mail, password) {
    try {
        // 查詢用戶資訊
        const [users] = await connection.execute('SELECT * FROM user_info WHERE mail = ? AND password = ?', [
            mail,
            password,
        ])

        if (users.length === 1) {
            // 找到匹配的用戶資訊，設置login_statu為1表示登入成功
            const user = users[0]
            await connection.execute('UPDATE user_info SET login_statu = 1 WHERE user_id = ?', [user.user_id])
            return { success: true, message: '登入成功', user: user }
        } else {
            // 找不到匹配的用戶資訊，登入失敗
            return { success: false, message: '電子郵件或密碼不正確' }
        }
    } catch (error) {
        // 處理錯誤
        console.error('登入失敗：', error)
        return { success: false, message: '登入失敗' }
    }
}

// 登出
async function user_logout(user_id) {
    try {
        // 在数据库中将用户的登录状态 `login_statu` 设置为 0
        const [results] = await connection.execute('UPDATE user_info SET login_statu = 0 WHERE user_id = ?', [user_id])

        if (results.affectedRows === 1) {
            return { success: true, message: '登出成功' }
        } else {
            return { success: false, message: '登出失败，用户不存在或已经登出' }
        }
    } catch (error) {
        // 处理错误
        console.error('登出失败：', error)
        return { success: false, message: '登出失败' }
    }
}

// 將所有使用者踢下線
async function all_logout() {
    try {
        // 執行 SQL 更新查詢，將所有人的 login_statu 設置為 0
        const [result] = await connection.execute('UPDATE user_info SET login_statu = 0')

        // 檢查更新是否成功
        if (result.affectedRows > 0) {
            console.log('成功將所有人的 login_statu 設置為 0')
        } else {
            console.log('沒有更新任何記錄')
        }
    } catch (error) {
        // 處理錯誤
        console.error('更新 login_statu 失敗：', error)
    }
}

// all_logout()

module.exports = {
    get_all_user_info,
    get_user_info,
    use_id_get_user_info,
    user_register,
    user_login,
    user_logout,
}
