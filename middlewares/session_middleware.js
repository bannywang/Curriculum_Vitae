/**
 * 檢查用戶是否已登錄。
 * 如果用戶已登錄，它將用戶信息存儲到 res.locals.user 中，然後調用 next() 來繼續處理請求。
 * 如果用戶未登錄，它將用戶重定向到登錄頁面。
 */

function check_login(req, res, next) {
    try {
        if (req.session && req.session.user) {
            res.locals.user = req.session.user
            next()
        } else {
            res.redirect('/login_page') // 重定向到登入頁面
        }
    } catch (error) {
        console.error('Error in check_login middleware:', error)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    check_login,
}
