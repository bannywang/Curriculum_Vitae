# 王瀚邑的個人履歷

---

**Hello！歡迎來到我的個人履歷網站。在這裡，你將能看到我的學經歷、技能集和開發經驗的詳細介紹。這份履歷不僅呈現了我的背景和資質，更是我迎接未來機會的重要一步。感謝你花時間來了解我，希望你喜歡！**

![王瀚邑的照片或相關圖片](./assets/img/banny.jpg)

---

## 目錄

- [王瀚邑的個人履歷](#王瀚邑的個人履歷)
  - [目錄](#目錄)
  - [安裝指南](#安裝指南)
  - [使用說明](#使用說明)
  - [聯繫方式](#聯繫方式)
  - [感謝](#感謝)
---

## 安裝指南

**1.請先 Clone 專案至本地 ✔️**

HTTPS：
https://github.com/bannywang/Curriculum_Vitae.git

**2.打開編輯器下載所需套件 ✔️**

```npm install```

**3.依照資料夾內 user_info.sql 檔的格式在 Mysql 建立 Table**

**4.新增 .env 檔案輸入下列資訊 ✔️**

``` sh 
# SQL 用
DB_HOST = 127.0.0.1
DB_USER = root
DB_PASSWORD = 資料庫密碼
DB_DATABASE = personal_resume

# nodemailer 用
EMAIL_USER = 你的 Gmail
EMAIL_PASSWORD = 你的 Google 應用程式密碼

# 簽名 session cookies，可自行輸入
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

✔️ 在專案中，當你在 terminal 中輸入以下命令來啟動伺服器：

```sh
node index.js
```

✔️ 在 terminal 中印出的 

```sh
console.log(`http://localhost:${port}`)
```

✔️ 會使用 GET 的方式取得主頁的連接

```sh
router.get('/', allCtrl.get_index_ejs)
```

---
## 聯繫方式

1. **Gmail** 👉 rich.bannywang@gmail.com
2. **Phone** 👉 +(886) 973506316
3. **LINE** 👉 0973506316(phone search)

---

## 感謝

在我探索程式的旅程中，我想特別感謝我的前雇主與我的父親，兩位在我服務於飯店時分別向我介紹了軟體工程的世界。偶然的遇見與父親的支持，點燃了我對寫程式的熱情。

我也要感謝高雄坂和科技有限公司所創立的 BOWA 學院。在那裡度過的學習時光是我程式設計學習路程中最具成長和進步的階段。

最後，我要感謝我的 BOWA 學院專題隊友們。通過我們的團隊合作和相互支持，我們一起完成了專案。他們的幫助和合作不僅使我們的專案取得成功，而且也加深了我對這個領域的理解和熱愛。

---

**非營利宣告**

本專案是非營利的，僅用於學術研究和個人展示。所有的引用和使用的資源都是尊重原創者的智慧財產權，並已確保所有內容符合非營利用途的要求。如果你是任何內容的版權持有人並認為我們未能充分尊重你的版權，請聯繫我們，我們將立即採取適當的行動。

---

**引用文件與檔案**

1. **login & user_register page** 👉 https://codepen.io/FlorinPop17/pen/vPKWjd
2. **front-end HTML & CSS** 👉 https://github.com/StartBootstrap/startbootstrap-resume

