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
        // 查询用户信息
        const [users] = await connection.execute('SELECT * FROM user_info WHERE mail = ? AND password = ?', [
            mail,
            password,
        ])

        if (users.length === 1) {
            // 找到匹配的用户信息，返回用户数据
            const user = users[0]

            // 格式化时间字段
            user.create_time = format_date_time(user.create_time)
            user.update_time = format_date_time(user.update_time)

            // 在这里可以选择返回需要的用户信息字段
            return { success: true, user: user }
        } else {
            // 找不到匹配的用户信息
            return { success: false, message: '電子郵件或密碼不正確' }
        }
    } catch (error) {
        // 处理错误
        console.error('取得用户信息失败：', error)
        return { success: false, message: '取得用户信息失败' }
    }
}

async function use_id_get_user_info(user_id) {
    try {
        // 查詢使用者資訊
        const [users] = await connection.execute('SELECT * FROM user_info WHERE user_id = ?', [user_id])

        // 格式化時間欄位
        const formatted_results = users.map((user_data) => {
            user_data.create_time = format_date_time(user_data.create_time)
            user_data.update_time = format_date_time(user_data.update_time)
            return user_data
        })

        if (formatted_results.length === 1) {
            console.log(formatted_results[0])
            // 找到匹配的使用者資訊，返回使用者資料
            return { success: true, user: formatted_results[0] }
        } else {
            // 找不到匹配的使用者資訊
            return { success: false, message: '使用者ID不存在' }
        }
    } catch (error) {
        // 處理錯誤
        console.error('根據使用者ID獲取使用者資訊失敗：', error)
        return { success: false, message: '根據使用者ID獲取使用者資訊失敗' }
    }
}

async function use_mail_get_user_pass(mail) {
    try {
        const [rows] = await connection.execute('SELECT password FROM user_info WHERE mail = ?', [mail])

        if (rows.length === 1) {
            return rows[0].password // 返回找到的使用者的密碼
        } else {
            return null // 沒有找到使用者
        }
    } catch (error) {
        console.error('查詢使用者密碼失敗：', error)
        throw error
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

// 修改名稱或密碼
async function update_password_or_name(mail, current_password, new_password, new_name) {
    try {
        if (new_password && new_name) {
            // 如果提供了新密碼和新名稱，則執行兩個更新操作
            const [passwordUpdateResults, nameUpdateResults] = await Promise.all([
                connection.execute('UPDATE user_info SET password = ? WHERE mail = ? AND password = ?', [
                    new_password,
                    mail,
                    current_password,
                ]),
                connection.execute('UPDATE user_info SET name = ? WHERE mail = ?', [new_name, mail]),
            ])

            if (passwordUpdateResults[0].affectedRows === 1 && nameUpdateResults[0].affectedRows === 1) {
                // 密碼和名稱都成功更新
                return { success: true, message: '密碼和名稱已成功更新' }
            } else {
                // 找不到匹配的使用者或密碼未更改
                return { success: false, message: '密碼或名稱未更改或使用者不存在' }
            }
        } else if (new_password) {
            // 如果提供了新密碼，則只執行密碼更新操作
            const [passwordUpdateResults] = await connection.execute(
                'UPDATE user_info SET password = ? WHERE mail = ? AND password = ?',
                [new_password, mail, current_password]
            )

            if (passwordUpdateResults.affectedRows === 1) {
                // 密碼已成功更新
                return { success: true, message: '密碼已成功更新' }
            } else {
                // 找不到匹配的使用者或密碼未更改
                return { success: false, message: '密碼未更改或使用者不存在' }
            }
        } else if (new_name) {
            // 如果提供了新名稱，則只執行名稱更新操作
            const [nameUpdateResults] = await connection.execute('UPDATE user_info SET name = ? WHERE mail = ?', [
                new_name,
                mail,
            ])

            if (nameUpdateResults.affectedRows === 1) {
                // 名稱已成功更新
                return { success: true, message: '名稱已成功更新' }
            } else {
                // 找不到匹配的使用者
                return { success: false, message: '使用者不存在' }
            }
        } else {
            return { success: false, message: '未提供新密碼或新名稱' }
        }
    } catch (error) {
        // 處理錯誤
        console.error('更新密碼或名稱失敗：', error)
        return { success: false, message: '更新密碼或名稱失敗' }
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

module.exports = {
    get_all_user_info,
    get_user_info,
    use_id_get_user_info,
    use_mail_get_user_pass,
    user_register,
    update_password_or_name,
    user_login,
    user_logout,
}
