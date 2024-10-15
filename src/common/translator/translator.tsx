import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Підтвердити": "Submit",
          "Коментар": "Comment",
          "Введіть ваш відгук": "Enter your review",
          "Телефон": "Phone",
          "Введіть ваше телефон": "Enter your phone number",
          "Ім'я": "Name",
          "Введіть ваше ім'я": "Enter your name",
          "Упс, спалася помилка": "Oops, an error occurred",
          "Спробуйте трохи пізніше": "Try again later",
          "Нажаль тут пусто": "Unfortunately, it's empty here",
          "Відгук": "Review",
          "Відгуки": "Reviews",
          "Наші попередні відгуки доступні": "Our previous reviews are available",
          "Тут": "here",
          "Прайс лист": "Price list",
          "Роботи": "Portfolio ",
          "Контакти": "Contacts ",
          "Харченко Марина Василівна": "Maryna Vasylivna Kharchenko",
        },
      },
      uk: {
        translation: {
          "Підтвердити": "Підтвердити",
          "Коментар": "Коментар",
          "Введіть ваш відгук": "Введіть ваш відгук",
          "Телефон": "Телефон",
          "Введіть ваше телефон": "Введіть ваше телефон",
          "Ім'я": "Ім'я",
          "Введіть ваше ім'я": "Введіть ваше ім'я",
          "Упс, спалася помилка": "Упс, спалася помилка",
          "Спробуйте трохи пізніше": "Спробуйте трохи пізніше",
          "Нажаль тут пусто": "Нажаль тут пусто",
          "Відгук": "Відгук",
          "Відгуки": "Відгуки",
          "Наші попередні відгуки доступні": "Наші попередні відгуки доступні",
          "Тут": "Тут",
          "Прайс лист": "Прайс лист",
          "Роботи": "Роботи",
          "Контакти": "Контакти ",
          "Харченко Марина Василівна": "Maryna Vasylivna Kharchenko",
        },
      },
    },
    lng: localStorage.getItem('language') || 'uk', // Використовуйте мову з localStorage
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React вже екранує, тому це не потрібно
    },
  });

export default i18n;
