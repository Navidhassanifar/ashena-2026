import { useState } from 'react';
import { X, Mail, Phone, Check, Bell, Heart } from 'lucide-react';
import { addWaitlistEntry } from '../lib/waitlist';
import { countries, priceRanges, countryByCode } from '../data/constants';

const HELP_TOPICS = [
  'اپلای و پذیرش',
  'سفارت و ویزا',
  'پیدا کردن کار',
  'مدارک و ترجمه',
  'مشاوره مسیر تحصیلی',
  'جاافتادن و زندگی روزمره',
];

function isHelperRole(role: string) {
  return role === 'helper' || role === 'both';
}

export function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState('');

  // Seeker-specific step 3
  const [willingToPay, setWillingToPay] = useState('');
  const [priceExpectation, setPriceExpectation] = useState('');
  const [countryInterest, setCountryInterest] = useState('');

  // Helper-specific step 3
  const [helperCountry, setHelperCountry] = useState('');
  const [helperTopics, setHelperTopics] = useState<string[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const roleSelected = !!role;
  const contactValid = contact.trim().length > 3;
  const seekerPaySelected = !!willingToPay;
  const helperCountrySelected = !!helperCountry;

  const toggleTopic = (t: string) => {
    setHelperTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const submit = async () => {
    setSubmitting(true);

    const roleLabel = role === 'helper' ? 'کمک‌کننده' : role === 'both' ? 'هر دو' : 'کمک‌گیرنده';
    const payload: Record<string, string> = {
      _subject: `ثبت‌نام جدید لیست انتظار — ${roleLabel}`,
      role: roleLabel,
      contactType: contactType === 'email' ? 'ایمیل' : 'شماره تلفن',
      contact: contact.trim(),
    };

    if (isHelperRole(role)) {
      payload.helperCountry = countryByCode[helperCountry]?.name || helperCountry;
      payload.helperTopics = helperTopics.join('، ') || 'بدون انتخاب';
      addWaitlistEntry({
        role,
        contactType,
        contact: contact.trim(),
        willingToPay: 'helper',
        priceExpectation: helperTopics.join('، '),
        countryInterest: helperCountry,
      });
    } else {
      payload.willingToPay =
        willingToPay === 'yes' ? 'بله' : willingToPay === 'maybe' ? 'شاید' : 'نه';
      payload.priceExpectation = priceExpectation || '—';
      payload.countryInterest = countryByCode[countryInterest]?.name || 'فرقی نمی‌کند';
      addWaitlistEntry({
        role,
        contactType,
        contact: contact.trim(),
        willingToPay,
        priceExpectation: priceExpectation || '',
        countryInterest: countryInterest || '',
      });
    }

    try {
      const res = await fetch('https://formspree.io/f/xnjkgdoj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Network response was not ok');
    } catch {
      // Formspree failed, but entry is saved locally — user still sees success
    }

    setSubmitting(false);
    setSucceeded(true);
  };

  const handleStep2Next = () => {
    setStep(3);
  };

  const totalSteps = 3;
  const progressSteps = [1, 2, 3];

  const RoleCard = ({ id, label, sub }: { id: string; label: string; sub: string }) => (
    <button
      onClick={() => setRole(id)}
      className={`w-full text-right p-4 rounded-2xl border transition-all duration-150 ${
        role === id
          ? 'border-orange-200 bg-orange-50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40'
      }`}
    >
      <div className="text-sm font-semibold text-slate-900">{label}</div>
      <div className="text-xs text-slate-500 mt-1 leading-6">{sub}</div>
    </button>
  );

  const PayCard = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setWillingToPay(id)}
      className={`w-full text-right p-3.5 rounded-2xl border transition-all duration-150 ${
        willingToPay === id
          ? 'border-orange-200 bg-orange-50 font-semibold text-slate-900'
          : 'border-slate-200 bg-white hover:border-orange-200 text-slate-700'
      }`}
    >
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-t-[28px] sm:rounded-[28px] shadow-modal animate-sheet-up overflow-hidden max-h-[90vh] sm:max-h-[92vh] overflow-y-auto bg-[#fffdf9] border border-white/70" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}>

        {/* Header */}
        {!succeeded && (
          <div className="sticky top-0 z-10 border-b border-slate-200/80 bg-[#fffdf9]/95 backdrop-blur-xl px-5 py-4">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <div className="inline-flex items-center gap-2 text-xs text-brand font-semibold mb-1">
                  <Bell size={13} /> لیست انتظار آشنا
                </div>
                <div className="text-sm text-slate-500">سه قدم کوتاه تا ثبت‌نام</div>
              </div>
              <button onClick={onClose} className="btn-ghost p-1.5 rounded-xl">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              {progressSteps.map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s < step ? 'w-6 bg-emerald-500' : s === step ? 'w-10 bg-brand' : 'w-6 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — Role */}
        {!succeeded && step === 1 && (
          <div className="p-5 sm:p-6 pb-8 animate-slide-up">
            <p className="text-xl font-bold text-slate-900 mb-1">دنبال چی هستی؟</p>
            <p className="text-sm text-slate-500 mb-5 leading-7">
              این کمک می‌کنه تجربه‌ها و اطلاع‌رسانی مناسب‌تری برات آماده کنیم.
            </p>
            <div className="space-y-3 mb-6">
              <RoleCard id="seeker" label="می‌خوام کمک بگیرم" sub="دنبال کسی هستم که قبلاً این مسیر را رفته باشد" />
              <RoleCard id="helper" label="می‌خوام کمک کنم" sub="خودم تجربه مهاجرت دارم و دوست دارم راهنمایی کنم" />
              <RoleCard id="both" label="هر دو" sub="هم دنبال کمکم، هم می‌توانم به دیگران کمک کنم" />
            </div>
            <button onClick={() => setStep(2)} disabled={!roleSelected} className="btn-primary w-full">
              ادامه
            </button>
          </div>
        )}

        {/* Step 2 — Contact */}
        {!succeeded && step === 2 && (
          <div className="p-5 sm:p-6 pb-8 animate-slide-up">
            <p className="text-xl font-bold text-slate-900 mb-1">چطور بهت خبر بدیم؟</p>
            <p className="text-sm text-slate-500 mb-5 leading-7">
              وقتی لانچ کردیم یا رزروها باز شد، زودتر از بقیه باخبر شوی.
            </p>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setContactType('email')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl border text-sm transition-all ${
                  contactType === 'email' ? 'border-orange-200 bg-orange-50 font-semibold text-slate-900' : 'border-slate-200 text-slate-500 bg-white'
                }`}
              >
                <Mail size={14} /> ایمیل
              </button>
              <button
                onClick={() => setContactType('phone')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl border text-sm transition-all ${
                  contactType === 'phone' ? 'border-orange-200 bg-orange-50 font-semibold text-slate-900' : 'border-slate-200 text-slate-500 bg-white'
                }`}
              >
                <Phone size={14} /> شماره تلفن
              </button>
            </div>
            <input
              type={contactType === 'email' ? 'email' : 'tel'}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={contactType === 'email' ? 'name@example.com' : '۰۹۱۲۳۴۵۶۷۸۹'}
              className="input mb-5"
              dir="ltr"
            />
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">برگشت</button>
              <button onClick={handleStep2Next} disabled={!contactValid} className="btn-primary flex-1">
                ادامه
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — HELPER: country + topics */}
        {!succeeded && step === 3 && isHelperRole(role) && (
          <div className="p-5 sm:p-6 pb-8 animate-slide-up">
            <div className="inline-flex items-center gap-1.5 text-xs text-brand font-semibold mb-4 px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20">
              <Heart size={12} /> فرم مخصوص کمک‌کننده‌ها
            </div>
            <p className="text-xl font-bold text-slate-900 mb-1">در چه زمینه‌ای می‌تونی کمک کنی؟</p>
            <p className="text-sm text-slate-500 mb-5 leading-7">
              برای کمک‌کننده‌ها سوال پرداخت نمی‌پرسیم. فقط می‌خواهیم بدانیم تجربیاتت در چه مسیر یا موضوعی به درد بقیه می‌خورد.
            </p>

            <div className="mb-5">
              <label className="label">کشور یا مسیر آشناتر برای تو</label>
              <select
                value={helperCountry}
                onChange={(e) => setHelperCountry(e.target.value)}
                className="input"
              >
                <option value="">انتخاب کشور...</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="label">موضوع کمکی اصلی</label>
              <div className="grid grid-cols-2 gap-2">
                {HELP_TOPICS.map((t) => {
                  const active = helperTopics.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleTopic(t)}
                      className={`text-sm py-3 px-3 rounded-2xl border text-right transition-all ${
                        active
                          ? 'border-orange-200 bg-orange-50 font-semibold text-slate-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-orange-200'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1">برگشت</button>
              <button
                onClick={submit}
                disabled={!helperCountrySelected || submitting}
                className="btn-primary flex-1"
              >
                {submitting ? 'در حال ارسال...' : 'ثبت‌نام در لیست انتظار'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — SEEKER: payment */}
        {!succeeded && step === 3 && !isHelperRole(role) && (
          <div className="p-5 sm:p-6 pb-8 animate-slide-up">
            <p className="text-xl font-bold text-slate-900 mb-1">یه سوال مهم</p>
            <p className="text-sm text-slate-500 mb-4 leading-7">
              برای جلسه ۱-به-۱ با کسی که دقیقاً مسیر تو را رفته، حاضر به پرداخت هستی؟
            </p>
            <div className="space-y-2 mb-4">
              <PayCard id="yes" label="بله، حاضر به پرداخت هستم" />
              <PayCard id="maybe" label="شاید — بستگی به قیمت دارد" />
              <PayCard id="no" label="نه، ترجیح می‌دهم رایگان باشد" />
            </div>
            {(willingToPay === 'yes' || willingToPay === 'maybe') && (
              <div className="mb-4">
                <label className="label">چه بازه قیمتی منطقی به نظر می‌رسد؟</label>
                <div className="grid grid-cols-2 gap-2">
                  {priceRanges.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriceExpectation(p)}
                      className={`text-xs p-3 rounded-2xl border transition-all ${
                        priceExpectation === p
                          ? 'border-orange-200 bg-orange-50 font-semibold text-slate-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-orange-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-5">
              <label className="label">اولویت کشور مقصد (اختیاری)</label>
              <select
                value={countryInterest}
                onChange={(e) => setCountryInterest(e.target.value)}
                className="input"
              >
                <option value="">فرقی نمی‌کند</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1">برگشت</button>
              <button
                onClick={submit}
                disabled={!seekerPaySelected || submitting}
                className="btn-primary flex-1"
              >
                {submitting ? 'در حال ارسال...' : 'ثبت‌نام در لیست انتظار'}
              </button>
            </div>
          </div>
        )}

        {/* Success */}
        {succeeded && (
          <div className="p-6 sm:p-7 text-center animate-slide-up">
            <div className="w-14 h-14 rounded-full bg-verified-bg flex items-center justify-center mx-auto mb-4 border border-verified-border">
              <Check size={24} className="text-verified-text" />
            </div>
            <p className="text-xl font-bold text-slate-900 mb-2">ثبت شد!</p>
            <p className="text-sm text-slate-500 leading-7 mb-6">
              اسم تو در لیست انتظار آشنا ثبت شد. به محض آماده‌شدن نسخه بعدی یا بازشدن رزروها، خبرت می‌کنیم.
            </p>
            <button onClick={onClose} className="btn-primary w-full">باشه</button>
          </div>
        )}
      </div>
    </div>
  );
}
