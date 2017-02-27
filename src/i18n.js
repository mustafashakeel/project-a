import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './translations'


i18n
  // .use(XHR)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: translations,

    // have a common namespace used around the full app
    ns: ['application'],
    // defaultNS: 'common',

    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    }
  });


export default i18n;