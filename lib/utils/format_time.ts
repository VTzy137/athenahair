
import {
  type LocaleCode,
  type LocaleKey,
} from '@/lib/i18n/messages';

export type {  LocaleCode, LocaleKey };

const  timeUnit = { 'seconds' : 60, 'minutes' : 3600, 'hours' : 86400, 'days' : 2592000, 'months' : 31536000, 'years' : 31536000 };

export function getTimestamp(): number {
  return Date.now();
}

export function getHHMM(): string {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

export function getHHMMSS(): string {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

export function getDDMMYYYY(): string {
  const now = new Date();
  return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
}

export function getCooldownTime(timestamp1: number, timestamp2: number)  {
    let t1 = new Date(Math.min(timestamp1, timestamp2));
    let t2 = new Date(Math.max(timestamp1, timestamp2));

    let years = t2.getFullYear() - t1.getFullYear();
    let months = t2.getMonth() - t1.getMonth();
    let days = t2.getDate() - t1.getDate();
    let hours = t2.getHours() - t1.getHours();
    let minutes = t2.getMinutes() - t1.getMinutes();
    let seconds = t2.getSeconds() - t1.getSeconds();

    if (seconds < 0) { minutes--; seconds += 60; }
    if (minutes < 0) { hours--; minutes += 60; }
    if (hours < 0) { days--; hours += 24; }
    if (days < 0) {
        months--;
        let previousMonth = new Date(t2.getFullYear(), t2.getMonth(), 0);
        days += previousMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

return { years, months, days, hours, minutes, seconds };
}

export function formatCooldownTime(timestamp1: number, timestamp2: number): string {
  const { years, months, days, hours, minutes, seconds } = getCooldownTime(timestamp1, timestamp2);
  let numTimes = 0;
  let result = '';
  if(years > 0) {
    return `${years} years`;
  }
  if(months > 0) {
    return `${months} months`;
  }
  if(days > 0) {
    return `${days} days`;
  }
  if(hours > 0) {
    return `${hours} hours`;
  }
  if(minutes > 0) {
    return `${minutes} minutes`;
  }
  return `${seconds} seconds`;
}


// Ví dụ 1: Tháng 2 năm 2026 (có 28 ngày)
const t1 = new Date('2026-02-01T00:00:00').getTime();
const t2 = new Date('2026-03-01T00:00:00').getTime(); // Lệch đúng 28 ngày
console.log("Tháng 2/2026:", getCooldownTime(t1, t2));
// Kết quả: { years: 0, months: 1, days: 0, hours: 0, ... } -> Đủ 1 tháng

// Ví dụ 2: Tháng 3 năm 2026 (có 31 ngày), nhưng ta chỉ cho lệch đúng 28 ngày
const t3 = new Date('2026-03-01T00:00:00').getTime();
const t4 = new Date('2026-03-29T00:00:00').getTime(); // Lệch đúng 28 ngày
console.log("Tháng 3/2026:", getCooldownTime(t3, t4));
// Kết quả: { years: 0, months: 0, days: 28, hours: 0, ... } -> 0 tháng 28 ngày
