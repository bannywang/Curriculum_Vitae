// 檢查使用者是否已登入的中間件
function check_login(req, res, next) {
    if (req.session.user) {
        res.locals.user = req.session.user
        next()
    } else {
        res.redirect('/login_page') // 重定向到登入頁面
    }
}

module.exports = {
    check_login,
}
