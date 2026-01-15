import { CurrencyRates } from '../types';

const CACHE_KEY = 'currency_rates_cache';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

interface CachedRates {
  data: CurrencyRates;
  timestamp: number;
}

export const getRates = async (): Promise<CurrencyRates> => {
  try {
    // Check if we have cached rates
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsedCache: CachedRates = JSON.parse(cached);
      const now = Date.now();
      
      // If cache is still fresh (less than 1 hour old), use it
      if (now - parsedCache.timestamp < CACHE_DURATION) {
        return parsedCache.data;
      }
    }

    // Fetch fresh rates from API
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/USD',
      { 
        headers: { 
          'Accept': 'application/json',
          'User-Agent': 'TravelPlannerApp/1.0'
        } 
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }

    const data = await response.json();

    const rates: CurrencyRates = {
      USD: 1,
      BRL: data.rates.BRL || 5.0,
      ZAR: data.rates.ZAR || 18.5,
      lastUpdated: Date.now(),
    };

    // Cache the rates
    const cacheData: CachedRates = {
      data: rates,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

    return rates;
  } catch (error) {
    console.error('Error fetching currency rates:', error);

    // Return fallback rates if fetch fails
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsedCache: CachedRates = JSON.parse(cached);
      return parsedCache.data;
    }

    // Default fallback rates (as of January 2026)
    return {
      USD: 1,
      BRL: 5.15,
      ZAR: 18.75,
      lastUpdated: Date.now(),
    };
  }
};

export const clearRatesCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
};
