import { useState, useEffect } from 'react';
import { Trash2, Users, Mail, Phone } from 'lucide-react';
import { getWaitlistEntries, clearWaitlistEntries } from '../lib/waitlist';
import type { WaitlistEntry } from '../data/types';
import { countryByCode } from '../data/constants';

const roleLabels: Record<string, string> = {
  seeker: 'دنبال کمک',
  helper: 'می‌خواد کمک کنه',
  both: 'هر دو',
};

const payLabels: Record<string, string> = {
  yes: 'بله',
  maybe: 'شاید',
  no: 'نه',
  '': '—',
};

export function WaitlistResultsPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);

  useEffect(() => {
    setEntries(getWaitlistEntries());
  }, []);

  const total = entries.length;
  const yesCount = entries.filter((e) => e.willingToPay === 'yes').length;
  const maybeCount = entries.filter((e) => e.willingToPay === 'maybe').length;
  const seekerCount = entries.filter(
    (e) => e.role === 'seeker' || e.role === 'both'
  ).length;
  const helperCount = entries.filter(
    (e) => e.role === 'helper' || e.role === 'both'
  ).length;
  const willingPercent =
    total > 0 ? Math.round(((yesCount + maybeCount) / total) * 100) : 0;

  const handleClear = () => {
    if (
      confirm('مطمئنی می‌خوای همه داده‌ها پاک بشن؟ این کار قابل برگشت نیست.')
    ) {
      clearWaitlistEntries();
      setEntries([]);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">
            نتایج لیست انتظار
          </h1>
          <p className="text-sm text-slate-500">
            این صفحه فقط برای بنیان‌گذار است — داده‌های واقعی ثبت‌نام‌ها
          </p>
        </div>
        {total > 0 && (
          <button
            onClick={handleClear}
            className="btn-ghost flex items-center gap-1.5 text-red-600"
          >
            <Trash2 size={14} /> پاک کردن همه
          </button>
        )}
      </div>

      {total === 0 ? (
        <div className="card p-12 text-center">
          <Users size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-md font-medium text-slate-900 mb-1">
            هنوز کسی ثبت‌نام نکرده
          </p>
          <p className="text-sm text-slate-500">
            وقتی کسی فرم waitlist رو پر کنه، اینجا نشون داده می‌شه
          </p>
        </div>
      ) : (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="card p-4 text-center">
              <div className="text-2xl font-semibold text-slate-900">{total}</div>
              <div className="text-2xs text-slate-500 mt-1">کل ثبت‌نام‌ها</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-semibold text-verified-text">
                {willingPercent}٪
              </div>
              <div className="text-2xs text-slate-500 mt-1">
                حاضر به پرداخت (بله+شاید)
              </div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-semibold text-slate-900">
                {seekerCount}
              </div>
              <div className="text-2xs text-slate-500 mt-1">دنبال کمک</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-semibold text-slate-900">
                {helperCount}
              </div>
              <div className="text-2xs text-slate-500 mt-1">می‌خوان کمک کنن</div>
            </div>
          </div>

          {/* Summary */}
          <div className="card p-4 mb-6 flex items-center gap-3">
            <div className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900 font-medium">{yesCount}</strong>{' '}
              نفر «بله» گفتن،{' '}
              <strong className="text-slate-900 font-medium">{maybeCount}</strong>{' '}
              نفر «شاید» — این سیگنال اولیه validation محصوله.
            </div>
          </div>

          {/* Table - card layout on mobile, table on desktop */}
          <div className="card overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200/60 bg-surface-1">
                    <th className="text-right px-4 py-2.5 text-2xs font-medium text-slate-500">
                      تماس
                    </th>
                    <th className="text-right px-4 py-2.5 text-2xs font-medium text-slate-500">
                      نقش
                    </th>
                    <th className="text-right px-4 py-2.5 text-2xs font-medium text-slate-500">
                      پرداخت
                    </th>
                    <th className="text-right px-4 py-2.5 text-2xs font-medium text-slate-500">
                      بازه قیمت
                    </th>
                    <th className="text-right px-4 py-2.5 text-2xs font-medium text-slate-500">
                      کشور
                    </th>
                    <th className="text-right px-4 py-2.5 text-2xs font-medium text-slate-500">
                      تاریخ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries
                    .slice()
                    .reverse()
                    .map((e) => (
                      <tr
                        key={e.id}
                        className="border-b border-slate-200/40 last:border-0"
                      >
                        <td className="px-4 py-2.5">
                          <div
                            className="flex items-center gap-1.5 text-xs text-slate-900"
                            dir="ltr"
                          >
                            {e.contactType === 'email' ? (
                              <Mail size={11} className="text-slate-400" />
                            ) : (
                              <Phone size={11} className="text-slate-400" />
                            )}
                            {e.contact}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">
                          {roleLabels[e.role] || e.role}
                        </td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`text-2xs font-medium px-2 py-0.5 rounded-full ${
                              e.willingToPay === 'yes'
                                ? 'bg-verified-bg text-verified-text'
                                : e.willingToPay === 'maybe'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-surface-1 text-slate-500'
                            }`}
                          >
                            {payLabels[e.willingToPay] || '—'}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">
                          {e.priceExpectation || '—'}
                        </td>
                        <td className="px-4 py-2.5 text-xs text-slate-600">
                          {e.countryInterest
                            ? `${countryByCode[e.countryInterest]?.flag ?? ''} ${
                                countryByCode[e.countryInterest]?.name ??
                                e.countryInterest
                              }`
                            : '—'}
                        </td>
                        <td
                          className="px-4 py-2.5 text-2xs text-slate-500"
                          dir="ltr"
                        >
                          {new Date(e.createdAt).toLocaleDateString('fa-IR')}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-slate-200/40">
              {entries
                .slice()
                .reverse()
                .map((e) => (
                  <div key={e.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="flex items-center gap-1.5 text-sm text-slate-900"
                        dir="ltr"
                      >
                        {e.contactType === 'email' ? (
                          <Mail size={12} className="text-slate-400" />
                        ) : (
                          <Phone size={12} className="text-slate-400" />
                        )}
                        {e.contact}
                      </div>
                      <span
                        className={`text-2xs font-medium px-2 py-0.5 rounded-full ${
                          e.willingToPay === 'yes'
                            ? 'bg-verified-bg text-verified-text'
                            : e.willingToPay === 'maybe'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-surface-1 text-slate-500'
                        }`}
                      >
                        {payLabels[e.willingToPay] || '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{roleLabels[e.role] || e.role}</span>
                      {e.priceExpectation && (
                        <>
                          <span>·</span>
                          <span>{e.priceExpectation}</span>
                        </>
                      )}
                      {e.countryInterest && (
                        <>
                          <span>·</span>
                          <span>
                            {countryByCode[e.countryInterest]?.flag ?? ''}{' '}
                            {countryByCode[e.countryInterest]?.name ??
                              e.countryInterest}
                          </span>
                        </>
                      )}
                      <span>·</span>
                      <span dir="ltr">
                        {new Date(e.createdAt).toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
