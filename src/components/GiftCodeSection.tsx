import { externalLinks, site } from "@/lib/site";
import { ExtLink } from "./ExtLink";

export function GiftCodeSection() {
  return (
    <section
      className="border-b border-line bg-green-soft/60"
      aria-labelledby="gift-code-heading"
    >
      <div className="site-shell grid gap-6 py-8 sm:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
        <div>
          <p className="m-0 text-xs font-extrabold uppercase tracking-[0.12em] text-green-deep">
            Daily updates · Telegram
          </p>
          <h2
            id="gift-code-heading"
            className="mt-2 font-[family-name:var(--font-display)] text-[1.45rem] font-bold tracking-tight text-green-forest sm:text-2xl"
          >
            Daily 6E Club gift codes
          </h2>
          <p className="mt-3 m-0 text-[0.98rem] leading-relaxed text-muted">
            Looking for a fresh <strong className="font-bold text-ink">6E Club gift code</strong>?
            Codes change often and usually redeem inside the app or lobby gift box after you{" "}
            <ExtLink href={externalLinks.register} className="font-semibold text-green-deep">
              register
            </ExtLink>{" "}
            or{" "}
            <ExtLink href={externalLinks.login} className="font-semibold text-green-deep">
              login
            </ExtLink>
            . We post daily gift-code drops on Telegram so you skip random WhatsApp forwards.
          </p>
          <ul className="mt-4 m-0 grid list-none gap-2 p-0 text-[0.92rem] leading-snug text-muted">
            <li className="relative pl-5 before:absolute before:left-1 before:top-[0.45em] before:block before:h-1.5 before:w-1.5 before:rounded-full before:bg-green before:content-['']">
              Check today’s code before you paste — old codes expire fast.
            </li>
            <li className="relative pl-5 before:absolute before:left-1 before:top-[0.45em] before:block before:h-1.5 before:w-1.5 before:rounded-full before:bg-green before:content-['']">
              Redeem only on a host you trust — never pay someone “for a code”.
            </li>
            <li className="relative pl-5 before:absolute before:left-1 before:top-[0.45em] before:block before:h-1.5 before:w-1.5 before:rounded-full before:bg-green before:content-['']">
              Channel is for updates only — not financial advice ({site.host}).
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:items-start lg:items-end">
          <ExtLink
            href={externalLinks.telegramGiftCodes}
            className="btn-primary w-full text-center sm:w-auto lg:min-w-[16rem]"
          >
            Get daily gift codes on Telegram
          </ExtLink>
          <p className="m-0 text-center text-xs text-muted sm:text-left lg:text-right">
            Opens Telegram — join for the latest gift code posts.
          </p>
        </div>
      </div>
    </section>
  );
}
