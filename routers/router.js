const express = require('express')
const router = express.Router()
const allCtrl = require('../controllers/all_ctrl')

// middleware  ----------------------------------------------------------------

// 檢查是否為登入狀態
const { check_login } = require('../middlewares/session_middleware')

// 印出到達哪個頁面的訊息
const { log_router_msg } = require('../middlewares/router_middleware')

// GET ----------------------------------------------------------------
router.get('/', log_router_msg, allCtrl.get_index_ejs)
router.get('/login_page', log_router_msg, allCtrl.get_login_page)
router.get('/main', check_login, log_router_msg, allCtrl.get_main_ejs)
router.get('/logout', log_router_msg, allCtrl.perform_logout) //登出
router.get('/forgot_password', log_router_msg, allCtrl.get_forgot_password_page) //忘記密碼頁面
router.get('/chat_room_page', check_login, log_router_msg, allCtrl.get_chat_room_ejs) //聊天室頁面

// POST ----------------------------------------------------------------
router.post('/process', allCtrl.handle_nodejs_post_request)
router.post('/user_register', allCtrl.perform_registration) // 註冊
router.post('/user_login', allCtrl.perform_login) // 登入
router.post('/change_user_info', allCtrl.perform_update_password_or_name) //修改個人資訊
router.post('/forgot_password', allCtrl.handle_forgot_password) //忘記密碼並發信給使用者

module.exports = router
