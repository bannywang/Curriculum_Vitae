const jwt = require('jsonwebtoken')

// 密钥，你可以将其存储在环境变量中以提高安全性
const secretKey = 'bannywang0229'

// 創建 JWT
function createToken(user) {
    return jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '6h' })
}

// 驗證 JWT 的中間件
const jwtMiddleware = require('express-jwt')({ secret: secretKey, algorithms: ['HS256'] })

module.exports = {
    jwtMiddleware,
    createToken, // 导出用于创建令牌的函数
}
