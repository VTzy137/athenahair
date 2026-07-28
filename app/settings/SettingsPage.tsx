"use client";

import {
  ThemeSettings,
  LanguageSettings,
  ApplySettingToSite,
} from "./InterfaceSettings/InterfaceSettings";
import { PageWrapper } from "@/components/Layout";

export function SettingsPage() {
  return (
    <PageWrapper className="w-full py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Settings
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage your application appearance and system preferences.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 shadow-xs backdrop-blur-xs flex flex-col gap-8">
        <ApplySettingToSite />
        <ThemeSettings />
        <LanguageSettings />
      </div>
    </PageWrapper>
  );
}
