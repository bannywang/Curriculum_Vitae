const socketIo = require('socket.io')

function setup_socket_io(server) {
    const io = socketIo(server)

    io.on('connection', (socket) => {
        console.log('使用者連接')

        socket.on('message', (data) => {
            socket.to(data.room).emit('message', data)
        })

        socket.on('join', (room) => {
            console.log('加入房間')
            socket.join(room) // 加入房间
        })

        socket.on('disconnect', () => {
            console.log('使用者中斷')
        })
    })
}

module.exports = setup_socket_io
