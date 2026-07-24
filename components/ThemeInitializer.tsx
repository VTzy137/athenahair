"use client";

import { useEffect } from "react";
import { useSettingsStore  } from "@/lib/stores/use-settings-store";
import { applyThemeToDocument } from "@/lib/utils/settings";

export function ThemeInitializer() {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  return null;
}
