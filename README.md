# 华工国际食堂评价系统

面向华南理工大学国际校区 D5 / F3 / B1 食堂的多语言评价与内容发布平台。支持图文发布、置顶与时间排序浏览、用户登录注册、管理员用户管理，以及基于本地大模型的翻译服务。

## 功能
- 按食堂分区的主页与详情页，首启自动确保 D5/F3/B1 三个食堂存在。
- 用户登录/注册，支持管理员角色；管理员可在 `/admin/users` 查询和删除用户。
- 发布食堂点评：选择食堂并填写内容，可一次上传最多 9 张图片，图片统一存储在 `public/uploads`。
- 点评展示支持置顶与时间排序；可编辑/删除自己的内容（管理员可管理全局）。
- 多语言体验：界面语言可切换（`/languages`），点评文本可调用翻译 API 自动检测语言并翻译。
- 独立翻译服务：基于 Python + Transformers 的本地服务，默认监听 `127.0.0.1:5001`，可通过环境变量配置。

## 技术栈
- Node.js + Express 5，EJS，Bootstrap，body-parser，method-override
- MongoDB + Mongoose，Passport Local 认证
- Multer 本地图片上传
- Python 3 + Flask + Transformers（翻译服务）
- concurrently 一键启动 Node 应用和翻译服务

## 环境要求
- Node.js 18+ 与 npm
- Python 3.9+ 与 pip
- MongoDB 实例（默认连接 `mongodb://localhost:27017/yelpcamp`）
- 至少约 6 GB 磁盘空间用于本地翻译模型（`translation_service/model.safetensors` 已包含）

## 翻译模型下载与放置
- 模型目录：	ranslation_service/，使用 acebook/m2m100_1.2B（约 4.9GB），需要至少 6GB 可用磁盘。
- 自动下载：
  `ash
  cd translation_service
  python download_model.py
  `
  会在当前目录生成 model.safetensors 及配套的 tokenizer/config 文件。
- 手动下载：从 Hugging Face 获取 acebook/m2m100_1.2B 的全部文件（model.safetensors、config.json、	okenizer_config.json、sentencepiece.bpe.model、ocab.json、dded_tokens.json、special_tokens_map.json、generation_config.json），全部放入 	ranslation_service/，与 	ranslation_service.py 同级。
- 缺失上述任意文件都会导致翻译 API 无法加载模型（返回 500），启动前请确认到位。

## 快速开始
1. 安装依赖  
   ```bash
   npm install
   pip install -r requirements.txt
   ```
2. 配置环境变量（`.env` 示例）  
   ```bash
   DB_URL=mongodb://localhost:27017/yelpcamp
   SECRET=ThisIsASecretKeyForSessionEncryption
   PORT=3000
   TRANSLATE_API_HOST=127.0.0.1   # 可选，翻译服务地址
   TRANSLATE_API_PORT=5001        # 可选，翻译服务端口
   ```
3. 启动 MongoDB：`mongod`
4. 启动翻译服务（任选其一）  
   - `python -m translation_service.translation_api`  
   - `python translation_service/start_translation_service.py --port 5001`
5. 启动应用  
   - 一键启动（并行起 Node 与翻译服务，需保证 python 可用）：`npm start`  
   - 或仅启动 Node 应用：`node app.js`
6. 访问 `http://localhost:3000`，注册后即可在对应食堂发布图文评价。

## 目录速览
- `app.js`：Express 入口，多语言中间件，默认食堂初始化。
- `routes/`：食堂、评论、认证、翻译、管理员路由。
- `models/`：食堂、评论、用户（含角色 user/admin）。
- `middleware/upload.js`：本地图片上传配置，保存至 `public/uploads`。
- `translation_service/`：Flask + Transformers 翻译 API，实现多语言自动检测与翻译。
