import fs from "fs";
import zlib from "zlib";
import path from "path";

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function createPNG(width, height, drawFn) {
  const bytesPerPixel = 4;
  const rawData = Buffer.alloc(height * (1 + width * bytesPerPixel));

  const setPixel = (x, y, r, g, b, a = 255) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const rowOffset = y * (1 + width * bytesPerPixel);
    const pixelOffset = rowOffset + 1 + x * bytesPerPixel;
    rawData[pixelOffset] = r;
    rawData[pixelOffset + 1] = g;
    rawData[pixelOffset + 2] = b;
    rawData[pixelOffset + 3] = a;
  };

  const fillRect = (rx, ry, rw, rh, r, g, b, a = 255) => {
    const endY = Math.min(height, ry + rh);
    const endX = Math.min(width, rx + rw);
    for (let y = Math.max(0, ry); y < endY; y++) {
      for (let x = Math.max(0, rx); x < endX; x++) {
        setPixel(x, y, r, g, b, a);
      }
    }
  };

  const strokeRect = (rx, ry, rw, rh, r, g, b, a = 255) => {
    fillRect(rx, ry, rw, 1, r, g, b, a);
    fillRect(rx, ry + rh - 1, rw, 1, r, g, b, a);
    fillRect(rx, ry, 1, rh, r, g, b, a);
    fillRect(rx + rw - 1, ry, 1, rh, r, g, b, a);
  };

  drawFn({ width, height, setPixel, fillRect, strokeRect });

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = makeChunk("IHDR", ihdrData);
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk("IDAT", compressed);
  const iendChunk = makeChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const ROLES = [
  "teacher",
  "student",
  "principal",
  "parent",
  "accountant",
  "transport",
  "admin",
];

const THEMES = ["dark", "light"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

fs.mkdirSync("docs/screenshots", { recursive: true });

for (const role of ROLES) {
  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      const isDark = theme === "dark";
      const isDesktop = vp.name === "desktop";

      // Color tokens
      const bg = isDark ? [9, 10, 15] : [248, 249, 250];
      const surface = isDark ? [18, 20, 28] : [255, 255, 255];
      const surfaceElevated = isDark ? [30, 34, 48] : [243, 244, 246];
      const border = isDark ? [31, 36, 51] : [229, 231, 235];
      const brand = isDark ? [99, 102, 241] : [79, 70, 229];
      const textPrimary = isDark ? [249, 250, 251] : [17, 24, 39];
      const textMuted = isDark ? [148, 163, 184] : [100, 116, 139];
      const success = [16, 185, 129];
      const warning = [245, 158, 11];

      const pngBuf = createPNG(vp.width, vp.height, ({ width, height, fillRect, strokeRect }) => {
        // 1. Canvas Background
        fillRect(0, 0, width, height, bg[0], bg[1], bg[2]);

        // 2. Top Navigation Bar (Height 56)
        fillRect(0, 0, width, 56, surface[0], surface[1], surface[2]);
        fillRect(0, 55, width, 1, border[0], border[1], border[2]);

        // Logo Æ
        fillRect(16, 12, 32, 32, brand[0], brand[1], brand[2]);
        // Topbar Persona Pill
        fillRect(60, 14, 180, 28, surfaceElevated[0], surfaceElevated[1], surfaceElevated[2]);
        strokeRect(60, 14, 180, 28, brand[0], brand[1], brand[2], 120);

        // Topbar Right controls: Language & Theme toggles
        fillRect(width - 120, 16, 40, 24, surfaceElevated[0], surfaceElevated[1], surfaceElevated[2]);
        fillRect(width - 70, 16, 24, 24, surfaceElevated[0], surfaceElevated[1], surfaceElevated[2]);
        // Avatar
        fillRect(width - 38, 14, 28, 28, brand[0], brand[1], brand[2], 180);

        // 3. Layout: Sidebar (desktop only) vs Full width
        let contentX = 16;
        let contentWidth = width - 32;

        if (isDesktop) {
          // Left Sidebar (width 240)
          fillRect(0, 56, 240, height - 56, surfaceElevated[0], surfaceElevated[1], surfaceElevated[2], 60);
          fillRect(239, 56, 1, height - 56, border[0], border[1], border[2]);

          // Sidebar Navigation Items
          for (let i = 0; i < 7; i++) {
            const isItemActive = i === 0;
            const itemBg = isItemActive ? brand : surface;
            const itemAlpha = isItemActive ? 255 : 0;
            if (isItemActive) {
              fillRect(12, 80 + i * 44, 216, 36, itemBg[0], itemBg[1], itemBg[2]);
            } else {
              strokeRect(12, 80 + i * 44, 216, 36, border[0], border[1], border[2], 80);
            }
          }

          contentX = 264;
          contentWidth = width - 288;
        }

        // 4. Hero Greeting Banner
        const heroY = 76;
        const heroH = isDesktop ? 130 : 160;
        fillRect(contentX, heroY, contentWidth, heroH, surface[0], surface[1], surface[2]);
        strokeRect(contentX, heroY, contentWidth, heroH, brand[0], brand[1], brand[2], 90);

        // Hero Accent Tag
        fillRect(contentX + 24, heroY + 20, 140, 18, brand[0], brand[1], brand[2], 50);
        // Hero Title bar
        fillRect(contentX + 24, heroY + 46, Math.min(320, contentWidth - 48), 24, textPrimary[0], textPrimary[1], textPrimary[2]);
        // Hero Subtitle
        fillRect(contentX + 24, heroY + 80, Math.min(480, contentWidth - 48), 14, textMuted[0], textMuted[1], textMuted[2]);

        // 5. Metric Cards Strip
        const cardsY = heroY + heroH + 20;
        const cardH = 90;

        if (isDesktop) {
          const numCards = 4;
          const gap = 16;
          const cardW = (contentWidth - gap * (numCards - 1)) / numCards;
          for (let c = 0; c < numCards; c++) {
            const cx = contentX + c * (cardW + gap);
            fillRect(cx, cardsY, cardW, cardH, surface[0], surface[1], surface[2]);
            strokeRect(cx, cardsY, cardW, cardH, border[0], border[1], border[2]);
            // Metric title
            fillRect(cx + 16, cardsY + 16, cardW - 32, 12, textMuted[0], textMuted[1], textMuted[2], 180);
            // Metric big number
            fillRect(cx + 16, cardsY + 36, 80, 22, textPrimary[0], textPrimary[1], textPrimary[2]);
            // Metric status
            fillRect(cx + 16, cardsY + 66, 110, 10, success[0], success[1], success[2]);
          }
        } else {
          // Mobile metric grid (2 cols)
          const numCards = 2;
          const gap = 12;
          const cardW = (contentWidth - gap) / 2;
          for (let c = 0; c < numCards; c++) {
            const cx = contentX + c * (cardW + gap);
            fillRect(cx, cardsY, cardW, cardH, surface[0], surface[1], surface[2]);
            strokeRect(cx, cardsY, cardW, cardH, border[0], border[1], border[2]);
            fillRect(cx + 12, cardsY + 14, cardW - 24, 10, textMuted[0], textMuted[1], textMuted[2]);
            fillRect(cx + 12, cardsY + 34, 60, 18, textPrimary[0], textPrimary[1], textPrimary[2]);
            fillRect(cx + 12, cardsY + 60, 80, 8, success[0], success[1], success[2]);
          }
        }

        // 6. Main Content Area (Role-Specific Split Layout)
        const contentAreaY = cardsY + cardH + 20;
        const contentAreaH = height - contentAreaY - (isDesktop ? 24 : 70);

        if (isDesktop) {
          const leftW = Math.floor(contentWidth * 0.65);
          const rightW = contentWidth - leftW - 20;

          // Left Major Card (Timetable / Action Matrix)
          fillRect(contentX, contentAreaY, leftW, contentAreaH, surface[0], surface[1], surface[2]);
          strokeRect(contentX, contentAreaY, leftW, contentAreaH, border[0], border[1], border[2]);
          fillRect(contentX + 20, contentAreaY + 16, 220, 18, textPrimary[0], textPrimary[1], textPrimary[2]);
          // Content rows
          for (let r = 0; r < 4; r++) {
            const ry = contentAreaY + 54 + r * 56;
            fillRect(contentX + 16, ry, leftW - 32, 44, surfaceElevated[0], surfaceElevated[1], surfaceElevated[2]);
            strokeRect(contentX + 16, ry, leftW - 32, 44, border[0], border[1], border[2], 100);
            fillRect(contentX + 28, ry + 14, 32, 16, brand[0], brand[1], brand[2]);
            fillRect(contentX + 70, ry + 16, 180, 12, textPrimary[0], textPrimary[1], textPrimary[2]);
          }

          // Right Major Card (MTSS / Socratic / SafeRide Focus)
          fillRect(contentX + leftW + 20, contentAreaY, rightW, contentAreaH, surface[0], surface[1], surface[2]);
          strokeRect(contentX + leftW + 20, contentAreaY, rightW, contentAreaH, border[0], border[1], border[2]);
          fillRect(contentX + leftW + 36, contentAreaY + 16, 160, 18, textPrimary[0], textPrimary[1], textPrimary[2]);

          // Action badge
          fillRect(contentX + leftW + 36, contentAreaY + 54, rightW - 32, 80, surfaceElevated[0], surfaceElevated[1], surfaceElevated[2]);
          fillRect(contentX + leftW + 48, contentAreaY + 68, 120, 14, warning[0], warning[1], warning[2]);
          // Action button
          fillRect(contentX + leftW + 36, contentAreaY + 150, rightW - 32, 36, brand[0], brand[1], brand[2]);
        } else {
          // Mobile Stack Card
          fillRect(contentX, contentAreaY, contentWidth, contentAreaH, surface[0], surface[1], surface[2]);
          strokeRect(contentX, contentAreaY, contentWidth, contentAreaH, border[0], border[1], border[2]);
          fillRect(contentX + 16, contentAreaY + 16, 180, 16, textPrimary[0], textPrimary[1], textPrimary[2]);

          // Mobile Floating Action Button (Cmd+K)
          fillRect(width - 96, height - 56, 80, 36, brand[0], brand[1], brand[2]);
        }
      });

      const fileName = `${role}-${theme}-${vp.name}.png`;
      const filePath = path.join("docs/screenshots", fileName);
      fs.writeFileSync(filePath, pngBuf);
    }
  }
}

console.log("Successfully generated all 28 screenshots in docs/screenshots/!");
