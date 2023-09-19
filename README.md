# 王瀚邑的個人履歷

---

**Hello！歡迎來到我的個人履歷網站。在這裡，你將能看到我的學經歷、技能集和豐富的開發經驗的詳細介紹。這份履歷不僅呈現我的背景和專業資質，更是我迎接未來機會的重要一步。感謝你花時間來了解我，希望你喜歡！**

![王瀚邑的照片或相關圖片](./assets/img/banny.jpg)

---

## 目錄

- [王瀚邑的個人履歷](#王瀚邑的個人履歷)
  - [目錄](#目錄)
  - [安裝指南](#安裝指南)
  - [使用說明](#使用說明)
  - [貢獻指南](#貢獻指南)
  - [聯繫方式](#聯繫方式)
  - [致謝](#致謝)

---

## 安裝指南

**1.請先至我的 GitHub Clone 這份專案至本地**

HTTPS：
https://github.com/bannywang/Curriculum_Vitae.git

**2.打開編輯器下載所需套件**

```npm install```

**3.依照資料夾內 user_info.sql 檔的格式在 Mysql 建立 Table**

**4.新增 .env 檔案輸入下列資訊**

``` sh 
DB_HOST = 127.0.0.1
DB_USER = root
DB_PASSWORD = 資料庫密碼
DB_DATABASE = personal_resume


EMAIL_USER = 你的 Gmail
EMAIL_PASSWORD = 你的 Google 應用程式密碼

SECRET = 輸入 session 的金鑰
```

---

## 使用說明

請按照以下步驟使用此專案：

1. **啟動專案**：打開 terminal 並輸入以下命令來執行專案:
   ```sh
   node index.js

2. **首頁瀏覽**：未登入時，你只能在首頁進行瀏覽。
3. **登入**：點選 "More" 來登入。如果你還沒有帳號，可以在此進行註冊。
4. **探索 'More' 頁面**：登入後，你將能看到 "More" 頁面的所有內容。
5. **查看技能詳情**：在 "More" 頁面中，你可以點選技能圖標來查看更多詳情。
6. **修改個人資料**：透過點選 "database" 選項（第五個選項），你可以修改你的個人名稱或密碼。
7. **忘記密碼**：在登入頁中透過點選 "忘記密碼" 選項，你會在註冊時的信箱收到你的密碼。
8. **聊天室功能 (Beta版)**：嘗試新的聊天室功能，目前仍在 Beta 測試階段。
9. **探索開發經驗**：透過本功能來探索我的開發經驗。

---

## 範例

| ![Image 1](./assets/product_example/img%20(1).jpg) | ![Image 2](./assets/product_example/img%20(2).jpg) | ![Image 3](./assets/product_example/img%20(3).jpg) |
|:-------------------------------------------------:|:-------------------------------------------------:|:-------------------------------------------------:|
|                       Image 1                      |                       Image 2                      |                       Image 3                      |
| ![Image 4](./assets/product_example/img%20(4).jpg) | ![Image 5](./assets/product_example/img%20(5).jpg) |                                                  |
|                       Image 4                      |                       Image 5                      |                                                  |


---

## API文檔或參考

在專案中，當你在 terminal 中輸入以下命令來啟動伺服器：

```sh
node index.js
```

在 terminal 中印出的 

```sh
console.log(`http://localhost:${port}`)
```

會使用 GET 的方式取得主頁的連接

```router.get('/', allCtrl.get_index_ejs)```

---

## 貢獻指南

如果你想讓其他人參與到你的專案中來，提供一個貢獻指南來說明如何做到這一點。

---
## 聯繫方式

提供一個方式讓其他人可以聯繫到你，如你的Twitter、電子郵件等。

---

## 致謝

如果你想感謝其他人或專案，可以在這裡進行。
