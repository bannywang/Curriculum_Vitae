const express = require('express')
const session = require('express-session') // 引入 express-session
const bodyParser = require('body-parser')
const app = express()
const port = 3000
require('dotenv').config();


// 解析 JSON 格式的請求主體
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 設置靜態資源目錄
app.use('/css', express.static(__dirname + '/css'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/js', express.static(__dirname + '/js'))

// 引入 router.js 處理路由
const router = require('./routers/router')

// 使用 express-session 中間件來處理會話管理
app.use(
    session({
        secret: process.env.SECRIT, // 用於簽名 session ID 的密鑰，請替換成你自己的密鑰
        resave: false, // 是否在每個請求中強制重新保存 session，一般設為 false，以節省資源
        saveUninitialized: true, // 是否在未初始化的 session 存儲中保存 session，一般設為 true
        cookie: {
            maxAge: 3600000, // 設定 session 存活時間為 1 小時 (3600000 毫秒)
        },
    })
)

app.use('/', router)

// 設置 EJS 為模板引擎
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') // 設置模板文件的路徑

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
