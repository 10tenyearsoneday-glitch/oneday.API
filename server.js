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

import express from "express";

const app = express();

// ✅ 讓前端可送 JSON
app.use(express.json({ limit: "2mb" }));

// ✅ CORS：讓 GitHub Pages 可呼叫 Render API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 先全開，之後可改成只允許你的網域
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => {
  res.send("tenyears oneday api is running");
});

// ✅ 用記憶體保存商品（Render 重啟會還原）
let PRODUCTS = [
  {
    id: "N-A",
    title: "項鍊 A",
    category: "項鍊",
    series: "全系列",
    price: 1280,
    status: "上架",
    image: "https://10tenyearsoneday-glitch.github.io/tenyears_oneday/assets/products/N-A.jpg",
    desc: "（商品介紹待補）"
  },
  {
    id: "E-B",
    title: "耳環 B",
    category: "耳環",
    series: "全系列",
    price: 880,
    status: "上架",
    image: "https://10tenyearsoneday-glitch.github.io/tenyears_oneday/assets/products/E-B.jpg",
    desc: "（商品介紹待補）"
  },
  {
    id: "R-C",
    title: "戒指 C",
    category: "戒指",
    series: "全系列",
    price: 1580,
    status: "上架",
    image: "https://10tenyearsoneday-glitch.github.io/tenyears_oneday/assets/products/R-C.jpg",
    desc: "（商品介紹待補）"
  },
  {
    id: "O-D",
    title: "吊飾 D",
    category: "其他",
    series: "全系列",
    price: 420,
    status: "上架",
    image: "https://10tenyearsoneday-glitch.github.io/tenyears_oneday/assets/products/O-D.jpg",
    desc: "（商品介紹待補）"
  }
];

// ✅ GET 全部商品
app.get("/products", (req, res) => {
  res.json(PRODUCTS);
});

// ✅ GET 單一商品（之後你說要補 /products/:id，我先幫你一併加好，不影響 admin）
app.get("/products/:id", (req, res) => {
  const p = PRODUCTS.find(x => String(x.id) === String(req.params.id));
  if (!p) return res.status(404).json({ error: "NOT_FOUND" });
  res.json(p);
});

// ✅ POST 新增商品
app.post("/products", (req, res) => {
  const b = req.body || {};
  if (!b.id) return res.status(400).json({ error: "ID_REQUIRED" });

  const exists = PRODUCTS.some(x => String(x.id) === String(b.id));
  if (exists) return res.status(409).json({ error: "ID_EXISTS" });

  const item = {
    id: String(b.id),
    title: String(b.title || "（未命名）"),
    category: String(b.category || "其他"),
    series: String(b.series || "全系列"),
    price: Number(b.price || 0),
    status: String(b.status || "上架"),
    image: String(b.image || ""),
    desc: String(b.desc || "")
  };

  PRODUCTS.unshift(item);
  res.status(201).json(item);
});

// ✅ PUT 修改商品（A~F 全欄位）
app.put("/products/:id", (req, res) => {
  const id = String(req.params.id);
  const idx = PRODUCTS.findIndex(x => String(x.id) === id);
  if (idx === -1) return res.status(404).json({ error: "NOT_FOUND" });

  const b = req.body || {};
  const updated = {
    ...PRODUCTS[idx],
    title: (b.title !== undefined) ? String(b.title) : PRODUCTS[idx].title,
    category: (b.category !== undefined) ? String(b.category) : PRODUCTS[idx].category,
    series: (b.series !== undefined) ? String(b.series) : PRODUCTS[idx].series,
    price: (b.price !== undefined) ? Number(b.price) : PRODUCTS[idx].price,
    status: (b.status !== undefined) ? String(b.status) : PRODUCTS[idx].status,
    image: (b.image !== undefined) ? String(b.image) : PRODUCTS[idx].image,
    desc: (b.desc !== undefined) ? String(b.desc) : PRODUCTS[idx].desc
  };

  PRODUCTS[idx] = updated;
  res.json(updated);
});

// ✅ DELETE 刪除商品
app.delete("/products/:id", (req, res) => {
  const id = String(req.params.id);
  const before = PRODUCTS.length;
  PRODUCTS = PRODUCTS.filter(x => String(x.id) !== id);
  if (PRODUCTS.length === before) return res.status(404).json({ error: "NOT_FOUND" });
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));


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
