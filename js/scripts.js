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

const htmlInput = document.getElementById('htmlInput')
const charCount = document.getElementById('charCount')
const previewButton = document.getElementById('previewButton')
const maxChars = 50

// 当用户输入时触发
htmlInput.addEventListener('input', function () {
    const inputText = htmlInput.value
    const remainingChars = maxChars - inputText.length

    // 更新字符数显示
    charCount.textContent = `剩餘字數：${remainingChars}`

    // 如果字符数超过最大限制，截断输入
    if (remainingChars < 0) {
        htmlInput.value = inputText.slice(0, maxChars)
        charCount.textContent = `剩餘字數：0`
    }
})

// 当用户点击"预览"按钮时触发
previewButton.addEventListener('click', function () {
    // 获取用户输入的HTML代码
    const htmlCode = htmlInput.value

    // 使用alert显示用户输入的文字
    alert(htmlCode)

    // 清空输入框的值
    htmlInput.value = ''
    charCount.textContent = `剩餘字數：${maxChars}`
})

//! CSS ----------------------------------------------------------------
const colorSelector = document.getElementById('colorSelector')
const fontWeightSelector = document.getElementById('fontWeightSelector')
const fontSizeSelector = document.getElementById('fontSizeSelector')
const fontFamilySelector = document.getElementById('fontFamilySelector')
const editableText = document.getElementById('editableText')

// 添加事件监听器以根据用户选择更新文本颜色
colorSelector.addEventListener('change', function () {
    const selectedColor = colorSelector.value
    editableText.style.color = selectedColor
})

// 添加事件监听器以根据用户选择更新文本粗细
fontWeightSelector.addEventListener('change', function () {
    const selectedFontWeight = fontWeightSelector.value
    editableText.style.fontWeight = selectedFontWeight
})

// 添加事件监听器以根据用户选择更新字体大小
fontSizeSelector.addEventListener('change', function () {
    const selectedFontSize = fontSizeSelector.value
    editableText.style.fontSize = selectedFontSize
})

// 添加事件监听器以根据用户选择更新字体
fontFamilySelector.addEventListener('change', function () {
    const selectedFontFamily = fontFamilySelector.value
    editableText.style.fontFamily = selectedFontFamily
})

// 将文本转换为大写
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

const urlInput = document.getElementById('urlInput')
const generateButton = document.getElementById('generateButton')

// 獲取用於顯示 QR 碼的容器元素
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
const genderSelect = document.getElementById('gender')
const generateIdCardButton = document.getElementById('generateIdCardButton')
const idcardContainer = document.getElementById('idcard')

generateIdCardButton.addEventListener('click', function () {
    const gender = genderSelect.value
    const idcard = generateIdCard(gender)
    idcardContainer.textContent = idcard
})

function generateIdCard(gender) {
    const firstLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)) // 隨機選擇 A 到 Z 中的一個字母

    let secondDigit
    if (gender === 'male') {
        secondDigit = '1' // 男生的第二碼是 1
    } else if (gender === 'female') {
        secondDigit = '2' // 女生的第二碼是 2
    }

    const restDigits = generateRandomDigits(8) // 生成 8 位隨機數字

    return firstLetter + secondDigit + restDigits
}

function generateRandomDigits(length) {
    let result = ''
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10) // 隨機生成 0 到 9 的數字
    }
    return result
}
