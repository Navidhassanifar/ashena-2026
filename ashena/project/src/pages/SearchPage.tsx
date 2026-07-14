import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { stories } from '../data/stories';
import { countries, visaCategories } from '../data/constants';
import { StoryCard } from '../components/StoryCard';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('all');
  const [visa, setVisa] = useState('all');

  const results = stories.filter((s) => {
    const q = query.trim();
    const textMatch =
      !q ||
      s.title.includes(q) ||
      s.subtitle.includes(q) ||
      s.pitfall.includes(q) ||
      s.outcomeNote.includes(q) ||
      s.author.occupation?.includes(q);
    const countryMatch = country === 'all' || s.countryCode === country;
    const visaMatch = visa === 'all' || s.visaCategory === visa;
    return textMatch && countryMatch && visaMatch;
  });

  const hasFilters = query || country !== 'all' || visa !== 'all';

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <h1 className="text-2xl font-semibold text-slate-900 mb-5">جستجو</h1>

      {/* Search input */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در کیس استوری‌ها..."
          className="input pr-9 pl-9"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="label">کشور</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input"
          >
            <option value="all">همه کشورها</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">نوع ویزا</label>
          <select
            value={visa}
            onChange={(e) => setVisa(e.target.value)}
            className="input"
          >
            <option value="all">همه انواع</option>
            {Object.entries(visaCategories).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-slate-600">
          {results.length} نتیجه
          {query && (
            <span className="font-medium text-slate-900"> برای «{query}»</span>
          )}
        </p>
        {hasFilters && (
          <button
            onClick={() => {
              setQuery('');
              setCountry('all');
              setVisa('all');
            }}
            className="text-xs text-brand hover:text-brand-dark"
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-3xl mb-3">🔍</div>
          <p className="text-md font-medium text-slate-900 mb-1">
            نتیجه‌ای پیدا نشد
          </p>
          <p className="text-sm text-slate-500">
            کلمات دیگه‌ای امتحان کن یا فیلترها رو تغییر بده
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {results.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </main>
  );
}
