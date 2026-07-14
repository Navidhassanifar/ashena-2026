import { useState } from 'react';
import {
  ChevronLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Heart,
  Bell,
  Info,
} from 'lucide-react';
import { Link } from '../lib/router';
import { stories } from '../data/stories';
import { visaCategories, outcomes } from '../data/constants';
import { WaitlistModal } from '../components/WaitlistModal';

export function StoryDetailPage({ storyId }: { storyId: string }) {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const story = stories.find((s) => s.id === storyId);

  if (!story) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-500">کیس استوری پیدا نشد</p>
        <Link to={{ name: 'home' }} className="btn-primary mt-4 inline-flex">
          برگشت
        </Link>
      </main>
    );
  }

  const timelineColor = (type: string) =>
    type === 'success'
      ? 'bg-emerald-500 border-emerald-500'
      : type === 'warning'
      ? 'bg-rose-400 border-rose-400'
      : type === 'danger'
      ? 'bg-red-600 border-red-600'
      : 'bg-slate-300 border-slate-300';

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 pb-24 md:pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
        <Link to={{ name: 'home' }} className="hover:text-slate-900 transition-colors">
          فید
        </Link>
        <ChevronLeft size={12} className="rtl-flip" />
        <span>{story.country.name}</span>
        <ChevronLeft size={12} className="rtl-flip" />
        <span className="text-slate-900 font-semibold">
          {visaCategories[story.visaCategory]}
        </span>
      </div>

      {story.isSample && (
        <div className="legal-note mb-4">
          <Info size={13} className="shrink-0 mt-0.5" />
          <span>
            این یک کیس استوری است تا کیفیت و فرمت محتوای واقعی آشنا را نشان
            دهد؛ نه پروفایل یک فرد واقعی و قابل تماس.
          </span>
        </div>
      )}

      {/* Main card */}
      <div className="card p-6 mb-5 animate-fade-in overflow-hidden relative">
        <div className="absolute top-0 left-0 w-44 h-44 bg-orange-100/60 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge-country">
              {story.country.flag} {story.country.name}
            </span>
            <span className="badge-visa">{visaCategories[story.visaCategory]}</span>
            <span className="badge-verified">{outcomes[story.outcome]}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-[1.6]">
            {story.title}
          </h1>
          <p className="text-base text-slate-600 mb-6 leading-8 max-w-3xl">
            {story.subtitle}
          </p>

          <div className="grid md:grid-cols-[1fr_auto] gap-5 items-start">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'مدت کل فرآیند', value: story.duration },
                { label: 'انتظار سفارت', value: story.appointmentWait },
                { label: 'هزینه کل', value: story.totalCost },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white border border-slate-100 px-4 py-3.5 text-center shadow-sm"
                >
                  <div className="text-lg font-bold text-slate-900">{item.value}</div>
                  <div className="text-2xs text-slate-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sm font-bold text-sky-700 border border-sky-200">
                {story.author.initials}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-semibold text-slate-900">
                    {story.author.name}
                  </span>
                  {story.isSample && (
                    <span className="text-2xs text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                      نمونه
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                  <span>{story.author.occupation}</span>
                  <span>·</span>
                  <span>{story.author.currentCity}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {story.viewCount.toLocaleString('fa-IR')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={12} />
                    {story.helpedCount} کمک
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-[1.7fr_0.9fr] gap-4">
        {/* Left column */}
        <div className="space-y-4">
          {/* Timeline */}
          <section className="card p-5">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              تایم‌لاین دقیق
            </h2>
            <div className="relative pr-5">
              <div className="absolute right-[9px] top-2 bottom-2 w-px bg-slate-200" />
              {story.timeline.map((entry, i) => (
                <div key={i} className="relative mb-5 last:mb-0">
                  <div
                    className={`absolute -right-5 top-1.5 w-3 h-3 rounded-full border-2 ${timelineColor(
                      entry.type
                    )}`}
                  />
                  <div className="text-2xs text-slate-500 mb-1">{entry.date}</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">
                    {entry.title}
                  </div>
                  <div className="text-sm text-slate-600 leading-7">{entry.body}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents */}
          <section className="card p-5">
            <h2 className="text-base font-bold text-slate-900 mb-3">
              مدارکی که واقعاً خواستن
            </h2>
            <ul className="space-y-2.5">
              {story.documents.map((doc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600 leading-7"
                >
                  <CheckCircle2 size={15} className="text-verified-text mt-1 shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </section>

          {/* Pitfall */}
          <section className="card p-5 border-danger-border bg-danger-bg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={15} className="text-danger-text" />
              <h2 className="text-sm font-bold text-danger-text">
                اشتباه رایجی که باید ازش دوری کنی
              </h2>
            </div>
            <p className="text-sm text-danger-text/90 leading-7">{story.pitfall}</p>
          </section>

          {/* Outcome */}
          <section className="card p-5 border-verified-border bg-verified-bg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={15} className="text-verified-text" />
              <h2 className="text-sm font-bold text-verified-text">نتیجه نهایی</h2>
            </div>
            <p className="text-sm text-verified-text/90 leading-7">
              {story.outcomeNote}
            </p>
          </section>
        </div>

        {/* Right column - Author sidebar */}
        <div className="space-y-4">
          <div className="card p-5 lg:sticky lg:top-24">
            <div className="text-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-base font-bold text-sky-700 mx-auto mb-3 border border-sky-200">
                {story.author.initials}
              </div>
              <div className="text-base font-bold text-slate-900">
                {story.author.name}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {story.author.currentCity}
              </div>
            </div>

            {story.author.helpTopics && story.author.helpTopics.length > 0 && (
              <div className="mb-4">
                <div className="section-eyebrow mb-2">می‌تواند کمک کند با</div>
                <div className="flex flex-wrap gap-1.5">
                  {story.author.helpTopics.map((topic) => (
                    <span
                      key={topic}
                      className="badge bg-slate-100 text-slate-600 border border-slate-200 text-2xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="relative mb-4 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Bell size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1 leading-7">
                    بعد از لانچ کامل آشنا می‌توانی برای مشاوره با این فرد درخواست
                    بدهی
                  </p>
                  <p className="text-xs text-slate-600 leading-6">
                    جلسه‌ای خصوصی و کاربردی بر پایه تجربه واقعی، نه اطلاعات کلی و
                    تکراری.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowWaitlist(true)}
              className="btn-primary w-full text-center gap-2"
            >
              <Bell size={16} />
              وقتی رزرو باز شد خبرم کن
            </button>

            <div className="legal-note mt-3">
              <Info size={12} className="shrink-0 mt-0.5" />
              <span>
                این پروفایل نمونه است؛ هنوز امکان رزرو جلسه واقعی وجود ندارد.
              </span>
            </div>
          </div>

          {/* Languages */}
          <div className="card p-4">
            <div className="section-eyebrow mb-3">زبان‌ها</div>
            <div className="flex flex-wrap gap-1.5">
              {story.author.languages.map((lang) => (
                <span
                  key={lang}
                  className="badge bg-slate-100 text-slate-600 border border-slate-200"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-16 inset-x-0 z-30 px-4 pb-2">
        <button
          onClick={() => setShowWaitlist(true)}
          className="btn-primary w-full shadow-card"
        >
          <Bell size={16} />
          وقتی رزرو باز شد خبرم کن
        </button>
      </div>

      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
    </main>
  );
}
