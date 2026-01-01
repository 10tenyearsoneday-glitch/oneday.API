十年一日｜手機可用後台（Decap CMS）啟用方式（Windows）

重點：用「手動拖曳部署」無法把你在後台編輯/上傳的內容保存下來。
要能「手機後台上傳圖片、改內容」，必須把網站連到 GitHub，讓 CMS 把改動寫回 Git。

步驟：
1) 建 GitHub Repo
   - 在 GitHub 新建一個 repo（建議 private）
   - 把這個資料夾內容整包上傳（或用 Git 推上去）

2) Netlify 連 GitHub
   - Netlify：Add new site → Import from Git → 選 GitHub repo
   - 部署後會得到新網址（比手動拖曳穩、可持續更新）

3) 開啟 Identity + Git Gateway（關鍵）
   - Netlify Site settings → Identity：Enable Identity
   - Identity → Registration：建議設 Invite only（比較安全）
   - Identity → Services：Enable Git Gateway

4) 建立管理員（你自己設定密碼）
   - 打開：https://你的網站網址/admin/
   - 點 Sign up（或由你自己 Invite 一個帳號）
   - 設定密碼（只有你知道）

5) 手機上傳圖片
   - 用手機開 /admin/ → 登入 → 商品 → 新增/編輯 → 圖片欄位上傳 → 儲存 → 發佈

提示：
- /admin/ 只有你知道入口；也可以之後做「隱藏連結」放在頁尾（透明）。
