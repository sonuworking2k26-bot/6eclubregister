import Image from "next/image";
import { PhoneShot } from "./PhoneShot";

export type GalleryItem = {
  src: string;
  alt: string;
  /** phone = tall screenshot, wide = banner/steps, tile = game tile */
  variant?: "phone" | "wide" | "tile";
};

export function GuideGallery({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null;

  const phones = items.filter((i) => (i.variant ?? "phone") === "phone");
  const wides = items.filter((i) => i.variant === "wide");
  const tiles = items.filter((i) => i.variant === "tile");

  return (
    <div className="guide-gallery">
      {wides.map((item) => (
        <figure key={item.src} className="guide-wide-shot">
          <Image
            src={item.src}
            alt={item.alt}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          <figcaption>{item.alt}</figcaption>
        </figure>
      ))}

      {phones.length ? (
        <div className="guide-phone-row">
          {phones.map((item) => (
            <PhoneShot key={item.src} src={item.src} alt={item.alt} />
          ))}
        </div>
      ) : null}

      {tiles.length ? (
        <div className="guide-tile-row" aria-label="Game tiles">
          {tiles.map((item) => (
            <figure key={item.src} className="guide-tile">
              <Image
                src={item.src}
                alt={item.alt}
                width={320}
                height={240}
                className="h-auto w-full object-cover"
                sizes="160px"
              />
              <figcaption>{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
