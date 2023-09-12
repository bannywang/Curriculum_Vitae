const express = require('express')
const router = express.Router()
const allCtrl = require('../controllers/all_ctrl')

// 處理 GET 請求
router.get('/', allCtrl.get_main_html)
router.get('/get_info', allCtrl.get_info)


// 處理 POST 請求
router.post('/process', allCtrl.handle_nodejs_post_request)
router.post('/user_register', allCtrl.perform_registration)  //註冊

module.exports = router
