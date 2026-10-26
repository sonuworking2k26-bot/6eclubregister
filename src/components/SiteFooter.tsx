import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto border-t border-line bg-green-soft text-ink">
      <div className="site-shell grid gap-8 py-10 sm:py-12 md:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-bold text-green-forest sm:text-2xl">
            {site.name}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            Independent India guides for {site.brand} register, login, APK safety and game
            basics. Not an official operator.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:gap-y-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-1 font-semibold text-green-forest no-underline hover:text-green"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/responsible-play"
            className="py-1 font-semibold text-green-forest no-underline hover:text-green"
          >
            Responsible play
          </Link>
        </nav>
      </div>
      <div className="border-t border-line bg-white/60">
        <div className="site-shell flex flex-col gap-1 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {site.host}</span>
          <span>Guides only · No OTP desk · No APK hosting</span>
        </div>
      </div>
    </footer>
  );
}
