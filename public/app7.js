const express = require("express");

const app = express();

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test.db');

const path = require('path');



app.set('view engine', 'ejs');

app.use("/public", express.static(__dirname + "/public"));



// 404エラーハンドリング

app.use(function(req, res, next) {

  res.status(404).send('ページが見つかりません');

});



// kimatu01.htmlへのリダイレクト

app.get("/", (req, res) => {

  res.redirect('/kimatu01.html');

});



// 各国ごとのページ

const countries = {

  "japan": "japan01.html",

  "tailand": "tailand01.html",

  "america": "america01.html",

  "china": "china01.html"

};



// 各国のページへのルーティング

Object.keys(countries).forEach(country => {

  app.get(`/${country}`, (req, res) => {

    res.sendFile(path.join(__dirname, countries[country]));

  });

});



// 子供、大人それぞれの選択を受け取り、ランキングを表示するエンドポイント

app.get("/:country/:category.html", (req, res) => {

  const country = req.params.country;

  const category = req.params.category;



  // データベースからランキングを取得するクエリを実行

  let sql = `SELECT * FROM example WHERE 国別食べ物 = ? AND カテゴリ = ?;`;

  db.all(sql, [country, category], (error, data) => {

    if (error) {

      res.render('show', { mes: "エラーです" });

    } else {

      res.render('select', { data: data });

    }

  });

});



// Expressアプリケーションをポート8080で起動

app.listen(8080, () => console.log("Example app listening on port 8080!"));

