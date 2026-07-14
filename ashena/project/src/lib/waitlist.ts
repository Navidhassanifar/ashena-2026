import type { WaitlistEntry } from '../data/types';

const STORAGE_KEY = 'ashena_waitlist_entries';

export function getWaitlistEntries(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addWaitlistEntry(
  data: Omit<WaitlistEntry, 'id' | 'createdAt'>
): WaitlistEntry {
  const entry: WaitlistEntry = {
    ...data,
    id: `wl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const entries = getWaitlistEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entry;
}

export function clearWaitlistEntries() {
  localStorage.removeItem(STORAGE_KEY);
}
