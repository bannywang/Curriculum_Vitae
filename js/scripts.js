// 在點擊導航項目時，折疊響應式導航欄
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.navbar-nav .nav-link')
    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            const navbarToggler = document.querySelector('.navbar-toggler')
            const navbarCollapse = document.querySelector('.navbar-collapse')

            if (
                window.getComputedStyle(navbarToggler).display !== 'none' &&
                window.getComputedStyle(navbarCollapse).getPropertyValue('height') !== '0px'
            ) {
                navbarToggler.click()
            }
        })
    })

    // 點擊外部區域時折疊導航欄
    document.addEventListener('click', (event) => {
        const navbar = document.querySelector('.navbar-collapse')
        const navbarToggler = document.querySelector('.navbar-toggler')
        if (
            window.getComputedStyle(navbarToggler).display !== 'none' &&
            window.getComputedStyle(navbar).getPropertyValue('height') !== '0px' &&
            !navbar.contains(event.target)
        ) {
            // 使用 Bootstrap 的方法手動折疊導航欄
            $(navbar).collapse('hide')
        }
    })
})

//! back to top ----------------------------------------------------------------

window.addEventListener('scroll', function () {
    var backToTopButton = document.getElementById('backToTopButton')
    if (window.scrollY > 100) {
        backToTopButton.style.display = 'block' // 顯示按鈕
    } else {
        backToTopButton.style.display = 'none' // 隱藏按鈕
    }
})

// 點擊按鈕時滾動到頂部
var backToTopButton = document.getElementById('backToTopButton')
backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // 平滑滾動到頂部
})

//! HTML5 ----------------------------------------------------------------

// 取得HTML輸入框元素
const htmlInput = document.getElementById('htmlInput')

// 取得字符計數元素
const charCount = document.getElementById('charCount')

// 取得預覽按鈕元素
const previewButton = document.getElementById('previewButton')

// 最大字符數限制
const maxChars = 50

// 當使用者輸入時觸發
htmlInput.addEventListener('input', function () {
    // 取得輸入的文字
    const inputText = htmlInput.value

    // 計算剩餘字符數
    const remainingChars = maxChars - inputText.length

    // 更新字符數顯示
    charCount.textContent = `剩餘字數：${remainingChars}`

    // 如果字符數超過最大限制，截斷輸入
    if (remainingChars < 0) {
        htmlInput.value = inputText.slice(0, maxChars)
        charCount.textContent = `剩餘字數：0`
    }
})

// 當使用者點擊"預覽"按鈕時觸發
previewButton.addEventListener('click', function () {
    // 獲取使用者輸入的HTML代碼
    const htmlCode = htmlInput.value

    // 使用alert顯示使用者輸入的文字
    alert(htmlCode)

    // 清空輸入框的值
    htmlInput.value = ''
    charCount.textContent = `剩餘字數：${maxChars}`
})

//! CSS ----------------------------------------------------------------
// 取得顏色選擇元素
const colorSelector = document.getElementById('colorSelector')

// 取得字重選擇元素
const fontWeightSelector = document.getElementById('fontWeightSelector')

// 取得字體大小選擇元素
const fontSizeSelector = document.getElementById('fontSizeSelector')

// 取得字體選擇元素
const fontFamilySelector = document.getElementById('fontFamilySelector')

// 取得可編輯的文字元素
const editableText = document.getElementById('editableText')

// 添加事件監聽器以根據使用者選擇更新文字顏色
colorSelector.addEventListener('change', function () {
    const selectedColor = colorSelector.value
    editableText.style.color = selectedColor
})

// 添加事件監聽器以根據使用者選擇更新文字粗細
fontWeightSelector.addEventListener('change', function () {
    const selectedFontWeight = fontWeightSelector.value
    editableText.style.fontWeight = selectedFontWeight
})

// 添加事件監聽器以根據使用者選擇更新字體大小
fontSizeSelector.addEventListener('change', function () {
    const selectedFontSize = fontSizeSelector.value
    editableText.style.fontSize = selectedFontSize
})

// 添加事件監聽器以根據使用者選擇更新字體
fontFamilySelector.addEventListener('change', function () {
    const selectedFontFamily = fontFamilySelector.value
    editableText.style.fontFamily = selectedFontFamily
})

// 添加事件監聽器以將文字轉換為大寫
textTransformSelector.addEventListener('change', function () {
    const selectedTextTransform = textTransformSelector.value
    editableText.style.textTransform = selectedTextTransform
})

//! 切換技能 --------------------------------

function showContent(contentId) {
    // 隐藏所有内容
    document.querySelectorAll('.hidden').forEach(function (content) {
        content.style.opacity = 0 // 初始设置透明度为0
        content.style.display = 'none'
    })

    // 显示点击的内容并添加淡入效果
    const targetContent = document.getElementById(contentId + 'Content')
    targetContent.style.display = 'block'
    targetContent.classList.add('fade-in')
    setTimeout(function () {
        targetContent.style.opacity = 1 // 将透明度设置为1，触发淡入效果
    }, 0) // 使用setTimeout来确保在下一个渲染周期应用过渡效果
}

// 页面加载时默认显示HTML5的内容
window.onload = function () {
    showContent('html5')
    showContent('qrcode')
}

//! JS 貪食蛇 ----------------------------------------------------------------

// 獲取畫布和繪圖上下文
var canvas = document.getElementById('snakeCanvas')
var context = canvas.getContext('2d')

// 獲取開始遊戲按鈕
var startButton = document.getElementById('startButton')

// 開始遊戲按鈕的點擊事件處理程序
startButton.addEventListener('click', function () {
    // 啟動貪吃蛇遊戲邏輯
    startGame()
})

// 定義貪吃蛇的初始位置和方向
var snake = [{ x: 5, y: 5 }]
var direction = 'right'
var apple = { x: 10, y: 10 }
var score = 0

// 獲取Canvas元素
var canvas = document.getElementById('snakeCanvas')
var context = canvas.getContext('2d')
var gridSize = 20

// 開始遊戲
function startGame() {
    // 監聽鍵盤事件，控制貪吃蛇的方向

    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp' && direction !== 'down') {
            direction = 'up'
        } else if (event.key === 'ArrowDown' && direction !== 'up') {
            direction = 'down'
        } else if (event.key === 'ArrowLeft' && direction !== 'right') {
            direction = 'left'
        } else if (event.key === 'ArrowRight' && direction !== 'left') {
            direction = 'right'
        }
    })

    // 遊戲循環
    var gameInterval = setInterval(updateGame, 100)

    function updateGame() {
        // 移動貪吃蛇
        moveSnake()

        // 檢測碰撞
        if (checkCollision()) {
            endGame()
            clearInterval(gameInterval)
            return
        }

        // 吃到蘋果
        if (snake[0].x === apple.x && snake[0].y === apple.y) {
            score++
            generateApple()
        }

        // 清空畫布
        context.clearRect(0, 0, canvas.width, canvas.height)

        // 繪製蘋果
        context.fillStyle = 'red'
        context.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize)

        // 繪製貪吃蛇
        context.fillStyle = 'green'
        for (var i = 0; i < snake.length; i++) {
            context.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize)
        }

        // 繪製分數
        context.fillStyle = 'black'
        context.font = '20px Arial'
        context.fillText('分數: ' + score, 10, 30)
    }

    // 移動貪吃蛇
    function moveSnake() {
        var headX = snake[0].x
        var headY = snake[0].y

        if (direction === 'right') {
            headX++
        } else if (direction === 'left') {
            headX--
        } else if (direction === 'up') {
            headY--
        } else if (direction === 'down') {
            headY++
        }

        snake.unshift({ x: headX, y: headY })
        if (!(headX === apple.x && headY === apple.y)) {
            snake.pop()
        }
    }

    // 檢測碰撞
    function checkCollision() {
        var headX = snake[0].x
        var headY = snake[0].y

        // 撞牆
        if (headX < 0 || headY < 0 || headX >= canvas.width / gridSize || headY >= canvas.height / gridSize) {
            return true
        }

        // 撞到自己的身體
        for (var i = 1; i < snake.length; i++) {
            if (headX === snake[i].x && headY === snake[i].y) {
                return true
            }
        }

        return false
    }

    // 遊戲結束
    function endGame() {
        document.body.style.overflow = 'auto'
        alert('遊戲結束！得分: ' + score)
        // 重置遊戲狀態
        snake = [{ x: 5, y: 5 }]
        direction = 'right'
        apple = { x: 10, y: 10 }
        score = 0
    }

    // 隨機生成蘋果
    function generateApple() {
        var maxX = canvas.width / gridSize
        var maxY = canvas.height / gridSize

        do {
            apple.x = Math.floor(Math.random() * maxX)
            apple.y = Math.floor(Math.random() * maxY)
        } while (isAppleOnSnake())
    }

    // 檢查蘋果是否出現在貪吃蛇身上
    function isAppleOnSnake() {
        for (var i = 0; i < snake.length; i++) {
            if (apple.x === snake[i].x && apple.y === snake[i].y) {
                return true
            }
        }
        return false
    }
}

// 文字監聽
document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault() // 防止表單提交刷新頁面

    const userInput = document.getElementById('userInput').value

    // 使用Fetch API向後端發送POST請求
    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 使用JSON格式
        },
        body: JSON.stringify({ userInput }), // 轉換為JSON格式
    })
        .then((response) => response.json())

        .then((data) => {
            // 將後端的回應處理並顯示在頁面上
            console.log(data.message)
            document.getElementById('response1').textContent = data.message
        })
        .catch((error) => {
            console.error('處理請求時發生錯誤：', error)
            document.getElementById('response1').innertext = '發生錯誤，請稍後再試。'
        })
})

//! tool ----------------------------------------------------------------

// Qrcode ----------------------------------------------------------------

// 取得長網址輸入框元素
const urlInput = document.getElementById('urlInput')

// 取得生成按鈕元素
const generateButton = document.getElementById('generateButton')

// 取得用於顯示 QR 碼的容器元素
const qrcodeContainer = document.getElementById('qrcode')

// 添加按鈕點擊事件監聽器
generateButton.addEventListener('click', function () {
    // 獲取用戶輸入的長網址
    const longUrl = urlInput.value

    // 使用 TinyURL API 將長網址轉換為短網址
    fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)
        .then((response) => response.text())
        .then((shortUrl) => {
            // 清空之前的 QR 碼
            qrcodeContainer.innerHTML = ''

            // 使用短網址生成 QR 碼
            const qrcode = new QRCode(qrcodeContainer, {
                text: shortUrl, // 使用短網址
                width: 128,
                height: 128,
            })

            // 觸發過渡效果，將透明度從 0 變為 1
            qrcodeContainer.style.opacity = 1

            // 如果需要修改 QR 碼的樣式，您可以添加一些額外的 CSS
            qrcodeContainer.querySelector('img').style.maxWidth = '100%'
        })
        .catch((error) => {
            console.error('錯誤:', error)
        })
})

// idcode ----------------------------------------------------------------

// 取得元素
const genderSelect = document.getElementById('gender')
const generateIdCardButton = document.getElementById('generateIdCardButton')
const idcardContainer = document.getElementById('idcard')

// 為按鈕添加點擊事件監聽器
generateIdCardButton.addEventListener('click', generateAndDisplayIdCard)

// 生成並顯示身分證號碼
function generateAndDisplayIdCard() {
    const gender = genderSelect.value
    const idcard = generateIdCard(gender)
    idcardContainer.textContent = idcard
}

// 生成身分證號碼的函數，根據性別生成
function generateIdCard(gender) {
    const firstLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
    const secondDigit = gender === 'male' ? '1' : '2'
    const restDigits = generateRandomDigits(8)
    return `${firstLetter}${secondDigit}${restDigits}`
}

// 生成指定長度的隨機數字序列的函數
function generateRandomDigits(length) {
    let result = ''
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10) // 隨機生成 0 到 9 的數字
    }
    return result
}

// 取得位置 ----------------------------------------------------------------

const mapContainer = document.getElementById('mapContainer')

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // 獲取使用者的緯度和經度
            const userLatitude = position.coords.latitude
            const userLongitude = position.coords.longitude

            // 使用獲取的緯度和經度設置 Google 地圖的嵌入代碼
            mapContainer.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d920.7170234107717!2d${userLongitude}!3d${userLatitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e0531ad643843%3A0xd0fd27c265a26e65!2z5Z2C5ZKM5LyB5qWt5pyJ6ZmQ5YWs5YWs5Y-4LeS6lOemj-iHquW8tw!5e0!3m2!1szh-TW!2stw!4v1694757019636!5m2!1szh-TW!2stw" width="100%" height="450" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        },
        function (error) {
            // 如果使用者不允許存取位置或瀏覽器不支持 Geolocation API，顯示台北 101 的位置
            const taipei101Latitude = 25.03414626533686
            const taipei101Longitude = 121.56432933007659
            mapContainer.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5777.999716463514!2d${taipei101Longitude}!3d${taipei101Latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab3ea249d14f%3A0x4222a96b127f7b88!2z5aSn5a-M6IqX5qmf5oql6Kqg5YyX5LiK5q2j6Lev6JiZ55-l!5e0!3m2!1szh-TW!2stw!4v1694757019636!5m2!1szh-TW!2stw" width="100%" height="450" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        }
    )
} else {
    // 如果瀏覽器不支持 Geolocation API，顯示台北 101 的位置
    const taipei101Latitude = 25.03414626533686
    const taipei101Longitude = 121.56432933007659
    mapContainer.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5777.999716463514!2d${taipei101Longitude}!3d${taipei101Latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab3ea249d14f%3A0x4222a96b127f7b88!2z5aSn5a-M6IqX5qmf5oql6Kqg5YyX5LiK5q2j6Lev6JiZ55-l!5e0!3m2!1szh-TW!2stw!4v1694757019636!5m2!1szh-TW!2stw" width="100%" height="450" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
}

// 取得帳號 ----------------------------------------------------------------

// 獲取表單元素和消息元素
const get_info_form = document.getElementById('get_user_info')
const infoMessageElement = document.getElementById('get_info_results')

// 在頁面加載時設置 infoMessage
let infoMessage = '' // 設定一個默認值
if (infoMessage) {
    infoMessageElement.innerHTML = infoMessage
}

// 在表單提交時觸發
get_info_form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // 獲取用戶輸入的帳號和密碼
    const account = document.getElementById('account').value
    const password = document.getElementById('password').value

    // 發送 GET 請求到伺服器
    const response = await fetch(`/get_info?account=${account}&password=${password}`)

    if (response.ok) {
        // 如果請求成功，解析 JSON 響應
        const data = await response.json()

        if (data.result) {
            // 如果取得成功，顯示用戶數據
            const userData = data.result // 你需要根據實際數據結構來訪問用戶數據
            // 在這裡渲染用戶數據，例如：
            const user_id = userData.id
            const user_account = userData.account
            const user_name = userData.name
            const user_phone = userData.phone
            const user_create_time = userData.create_time

            infoMessageElement.innerHTML = `
                <div class="user-info">
                    <p>名稱: ${user_name}</p>
                    <p>帳號: ${user_account}</p>
                    <p>電話: ${user_phone}</p>
                    <p>帳號建立時間: ${user_create_time}</p>
                </div>
            `
        } else {
            // 如果取得失敗，顯示錯誤消息
            infoMessage = '取得失敗'
            infoMessageElement.innerHTML = `<p class="error-message">${infoMessage}</p>`
        }

        // 在這裡可以執行其他成功時的操作
    } else {
        // 處理請求錯誤
        infoMessage = '請求失敗，請稍後再試。'
        infoMessageElement.innerHTML = `<p class="error-message">${infoMessage}</p>`
    }
})

// 註冊 ----------------------------------------------------------------

const get_register_form = document.getElementById('register')

// 在表單提交時觸發
get_register_form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // 獲取用戶輸入的帳號、名字、電話和密碼
    const account = document.getElementById('new_account').value
    const name = document.getElementById('new_name').value
    const phone = document.getElementById('new_phone').value
    const password = document.getElementById('new_password').value

    // 發送 POST 請求到伺服器
    const response = await fetch('/user_register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            new_account: account,
            new_name: name,
            new_phone: phone,
            new_password: password,
        }),
    })

    if (response.ok) {
        // 解析 JSON 響應
        const data = await response.json()

        if (data.success) {
            // 如果註冊成功，顯示成功警告
            const username = data.name || '用戶' // 使用返回的用戶名，如果沒有，使用默認名稱
            alert(`恭喜 ${username} 註冊成功`)

            // 清空帳號、電話、名字和密碼欄位
            document.getElementById('new_account').value = ''
            document.getElementById('new_phone').value = ''
            document.getElementById('new_name').value = ''
            document.getElementById('new_password').value = ''
        } else {
            // 如果註冊失敗，顯示錯誤消息
            alert(data.message || '註冊失敗')
        }

        // 在這裡可以執行其他成功時的操作
    } else {
        // 處理請求錯誤
        alert('帳號或名字已重複，請嘗試更換')
        document.getElementById('new_account').value = ''
        document.getElementById('new_name').value = ''
    }
})

