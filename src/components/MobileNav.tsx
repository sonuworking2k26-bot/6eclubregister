"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Register", icon: "R" },
  { href: "/6e-club-login", label: "Login", icon: "L" },
  { href: "/6e-club-apk", label: "APK", icon: "A" },
  { href: "/6e-club-game", label: "Game", icon: "G" },
  { href: "/guides/scam-checklist", label: "Safety", icon: "S" },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-[#f7fcf8]/95 backdrop-blur-md md:hidden"
      aria-label="Mobile"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {tabs.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] font-semibold no-underline ${
                  active ? "text-green-deep" : "text-muted"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold ${
                    active
                      ? "bg-green-deep text-white"
                      : "bg-green-soft text-green-forest"
                  }`}
                  aria-hidden
                >
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
