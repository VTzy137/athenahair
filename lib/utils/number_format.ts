const DEFAULT_LOCALE = 'en-US';

const formatNumber = (value: number, locale: string = DEFAULT_LOCALE) => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short', // Sử dụng ký tự viết tắt ngắn gọn
    maximumFractionDigits: 1 // Làm tròn đến số thập phân mong muốn
  }).format(value);
};

console.log(formatNumber(1500, 'en-US'));      // "1.5K"
console.log(formatNumber(2500000, 'en-US'));   // "2.5M"
console.log(formatNumber(3500000000, 'en-US'));// "3.5B"

console.log(formatNumber(1500, 'vi-VN'));      // "1,5 N" (hoặc "1,5 K" tùy phiên bản trình duyệt)
console.log(formatNumber(2500000, 'vi-VN'));   // "2.5 Tr"
console.log(formatNumber(3500000000, 'vi-VN'));// "3.5 Tỷ"