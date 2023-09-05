// Import required Svelte dependencies
import { writable } from 'svelte/store';
import { translations } from '$lib/locales'; 

// Default locale is 'en' if not set
let locale = 'en';

// Initialize translations store
export const translationsStore = writable<Record<string, string> | null>(null);

// Load translations function
export async function loadTranslations(): Promise<void> {
  try {
    // Check if the stored locale is different from the current locale, clear the cached translations
    if (locale !== 'en') {
      console.log(typeof localStorage !=='undefined');
      if (typeof localStorage !=='undefined') {
        localStorage.removeItem('translations');
      }
    }

    // Try to get cached translations from localStorage
    const cachedTranslations = localStorage.getItem('translations');
    if (cachedTranslations) {
      translationsStore.set(JSON.parse(cachedTranslations));
      return;
    }    

    // If translations are not cached, set the translations from the TypeScript file
    const translation = translations[locale];
    if (translation) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('translations', JSON.stringify(translation));
        localStorage.setItem('locale', locale);
        translationsStore.set(translation);
      }
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
