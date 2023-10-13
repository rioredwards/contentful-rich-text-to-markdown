import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';
import { NodeHtmlMarkdown } from 'node-html-markdown';

// Convert the rich text to HTML
export default function convertRichTextToMarkdown(document: Document): string | undefined {
  const html = documentToHtmlString(document);
  const markdown = NodeHtmlMarkdown.translate(html);
  return markdown;
}
