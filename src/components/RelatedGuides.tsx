import Link from "next/link";
import { pages, type PageKey } from "@/lib/site";

const labels: Record<PageKey, string> = {
  home: "6E Club Register",
  login: "6E Club Login",
  apk: "6E Club APK",
  brand: "What is 6E Club",
  game: "6E Club Game",
  scam: "Scam checklist",
  responsible: "Responsible play",
};

const blurb: Record<PageKey, string> = {
  home: "Mobile signup, OTP and invite",
  login: "Phone number login and OTP stalls",
  apk: "Download safety and install checks",
  brand: "What the product is — and isn’t",
  game: "Colour rounds and lobby basics",
  scam: "Fake links and common traps",
  responsible: "Limits and healthier habits",
};

export function RelatedGuides({ current }: { current: PageKey }) {
  const keys = (Object.keys(pages) as PageKey[]).filter((k) => k !== current);

  return (
    <section className="related-section" aria-labelledby="related-heading">
      <div className="site-shell">
        <h2 id="related-heading" className="related-title">
          Related 6E Club guides
        </h2>
        <p className="related-lead">Jump to the next topic without hunting the menu.</p>
        <ul className="related-grid">
          {keys.map((key) => (
            <li key={key}>
              <Link href={pages[key].path} className="related-link">
                <span className="related-link-title">{labels[key]}</span>
                <span className="related-link-blurb">{blurb[key]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
