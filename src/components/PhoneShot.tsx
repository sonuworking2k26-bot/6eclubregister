import Image from "next/image";

/** Phone UI screenshot — never stretch to full content width. */
export function PhoneShot({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`phone-shot ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        width={360}
        height={720}
        className="phone-shot-img"
        priority={priority}
        quality={72}
        sizes="280px"
      />
      {alt ? <figcaption className="phone-shot-cap">{alt}</figcaption> : null}
    </figure>
  );
}
