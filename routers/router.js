const express = require('express')
const router = express.Router()
const allCtrl = require('../controllers/all_ctrl')

// middleware  ----------------------------------------------------------------

// 檢查是否為登入狀態
const { check_login } = require('../middlewares/session_middleware')

// GET ----------------------------------------------------------------
router.get('/', allCtrl.get_index_ejs)
router.get('/login_page', allCtrl.get_login_page)
router.get('/main', check_login, allCtrl.get_main_ejs)
router.get('/logout', allCtrl.perform_logout) //登出

// POST ----------------------------------------------------------------
router.post('/process', allCtrl.handle_nodejs_post_request)
router.post('/user_register', allCtrl.perform_registration) // 註冊
router.post('/user_login', allCtrl.perform_login) // 登入

module.exports = router
