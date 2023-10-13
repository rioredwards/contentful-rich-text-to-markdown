import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Document } from "@contentful/rich-text-types";
import { NodeHtmlMarkdown } from "node-html-markdown";

// Convert the rich text to HTML
export default async function convertRichTextToMarkdown(
  document: Document
): Promise<string | undefined> {
  const html = documentToHtmlString(document);
  const markdown = NodeHtmlMarkdown.translate(html);
  return markdown;
}
