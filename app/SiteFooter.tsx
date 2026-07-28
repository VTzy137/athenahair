"use client";

import { IconImage, Icon } from "@/components/Icon";
import { ICONS } from "@/lib/constants/icon";
import {
  EMAIL_ADDRESS,
  PHONE_NUMBER,
  SITE_NAME,
  SOCIALS,
} from "@/lib/constants/site";
import { SocialType } from "@/lib/types/site";
import Link from "next/link";
import { PageWrapper } from "@/components/Layout";

const FOOTER_LINKS = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Virgin Hair", href: "/shop?category=virgin" },
    { label: "Wigs & Bundles", href: "/shop?category=wigs" },
    { label: "Hair Care", href: "/shop?category=care" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Commitments", href: "/about#commitments" },
    { label: "Settings", href: "/settings" },
  ],
  support: [
    { label: "Help Center", href: "/faq" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns Policy", href: "/returns" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background text-foreground transition-colors duration-200">
      {/* Newsletter Banner */}
      <div className="border-b border-border/40 bg-muted/20 py-8">
        <PageWrapper className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <h3 className="text-base font-semibold text-foreground">
              Subscribe to {SITE_NAME}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Get exclusive offers, beauty tips, and new arrivals straight to
              your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-sm items-center gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:opacity-90 cursor-pointer"
            >
              <span>Join</span>
              <IconImage
                src={ICONS.paperPlane}
                alt="Send"
                width={14}
                height={14}
              />
            </button>
          </form>
        </PageWrapper>
      </div>

      {/* Main Content */}
      <PageWrapper className="py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info & Contact */}
          <div className="lg:col-span-2">
            <Link
              href="/home"
              className="text-lg font-bold tracking-tight text-foreground"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Premium quality 100% natural human hair extensions, custom wigs,
              and luxury beauty care products.
            </p>

            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon
                  src={ICONS.mapPin}
                  alt="Location"
                  width={14}
                  height={14}
                />
                <span>Hanoi, VN</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon src={ICONS.phone} alt="Phone" width={14} height={14} />
                <span>{PHONE_NUMBER}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon src={ICONS.mail} alt="Email" width={14} height={14} />
                <span>{EMAIL_ADDRESS}</span>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Connect With Us
              </p>
              <ListSocial />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Shop
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {FOOTER_LINKS.shop.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Support
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {FOOTER_LINKS.support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <IconImage
                src={ICONS.shield}
                alt="Shield"
                width={14}
                height={14}
              />
              Secure Checkout
            </span>
          </div>
        </div>
      </PageWrapper>
    </footer>
  );
}

function ListSocial() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SOCIALS.map((social) => (
        <Social key={social.name} social={social} />
      ))}
    </div>
  );
}

function Social({ social }: { social: SocialType }) {
  return (
    <Link
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-2.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
      title={social.name}
    >
      {social.monotone ? (
        <Icon src={social.icon} alt={social.name} width={14} height={14} />
      ) : (
        <IconImage src={social.icon} alt={social.name} width={14} height={14} />
      )}
      <span className="text-[11px] font-medium">{social.name}</span>
    </Link>
  );
}
