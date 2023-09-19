// 引入必要的模組
const express = require('express') // 引入 Express 框架
const { createServer } = require('http') // 引入 HTTP 模块的 createServer 方法
const session = require('express-session') // 引入 express-session 模块，用于会话管理
require('dotenv').config() // 引入并配置 dotenv
const model = require('./models/model') // 更正拼写错误

// 建立 Express 应用程序
const app = express()
const server = createServer(app)

// 指定应用程序执行的端口号
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

// 使用 express-session 中间件来处理会话管理
app.use(
    session({
        secret: process.env.SECRET, // 用于签名 session ID 的密钥，已更正拼写错误
        resave: false, // 是否在每个请求中强制重新保存 session
        saveUninitialized: true, // 是否在未初始化的 session 存储中保存 session
        cookie: {
            maxAge: 3600000, // 设置 session 存活时间为 1 小时
        },
    })
)

app.use('/', router)

// 设置 EJS 为模板引擎
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') // 设置模板文件的路径

// 设置 Socket.IO
const setup_socket_io = require('./socket_io')
setup_socket_io(server)

// 关闭服务器将所有用户踢下线
process.on('SIGINT', async () => {
    console.log('收到 SIGINT 信号，正在关闭服务器...')

    try {
        // 在服务器关闭时执行所有注销操作
        await model.all_logout()

        // 然后关闭服务器
        process.exit(0) // 0 表示正常退出
    } catch (error) {
        console.error('执行注销操作时出错：', error)
        process.exit(1) // 1 表示非正常退出
    }
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
