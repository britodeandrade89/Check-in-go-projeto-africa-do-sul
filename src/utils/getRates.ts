import { CurrencyRates } from '../types';
import { CACHE_KEY_RATES, ONE_HOUR_MS, API_URL, FETCH_TIMEOUT_MS } from '../constants';

const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
};

const readCache = (): CurrencyRates | null => {
  if (!isLocalStorageAvailable()) return null;
  const raw = localStorage.getItem(CACHE_KEY_RATES);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CurrencyRates;
    if (typeof parsed.lastUpdated === 'number') return parsed;
  } catch (e) {
    console.warn('Failed to parse cached currency rates', e);
  }
  return null;
};

const writeCache = (rates: CurrencyRates) => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(CACHE_KEY_RATES, JSON.stringify(rates));
  } catch (e) {
    console.warn('Failed to write currency rates to cache', e);
  }
};

// Fetch with timeout using AbortController
const fetchWithTimeout = async (url: string, timeout = FETCH_TIMEOUT_MS) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export const getRates = async (): Promise<CurrencyRates> => {
  // 1. Try to get from Cache
  const cached = readCache();
  if (cached) {
    const now = Date.now();
    // If cache is fresh (less than 1 hour old), use it
    if (now - cached.lastUpdated < ONE_HOUR_MS) {
      // eslint-disable-next-line no-console
      console.debug('Using fresh cached rates');
      return cached;
    }
  }

  // 2. Fetch from API with timeout
  try {
    const response = await fetchWithTimeout(API_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();

    // Defensive checks
    const brl = data?.rates?.BRL;
    const zar = data?.rates?.ZAR;

    const rates: CurrencyRates = {
      USD: 1,
      BRL: typeof brl === 'number' ? brl : 5.0, // safe fallback
      ZAR: typeof zar === 'number' ? zar : 18.0,
      lastUpdated: Date.now(),
    };

    // Save to cache
    writeCache(rates);
    return rates;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to fetch rates, checking for stale cache', error);

    // 3. Fallback: Use stale cache if available
    if (cached) {
      return cached;
    }

    // 4. Absolute Fallback: Hardcoded approximations
    return {
      USD: 1,
      BRL: 5.80,
      ZAR: 18.50,
      lastUpdated: Date.now(),
    };
  }
};
