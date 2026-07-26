"use client";

import {
  ThemeSettings,
  LanguageSettings,
} from "./InterfaceSettings/InterfaceSettings";

export function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Settings
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage your application appearance and system preferences.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 shadow-xs backdrop-blur-xs flex flex-col gap-8">
        <ThemeSettings />
        <LanguageSettings />
      </div>
    </div>
  );
}
