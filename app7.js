// app.js

// Expressの読み込み
const express = require("express");
const app = express();

// ポートの設定
const port = 8080;

// ルートの設定
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/food", (req, res) => {
    res.send("This is the food page!");
});

// 404エラーハンドリング
app.use(function(req, res, next) {
    res.status(404).send('ページが見つかりません');
});

// アプリケーションの起動
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
