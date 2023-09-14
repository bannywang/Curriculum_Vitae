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
    format_date_time,
}
