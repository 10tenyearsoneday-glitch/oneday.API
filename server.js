import express from "express";

const app = express();

// 允許 GitHub Pages 呼叫（很重要，否則前台會被瀏覽器擋）
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Key");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.get("/", (req, res) => {
  res.send("tenyears oneday api is running");
});

// 先用示意資料（之後再換成資料庫/Google Sheet 都行）
app.get("/products", (req, res) => {
  res.json([
    {
      id: "N-A",
      title: "項鍊 A",
      category: "項鍊",
      series: "全系列",
      price: 1280,
      status: "上架",
      image: "https://10tenyearsoneday-glitch.github.io/tenyears_oneday/assets/products/N-A.jpg"
      desc: "極簡風吊飾，日常百搭。",
  stock: 3
    },
    {
      id: "E-B",
      title: "耳環 B",
      category: "耳環",
      series: "全系列",
      price: 880,
      status: "上架",
      image: "https://10tenyearsoneday-glitch.github.io/tenyears_oneday/assets/products/E-B.jpg"
      desc: "極簡風吊飾，日常百搭。",
  stock: 3
    },
    {
      id: "R-C",
      title: "戒指 C",
      category: "戒指",
      series: "全系列",
      price: 1580,
      status: "上架",
      image: "https://10tenyearsoneday-glitch.github.io/tenyears_oneday/assets/products/R-C.jpg"
      desc: "極簡風吊飾，日常百搭。",
  stock: 3
    },
    {
      id: "O-D",
      title: "吊飾 D",
      category: "其他",
      series: "全系列",
      price: 420,
      status: "上架",
      image: "https://10tenyearsoneday-glitch.github.io/tenyears_oneday/assets/products/O-D.jpg"
      desc: "極簡風吊飾，日常百搭。",
  stock: 3
    }
  ]);
});


app.get("/promos", (req, res) => {
  res.json({
    shipping: { enabled: true, fee: 60, freeOver: 1000 },
    discounts: {
      firstOrder: { enabled: true, rate: 0.9 },
      birthdayMonth: { enabled: true, rate: 0.85 },
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
