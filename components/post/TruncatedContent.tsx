import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import htmlTruncate from "html-truncate";

type TTruncatedContentProps = {
    isFromDetailsPage?: boolean,
    htmlContent: string;
    wordLimit?: number;
}

// Utility: extract text from the HTML content.
const getTextFromHtml = (html: string): string => {
    if (typeof window === "undefined") {
        // In SSR, simply return the HTML stripped of tags.
        return html.replace(/<[^>]+>/g, "");
    }
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
};

export default function TruncatedContent({ htmlContent, wordLimit = 19, isFromDetailsPage }: TTruncatedContentProps) {
    const [expanded, setExpanded] = useState(false);

    if (expanded || isFromDetailsPage) {
        return (
            <div
                // Render full HTML (with proper formatting)
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
            />
        );
    }

    // Determine if the post is long by counting its words.
    const fullText = getTextFromHtml(htmlContent);
    const words = fullText.trim().split(/\s+/);
    const isLongPost = words.length > wordLimit;

    // If it's not a long post, show full content without the "see more" button.
    if (!isLongPost) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(htmlContent),
                }}
            />
        );
    }

    const approxCharLimit = wordLimit * 5;

    // Truncate the HTML content while preserving its formatting.
    const truncatedHTML = htmlTruncate(htmlContent, approxCharLimit);

    return (
        <div>
            <span
                className="truncated-content"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedHTML) }}
            />
            <span
                className="cursor-pointer text-primary-400"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpanded(true)
                }}
            >
                &nbsp;see more
            </span>
        </div>
    );
}
