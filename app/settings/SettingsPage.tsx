"use client";

import Icon from "@/components/Icon";
import { ICONS } from "@/lib/constants/icon";
import { useSettingsStore } from "@/lib/stores/use-settings-store";

export function SettingsPage() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Settings
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage your application appearance and system preferences.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 shadow-xs backdrop-blur-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Theme Mode
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Switch between Light and Dark mode appearance.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-1.5 shadow-inner">
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                theme === "light"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon src={ICONS.sun} alt="Light theme" width={18} height={18} />
              Light
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                theme === "dark"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon src={ICONS.moon} alt="Dark theme" width={18} height={18} />
              Dark
            </button>
          </div>
        </div>

        {/* Theme Color Preview */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
          <div className="rounded-xl border border-border bg-background p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Background Color
            </p>
            <p className="mt-2 font-mono text-sm font-bold text-foreground">
              {theme === "dark" ? "#0a0a0a (Dark)" : "#ffffff (Light)"}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Text Color
            </p>
            <p className="mt-2 font-mono text-sm font-bold text-foreground">
              {theme === "dark" ? "#f9fafb (Light Gray)" : "#111827 (Dark Gray)"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
