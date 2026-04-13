# 设计师NMTI人格卡片图像索引

## 概述

本文件夹存储 **25种设计师人格卡片** 的图像索引配置。

## 文件说明

- `personalityImages.ts` - 人格卡片图像索引数据（基于picsum.photos）
- `imageMapping.ts` - 人格名称与本地图片的映射配置

## 完整人格卡片列表

| ID | 名称 | 稀有度 | 本地图片路径 |
|----|------|--------|-------------|
| P1 | 永动机式改稿人 | Common | /25DSBTI/永动机式改稿人_纯图.png |
| P2 | 灵感黑洞 | Epic | /25DSBTI/灵感黑洞_纯图.png |
| P3 | 配色赌徒 | Rare | /25DSBTI/配色赌徒_纯图.png |
| P4 | 理性缝合怪 | Common | /25DSBTI/理性缝合怪_纯图.png |
| P5 | 像素级强迫症 | Rare | /25DSBTI/像素级强迫症_纯图.png |
| P6 | 甲方终结者 | Epic | /25DSBTI/甲方终结者_纯图.png |
| P7 | 素材搬运工 | Common | /25DSBTI/素材搬运工_纯图.png |
| P8 | 深夜爆肝王 | Rare | /25DSBTI/深夜爆肝王_纯图.png |
| P9 | 工具狂热者 | Rare | /25DSBTI/工具狂热者_纯图.png |
| P10 | 极简主义信徒 | Epic | /25DSBTI/极简主义信徒_纯图.png |
| P11 | 格式规范警察 | Common | /25DSBTI/格式规范警察_纯图.png |
| P12 | PPT艺术家 | Common | /25DSBTI/PPT艺术家_纯图.png |
| P13 | 移动端适配焦虑症 | Rare | /25DSBTI/移动端适配焦虑症_纯图.png |
| P14 | 品牌标识偏执狂 | Epic | /25DSBTI/品牌标识偏执狂_纯图.png |
| P15 | 栅格系统信徒 | Common | /25DSBTI/栅格系统信徒_纯图.png |
| P16 | 渐变上瘾者 | Rare | /25DSBTI/渐变上瘾者_纯图.png |
| P17 | 投影恐惧症 | Common | /25DSBTI/投影恐惧症_纯图.png |
| P18 | 字体选择困难户 | Rare | /25DSBTI/字体选择困难户_纯图.png |
| P19 | 手绘风格爱好者 | Epic | /25DSBTI/手绘风格爱好者_纯图.png |
| P20 | 动效痴迷者 | Rare | /25DSBTI/动效痴迷者_纯图.png |
| P21 | 无障碍设计倡导者 | Epic | /25DSBTI/无障碍设计倡导者_纯图.png |
| P22 | 设计系统狂热粉 | Rare | /25DSBTI/设计系统狂热粉_纯图.png |
| P23 | 创意文案大师 | Common | /25DSBTI/创意文案大师_纯图.png |
| P24 | 设计评审终结者 | Epic | /25DSBTI/设计评审终结者_纯图.png |
| P25 | 设计伦理主义者 | Epic | /25DSBTI/设计伦理主义者_纯图.png |

## 稀有度分布

- **Common (普通)**: 8种
- **Rare (稀有)**: 9种
- **Epic (史诗)**: 8种

## 图片来源

本地图片位于项目根目录的 `25DSBTI` 文件夹中，包含25张纯图格式的人格配图。

## 使用方法

```typescript
import { getLocalImagePath, TITLE_TO_IMAGE_MAP } from './source/imageMapping';

// 根据人格标题获取本地图片路径
const imagePath = getLocalImagePath('永动机式改稿人');
// 返回: "/25DSBTI/永动机式改稿人_纯图.png"

// 或使用快速映射表
const imagePath2 = TITLE_TO_IMAGE_MAP['灵感黑洞'];
// 返回: "/25DSBTI/灵感黑洞_纯图.png"
```

## 图像链接逻辑

在 `App.tsx` 的 `renderResult` 函数中，图片加载已从：

```typescript
// 旧代码（使用在线图片）
<img src={`https://picsum.photos/seed/${result.imageSeed}/800/800`} />
```

更新为：

```typescript
// 新代码（使用本地图片）
<img src={getLocalImagePath(result.title) || ''} />
```

这样可以确保程序使用 `25DSBTI` 文件夹中的本地配图，而非依赖外部网络图片服务。
