import type { TocItem } from "@/lib/toc";

export function OnThisPage({
  items,
  variant = "panel",
}: {
  items: TocItem[];
  variant?: "panel" | "sidebar";
}) {
  if (items.length < 2) return null;

  if (variant === "sidebar") {
    return (
      <nav className="toc-sidebar" aria-label="On this page">
        <p className="toc-sidebar-label">On this page</p>
        <ol className="toc-sidebar-list">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav className="toc-panel" aria-label="On this page">
      <details open>
        <summary className="toc-summary">
          <span>On this page</span>
          <span className="toc-count">{items.length} sections</span>
        </summary>
        <ol className="toc-list">
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>
                <span className="toc-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
