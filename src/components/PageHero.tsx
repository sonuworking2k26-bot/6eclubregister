import { externalLinks } from "@/lib/site";
import { ExtLink } from "./ExtLink";
import { PhoneShot } from "./PhoneShot";

export function PageHero({
  h1,
  lead,
  image,
  imageAlt,
  primaryHref = externalLinks.login,
  primaryLabel = "Login",
  secondaryHref = externalLinks.register,
  secondaryLabel = "Register",
}: {
  h1: string;
  lead: string;
  image?: string;
  imageAlt?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="hero-plane relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="site-shell relative grid items-center gap-8 py-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-14">
        <div className="hero-copy max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-deep sm:text-sm">
            India · Guides only
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[1.85rem] font-bold leading-[1.08] tracking-tight text-green-forest sm:text-4xl lg:text-[2.75rem]">
            {h1}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-base lg:text-lg">
            {lead}
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
            <ExtLink href={primaryHref} className="btn-primary sm:min-w-[10.5rem]">
              {primaryLabel}
            </ExtLink>
            <ExtLink href={secondaryHref} className="btn-secondary sm:min-w-[10.5rem]">
              {secondaryLabel}
            </ExtLink>
          </div>
        </div>

        {image ? (
          <div className="hero-visual justify-self-center lg:justify-self-end">
            <PhoneShot src={image} alt={imageAlt ?? h1} priority />
          </div>
        ) : null}
      </div>
    </section>
  );
}
