import { writable } from 'svelte/store';
import { translations } from '$lib/locales/locales';
import Cookies from 'js-cookie';

let locale = Cookies.get('preferredLocale') || 'en';

export const translationsStore = writable<Record<string, string> | null>(null);

export async function loadTranslations(): Promise<void> {
  try {
    const translation = translations[locale];
    if (translation) {
      translationsStore.set(translation);
    }
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

// Load translations on startup
loadTranslations();

export function setPreferredLocale(newLocale: string) {
  if (newLocale !== locale) {
    locale = newLocale;
    Cookies.set('preferredLocale', newLocale, { expires: 365 }); // Set the cookie to expire in a year
    loadTranslations(); // Reload translations with the new locale
  }
}

import { get } from 'svelte/store';

export function translate(key: string) {
  const translations = get(translationsStore);

  if (translations && translations[key]) {
    return translations[key];
  }

  return key;
}
