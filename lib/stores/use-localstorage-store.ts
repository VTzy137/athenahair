import { LocalStorageKey } from './../system/storage';
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  LOCAL_STORAGE,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../system/storage";

export interface LocalStorageState {
  prevId: string,
}

export interface LocalStorageActions {
  setLocalStorage: (value: LocalStorageState) => void,
}

export type SettingsStore = LocalStorageState & LocalStorageActions;

const DEFAULT_LOCAL_STORAGE: LocalStorageState = {
  prevId: '1',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_LOCAL_STORAGE,
      setLocalStorage: (localStorage: LocalStorageState) => {
        set((state) => ({ ...state, ...localStorage }));
      },
    }),
    {
      name: LOCAL_STORAGE.SETTINGS,
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const value = getLocalStorage<LocalStorageState>(key as LOCAL_STORAGE, DEFAULT_LOCAL_STORAGE);
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

