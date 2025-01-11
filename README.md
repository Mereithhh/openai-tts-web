# OpenAI TTS Web

今天喉咙痛，说不了话，所以写了一个在线文本转语音工具，支持 OpenAI TTS 和系统语音合成。

一个优雅的在线文本转语音工具，支持 OpenAI TTS 和系统语音合成。使用 React + TypeScript + Vite + Tailwind CSS + shadcn/ui 构建。

![预览图](./preview.png)

> 在线体验：https://tts-web.mereith.com

## 特性

- 🎯 支持多个 TTS 来源
  - OpenAI TTS（支持所有官方声音）
  - 系统内置语音合成
- 🛠️ 灵活的配置选项
  - OpenAI API Key 配置
  - API 代理设置
  - 模型选择（tts-1/tts-1-hd）
  - 声音选择
- 🎨 优雅的用户界面
  - 响应式设计
  - 暗色主题
  - 优雅的加载动画
  - 友好的错误提示
- 🚀 其他功能
  - 自动播放控制
  - 本地设置保存
  - 支持 Docker 部署

## 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/mereithhh/openai-tts-web.git
cd openai-tts-web

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### Docker 部署

```bash
# 构建镜像
docker build -t openai-tts-web .

# 运行容器
docker run -d -p 80:80 openai-tts-web
```

或者直接使用预构建镜像：

```bash
docker run -d -p 80:80 mereithhh/openai-tts-web
```

## 配置说明

### OpenAI TTS

1. 在设置页面配置 OpenAI API Key
2. 可选：配置 API 代理地址（默认为 `https://api.openai.com`）
3. 选择模型和声音
   - 模型：tts-1（标准质量）或 tts-1-hd（高质量）
   - 声音：alloy、echo、fable、onyx、nova、shimmer

### 系统 TTS

1. 在设置页面选择系统声音
2. 无需其他配置

## 开发技术

- 🚀 Vite
- ⚛️ React 18
- 📝 TypeScript
- 🎨 Tailwind CSS
- 🛠️ shadcn/ui
- 🐳 Docker

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
