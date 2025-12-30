import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ComponentPropsWithoutRef, CSSProperties } from "react";

// Create an interface that matches the expected Index Signature
interface HighlighterStyle {
  [key: string]: CSSProperties;
}

type CodeComponentProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
};

export default function AIResponse({ content }: { content: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-pre:bg-transparent prose-pre:p-0">
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: CodeComponentProps) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark as unknown as HighlighterStyle} // Type-safe double assertion
                language={language}
                PreTag="div"
                className="rounded-lg my-4"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-slate-100 p-1 rounded text-sm font-mono text-pink-600"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
