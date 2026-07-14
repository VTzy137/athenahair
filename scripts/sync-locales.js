const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/1-OYT4JGFxUt78Z6clkvwLEhE_62gBneonpvKAhB1DyY/export?format=csv';

const CSV_FILE_PATH = path.join(__dirname, '../translations.csv');
const OUTPUT_DIR = path.join(__dirname, '../locales');

// Hàm tải file CSV từ link về local
async function downloadCsv() {
  console.log('🌐 Đang tải file bản dịch mới nhất từ Google Sheets...');
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Tải file thất bại với HTTP status: ${response.status}`);
    }
    const csvContent = await response.text();

    // Ghi đè trực tiếp vào file translations.csv local
    fs.writeFileSync(CSV_FILE_PATH, csvContent, 'utf-8');
    console.log('💾 Đã cập nhật file translations.csv local thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi tải file CSV online, sẽ dùng tạm file cũ nếu có:', error.message);
  }
}

async function convertCsvToJson() {
  try {
    // 1. Tự động download trước khi xử lý
    await downloadCsv();

    if (!fs.existsSync(CSV_FILE_PATH)) {
      console.error(`❌ Không tìm thấy file CSV tại: ${CSV_FILE_PATH}`);
      return;
    }
    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');

    // 2. Parse dữ liệu CSV thành mảng
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    if (records.length === 0) return;
    const locales = Object.keys(records[0]).filter(header => header !== 'key');

    const result = {};
    locales.forEach(locale => { result[locale] = {}; });

    // 3. Duyệt từng dòng để map key-value
    records.forEach(row => {
      const key = row.key;
      if (!key) return;

      locales.forEach(locale => {
        const keys = key.split('.');
        let current = result[locale];

        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (i === keys.length - 1) {
            current[k] = row[locale] || "";
          } else {
            current[k] = current[k] || {};
            current = current[k];
          }
        }
      });
    });

    // 4. Ghi file JSON
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    locales.forEach(locale => {
      const outputPath = path.join(OUTPUT_DIR, `${locale}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(result[locale], null, 2), 'utf-8');
      console.log(`✅ Đã xuất file JSON: ${outputPath}`);
    });

    console.log('🎉 Quy trình đồng bộ ngôn ngữ hoàn tất!');
  } catch (error) {
    console.error('❌ Lỗi trong quá trình xử lý:', error);
  }
}

convertCsvToJson();