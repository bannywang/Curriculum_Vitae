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
async function get_user_info(account, password) {
    try {
        // 檢查帳號和密碼是否匹配
        const query = 'SELECT * FROM user_info WHERE account = ? AND password = ?'
        const values = [account, password]

        const [result] = await connection.query(query, values)

        // 如果有匹配的記錄，返回用戶資訊
        if (result.length > 0) {
            const user_info = result[0]
            user_info.create_time = format_date_time(user_info.create_time) // 格式化日期时间
            console.log(user_info)
            return user_info
        } else {
            console.log('後端回：查無用戶')
            return null // 找不到匹配的用戶
        }
    } catch (error) {
        console.error('無法獲取用戶資料:', error)
        throw error // 拋出錯誤，讓上層處理
    }
}

// 註冊 (account,name不能重複)
async function register(account, name, phone, password) {
    try {
        // 檢查是否存在相同帳號或名字的用戶
        const [existingUsers] = await connection.execute('SELECT * FROM user_info WHERE account = ? OR name = ?', [
            account,
            name,
        ])

        if (existingUsers.length > 0) {
            // 帳號或名字重複，註冊失敗
            return { success: false, message: '帳號或名字已存在，註冊失敗' }
        }

        // 在資料庫中插入新用戶的資訊
        const [results] = await connection.execute(
            'INSERT INTO user_info (account, name, phone, password) VALUES (?, ?, ?, ?)',
            [account, name, phone, password]
        )

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

module.exports = {
    get_all_user_info,
    get_user_info,
    register,
}
