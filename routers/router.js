const express = require('express')
const router = express.Router()
const allCtrl = require('../controllers/all_ctrl')

// 處理 GET 請求
router.get('/', allCtrl.get_main_html)

// 處理 POST 請求
router.post('/process', allCtrl.handle_nodejs_post_request)
router.post('/get_info', allCtrl.get_info)
router.post('/user_register', allCtrl.perform_registration)

module.exports = router
