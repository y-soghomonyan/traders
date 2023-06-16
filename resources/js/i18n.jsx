import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './language/en.json';
import ruTranslation from './language/ru.json';
import amTranslation from './language/am.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  am: {
    translation: amTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'am', // Set the default language
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
  });

export default i18n;