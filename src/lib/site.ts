export const site = {
  name: "6E Club Register",
  brand: "6E Club",
  host: "6eclubregister.com",
  url: "https://6eclubregister.com",
  locale: "en-IN",
  description:
    "6E Club Register guides for India: mobile signup, login, APK safety, game basics and scam checks on 6eclubregister.com.",
} as const;

/** Single place to change live app URLs (header + hero CTAs). */
export const externalLinks = {
  register: "https://www.6clubi.com/#/register?invitationCode=466122943641",
  login: "https://www.6clubi.com/#/login",
  telegramGiftCodes: "https://t.me/+igD1lBSi_0s5Nzg1",
} as const;

export const nav = [
  { href: "/", label: "Register" },
  { href: "/6e-club-login", label: "Login" },
  { href: "/6e-club-apk", label: "APK" },
  { href: "/6e-club-game", label: "Game" },
  { href: "/6e-club", label: "What is 6E Club" },
  { href: "/guides/scam-checklist", label: "Scam checklist" },
] as const;

export type PageKey =
  | "home"
  | "login"
  | "apk"
  | "brand"
  | "game"
  | "scam"
  | "responsible";

export const pages: Record<
  PageKey,
  {
    file: string;
    path: string;
    image?: string;
    imageAlt?: string;
  }
> = {
  home: {
    file: "home-register.md",
    path: "/",
    image: "/images/se-register-v2.webp",
    imageAlt: "6E Club register screen on mobile",
  },
  login: {
    file: "6e-club-login.md",
    path: "/6e-club-login",
    image: "/images/se-login-v2.webp",
    imageAlt: "6E Club login screen on mobile",
  },
  apk: {
    file: "6e-club-apk.md",
    path: "/6e-club-apk",
    image: "/images/se-download-v2.webp",
    imageAlt: "6E Club app download steps",
  },
  brand: {
    file: "6e-club.md",
    path: "/6e-club",
    image: "/images/se-lobby-v2.webp",
    imageAlt: "6E Club lobby on mobile",
  },
  game: {
    file: "6e-club-game.md",
    path: "/6e-club-game",
    image: "/images/se-wingo-v2.webp",
    imageAlt: "How to play 6E Club WinGo colour rounds",
  },
  scam: {
    file: "scam-checklist.md",
    path: "/guides/scam-checklist",
    image: "/images/se-banner-v2.webp",
    imageAlt: "6E Club safety and guide banner",
  },
  responsible: {
    file: "responsible-play.md",
    path: "/responsible-play",
  },
};
