import Icon from "@/components/Icon";
import { Column } from "@/components/Layout";
import { ICONS } from "@/lib/constants/icon";
import { useSettingsStore } from "@/lib/stores/use-settings-store";
import { getAvailableLanguages, localeString } from "@/lib/utils/locale";

export function ThemeSettings() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  return (
    <Column>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Theme Mode</h2>
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
    </Column>
  );
}

export function LanguageSettings() {
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  const availableLanguages = getAvailableLanguages(language);
  const currentLang = availableLanguages.find((l) => l.code === language) || {
    code: language,
    name: language,
    nativeName: language,
  };

  return (
    <Column className="border-t border-border/60 pt-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Language</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Select your preferred display language for the interface.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Icon src={ICONS.globe} alt="Language" width={18} height={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Language Info & Translation Sample Preview */}
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border/60 pt-6 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Selected Language
          </p>
          <p className="mt-2 font-medium text-foreground">
            {currentLang.nativeName}{" "}
            <span className="text-xs text-muted-foreground">
              ({currentLang.code})
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            System Label
          </p>
          <p className="mt-2 font-medium text-foreground">
            {localeString("system")}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Time Units
          </p>
          <p className="mt-2 text-xs font-medium text-foreground">
            {localeString("days")}, {localeString("hours")},{" "}
            {localeString("minutes")}
          </p>
        </div>
      </div>
    </Column>
  );
}
