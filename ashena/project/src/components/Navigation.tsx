import { Home, Search, Clock } from 'lucide-react';
import { Link, type Route } from '../lib/router';

export function Header({ route }: { route: Route }) {
  const navActive = (active: boolean) =>
    `px-3 py-2 rounded-xl text-sm transition-all ${
      active
        ? 'bg-orange-50 text-brand font-semibold border border-orange-100'
        : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-surface-0/85 backdrop-blur-xl safe-top">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to={{ name: 'home' }} className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-orange-400 to-brand shadow-brand">
            <span className="font-semibold text-base leading-none">آ</span>
          </div>
          <div className="font-bold text-base text-slate-900 tracking-tight">
            آشنا
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-white/70 p-1 shadow-sm">
          <Link to={{ name: 'home' }} className={navActive(route.name === 'home')}>
            فید کیس‌استوری‌ها
          </Link>
          <Link to={{ name: 'search' }} className={navActive(route.name === 'search')}>
            جستجو
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={{ name: 'search' }}
            className="btn-ghost p-2.5 rounded-xl border border-slate-200/80 bg-white/65 md:hidden"
          >
            <Search size={17} />
          </Link>
          <Link
            to={{ name: 'waitlist-results' }}
            className="btn-ghost p-2.5 rounded-xl border border-slate-200/80 bg-white/65 hidden md:inline-flex"
          >
            <Clock size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function BottomNav({ route }: { route: Route }) {
  const items = [
    { name: 'home' as const, label: 'فید', icon: Home },
    { name: 'search' as const, label: 'جستجو', icon: Search },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-slate-200/80 bg-surface-0/90 backdrop-blur-xl safe-bottom">
      <div className="max-w-md mx-auto px-2 h-16 flex items-center justify-around">
        {items.map((item) => {
          const active = route.name === item.name;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={{ name: item.name }}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all ${
                active ? 'text-brand' : 'text-slate-400'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[11px] ${active ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
