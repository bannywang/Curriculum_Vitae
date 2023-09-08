const mysql = require('mysql2/promise');

// 資料庫連線資料
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '0229',
  database: 'personal_resume',
});

// 測試資料庫連線
async function test_connection() {
  try {
    // 獲取資料庫連線
    const conn = await connection.getConnection();
    // 釋放資料庫連線
    conn.release();
    console.log('成功連線到資料庫');
  } catch (error) {
    console.error('無法連線到資料庫:', error);
  }
}

module.exports = {
  connection,
};
