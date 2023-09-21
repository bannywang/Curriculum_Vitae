const log_router_msg = (req, res, next) => {
    console.log(`使用者位於: ${req.path}`)
    next()
}

module.exports = { log_router_msg }
