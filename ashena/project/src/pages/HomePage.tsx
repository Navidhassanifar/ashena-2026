import { useState, useRef } from 'react';
import {
  Bell,
  Search,
  Users,
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  CheckCircle2,
  PenLine,
  Coins,
} from 'lucide-react';
import { Link } from '../lib/router';
import { stories } from '../data/stories';
import { StoryCard } from '../components/StoryCard';
import { FilterBar } from '../components/FilterBar';
import { WaitlistModal } from '../components/WaitlistModal';

export function HomePage() {
  const [visaFilter, setVisaFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [howItWorksTab, setHowItWorksTab] = useState<'seeker' | 'helper'>('seeker');
  const feedRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);

  const filtered = stories.filter((s) => {
    const countryMatch = countryFilter === 'all' || s.countryCode === countryFilter;
    const visaMatch = visaFilter === 'all' || s.visaCategory === visaFilter;
    return countryMatch && visaMatch;
  });

  const seekerSteps = [
    {
      icon: <Search size={22} />,
      step: '۱',
      title: 'فرد مناسب را پیدا کن',
      body: 'بر اساس کشور مقصد، نوع مهاجرت و شرایطت، افرادی را پیدا کن که تجربه‌ای مشابه تو داشته‌اند.',
    },
    {
      icon: <Users size={22} />,
      step: '۲',
      title: 'تجربه‌های واقعی را ببین',
      body: 'تجربه‌ها، نکات مهم و اشتباهات رایج را از زبان کسانی بخوان که این مسیر را پشت سر گذاشته‌اند.',
    },
    {
      icon: <MessageCircle size={22} />,
      step: '۳',
      title: 'مستقیم با او صحبت کن',
      body: 'اگر نیاز به راهنمایی داری، می‌توانی مستقیماً با کسی که همین مسیر را رفته در ارتباط باشی.',
    },
  ];

  const helperSteps = [
    {
      icon: <PenLine size={22} />,
      step: '۱',
      title: 'تجربه‌ات رو ثبت کن',
      body: 'مسیری که رفتی، مدارکی که جمع کردی، اشتباهاتی که کردی — برای کسی که همین مسیر را پیش رو دارد، راهنمایی با ارزش است.',
    },
    {
      icon: <Users size={22} />,
      step: '۲',
      title: 'به کسی که به کمکت نیاز داره وصل شو',
      body: 'آشنا کسانی را به تو متصل می‌کند که در همان مسیری هستند که تو پیش از این طی کرده‌ای تا به آن‌ها کمک کنی.',
    },
    {
      icon: <Coins size={22} />,
      step: '۳',
      title: 'برای وقت و تجربه‌ات پاداش بگیر',
      body: 'هر بار که راهنمای یک متقاضی می‌شوی، بابت زمان و کمکت پاداش دریافت می‌کنی.',
    },
  ];

  const steps = howItWorksTab === 'seeker' ? seekerSteps : helperSteps;

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Flight ticker */}
      <div className="relative overflow-hidden border-b border-slate-200/80 bg-white/70">
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none bg-gradient-to-l from-surface-0 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none bg-gradient-to-r from-surface-0 to-transparent" />
        <div className="flight-track py-3 text-xs font-medium text-brand/85 tracking-[0.08em]">
          <span className="mx-3 text-base">🛫</span>
          <span>هر مسیر ناآشنا، با یک آشنا ساده‌تر می‌شه</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-10 sm:py-16 lg:py-24">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-orange-200/35 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-orange-200 bg-white/80 text-sm text-amber-800 shadow-sm">
              <Bell size={14} className="text-brand" />
              پیش‌لانچ — لیست انتظار باز است
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.35] text-slate-900 mb-4 text-balance">
              در مسیر مهاجرت
              <span className="bg-gradient-to-l from-orange-600 to-amber-500 bg-clip-text text-transparent">
                {' '}
                از تجربه حقیقی مهاجران{' '}
              </span>
              کمک بگیر
            </h1>
            <p className="text-lg text-slate-600 leading-8 mb-4 max-w-2xl">
              آشنا تو را به ایرانی‌هایی متصل می‌کند که چالش‌های مهاجرت را تجربه
              کرده‌اند؛ تا قبل از تصمیم‌گیری، پاسخ سوال‌هایت را از تجربه واقعی
              آن‌ها بگیری.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-8">
              <button
                onClick={() => setShowWaitlist(true)}
                className="btn-primary px-8 w-full sm:w-auto"
              >
                به لیست انتظار بپیوندید
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="btn-secondary px-8 w-full sm:w-auto"
              >
                چطور کار می‌کنه؟
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 max-w-2xl">
              {[
                { n: `${stories.length}+`, l: 'کیس استوری' },
                { n: '۱۹', l: 'کشور پوشش داده شده' },
                { n: 'رایگان', l: 'عضویت در لیست' },
              ].map((stat) => (
                <div key={stat.l} className="card p-4">
                  <div className="text-2xl font-bold text-brand mb-1">{stat.n}</div>
                  <div className="text-sm text-slate-500">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample profile card */}
          <div className="card p-5 sm:p-6 lg:mr-auto max-w-md w-full">
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 via-white to-sky-50 border border-orange-100 p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <span className="badge-brand">نمونه پروفایل</span>
                <span className="text-xs text-slate-500">قابل توسعه در نسخه اصلی</span>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  MS
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    مینا · آلمان
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    دانشجوی سابق، حالا Product Designer در برلین
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-white/90 px-3 py-2 border border-slate-100">
                  <span className="text-slate-500">مسیر مهاجرت</span>
                  <span className="font-semibold text-slate-900">
                    ویزای تحصیلی ← پیدا کردن کار ← اقامت کاری
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/90 px-3 py-2 border border-slate-100">
                  <span className="text-slate-500">موضوعات این کیس</span>
                  <span className="font-semibold text-slate-900">
                    اپلای • سفارت • پیدا کردن کار • مدارک • زندگی در آلمان
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/90 px-3 py-2 border border-slate-100">
                  <span className="text-slate-500">آنچه یاد می‌گیری</span>
                  <span className="font-semibold text-slate-900">
                    مراحل، هزینه‌ها، مدارک، اشتباهات و تجربه واقعی هر مرحله
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl bg-emerald-50 px-4 py-3 border border-emerald-100">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-emerald-900">
                    ساختاری منسجم و قابل جستجو
                  </div>
                  <div className="text-xs text-emerald-800/75 leading-6 mt-1">
                    همه‌چیز دسته‌بندی‌شده تا کسی را پیدا کنی که جای تو بوده: همان
                    کشور، همان نوع ویزا، حتی همان شغل یا رشته‌ی تحصیلی.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-sky-50 px-4 py-3 border border-sky-100">
                <MessageCircle size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-sky-900">
                    ارتباط مستقیم با مهاجران
                  </div>
                  <div className="text-xs text-sky-800/75 leading-6 mt-1">
                    دغدغه‌ات را با او در میان بگذار، سؤالت را بپرس، و از کسی که همان
                    مسیر را رفته، کمک بگیر.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section ref={howItWorksRef} className="px-4 py-10 sm:py-20 lg:py-24 min-h-[80vh] flex flex-col justify-center" style={{ scrollMarginTop: '4rem' }}>
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-center section-eyebrow mb-3">فرآیند کار</p>
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
            سه قدم تا تصمیمی مطمئن‌تر
          </h2>
          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/60">
              <button
                onClick={() => setHowItWorksTab('seeker')}
                className={`px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  howItWorksTab === 'seeker'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                میخوام کمک بگیرم
              </button>
              <button
                onClick={() => setHowItWorksTab('helper')}
                className={`px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  howItWorksTab === 'helper'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                میخوام کمک کنم
              </button>
            </div>
          </div>
          {/* Mobile: staggered wave, Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-10">
            {steps.map((s) => (
              <div key={s.step} className="card p-5 sm:p-6 text-right relative overflow-hidden">
                <div className="absolute left-0 top-0 h-24 w-24 rounded-full bg-orange-100/60 blur-2xl pointer-events-none" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-orange-50 text-brand border border-orange-100">
                    {s.icon}
                  </div>
                  <div className="text-2xs mb-1 text-slate-400">مرحله {s.step}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile staggered layout */}
          <div className="md:hidden mb-10 relative">
            <div className="grid grid-cols-2 gap-3">
              {/* Card 1 — top right */}
              <div className="card p-4 text-right relative overflow-hidden mt-0">
                <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-orange-100/60 blur-xl pointer-events-none" />
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-orange-50 text-brand border border-orange-100">
                    {steps[0].icon}
                  </div>
                  <div className="text-[10px] mb-1 text-slate-400">مرحله {steps[0].step}</div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">{steps[0].title}</h3>
                  <p className="text-xs leading-6 text-slate-600">{steps[0].body}</p>
                </div>
              </div>
              {/* Card 2 — top left, pushed down */}
              <div className="card p-4 text-right relative overflow-hidden mt-6">
                <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-orange-100/60 blur-xl pointer-events-none" />
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-orange-50 text-brand border border-orange-100">
                    {steps[1].icon}
                  </div>
                  <div className="text-[10px] mb-1 text-slate-400">مرحله {steps[1].step}</div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">{steps[1].title}</h3>
                  <p className="text-xs leading-6 text-slate-600">{steps[1].body}</p>
                </div>
              </div>
            </div>
            {/* Card 3 — centered below */}
            <div className="card p-4 text-right relative overflow-hidden mt-3 mx-auto w-[calc(50%-6px)]">
              <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-orange-100/60 blur-xl pointer-events-none" />
              <div className="relative">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-orange-50 text-brand border border-orange-100">
                  {steps[2].icon}
                </div>
                <div className="text-[10px] mb-1 text-slate-400">مرحله {steps[2].step}</div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{steps[2].title}</h3>
                <p className="text-xs leading-6 text-slate-600">{steps[2].body}</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={scrollToFeed}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-orange-700 transition-colors"
            >
              کیس استوری‌های نمونه را ببین
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section ref={feedRef} className="border-y border-slate-200/80 bg-white/45">
        <FilterBar
          visaFilter={visaFilter}
          countryFilter={countryFilter}
          onFilterChange={(c, v) => {
            setCountryFilter(c);
            setVisaFilter(v);
          }}
        />
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">کیس استوری‌ها</h2>
              <p className="text-sm mt-1 text-slate-500">
                {filtered.length} نمونه تجربه مهاجرت
              </p>
            </div>
            <Link
              to={{ name: 'search' }}
              className="text-sm text-brand hover:text-orange-700 font-semibold flex items-center gap-1"
            >
              جستجوی پیشرفته <ArrowLeft size={14} />
            </Link>
          </div>

          <div className="rounded-2xl px-4 py-3.5 mb-5 flex items-start gap-3 border border-orange-100 bg-gradient-to-l from-orange-50 to-amber-50">
            <span className="text-lg shrink-0">👇</span>
            <p className="text-sm leading-7 text-amber-900/80">
              روی هر کارت کلیک کن تا تایم‌لاین کامل، مدارک، هزینه‌ها و امکان رزرو
              جلسه بعد از لانچ را ببینی.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-lg font-semibold mb-1 text-slate-900">
                کیس استوری‌ای پیدا نشد
              </p>
              <p className="text-sm text-slate-500">
                فیلترها را تغییر بده یا کشور دیگری را امتحان کن.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              {filtered.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[36rem] h-[36rem] bg-orange-100/35 blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto card p-8 sm:p-10">
          <p className="section-eyebrow mb-3">دسترسی زودتر</p>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">هنوز سوال داری؟</h2>
          <p className="text-base leading-8 mb-8 text-slate-600">
            در لیست انتظار ثبت‌نام کن تا وقتی رزرو جلسه‌ها، پروفایل‌های واقعی و
            دسترسی اولیه باز شد، جزو اولین نفرها باشی.
          </p>
          <button
            onClick={() => setShowWaitlist(true)}
            className="btn-primary text-sm px-8"
          >
            به لیست انتظار بپیوندید
          </button>
          <p className="text-xs mt-4 text-slate-400">
            رایگان — بدون تعهد و فقط برای اطلاع‌رسانی
          </p>
        </div>
      </section>

      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
    </>
  );
}


