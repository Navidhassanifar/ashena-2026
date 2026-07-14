import type { Country } from './types';

export const countries: Country[] = [
  { code: 'DE', name: 'آلمان', nameEn: 'Germany', flag: '🇩🇪' },
  { code: 'CA', name: 'کانادا', nameEn: 'Canada', flag: '🇨🇦' },
  { code: 'US', name: 'آمریکا', nameEn: 'USA', flag: '🇺🇸' },
  { code: 'GB', name: 'انگلستان', nameEn: 'UK', flag: '🇬🇧' },
  { code: 'IT', name: 'ایتالیا', nameEn: 'Italy', flag: '🇮🇹' },
  { code: 'AT', name: 'اتریش', nameEn: 'Austria', flag: '🇦🇹' },
  { code: 'SE', name: 'سوئد', nameEn: 'Sweden', flag: '🇸🇪' },
  { code: 'DK', name: 'دانمارک', nameEn: 'Denmark', flag: '🇩🇰' },
  { code: 'RU', name: 'روسیه', nameEn: 'Russia', flag: '🇷🇺' },
  { code: 'HU', name: 'مجارستان', nameEn: 'Hungary', flag: '🇭🇺' },
  { code: 'TR', name: 'ترکیه', nameEn: 'Turkey', flag: '🇹🇷' },
  { code: 'AU', name: 'استرالیا', nameEn: 'Australia', flag: '🇦🇺' },
  { code: 'CH', name: 'سوئیس', nameEn: 'Switzerland', flag: '🇨🇭' },
  { code: 'ES', name: 'اسپانیا', nameEn: 'Spain', flag: '🇪🇸' },
  { code: 'FI', name: 'فنلاند', nameEn: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'فرانسه', nameEn: 'France', flag: '🇫🇷' },
  { code: 'IE', name: 'ایرلند', nameEn: 'Ireland', flag: '🇮🇪' },
  { code: 'NL', name: 'هلند', nameEn: 'Netherlands', flag: '🇳🇱' },
  { code: 'PT', name: 'پرتغال', nameEn: 'Portugal', flag: '🇵🇹' },
];

export const countryByCode: Record<string, Country> = Object.fromEntries(
  countries.map((c) => [c.code, c])
);

export const visaCategories: Record<string, string> = {
  'student-visa': 'ویزای دانشجویی',
  'work-visa': 'ویزای کاری',
  'tourist-visa': 'ویزای توریستی',
  'startup-visa': 'ویزای استارتاپ',
  'permanent-residency': 'اقامت دائم',
  'express-entry': 'اکسپرس انتری',
  'family-sponsorship': 'اسپانسرشیپ خانوادگی',
  'embassy-appointment': 'وقت سفارت',
  'visa-refusal': 'رد شدن ویزا',
  'blue-card': 'بلوکارت',
  citizenship: 'شهروندی',
  'credential-evaluation': 'ارزیابی مدرک',
  'document-translation': 'ترجمه مدارک',
  'humanitarian-residency': 'اقامت انسان‌دوستانه',
  'tourist-to-student': 'تبدیل توریستی به تحصیلی',
  'independent-means': 'ویزای تمکن مالی',
  'digital-nomad': 'دیجیتال نومد',
  ausbildung: 'آسبیلدونگ (کارآموزی آلمان)',
};

export const outcomes: Record<string, string> = {
  approved: 'ویزا صادر شد',
  'refused-then-approved': 'رد شد، بعد تأیید شد',
  'in-progress': 'در جریان',
};

export const priceRanges: string[] = [
  'زیر ۵ یورو',
  '۵ تا ۱۵ یورو',
  '۱۵ یورو به بالا',
  'هنوز مطمئن نیستم',
];

export const visaFilterKeys: string[] = [
  'all',
  'student-visa',
  'work-visa',
  'blue-card',
  'express-entry',
  'startup-visa',
  'permanent-residency',
  'independent-means',
  'family-sponsorship',
];
