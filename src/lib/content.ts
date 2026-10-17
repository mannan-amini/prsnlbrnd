import contentData from './content-data.json';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  markdown?: string;
  category: string;
  categorySlug: 'decisions' | 'people' | 'systems';
  publishedAt: string;
  readingMinutes: number;
  featured?: boolean;
  status: 'published' | 'draft';
  tags: string[];
}

export interface Note {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
}

export interface Question {
  id: string;
  question: string;
  preview: string;
  elaboration: string;
  relatedArticleSlug?: string;
}

export interface Book {
  id: string;
  titleEn: string;
  titleFa: string;
  author: string;
  category: string;
  notesSummary: string;
  coverBg: string;
}

export interface Topic {
  id: string;
  number: string;
  slug: 'decisions' | 'people' | 'systems';
  title: string;
  description: string;
  count: number;
}

export const TOPICS: Topic[] = [
  {
    id: 'decisions',
    number: '01',
    slug: 'decisions',
    title: 'تصمیم‌ها',
    description: 'از انتخاب‌های کوچک تا تصمیم‌های بزرگ مدیریتی',
    count: 4,
  },
  {
    id: 'people',
    number: '02',
    slug: 'people',
    title: 'آدم‌ها',
    description: 'درباره تیم، رهبری و ظرافت‌های همکاری انسانی',
    count: 3,
  },
  {
    id: 'systems',
    number: '03',
    slug: 'systems',
    title: 'سیستم‌ها',
    description: 'فرایندها، ساختارها و هنر مقیاس‌پذیری پایدار',
    count: 3,
  },
];

export const ARTICLES: Article[] = (contentData.articles as Article[]) || [];

export const NOTES: Note[] = (contentData.notes as Note[]) || [];


export const QUESTIONS: Question[] = [
  {
    id: 'q-1',
    question: 'آیا یک تیم کوچک واقعاً به ساختار رسمی نیاز دارد؟',
    preview: 'مرز میان هماهنگی طبیعی و نیاز به فرایندهای رسمی کجاست؟',
    elaboration: 'در تیم‌های کوچک و اولیه، هماهنگی به شکل ارگانیک و بی‌واسطه انجام می‌شود. اعضا بر اساس شناخت متقابل و ارتباط کلامی هم‌راستا هستند. اما به محض اضافه شدن لایه‌های ارتباطی و افزایش ابعاد پروژه، نبود فرایند مستند و مرزهای مشخص مسئولیت، انرژی سازمان را صرف اصطکاک‌های هماهنگی می‌کند.',
    relatedArticleSlug: 'building-team-before-structure',
  },
  {
    id: 'q-2',
    question: 'چطور بفهمیم یک تصمیم را بیش از حد به تأخیر انداخته‌ایم؟',
    preview: 'چه زمانی جمع‌آوری اطلاعات بیشتر مفید است و چه زمانی فقط هزینه فرصت ایجاد می‌کند؟',
    elaboration: 'در بسیاری از موقعیت‌های تجاری، انتظار برای داشتن ۱۰۰٪ داده‌ها یعنی از دست رفتن پنجره فرصت. قاعده ۷۰ درصد یادآوری می‌کند که اگر حدود ۷۰٪ اطلاعات لازم را دارید، زمان تصمیم‌گیری و تصحیح مسیر در حین حرکت فرا رسیده است.',
    relatedArticleSlug: 'decision-quality-vs-outcome',
  },
  {
    id: 'q-3',
    question: 'آیا فرهنگ سازمانی را می‌توان آگاهانه طراحی کرد؟',
    preview: 'بخشی از فرهنگ از تصمیم‌های روزمره و رفتار مدیران شکل می‌گیرد؛ آیا می‌توان آن را صرفاً با تدوین ارزش‌ها ساخت؟',
    elaboration: 'فرهنگ سازمانی شعارهای زیبای روی دیوار یا دفترچه راهنما نیست؛ فرهنگ مجموع رفتارهایی است که در لحظات بحران تشویق یا تنبیه می‌شوند. فرهنگ از الگوهای عملی مدیران و نحوه برخورد با اشتباهات سرچشمه می‌گیرد، نه صرفاً بیانیه‌های مکتوب.',
  },
];

export const BOOKS: Book[] = [
  {
    id: 'b-1',
    titleEn: 'Thinking in Systems',
    titleFa: 'تفکر سیستمی',
    author: 'Donella Meadows',
    category: 'مدیریت و تفکر سیستمی',
    notesSummary: 'نگاهی جامع به چگونگی عملکرد سیستم‌های پیچیده، حلقه‌های بازخورد و نقاط اهرمی تغییر.',
    coverBg: 'from-amber-700 via-amber-800 to-amber-950',
  },
  {
    id: 'b-2',
    titleEn: 'The Effective Executive',
    titleFa: 'مدیر اثربخش',
    author: 'Peter Drucker',
    category: 'مدیریت و اثربخشی',
    notesSummary: 'تمرکز بر اثربخشی به جای کارایی صرف، مدیریت زمان، اولویت‌بندی و تصمیم‌گیری درست.',
    coverBg: 'from-blue-900 via-slate-900 to-indigo-950',
  },
  {
    id: 'b-3',
    titleEn: 'Good to Great',
    titleFa: 'از خوب به عالی',
    author: 'Jim Collins',
    category: 'رهبری و رشد کسب‌وکار',
    notesSummary: 'چگونه شرکت‌های عادی به شرکت‌های ماندگار و پایدار تبدیل می‌شوند و نقش رهبری سطح ۵.',
    coverBg: 'from-rose-900 via-red-950 to-neutral-950',
  },
];

export const THOUGHT = {
  quote: 'فهمیدن یک مسئله، گاهی از حل‌کردن عجولانه‌اش مهم‌تر است.',
  note: 'نقل‌قول پیشنهادی پیرامون اهمیت درنگ پیش از اقدام در تصمیم‌گیری‌های حساس.',
};

export const ABOUT = {
  name: 'منان',
  tagline: 'از ساختن کسب‌وکار تا فکرکردن به مدیریت آن.',
  intro: 'منان هستم؛ هم‌بنیان‌گذار پرینترلند و دانشجوی کارشناسی ارشد کارآفرینی در دانشگاه تهران. در اینجا درباره موضوعاتی می‌نویسم که در مسیر کار، مطالعه و تجربه برایم سؤال ایجاد می‌کنند؛ از تصمیم‌گیری و مدیریت تیم تا ساختن و توسعه کسب‌وکار.',
  fullBio: [
    'مسیر کاری من با راه‌اندازی و توسعه «پرینترلند» به عنوان یک استارتاپ حوزه خدمات آنلاین چاپ آغاز شد؛ جایی که از نزدیک با واقعیت‌های عملیات، استخدام، جریان نقدی و پاسخگویی به مشتریان مواجه شدم.',
    'همزمان با فعالیت‌های کارآفرینانه، در دوره کارشناسی ارشد مدیریت کارآفرینی دانشگاه تهران مشغول به تحصیل و پژوهش هستم. این پیوند میان تجربیات میدانی و مبانی نظری دانشگاهی، علاقه مرا به تفکر سیستمی، فلسفه تصمیم‌گیری و نحوه رشد پایدار تیم‌ها برانگیخته است.',
    'این وب‌سایت فضایی شخصی برای نوشتن، تأمل و به اشتراک گذاشتن پرسش‌ها و مشاهداتی است که در این مسیر شکل می‌گیرند.',
  ],
};

export function getFeaturedArticle(): Article {
  return ARTICLES.find((a) => a.featured) || ARTICLES[0];
}

export function getSelectedArticles(): Article[] {
  return ARTICLES.filter((a) => !a.featured);
}
