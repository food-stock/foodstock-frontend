// Import required Svelte dependencies
import { writable } from 'svelte/store';

// Default locale is 'en' if not set
let locale = 'en';

// Initialize translations store
export const translationsStore = writable<Record<string, string> | null>(null);

// Load translations function
export async function loadTranslations(): Promise<void> {
  try {
    // Check if localStorage is available and supported
    const isLocalStorageAvailable = typeof localStorage !== 'undefined';

    // Get the stored locale from localStorage
    if (isLocalStorageAvailable) {
      const storedLocale = localStorage.getItem('locale');
      if (storedLocale) {
        locale = storedLocale;
      }
    }

    // If the stored locale is different from the current locale, clear the cached translations
    if (isLocalStorageAvailable && localStorage.getItem('locale') !== locale) {
      localStorage.removeItem('translations');
    }

    // Try to get cached translations from localStorage
    if (isLocalStorageAvailable) {
      const cachedTranslations = localStorage.getItem('translations');
      if (cachedTranslations) {
        translationsStore.set(JSON.parse(cachedTranslations));
        return;
      }
    }

    // If translations are not cached, fetch them from the JSON file
    const response = await fetch(`http://localhost:5173/${locale}.json`);
    if (response.ok) {
      const translations = await response.json();

      // Store the translations in localStorage
      if (isLocalStorageAvailable) {
        localStorage.setItem('translations', JSON.stringify(translations));
        localStorage.setItem('locale', locale);
      }

      translationsStore.set(translations);
    }
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

// Load translations on startup
loadTranslations();

import { get } from 'svelte/store'; 
export function translate(key: string) {
  const translations = get(translationsStore);

  if (translations && translations[key]) {
    return translations[key];
  }

  return key;
}