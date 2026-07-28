import { setLocalStorage, LOCAL_STORAGE } from "../system/storage";
import { Themes } from "../types/site";

export const applyThemeToDocument = (theme: Themes) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('light');
  root.classList.remove('dark');
  root.classList.remove('system');
  root.classList.add(theme);
  setLocalStorage(LOCAL_STORAGE.THEME, theme);
};