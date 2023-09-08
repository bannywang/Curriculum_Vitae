const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// 將 JSON 格式的請求主體解析為 JavaScript 物件
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

// 設置靜態資源目錄
app.use('/css', express.static(__dirname + '/css'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/js', express.static(__dirname + '/js'))

// 引入 router.js 處理路由
const router = require('./routers/router')
app.use('/', router)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
