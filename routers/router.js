const express = require('express')
const router = express.Router()
const allCtrl = require('../controllers/all_ctrl')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

// 處理 GET 請求
router.get('/', allCtrl.get_index_ejs)
router.get('/login_page', allCtrl.get_login_page)

// 處理進入 /main 頁面的 GET 請求，使用 jwtMiddleware 進行登入驗證
router.get('/main', jwtMiddleware, allCtrl.get_main_ejs)

router.post('/process', allCtrl.handle_nodejs_post_request)
router.post('/user_register', allCtrl.perform_registration)

module.exports = router
