const socket = io()

document.addEventListener('DOMContentLoaded', () => {
    const roomSelection = document.getElementById('room')
    const messageInput = document.getElementById('messageInput')
    const sendButton = document.getElementById('sendButton')
    const messages = document.getElementById('messages')

    // 用於存儲每個房間消息的物件
    const roomMessages = {
        room1: [],
        room2: [],
        // ... 根據需要增加更多房間
    }

    // 自動加入初始房間
    const initialRoom = roomSelection.value
    socket.emit('join', initialRoom)

    // 監聽發送按鈕點擊事件
    sendButton.addEventListener('click', sendMessage)

    // 監聽輸入框的 enter 事件來發送消息
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    })

    // 監聽伺服器發送的消息
    socket.on('message', (data) => {
        console.log('Received data:', data) // Add this line to check the data received from the server
        // 在聊天窗口顯示接收到的消息
        displayMessage(`${data.name}: ${data.message}`, data.room)
    })

    // 監聽房間選擇改變事件
    roomSelection.addEventListener('change', () => {
        const room = roomSelection.value
        socket.emit('join', room) // 加入選定的房間

        // 顯示所選房間的消息
        messages.innerHTML = ''
        roomMessages[room].forEach((message) => {
            messages.appendChild(message)
        })
    })

    // 輔助函數：在聊天窗口顯示消息
    function displayMessage(message, room) {
        const messageElement = document.createElement('div')
        messageElement.textContent = message
        messages.appendChild(messageElement)

        // 將消息元素存儲在 roomMessages 物件中
        roomMessages[room].push(messageElement)

        // 將捲軸滾動到最底部，以便始終顯示最新的消息
        messages.scrollTop = messages.scrollHeight
    }

    // 輔助函數：發送消息
    function sendMessage() {
        const room = roomSelection.value // 獲取選中的房間
        const message = messageInput.value.trim() // 獲取輸入的消息

        if (message && room) {
            // 向伺服器發送消息
            socket.emit('message', { room, message, name: userName })

            // 在發送者的聊天窗口顯示消息
            displayMessage(`${userName}：${message}`, room)

            messageInput.value = '' // 清空輸入框
        }
    }
})
