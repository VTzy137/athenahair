import ar from '@/locales/ar.json';
import bg from '@/locales/bg.json';
import bn from '@/locales/bn.json';
import cs from '@/locales/cs.json';
import da from '@/locales/da.json';
import de from '@/locales/de.json';
import el from '@/locales/el.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import et from '@/locales/et.json';
import fi from '@/locales/fi.json';
import fr from '@/locales/fr.json';
import he from '@/locales/he.json';
import hi from '@/locales/hi.json';
import hr from '@/locales/hr.json';
import hu from '@/locales/hu.json';
import id from '@/locales/id.json';
import it from '@/locales/it.json';
import ja from '@/locales/ja.json';
import ko from '@/locales/ko.json';
import lt from '@/locales/lt.json';
import lv from '@/locales/lv.json';
import nl from '@/locales/nl.json';
import no from '@/locales/no.json';
import pl from '@/locales/pl.json';
import pt from '@/locales/pt.json';
import ro from '@/locales/ro.json';
import ru from '@/locales/ru.json';
import sk from '@/locales/sk.json';
import sl from '@/locales/sl.json';
import sr from '@/locales/sr.json';
import sv from '@/locales/sv.json';
import sw from '@/locales/sw.json';
import th from '@/locales/th.json';
import tr from '@/locales/tr.json';
import uk from '@/locales/uk.json';
import vi from '@/locales/vi.json';
import zh from '@/locales/zh.json';

export const DEFAULT_LOCALE = 'en' as const;

export const LOCALE_MESSAGES = {
  ar,
  bg,
  bn,
  cs,
  da,
  de,
  el,
  en,
  es,
  et,
  fi,
  fr,
  he,
  hi,
  hr,
  hu,
  id,
  it,
  ja,
  ko,
  lt,
  lv,
  nl,
  no,
  pl,
  pt,
  ro,
  ru,
  sk,
  sl,
  sr,
  sv,
  sw,
  th,
  tr,
  uk,
  vi,
  zh,
} as const;

export type LocaleCode = keyof typeof LOCALE_MESSAGES;
export type LocaleKey = keyof (typeof LOCALE_MESSAGES)[typeof DEFAULT_LOCALE];
