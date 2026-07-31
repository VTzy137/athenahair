const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_FILE = path.join(__dirname, '../lib/constants/image.ts');

const SUPPORTED_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.avif'];

function toCamelCase(str) {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

function generateImages() {
  console.log('🔄 Đang tự động quét thư mục public/images để tạo image.ts...');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Không tìm thấy thư mục images tại: ${IMAGES_DIR}`);
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file =>
    SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase())
  );

  const imports = [];
  const mappings = [];

  imageFiles.forEach(file => {
    const basename = path.basename(file, path.extname(file));
    const importName = toCamelCase(basename) + 'Image';
    const camelKey = toCamelCase(basename);

    imports.push(`import ${importName} from "@/public/images/${file}";`);
    mappings.push(`  ${camelKey}: ${importName},`);
  });

  const content = `// This file is auto-generated. Do not edit manually.
${imports.join('\n')}

export const IMAGES = {
${mappings.join('\n')}
} as const;
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
  console.log(`✅ Đã cập nhật file: ${OUTPUT_FILE}`);
}

generateImages();
