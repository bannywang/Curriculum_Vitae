// Collapse responsive navbar when a nav item is clicked
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

    // Collapse the navbar when clicking outside
    document.addEventListener('click', (event) => {
        const navbar = document.querySelector('.navbar-collapse')
        const navbarToggler = document.querySelector('.navbar-toggler')
        if (
            window.getComputedStyle(navbarToggler).display !== 'none' &&
            window.getComputedStyle(navbar).getPropertyValue('height') !== '0px' &&
            !navbar.contains(event.target)
        ) {
            // 使用 Bootstrap 的方法手动折叠导航栏
            $(navbar).collapse('hide')
        }
    })
})

// 获取所有导航链接
const navLinks = document.querySelectorAll('.nav-link')
const sections = document.querySelectorAll('section')

// 添加点击事件监听器
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        // 移除所有导航链接的背景颜色
        navLinks.forEach((navLink) => {
            navLink.classList.remove('active')
        })

        // 添加背景颜色到被点击的链接
        link.classList.add('active')

        // 滚动到相关部分的位置
        const sectionId = link.getAttribute('href').slice(1)
        const relatedSection = document.getElementById(sectionId)
        if (relatedSection) {
            window.scrollTo({
                top: relatedSection.offsetTop,
                behavior: 'smooth', // 平滑滚动
            })
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
const previewButton = document.getElementById('previewButton')
const preview = document.getElementById('preview')

// 当用户点击"预览"按钮时触发
previewButton.addEventListener('click', function () {
    // 获取用户输入的HTML代码
    const htmlCode = htmlInput.value

    // 将HTML代码显示在预览区域中
    preview.innerHTML = htmlCode
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

// 添加事件监听器以根据用户选择更新字体族
fontFamilySelector.addEventListener('change', function () {
    const selectedFontFamily = fontFamilySelector.value
    editableText.style.fontFamily = selectedFontFamily
})

// 将文本转换为大写
textTransformSelector.addEventListener('change', function () {
    const selectedTextTransform = textTransformSelector.value
    editableText.style.textTransform = selectedTextTransform
})

//! 按鈕出現 --------------------------------

function showContent(contentId) {
    // 隐藏所有内容
    document.querySelectorAll('.hidden').forEach(function (content) {
        content.style.display = 'none'
    })

    // 显示点击的内容
    document.getElementById(contentId + 'Content').style.display = 'block'
}

// 页面加载时默认显示HTML5的内容
window.onload = function () {
    showContent('html5')
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

// 後端回傳文字監聽
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
