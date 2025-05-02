const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 簡易的なデータストア（実際のアプリケーションではデータベースを使用）
const users = [
  { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
  { id: 2, name: '佐藤花子', email: 'sato@example.com' },
  { id: 3, name: '鈴木一郎', email: 'suzuki@example.com' }
];

// ルートパスへのアクセス - サービスが稼働していることを確認
app.get('/', (req, res) => {
  res.send('ユーザーサービスが稼働中です');
});

// ユーザー一覧を取得するAPI
app.get('/users', (req, res) => {
  console.log('ユーザー一覧を取得しました');
  res.json(users);
});

// 特定のユーザーを取得するAPI
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'ユーザーが見つかりません' });
  }
  
  console.log(`ID:${id}のユーザーを取得しました`);
  res.json(user);
});

// 新しいユーザーを作成するAPI
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  
  users.push(newUser);
  console.log('新しいユーザーを作成しました:', newUser);
  res.status(201).json(newUser);
});

// サーバーを起動
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ユーザーサービスがポート ${PORT} で起動しました`);
});