import express from "express";

const app = express();

// ✅ 讓前端可送 JSON
app.use(express.json({ limit: "2mb" }));

// ✅ CORS：讓 GitHub Pages 可呼叫 Render API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Key");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => {
  res.send("tenyears oneday api is running");
});

const GAS_URL =
  "https://script.google.com/macros/s/AKfycby06D9BwO2SF3CauIxlBfb2cCyEvuaMLnoOPPhwoyQh57T_wP8Al9L2fQuw2617cLF8/exec";

// ✅ GET 全部商品（從 Google Sheet 讀）
app.get("/products", async (req, res) => {
  try {
    const r = await fetch(`${GAS_URL}?path=products`, { cache: "no-store" });
    if (!r.ok) return res.status(500).json({ error: "GAS_FETCH_FAILED", status: r.status });

    let data = await r.json();
    if (!Array.isArray(data)) data = [];

    // 只回傳上架
    data = data.filter(p => (p.status || "上架") === "上架");

    // price 保險轉數字
    data = data.map(p => ({
      ...p,
      price: typeof p.price === "number" ? p.price : Number(p.price || 0),
    }));

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// ✅ GET 單一商品（從 Google Sheet 讀）
app.get("/products/:id", async (req, res) => {
  try {
    const id = String(req.params.id || "");
    const r = await fetch(`${GAS_URL}?path=products&id=${encodeURIComponent(id)}`, { cache: "no-store" });
    const data = await r.json();

    if (!r.ok || !data || data.error) return res.status(404).json({ error: "NOT_FOUND" });

    data.price = typeof data.price === "number" ? data.price : Number(data.price || 0);

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// ✅ 設定（從 settings 表讀）
app.get("/settings", async (req, res) => {
  try {
    const r = await fetch(`${GAS_URL}?path=settings`, { cache: "no-store" });
    if (!r.ok) return res.status(500).json({ error: "GAS_FETCH_FAILED", status: r.status });

    const data = await r.json();
    res.json(data && typeof data === "object" ? data : {});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// （可選）兼容舊的 /promos：讓前台如果還在用 promos 不會壞
app.get("/promos", async (req, res) => {
  try {
    const r = await fetch(`${GAS_URL}?path=settings`, { cache: "no-store" });
    const s = await r.json();

    res.json({
      shipping: { enabled: !!s.shipping_enabled, fee: Number(s.shipping_fee || 0), freeOver: Number(s.free_shipping_threshold || 0) },
      discounts: {
        firstOrder: { enabled: true, rate: Number(s.first_purchase_discount || 1) },
        birthdayMonth: { enabled: true, rate: Number(s.birthday_discount || 1) },
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
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
