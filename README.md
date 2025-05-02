# マイクロサービスデモプロジェクト

このプロジェクトは、マイクロサービスアーキテクチャの基本を学ぶためのシンプルなデモアプリケーションです。
Docker と Git を使用して、複数の独立したサービスを構築・管理します。

## 構成サービス

このデモプロジェクトは以下の3つのサービスで構成されています：

1. **ユーザーサービス** - ユーザー情報を管理するサービス
2. **商品サービス** - 商品情報を管理するサービス
3. **APIゲートウェイ** - 各サービスへのアクセスを中継するゲートウェイ

## 前提条件

以下のツールがインストールされていることを確認してください：

- Docker と Docker Compose
- Git
- Node.js (ローカルで実行する場合)

## 使用方法

### Docker Compose でサービスを起動

```bash
# すべてのサービスをビルドして起動
docker-compose up --build

# バックグラウンドで起動する場合
docker-compose up -d --build
```

### 各サービスのエンドポイント

APIゲートウェイを経由してアクセスする場合：

- APIゲートウェイ: http://localhost:3000
- ユーザー一覧: http://localhost:3000/api/users
- 商品一覧: http://localhost:3000/api/products

直接各サービスにアクセスする場合：

- ユーザーサービス: http://localhost:3001
- 商品サービス: http://localhost:3002

### サービスの停止

```bash
# すべてのサービスを停止
docker-compose down
```

## 開発方法

1. コードの変更を行う
2. 変更をコミットする
   ```bash
   git add .
   git commit -m "変更内容の説明"
   ```
3. Docker Composeでサービスを再ビルドして起動
   ```bash
   docker-compose up --build
   ```

## プロジェクト構造

```
microservices-demo/
├── api-gateway/               # APIゲートウェイサービス
│   ├── Dockerfile             # Dockerコンテナ設定
│   ├── package.json           # 依存関係
│   └── server.js              # APIゲートウェイコード
│
├── user-service/              # ユーザーサービス
│   ├── Dockerfile             # Dockerコンテナ設定
│   ├── package.json           # 依存関係
│   └── server.js              # サーバーコード
│
├── product-service/           # 商品サービス
│   ├── Dockerfile             # Dockerコンテナ設定
│   ├── package.json           # 依存関係
│   └── server.js              # サーバーコード
│
├── docker-compose.yml         # Dockerコンテナ構成
└── README.md                  # プロジェクト説明
```

## 学習のために試してみること

1. 新しいサービス（例：注文サービス）を追加してみる
2. サービス間通信を実装してみる（例：商品サービスからユーザーサービスの情報を取得）
3. データベース（MongoDB, MySQLなど）を各サービスに接続する
4. フロントエンドアプリケーションを追加する

## 学習すること
1. Node.js　npm
2. APIゲートウェイの仕組み