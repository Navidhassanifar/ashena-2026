import { Filter } from 'lucide-react';
import { countries, visaCategories, visaFilterKeys } from '../data/constants';

export function FilterBar({
  visaFilter,
  countryFilter,
  onFilterChange,
}: {
  visaFilter: string;
  countryFilter: string;
  onFilterChange: (country: string, visa: string) => void;
}) {
  const chipClass =
    'shrink-0 text-xs px-3 py-2 rounded-full border transition-all duration-150 cursor-pointer';

  return (
    <div className="sticky top-16 z-40 border-b border-slate-200/80 bg-surface-0/88 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-2">
          <div className="shrink-0 inline-flex items-center gap-1.5 text-xs text-slate-500 pl-1">
            <Filter size={14} />
            فیلتر ویزا
          </div>
          {visaFilterKeys.map((key) => {
            const active = visaFilter === key;
            return (
              <button
                key={key}
                onClick={() => onFilterChange(countryFilter, key)}
                className={`${chipClass} ${
                  active
                    ? 'text-white border-transparent shadow-sm'
                    : 'border-slate-200 bg-white/85 text-slate-600 hover:border-orange-200 hover:text-slate-900'
                }`}
                style={
                  active
                    ? { background: 'linear-gradient(135deg, #ff7b36 0%, #e8460a 100%)' }
                    : undefined
                }
              >
                {key === 'all' ? 'همه' : visaCategories[key]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <div className="shrink-0 text-xs text-slate-500 pl-1">کشور</div>
          <button
            onClick={() => onFilterChange('all', visaFilter)}
            className={`${chipClass} ${
              countryFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'border-slate-200 bg-white/85 text-slate-600 hover:border-sky-200 hover:text-slate-900'
            }`}
          >
            همه کشورها
          </button>
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => onFilterChange(c.code, visaFilter)}
              className={`${chipClass} flex items-center gap-1.5 ${
                countryFilter === c.code
                  ? 'bg-sky-50 text-sky-800 border-sky-200'
                  : 'border-slate-200 bg-white/85 text-slate-600 hover:border-sky-200 hover:text-slate-900'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
