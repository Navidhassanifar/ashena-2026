import { useState } from 'react';
import { Info, X } from 'lucide-react';

export function PreLaunchBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-start gap-3 text-xs">
        <Info size={14} className="text-brand shrink-0 mt-0.5" />
        <p className="flex-1 leading-6 text-amber-900/75">
          آشنا هنوز لانچ نشده. کیس‌استوری‌ها{' '}
          <strong className="text-amber-900">نمونه‌ای از کیفیت</strong> محتوایی
          هستند که در نسخه واقعی از افراد تأییدشده خواهید دید.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="btn-ghost p-1 mt-0.5"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
