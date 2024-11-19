import en from '@/locale/en'
import vn from '@/locale/vn'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: document.cookie.split('=')[1],
  fallbackLocale: 'en',
  messages: {
    en,
    vn,
  },
})
