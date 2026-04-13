/**
 * 设计师NMTI人格卡片本地图片映射
 * 将人格名称映射到本地图片路径
 */

export interface ImageMapping {
  title: string;
  filename: string;
  localPath: string;
}

// 人格名称与图片文件名映射
export const IMAGE_MAPPINGS: ImageMapping[] = [
  { title: "永动机式改稿人", filename: "永动机式改稿人_纯图.png", localPath: "/25DSBTI/永动机式改稿人_纯图.png" },
  { title: "灵感黑洞", filename: "灵感黑洞_纯图.png", localPath: "/25DSBTI/灵感黑洞_纯图.png" },
  { title: "配色赌徒", filename: "配色赌徒_纯图.png", localPath: "/25DSBTI/配色赌徒_纯图.png" },
  { title: "理性缝合怪", filename: "理性缝合怪_纯图.png", localPath: "/25DSBTI/理性缝合怪_纯图.png" },
  { title: "像素级强迫症", filename: "像素级强迫症_纯图.png", localPath: "/25DSBTI/像素级强迫症_纯图.png" },
  { title: "甲方终结者", filename: "甲方终结者_纯图.png", localPath: "/25DSBTI/甲方终结者_纯图.png" },
  { title: "素材搬运工", filename: "素材搬运工_纯图.png", localPath: "/25DSBTI/素材搬运工_纯图.png" },
  { title: "深夜爆肝王", filename: "深夜爆肝王_纯图.png", localPath: "/25DSBTI/深夜爆肝王_纯图.png" },
  { title: "工具狂热者", filename: "工具狂热者_纯图.png", localPath: "/25DSBTI/工具狂热者_纯图.png" },
  { title: "极简主义信徒", filename: "极简主义信徒_纯图.png", localPath: "/25DSBTI/极简主义信徒_纯图.png" },
  { title: "格式规范警察", filename: "格式规范警察_纯图.png", localPath: "/25DSBTI/格式规范警察_纯图.png" },
  { title: "PPT艺术家", filename: "PPT艺术家_纯图.png", localPath: "/25DSBTI/PPT艺术家_纯图.png" },
  { title: "移动端适配焦虑症", filename: "移动端适配焦虑症_纯图.png", localPath: "/25DSBTI/移动端适配焦虑症_纯图.png" },
  { title: "品牌标识偏执狂", filename: "品牌标识偏执狂_纯图.png", localPath: "/25DSBTI/品牌标识偏执狂_纯图.png" },
  { title: "栅格系统信徒", filename: "栅格系统信徒_纯图.png", localPath: "/25DSBTI/栅格系统信徒_纯图.png" },
  { title: "渐变上瘾者", filename: "渐变上瘾者_纯图.png", localPath: "/25DSBTI/渐变上瘾者_纯图.png" },
  { title: "投影恐惧症", filename: "投影恐惧症_纯图.png", localPath: "/25DSBTI/投影恐惧症_纯图.png" },
  { title: "字体选择困难户", filename: "字体选择困难户_纯图.png", localPath: "/25DSBTI/字体选择困难户_纯图.png" },
  { title: "手绘风格爱好者", filename: "手绘风格爱好者_纯图.png", localPath: "/25DSBTI/手绘风格爱好者_纯图.png" },
  { title: "动效痴迷者", filename: "动效痴迷者_纯图.png", localPath: "/25DSBTI/动效痴迷者_纯图.png" },
  { title: "无障碍设计倡导者", filename: "无障碍设计倡导者_纯图.png", localPath: "/25DSBTI/无障碍设计倡导者_纯图.png" },
  { title: "设计系统狂热粉", filename: "设计系统狂热粉_纯图.png", localPath: "/25DSBTI/设计系统狂热粉_纯图.png" },
  { title: "创意文案大师", filename: "创意文案大师_纯图.png", localPath: "/25DSBTI/创意文案大师_纯图.png" },
  { title: "设计评审终结者", filename: "设计评审终结者_纯图.png", localPath: "/25DSBTI/设计评审终结者_纯图.png" },
  { title: "设计伦理主义者", filename: "设计伦理主义者_纯图.png", localPath: "/25DSBTI/设计伦理主义者_纯图.png" }
];

// 根据人格标题获取本地图片路径
export function getLocalImagePath(title: string): string | null {
  const mapping = IMAGE_MAPPINGS.find(m => m.title === title);
  return mapping ? mapping.localPath : null;
}

// 创建标题到路径的快速映射表
export const TITLE_TO_IMAGE_MAP: Record<string, string> = IMAGE_MAPPINGS.reduce((acc, m) => {
  acc[m.title] = m.localPath;
  return acc;
}, {} as Record<string, string>);

export default IMAGE_MAPPINGS;
