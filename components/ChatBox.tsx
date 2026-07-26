"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { ICONS } from "@/lib/constants/icon";

export type ChatProvider = "crisp" | "tawk" | "whatsapp" | "none";

interface ProviderOption {
  id: ChatProvider;
  name: string;
  description: string;
  badge?: string;
  iconBg: string;
}

const PROVIDERS: ProviderOption[] = [
  {
    id: "crisp",
    name: "Crisp Chat",
    description: "Fast live chat with real-time customer support",
    badge: "Recommended",
    iconBg: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    id: "tawk",
    name: "Tawk.to",
    description: "24/7 instant messaging & support portal",
    iconBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Support",
    description: "Direct chat with our team on WhatsApp",
    iconBg: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  {
    id: "none",
    name: "Disable Chat",
    description: "Hide chat widgets for a distraction-free view",
    iconBg: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  },
];

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProvider, setActiveProvider] = useState<ChatProvider>("crisp");

  const currentProviderInfo =
    PROVIDERS.find((p) => p.id === activeProvider) || PROVIDERS[0];

  useEffect(() => {
    if (activeProvider === "crisp") {
      if (
        typeof window === "undefined" ||
        document.getElementById("crisp-script")
      )
        return;
      window.$crisp = (window as any).$crisp || [];
      (window as any).CRISP_WEBSITE_ID = "61a62b49-03ef-4aa6-96f9-f21c7ebf254c";
      const crispScript = document.createElement("script");
      crispScript.id = "crisp-script";
      crispScript.src = "https://client.crisp.chat/l.js";
      document.head.appendChild(crispScript);
    }

    if (activeProvider === "tawk") {
      if (document.getElementById("tawk-script")) return;
      const tawkScript = document.createElement("script");
      tawkScript.id = "tawk-script";
      tawkScript.src =
        "https://embed.tawk.to/6a6645e815ab181d4e3c8009/1jufo25f2";
      document.head.appendChild(tawkScript);
    }
  }, [activeProvider]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.Tawk_API === undefined ||
      $crisp === undefined
    )
      return;

    activeProvider !== "tawk"
      ? window.Tawk_API.hideWidget()
      : window.Tawk_API.showWidget();

    activeProvider !== "crisp"
      ? $crisp.push(["do", "chat:hide"])
      : $crisp.push(["do", "chat:show"]);
  }, [activeProvider]);

  return (
    <div className="fixed bottom-29 right-5 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Floating Selection Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl border border-border bg-background/95 backdrop-blur-md p-4 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon
                  src={ICONS.chatDots}
                  alt="Chat options"
                  width={18}
                  height={18}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground leading-tight">
                  Live Chat Support
                </h3>
                <p className="text-xs text-muted-foreground">
                  Select your preferred chat box
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close panel"
            >
              <Icon src={ICONS.closeSm} alt="Close" width={16} height={16} />
            </button>
          </div>

          {/* Provider Options List */}
          <div className="space-y-2">
            {PROVIDERS.map((provider) => {
              const isActive = activeProvider === provider.id;
              return (
                <button
                  key={provider.id}
                  onClick={() => setActiveProvider(provider.id)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-xs"
                      : "border-border/50 bg-background/50 hover:bg-muted/60 hover:border-border"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold ${provider.iconBg}`}
                  >
                    {provider.id === "crisp"}
                    {provider.id === "tawk"}
                    {provider.id === "whatsapp"}
                    {provider.id === "none"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {provider.name}
                      </span>
                      {provider.badge && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {provider.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                      {provider.description}
                    </p>
                  </div>

                  <div className="mt-1 flex items-center justify-center">
                    <span
                      className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${
                        isActive
                          ? "border-primary bg-primary"
                          : "border-border bg-background"
                      }`}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Status Footer */}
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  activeProvider === "none"
                    ? "bg-gray-400"
                    : "bg-emerald-500 animate-pulse"
                }`}
              />
              Active:{" "}
              <strong className="text-foreground">
                {currentProviderInfo.name}
              </strong>
            </span>

            {activeProvider === "whatsapp" && (
              <span className="text-[11px] text-primary flex items-center gap-1">
                External link{" "}
                <Icon
                  src={ICONS.externalLink}
                  alt="External"
                  width={12}
                  height={12}
                />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-primary/40 cursor-pointer"
        title="Choose Live Chat Provider"
        aria-label="Toggle chat box options"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white ring-2 ring-background">
          ✓
        </span>

        {isOpen ? (
          <Icon src={ICONS.closeSm} alt="Close" width={22} height={22} />
        ) : (
          <Icon
            src={ICONS.chatDots}
            alt="Chat options"
            width={24}
            height={24}
          />
        )}
      </button>
    </div>
  );
}
