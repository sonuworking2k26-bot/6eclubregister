import type { Doc } from "@/lib/content";
import { prepareGuideBody, shortLead } from "@/lib/content";
import { externalLinks } from "@/lib/site";
import { guideJsonLd } from "@/lib/seo";
import { extractToc } from "@/lib/toc";
import { GamesAvailableSection } from "./GamesAvailableSection";
import { GiftCodeSection } from "./GiftCodeSection";
import { GuideAside } from "./GuideAside";
import { GuideGallery, type GalleryItem } from "./GuideGallery";
import { MarkdownBody } from "./MarkdownBody";
import { OnThisPage } from "./OnThisPage";
import { PageHero } from "./PageHero";
import { RelatedGuides } from "./RelatedGuides";

export function GuidePage({
  doc,
  gallery = [],
  showGames = false,
}: {
  doc: Doc;
  gallery?: GalleryItem[];
  /** Show “Games available” tile strip under gift codes */
  showGames?: boolean;
}) {
  const toc = extractToc(doc.body);
  const body = prepareGuideBody(doc.body);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(doc)) }}
      />
      <PageHero
        h1={doc.h1}
        lead={shortLead(doc.description)}
        image={doc.image}
        imageAlt={doc.imageAlt}
        primaryHref={externalLinks.login}
        primaryLabel="Login"
        secondaryHref={externalLinks.register}
        secondaryLabel="Register"
      />

      <GiftCodeSection />
      {showGames ? <GamesAvailableSection /> : null}

      <div className="site-shell grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-12 lg:py-12">
        <div className="guide-main min-w-0">
          <div className="lg:hidden">
            <OnThisPage items={toc} />
          </div>

          <section className="guide-body-section" aria-label="Guide content">
            <MarkdownBody content={body} />
          </section>

          <GuideGallery items={gallery} />
        </div>

        <aside className="hidden lg:flex lg:sticky lg:top-20 lg:flex-col lg:gap-4 lg:self-start">
          <OnThisPage items={toc} variant="sidebar" />
          <GuideAside />
        </aside>
      </div>

      <RelatedGuides current={doc.key} />
    </article>
  );
}
