import Cookies from 'js-cookie';

let locale = Cookies.get('locale') || 'en';
let translations: Record<string, string> | null = null;

export async function loadTranslations(): Promise<void> {
  if (!translations) {
    try {
      if (localStorage.getItem('locale')!=locale) {
        localStorage.removeItem('translations');
      }
      const cachedTranslations = localStorage.getItem('translations');
      if (cachedTranslations) {
        translations = JSON.parse(cachedTranslations);
      } else {
        const response = await fetch(`/${locale}.json`);
        translations = await response.json();
        localStorage.setItem('translations', JSON.stringify(translations));
        localStorage.setItem('locale', locale);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }
}

if (!translations) {
  await loadTranslations();
}

export function translate(key: string): Promise<string> {
  if (translations && translations[key]) {
    return translations[key];
  }
  return key;
}
