import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ua from './ua.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en, ua,
    },
    lng: 'ua',
    fallbackLng: 'ua',

    interpolation: {
      escapeValue: false,
    },
  });
