"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { externalLinks, nav, site } from "@/lib/site";
import { ExtLink } from "./ExtLink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#f7fcf8]/92 backdrop-blur-md">
      <div className="site-shell flex h-14 items-center justify-between gap-3 sm:h-16">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 no-underline">
          <Image
            src="/images/se-app-icon2.webp"
            alt={`${site.brand} logo`}
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 rounded-[0.65rem] ring-1 ring-line shadow-sm sm:h-10 sm:w-10"
            priority
          />
          <span className="truncate font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-green-forest sm:text-lg">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-medium no-underline transition-colors ${
                  active
                    ? "bg-green-soft text-green-forest"
                    : "text-muted hover:bg-green-soft/70 hover:text-green-forest"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ExtLink href={externalLinks.register} className="btn-primary hidden sm:inline-flex">
            Register
          </ExtLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-green-forest lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-14 z-50 bg-[#04150f]/45 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="ml-auto flex h-[calc(100dvh-3.5rem)] w-[min(100%,20rem)] flex-col bg-[#f7fcf8] shadow-[-12px_0_40px_rgba(6,78,59,0.18)] animate-[slideIn_0.22s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile menu">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-xl px-4 py-3.5 text-base font-semibold no-underline ${
                      active
                        ? "bg-green-deep text-white"
                        : "bg-white text-green-forest ring-1 ring-line"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/responsible-play"
                className="rounded-xl px-4 py-3.5 text-base font-semibold text-green-forest no-underline ring-1 ring-line bg-white"
              >
                Responsible play
              </Link>
            </nav>
            <p className="border-t border-line px-4 py-3 text-xs text-muted">
              Independent guides · Not an official operator
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
