const fs = require('fs');
const path = require('path');

const SVG_DIR = path.join(__dirname, '../public/svg');
const OUTPUT_FILE = path.join(__dirname, '../lib/constants/icon.ts');

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

function generateIcons() {
  console.log('🔄 Đang tự động quét thư mục public/svg để tạo icon.ts...');
  
  if (!fs.existsSync(SVG_DIR)) {
    console.error(`❌ Không tìm thấy thư mục SVG tại: ${SVG_DIR}`);
    return;
  }

  const files = fs.readdirSync(SVG_DIR);
  const svgFiles = files.filter(file => file.endsWith('.svg'));

  const imports = [];
  const mappings = [];

  svgFiles.forEach(file => {
    const basename = path.basename(file, '.svg');
    const camelKey = toCamelCase(basename);
    
    // Tạo tên import an toàn không chứa ký tự đặc biệt
    const importName = toCamelCase(basename) + 'Icon';
    
    imports.push(`import ${importName} from "@/public/svg/${file}";`);
    mappings.push(`  ${camelKey}: ${importName},`);
  });

  const content = `// This file is auto-generated. Do not edit manually.
${imports.join('\n')}

export const ICONS = {
${mappings.join('\n')}
} as const;
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
  console.log(`✅ Đã cập nhật file: ${OUTPUT_FILE}`);
}

generateIcons();
