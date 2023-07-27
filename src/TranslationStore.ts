let locale = 'en'; // Default locale is 'en' if not set
let translations: Record<string, string> | null = null;

export async function loadTranslations(): Promise<void> {
  if (!translations) {
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
          translations = JSON.parse(cachedTranslations);
        }
      }

      // If translations are not cached, fetch them from the JSON file
      if (!translations) {
        const response = await fetch(`http://localhost:5173/${locale}.json`);
        translations = await response.json();

        // Store the translations in localStorage
        if (isLocalStorageAvailable) {
          localStorage.setItem('translations', JSON.stringify(translations));
          localStorage.setItem('locale', locale);
        }
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }
}

// Load translations on startup
loadTranslations();

export function translate(key: string): string {
  if (translations && translations[key]) {
    return translations[key];
  }
  return key;
}
