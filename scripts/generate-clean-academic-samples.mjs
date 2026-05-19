import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "outputs/clean-academic-style-sample";
mkdirSync(outDir, { recursive: true });

const W = 1600;
const H = 900;

const figDir = "IGCSE CS/assets/3-hardware/digital-cameras-p92-p93";
const img = (name) => `${figDir}/${name}`;

const figures = {
  camera: img("figure-3-20-digital-camera-enhanced.png"),
  process: img("figure-3-22-diagram-of-how-a-digital-camera-works-enhanced.png"),
  pixels: img("figure-3-21-typical-pixel-brightness-and-colour-values-enhanced.png"),
};

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function base({ title, subtitle = "", section = "Digital Cameras", page = "01", body }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <style>
    .bg { fill: #fbfbf8; }
    .ink { fill: #17202a; }
    .muted { fill: #68717d; }
    .blue { fill: #2f5f9f; }
    .line { stroke: #d8d6ce; stroke-width: 2; }
    .accent-line { stroke: #2f5f9f; stroke-width: 5; stroke-linecap: round; }
    .thin { stroke: #9aa4b2; stroke-width: 2; fill: none; }
    .panel { fill: #ffffff; stroke: #dedbd2; stroke-width: 2; }
    .soft { fill: #eef3f9; }
    text { font-family: sans-serif; }
    .title { font-weight: 700; font-size: 54px; }
    .subtitle { font-weight: 400; font-size: 29px; }
    .h3 { font-weight: 700; font-size: 30px; }
    .body { font-weight: 400; font-size: 29px; }
    .body-sm { font-weight: 400; font-size: 24px; }
    .zh { font-weight: 400; font-size: 23px; fill: #68717d; }
    .small { font-weight: 600; font-size: 18px; letter-spacing: 1.6px; }
    .num { font-weight: 700; font-size: 21px; fill: #ffffff; }
    .mono { font-family: monospace; font-weight: 600; font-size: 28px; }
  </style>
  <rect class="bg" width="${W}" height="${H}"/>
  <text x="96" y="74" class="small muted">${esc(section.toUpperCase())}</text>
  <text x="96" y="145" class="title ink">${esc(title)}</text>
  ${subtitle ? `<text x="96" y="191" class="subtitle muted">${esc(subtitle)}</text>` : ""}
  <line x1="96" y1="226" x2="1504" y2="226" class="line"/>
  <line x1="96" y1="226" x2="218" y2="226" class="accent-line"/>
  ${body}
  <text x="96" y="838" class="small muted">IGCSE Computer Science · Hardware</text>
  <text x="1464" y="838" text-anchor="end" class="small muted">${page}/05</text>
</svg>`;
}

const bullet = (x, y, en, zh) => `
  <circle cx="${x}" cy="${y - 10}" r="5" class="blue"/>
  <text x="${x + 24}" y="${y}" class="body ink">${esc(en)}</text>
  <text x="${x + 24}" y="${y + 34}" class="zh">${esc(zh)}</text>`;

const callout = (n, x, y, heading, text, zh) => `
  <circle cx="${x}" cy="${y}" r="20" fill="#2f5f9f"/>
  <text x="${x}" y="${y + 7}" text-anchor="middle" class="num">${n}</text>
  <text x="${x + 36}" y="${y - 5}" class="h3 ink">${esc(heading)}</text>
  <text x="${x + 36}" y="${y + 31}" class="body-sm ink">${esc(text)}</text>
  <text x="${x + 36}" y="${y + 61}" class="zh">${esc(zh)}</text>`;

const slides = [
  base({
    title: "Digital Cameras",
    subtitle: "A clean academic style sample · 极简学术风样张",
    page: "01",
    body: `
  <text x="96" y="332" class="body ink">A digital camera captures light and stores the result as a digital image file.</text>
  <text x="96" y="374" class="zh">数字相机接收光线，并把结果存储为数字图像文件。</text>
  <rect x="940" y="300" width="430" height="270" rx="6" class="panel"/>
  <image x="980" y="334" width="350" height="202" xlink:href="${figures.camera}" preserveAspectRatio="xMidYMid meet"/>
  <text x="96" y="512" class="h3 blue">Core question</text>
  <text x="96" y="560" class="body ink">How does light become binary data?</text>
  <text x="96" y="600" class="zh">光线如何变成二进制数据？</text>
  <line x1="96" y1="672" x2="760" y2="672" class="thin"/>
  <text x="96" y="724" class="body-sm muted">Style note: mostly text, strong hierarchy, restrained colour.</text>
  <text x="96" y="758" class="zh">风格特点：文字清楚、层级明确、颜色克制。</text>`,
  }),
  base({
    title: "From film to files",
    subtitle: "The key shift is storage and transfer · 核心变化是存储与传输",
    page: "02",
    body: `
  ${bullet(120, 330, "Traditional cameras used photographic film.", "传统相机使用胶卷。")}
  ${bullet(120, 430, "Digital cameras store photographs as files.", "数字相机把照片存储为文件。")}
  ${bullet(120, 530, "Files can be transferred using USB or Bluetooth.", "文件可以通过 USB 或 Bluetooth 传输。")}
  <rect x="930" y="302" width="438" height="268" rx="6" class="panel"/>
  <image x="970" y="335" width="360" height="202" xlink:href="${figures.camera}" preserveAspectRatio="xMidYMid meet"/>
  <text x="930" y="632" class="h3 blue">Takeaway</text>
  <text x="930" y="681" class="body-sm ink">The output is not printed film.</text>
  <text x="930" y="714" class="zh">输出结果不再是冲洗出来的胶片。</text>
  <text x="930" y="756" class="body-sm ink">It is a computer-readable file.</text>
  <text x="930" y="789" class="zh">而是计算机可读取的文件。</text>`,
  }),
  base({
    title: "The capture process",
    subtitle: "Light is converted step by step · 光线被逐步转换",
    page: "03",
    body: `
  <rect x="94" y="286" width="780" height="410" rx="6" class="panel"/>
  <image x="132" y="330" width="704" height="302" xlink:href="${figures.process}" preserveAspectRatio="xMidYMid meet"/>
  ${callout(1, 938, 324, "Lens", "Light enters the camera.", "光线进入相机。")}
  ${callout(2, 938, 444, "CCD sensor", "Photodiodes create electric charges.", "光电二极管产生电荷。")}
  ${callout(3, 938, 564, "ADC", "Charges become digital values.", "电荷转换成数字数值。")}
  ${callout(4, 938, 684, "Binary image", "The image is stored as data.", "图像以数据形式存储。")}`,
  }),
  base({
    title: "Pixels and brightness",
    subtitle: "Each pixel stores a value · 每个像素存储一个数值",
    page: "04",
    body: `
  <rect x="96" y="292" width="642" height="410" rx="6" class="panel"/>
  <image x="140" y="332" width="554" height="302" xlink:href="${figures.pixels}" preserveAspectRatio="xMidYMid meet"/>
  <text x="842" y="336" class="h3 blue">8-bit ADC</text>
  <text x="842" y="391" class="body ink">2⁸ = 256 possible brightness levels</text>
  <text x="842" y="431" class="zh">8 位 ADC 可以表示 256 种亮度等级。</text>
  <rect x="842" y="493" width="430" height="86" rx="6" class="soft"/>
  <text x="882" y="548" class="mono ink">01110011</text>
  <text x="842" y="648" class="body-sm ink">This binary value can represent the brightness of one pixel.</text>
  <text x="842" y="684" class="zh">这个二进制值可以表示一个像素的亮度。</text>`,
  }),
  base({
    title: "What affects image quality?",
    subtitle: "A concise summary slide · 简洁总结页",
    page: "05",
    body: `
  <text x="116" y="334" class="h3 blue">Image quality depends on:</text>
  ${bullet(132, 405, "Recording device: lens and sensor array", "记录设备：镜头与传感器阵列")}
  ${bullet(132, 505, "Number of pixels in the image", "图像中的像素数量")}
  ${bullet(132, 605, "Light levels when the image is captured", "拍摄时的光线水平")}
  ${bullet(132, 705, "Storage format, such as JPEG or raw", "存储格式，例如 JPEG 或 raw")}
  <rect x="1010" y="370" width="330" height="210" rx="6" class="panel"/>
  <text x="1050" y="445" class="body-sm ink">Better input</text>
  <text x="1050" y="483" class="zh">更好的输入</text>
  <line x1="1050" y1="525" x2="1300" y2="525" class="thin"/>
  <text x="1050" y="575" class="body-sm ink">Better digital image</text>
  <text x="1050" y="613" class="zh">更好的数字图像</text>`,
  }),
];

slides.forEach((svg, index) => {
  const n = String(index + 1).padStart(2, "0");
  const svgPath = join(outDir, `clean-academic-sample-${n}.svg`);
  const pngPath = join(outDir, `clean-academic-sample-${n}.png`);
  writeFileSync(svgPath, svg);
  execFileSync("magick", [svgPath, "-background", "#fbfbf8", "-alpha", "remove", pngPath]);
});

console.log(`Generated ${slides.length} PNG slides in ${outDir}`);
