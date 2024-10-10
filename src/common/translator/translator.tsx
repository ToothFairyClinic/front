import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "welcome": "Welcome to our website",
        // Додайте інші ключі і переклади
      }
    },
    uk: {
      translation: {
        "welcome": "Ласкаво просимо на наш сайт",
        // Додайте інші ключі і переклади
      }
    }
  },
  lng: 'uk', // Мова за замовчуванням
  fallbackLng: 'uk',
  interpolation: {
    escapeValue: false // React вже екранує, тому це не потрібно
  }
});

export default i18n;
