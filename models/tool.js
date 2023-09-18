const nodemailer = require('nodemailer')

// 配置郵件傳輸器
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // 忽略憑證驗證
    },
})

// 發送郵件函數
async function sendEmail(toEmail, subject, text) {
    try {
        // 郵件選項
        const mailOptions = {
            from: process.env.EMAIL_USER, // 發送者的郵件地址
            to: toEmail, // 接收者的郵件地址
            subject: subject, // 郵件主題
            text: text, // 郵件內容
        }

        // 發送郵件
        const info = await transporter.sendMail(mailOptions)

        console.log('郵件已發送：', info.response)
        return { success: true, message: '郵件已成功發送' }
    } catch (error) {
        console.error('發送郵件失敗：', error)
        return { success: false, message: '發送郵件失敗' }
    }
}

function format_date_time(dateTime) {
    // 函式用於將日期時間格式化為指定格式
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }

    const formatted_date_time = new Date(dateTime).toLocaleString('zh-TW', options)
    // 使用指定的區域語言 'zh-TW' 和選項格式化日期時間
    return formatted_date_time
}

module.exports = {
    sendEmail,
    format_date_time,
}
