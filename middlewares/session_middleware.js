//检查用户是否已登录
function check_login(req, res, next) {
    if (req.session.user) {
        // 如果用户已登录，将用户信息添加到 res.locals 中
        res.locals.user = req.session.user
        next()
    } else {
        // 用户未登录，可以在此处进行重定向或其他操作
        res.redirect('/login_page')
    }
}

module.exports = {
    check_login, // 导出中间件函数
}
