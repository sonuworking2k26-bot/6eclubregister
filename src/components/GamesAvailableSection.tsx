import Image from "next/image";
import Link from "next/link";
import { externalLinks } from "@/lib/site";
import { gamesAvailable } from "@/lib/games";
import { ExtLink } from "./ExtLink";

export function GamesAvailableSection() {
  return (
    <section
      className="games-available border-b border-line"
      aria-labelledby="games-available-heading"
    >
      <div className="site-shell py-8 sm:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="m-0 text-xs font-extrabold uppercase tracking-[0.12em] text-green-deep">
              Lobby · India
            </p>
            <h2
              id="games-available-heading"
              className="mt-2 font-[family-name:var(--font-display)] text-[1.45rem] font-bold tracking-tight text-green-forest sm:text-2xl"
            >
              Games available
            </h2>
            <p className="mt-2 m-0 text-[0.98rem] leading-relaxed text-muted">
              After you register or login, the 6E Club lobby usually shows colour rooms plus other
              tiles. Names can vary by host — use this map to recognise common options, then read{" "}
              <Link href="/6e-club-game" className="font-semibold text-green-deep">
                how a round works
              </Link>
              .
            </p>
          </div>
          <ExtLink href={externalLinks.register} className="btn-primary shrink-0 self-start sm:self-auto">
            Open register
          </ExtLink>
        </div>

        <ul className="mt-6 m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {gamesAvailable.map((game, index) => (
            <li key={game.src} className="min-w-0">
              <figure className="game-tile-3d m-0">
                <div className="game-tile-face">
                  <Image
                    src={game.src}
                    alt={`${game.name} — 6E Club game tile`}
                    width={320}
                    height={240}
                    className="game-tile-img"
                    quality={70}
                    priority={index < 4}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                  />
                  <figcaption className="game-tile-cap">
                    <span className="game-tile-name">{game.name}</span>
                    <span className="game-tile-blurb">{game.blurb}</span>
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
