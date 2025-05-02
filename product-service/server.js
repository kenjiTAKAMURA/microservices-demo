const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 簡易的なデータストア（実際のアプリケーションではデータベースを使用）
const products = [
  { id: 1, name: 'ノートパソコン', price: 80000, stock: 10 },
  { id: 2, name: 'スマートフォン', price: 60000, stock: 20 },
  { id: 3, name: 'ワイヤレスイヤホン', price: 15000, stock: 30 }
];

// ルートパスへのアクセス - サービスが稼働していることを確認
app.get('/', (req, res) => {
  res.send('商品サービスが稼働中です');
});

// 商品一覧を取得するAPI
app.get('/products', (req, res) => {
  console.log('商品一覧を取得しました');
  res.json(products);
});

// 特定の商品を取得するAPI
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: '商品が見つかりません' });
  }
  
  console.log(`ID:${id}の商品を取得しました`);
  res.json(product);
});

// 新しい商品を登録するAPI
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock || 0
  };
  
  products.push(newProduct);
  console.log('新しい商品を登録しました:', newProduct);
  res.status(201).json(newProduct);
});

// サーバーを起動
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
  console.log(`商品サービスがポート ${PORT} で起動しました`);
});