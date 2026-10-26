import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import type { Components } from "react-markdown";

const components: Components = {
  a: ({ href, children }) => {
    const to = href ?? "#";
    const external = /^https?:\/\//i.test(to);
    if (external) {
      return (
        <a href={to} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return <Link href={to}>{children}</Link>;
  },
  table: ({ children }) => (
    <div className="table-wrap">
      <table>{children}</table>
    </div>
  ),
  // GFM task lists render bare <input type="checkbox"> — replace with
  // a decorative mark so Lighthouse "form elements must have labels" passes.
  input: ({ type, checked, ...props }) => {
    if (type === "checkbox") {
      return (
        <span
          className={`md-task${checked ? " is-checked" : ""}`}
          aria-hidden="true"
        />
      );
    }
    return <input type={type} checked={checked} {...props} />;
  },
  li: ({ className, children, ...props }) => {
    const isTask = typeof className === "string" && className.includes("task-list-item");
    return (
      <li className={className} {...props} data-task={isTask ? "true" : undefined}>
        {children}
      </li>
    );
  },
};

export function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="prose-guide">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
