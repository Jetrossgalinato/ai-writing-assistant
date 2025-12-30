import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ComponentPropsWithoutRef } from "react";

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

            // This approach satisfies both TypeScript and ESLint:
            // We spread the theme into a new object and cast the outer wrapper.
            const theme = { ...oneDark } as {
              [key: string]: React.CSSProperties;
            };

            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={theme}
                  language={language}
                  PreTag="div"
                  className="rounded-lg my-4"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }

            return (
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
