/**
 * 设计师NMTI人格卡片图像索引
 * 用于生成本地人格卡片图片
 */

export interface PersonalityImage {
  id: string;
  title: string;
  imageSeed: string;
  rarity: 'Common' | 'Rare' | 'Epic';
  recommendedColors: string[];
}

export const PERSONALITY_IMAGES: PersonalityImage[] = [
  {
    id: "P1",
    title: "永动机式改稿人",
    imageSeed: "robot-designer",
    rarity: "Common",
    recommendedColors: ["#4A90D9", "#2C3E50", "#E74C3C"]
  },
  {
    id: "P2",
    title: "灵感黑洞",
    imageSeed: "blackhole-creative",
    rarity: "Epic",
    recommendedColors: ["#1A1A2E", "#16213E", "#E94560"]
  },
  {
    id: "P3",
    title: "配色赌徒",
    imageSeed: "color-gambler",
    rarity: "Rare",
    recommendedColors: ["#F39C12", "#E74C3C", "#9B59B6"]
  },
  {
    id: "P4",
    title: "理性缝合怪",
    imageSeed: "logic-stitcher",
    rarity: "Common",
    recommendedColors: ["#3498DB", "#1ABC9C", "#34495E"]
  },
  {
    id: "P5",
    title: "像素级强迫症",
    imageSeed: "pixel-perfectionist",
    rarity: "Rare",
    recommendedColors: ["#95A5A6", "#2C3E50", "#000000"]
  },
  {
    id: "P6",
    title: "甲方终结者",
    imageSeed: "client-terminator",
    rarity: "Epic",
    recommendedColors: ["#C0392B", "#8E44AD", "#2C3E50"]
  },
  {
    id: "P7",
    title: "素材搬运工",
    imageSeed: "asset-mover",
    rarity: "Common",
    recommendedColors: ["#27AE60", "#2980B9", "#F1C40F"]
  },
  {
    id: "P8",
    title: "深夜爆肝王",
    imageSeed: "midnight-worker",
    rarity: "Rare",
    recommendedColors: ["#2C3E50", "#1A1A2E", "#E74C3C"]
  },
  {
    id: "P9",
    title: "工具狂热者",
    imageSeed: "tool-geek",
    rarity: "Rare",
    recommendedColors: ["#3498DB", "#2ECC71", "#E67E22"]
  },
  {
    id: "P10",
    title: "极简主义信徒",
    imageSeed: "minimalist-believer",
    rarity: "Epic",
    recommendedColors: ["#FFFFFF", "#000000", "#95A5A6"]
  },
  {
    id: "P11",
    title: "格式规范警察",
    imageSeed: "format-police",
    rarity: "Common",
    recommendedColors: ["#2980B9", "#8E44AD", "#27AE60"]
  },
  {
    id: "P12",
    title: "PPT艺术家",
    imageSeed: "ppt-artist",
    rarity: "Common",
    recommendedColors: ["#E74C3C", "#F39C12", "#9B59B6"]
  },
  {
    id: "P13",
    title: "移动端适配焦虑症",
    imageSeed: "mobile-anxiety",
    rarity: "Rare",
    recommendedColors: ["#1ABC9C", "#3498DB", "#E74C3C"]
  },
  {
    id: "P14",
    title: "品牌标识偏执狂",
    imageSeed: "brand-paranoid",
    rarity: "Epic",
    recommendedColors: ["#0066CC", "#E74C3C", "#2C3E50"]
  },
  {
    id: "P15",
    title: "栅格系统信徒",
    imageSeed: "grid-believer",
    rarity: "Common",
    recommendedColors: ["#34495E", "#BDC3C7", "#2C3E50"]
  },
  {
    id: "P16",
    title: "渐变上瘾者",
    imageSeed: "gradient-addict",
    rarity: "Rare",
    recommendedColors: ["#E74C3C", "#9B59B6", "#3498DB"]
  },
  {
    id: "P17",
    title: "投影恐惧症",
    imageSeed: "shadow-phobic",
    rarity: "Common",
    recommendedColors: ["#2C3E50", "#95A5A6", "#7F8C8D"]
  },
  {
    id: "P18",
    title: "字体选择困难户",
    imageSeed: "font-selector",
    rarity: "Rare",
    recommendedColors: ["#8E44AD", "#2980B9", "#D35400"]
  },
  {
    id: "P19",
    title: "手绘风格爱好者",
    imageSeed: "sketch-lover",
    rarity: "Epic",
    recommendedColors: ["#F39C12", "#E67E22", "#27AE60"]
  },
  {
    id: "P20",
    title: "动效痴迷者",
    imageSeed: "motion-addict",
    rarity: "Rare",
    recommendedColors: ["#9B59B6", "#3498DB", "#1ABC9C"]
  },
  {
    id: "P21",
    title: "无障碍设计倡导者",
    imageSeed: "accessibility-advocate",
    rarity: "Epic",
    recommendedColors: ["#27AE60", "#2980B9", "#F1C40F"]
  },
  {
    id: "P22",
    title: "设计系统狂热粉",
    imageSeed: "design-system-fan",
    rarity: "Rare",
    recommendedColors: ["#34495E", "#3498DB", "#2ECC71"]
  },
  {
    id: "P23",
    title: "创意文案大师",
    imageSeed: "copywriter-master",
    rarity: "Common",
    recommendedColors: ["#E74C3C", "#F39C12", "#1ABC9C"]
  },
  {
    id: "P24",
    title: "设计评审终结者",
    imageSeed: "review-terminator",
    rarity: "Epic",
    recommendedColors: ["#C0392B", "#8E44AD", "#2C3E50"]
  },
  {
    id: "P25",
    title: "设计伦理主义者",
    imageSeed: "ethics-advocate",
    rarity: "Epic",
    recommendedColors: ["#27AE60", "#2980B9", "#95A5A6"]
  }
];

// 在线图片URL生成器（使用picsum.photos）
export function getPersonalityImageUrl(imageSeed: string, size: number = 800): string {
  return `https://picsum.photos/seed/${imageSeed}/${size}/${size}`;
}

// 获取所有imageSeed列表
export const ALL_IMAGE_SEEDS = PERSONALITY_IMAGES.map(p => p.imageSeed);

// 获取特定稀有度的人格
export function getPersonalityByRarity(rarity: 'Common' | 'Rare' | 'Epic'): PersonalityImage[] {
  return PERSONALITY_IMAGES.filter(p => p.rarity === rarity);
}

// 根据ID获取人格图片信息
export function getPersonalityById(id: string): PersonalityImage | undefined {
  return PERSONALITY_IMAGES.find(p => p.id === id);
}

export default PERSONALITY_IMAGES;
