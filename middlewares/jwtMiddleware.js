const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

// 密鑰，請將其替換為更安全的密鑰
const secretKey = 'bannywang0229'

// 創建 JWT
function createToken(user) {
    return jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '6h' })
}

// 驗證 JWT 的中間件
const jwtMiddleware = expressJwt({ secret: secretKey, algorithms: ['HS256'] })

// 添加錯誤處理程序
jwtMiddleware.unless = require('express-unless') // 導入 express-unless 模塊

// 錯誤處理程序
jwtMiddleware.error = (err, req, res, next) => {
    // 如果 JWT 驗證失敗，你可以在這裡執行一些操作，例如重定向到登入頁面或返回錯誤響應
    if (err.name === 'UnauthorizedError') {
        // JWT 驗證失敗，你可以在這裡處理
        res.redirect('login_page') // 重定向到登入頁面
    } else {
        // 其他錯誤，返回錯誤響應
        res.status(500).json({ success: false, message: '內部伺服器錯誤' })
    }
}

module.exports = {
    createToken,
    jwtMiddleware,
}
