# Designer NMTI - 设计师人格卡牌测试

<div align="center">
  <img width="800" alt="Designer NMTI Banner" src="https://img.shields.io/badge/Designer%20NMTI-Vibe%20Coding-FF6B6B?style=for-the-badge&logo=figma&logoColor=white" />
</div>

> 基于 Vibe Coding 开发，解构设计师职场痛点的趣味性格卡牌测试

## ✨ 特性

- **30道专业槽点题** - 涵盖甲方沟通、加班、设计规范、工具使用等真实职场场景
- **25种稀有人格** - 从"永动机式改稿人"到"设计伦理主义者"
- **动态视觉卡牌** - 根据测试结果生成精美的人格卡牌
- **加权匹配算法** - 不同选择组合对应不同人格，结果更精准

## 🎯 人格类型

| 稀有度 | 人格示例 |
|--------|----------|
| **Epic** | 灵感黑洞、甲方终结者、极简主义信徒、设计评审终结者 |
| **Rare** | 像素级强迫症、深夜爆肝王、动效痴迷者、手绘风格爱好者 |
| **Common** | 永动机式改稿人、理性缝合怪、素材搬运工、格式规范警察 |

## 🛠️ 技术栈

- **React 19** + **TypeScript**
- **Vite** - 快速构建工具
- **Tailwind CSS** - 样式设计
- **Recharts** - 雷达图可视化
- **Motion** - 流畅动画效果

## 📦 本地运行

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/designer-nmti.git
cd designer-nmti

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 开始测试。

## 🖥️ 构建部署

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

构建产物在 `dist/` 目录，可部署到任意静态托管服务：

- **Cloudflare Pages**
- **Vercel**
- **Netlify**
- **GitHub Pages**

## 📁 项目结构

```
designer-nmti/
├── src/
│   ├── App.tsx           # 主应用组件
│   ├── constants.ts      # 题库和人格数据
│   ├── index.css         # 全局样式
│   ├── main.tsx          # 入口文件
│   └── source/
│       ├── imageMapping.ts    # 本地图片映射
│       └── personalityImages.ts # 图像索引配置
├── 25DSBTI/              # 25种人格配图
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 卡牌说明

每张人格卡牌包含：

- **ID 编号** - 唯一标识
- **人格名称** - 如"永动机式改稿人"
- **稀有度** - Common / Rare / Epic
- **VIBE 指数** - 与你的契合度百分比
- **雷达图** - 五维能力分析
- **人物故事** - 趣味性描述

## 📝 License

MIT License
