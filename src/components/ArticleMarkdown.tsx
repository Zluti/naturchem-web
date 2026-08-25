import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import { Children, isValidElement } from "react";
import remarkGfm from "remark-gfm";

const articleMarkdownComponents: Components = {
  h1({ children, ...props }) {
    return <h2 {...props}>{children}</h2>;
  },
  table({ children, ...props }) {
    return (
      <div className="article-table-wrap">
        <table {...props}>{children}</table>
      </div>
    );
  },
  p({ children, className, ...props }) {
    const isInquiryCallout = Children.toArray(children).some(
      (child) =>
        isValidElement<{ href?: string }>(child) &&
        child.props.href?.includes("#poptavkovy-formular")
    );

    const classes = [className, isInquiryCallout ? "article-inquiry-callout" : undefined]
      .filter(Boolean)
      .join(" ");

    return (
      <p {...props} className={classes || undefined}>
        {children}
      </p>
    );
  }
};

type Props = {
  children: string;
};

export function ArticleMarkdown({ children }: Props) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={articleMarkdownComponents}>
      {children}
    </Markdown>
  );
}
