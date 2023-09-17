const express = require('express')
const session = require('express-session') // 引入 express-session
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// 解析 JSON 格式的请求主体
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 设置静态资源目录
app.use('/css', express.static(__dirname + '/css'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/js', express.static(__dirname + '/js'))

// 引入 router.js 处理路由
const router = require('./routers/router')

// 添加 express-session 中间件
app.use(
    session({
        secret: 'bannywang', // 用于签名 session ID 的密钥，请替换成你自己的密钥
        resave: false,
        saveUninitialized: true,
    })
)

app.use('/', router)

// 设置 EJS 为模板引擎
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') // 设置模板文件的路径

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
