import { ArrowLeft, Eye, Heart, CheckCircle2 } from 'lucide-react';
import { Link } from '../lib/router';
import type { Story } from '../data/types';
import { visaCategories, outcomes } from '../data/constants';

const outcomeStyles: Record<string, { bg: string; text: string; border: string }> = {
  approved: { bg: '#ecfdf5', text: '#166534', border: '#bbf7d0' },
  'refused-then-approved': { bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
  'in-progress': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
};

export function StoryCard({ story }: { story: Story }) {
  const style = outcomeStyles[story.outcome] || outcomeStyles['in-progress'];

  return (
    <Link to={{ name: 'story', id: story.id }} className="block">
      <article className="card-hover p-5 group h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge-country">
              {story.country.flag} {story.country.name}
            </span>
            <span className="badge-visa">{visaCategories[story.visaCategory]}</span>
            <span
              className="badge border"
              style={{ background: style.bg, color: style.text, borderColor: style.border }}
            >
              {outcomes[story.outcome]}
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl border border-slate-200 bg-white/90 flex items-center justify-center text-slate-400 group-hover:text-brand group-hover:border-orange-200 transition-colors shrink-0">
            <ArrowLeft size={15} />
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2 leading-8 line-clamp-2 text-slate-900 group-hover:text-brand transition-colors">
          {story.title}
        </h3>
        <p className="text-sm mb-4 line-clamp-2 text-slate-500 leading-7">
          {story.subtitle}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-5 rounded-2xl p-3 bg-slate-50 border border-slate-100">
          {[
            { v: story.duration, l: 'مدت کل' },
            { v: story.totalCost, l: 'هزینه تقریبی' },
            { v: story.appointmentWait, l: 'انتظار سفارت' },
          ].map((item) => (
            <div
              key={item.l}
              className="text-center rounded-xl bg-white px-2 py-2.5 border border-slate-100"
            >
              <div className="text-sm font-semibold text-slate-900">{item.v}</div>
              <div className="text-2xs mt-1 text-slate-500">{item.l}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold shrink-0 bg-sky-100 text-sky-700 border border-sky-200">
              {story.author.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-sm font-semibold text-slate-900 truncate">
                  {story.author.name}
                </span>
                {story.isSample && (
                  <span className="text-2xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                    نمونه
                  </span>
                )}
              </div>
              <span className="text-2xs text-slate-500">
                {story.author.currentCity}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-2xs text-slate-500 shrink-0">
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
      </article>
    </Link>
  );
}
