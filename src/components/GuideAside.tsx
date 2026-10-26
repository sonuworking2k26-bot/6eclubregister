import Link from "next/link";
import { nav } from "@/lib/site";

export function GuideAside() {
  return (
    <aside className="guide-aside" aria-label="Quick links">
      <p className="guide-aside-label">Quick links</p>
      <ul className="guide-aside-list">
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
        <li>
          <Link href="/responsible-play">Responsible play</Link>
        </li>
      </ul>
    </aside>
  );
}
