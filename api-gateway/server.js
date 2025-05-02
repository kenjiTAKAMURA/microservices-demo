const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 環境に応じてサービスのURLを変更（Docker環境ではサービス名、ローカル環境ではlocalhostを使用）
const USER_SERVICE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://user-service:3001' 
  : 'http://localhost:3001';

const PRODUCT_SERVICE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://product-service:3002' 
  : 'http://localhost:3002';

// ルートパスへのアクセス - ゲートウェイが稼働していることを確認
app.get('/', (req, res) => {
  res.send('APIゲートウェイが稼働中です');
});

// ユーザーサービスへのプロキシ設定
app.use('/api/users', createProxyMiddleware({
  target: USER_SERVICE_URL,
  pathRewrite: { '^/api/users': '/users' },
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`ユーザーサービスへリクエスト: ${req.method} ${req.url}`);
  }
}));

// 商品サービスへのプロキシ設定
app.use('/api/products', createProxyMiddleware({
  target: PRODUCT_SERVICE_URL,
  pathRewrite: { '^/api/products': '/products' },
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`商品サービスへリクエスト: ${req.method} ${req.url}`);
  }
}));

// サービス状態を確認するエンドポイント
app.get('/health', async (req, res) => {
  res.json({
    gateway: 'up',
    services: {
      user: 'checking...',
      product: 'checking...'
    }
  });
});

// サーバーを起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`APIゲートウェイがポート ${PORT} で起動しました`);
});