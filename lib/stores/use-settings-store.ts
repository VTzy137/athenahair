import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  LOCAL_STORAGE,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../system/storage";
import { Themes } from "../types/site";
import { applyThemeToDocument } from "../utils/settings";

export interface SettingsState {
  language: string;
  theme: Themes;
}

export interface SettingsActions {
  setSettings: (settings: SettingsState) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: Themes) => void;
}

export type SettingsStore = SettingsState & SettingsActions;

const DEFAULT_SETTINGS: SettingsState = {
  language: 'en',
  theme: 'light',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      setSettings: (settings: SettingsState) => {
        if (settings.theme) applyThemeToDocument(settings.theme);
        set({ ...settings });
      },
      setLanguage: (language: string) => set({ language }),
      setTheme: (theme: Themes) => {
        applyThemeToDocument(theme);
        set({ theme });
      },
    }),
    {
      name: LOCAL_STORAGE.SETTINGS,
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const value = getLocalStorage<SettingsState>(key as LOCAL_STORAGE, DEFAULT_SETTINGS);
          return JSON.stringify({ state: value });
        },
        setItem: (key, value) => {
          try {
            const parsed = JSON.parse(value);
            if (parsed?.state) {
              setLocalStorage(key as LOCAL_STORAGE, parsed.state);
            }
          } catch {
            // fallback if JSON parse fails
          }
        },
        removeItem: (key) => {
          removeLocalStorage(key as LOCAL_STORAGE);
        },
      })),
    }
  )
);

