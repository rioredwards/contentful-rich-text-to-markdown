import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";
import { NodeHtmlMarkdown, TranslatorConfigObject } from "node-html-markdown";
import { Options } from "@contentful/rich-text-html-renderer";

const formatCodeBlock = (node: any) => {
  const { content, language } = node;
  const markdown = `<CustomCodeBlock>\`\`\`${language}\n${content}\n\`\`\`</CustomCodeBlock>`;
  return markdown;
};

const formatImage = (title: string, url: string) => {
  const markdown = `<CustomEmbeddedImage>![${title}](https:${url})</CustomEmbeddedImage>`;
  return markdown;
};

const htmRendererOptions: Options = {
  renderNode: {
    "embedded-entry-block": (node, _) => {
      if (node?.data) {
        const entry = node.data.target;
        if (entry.sys.contentType.sys.id === "codeBlock") {
          const markdown = formatCodeBlock(entry.fields);
          return markdown;
        }
      }
      return `unhandled node_type: ${node.nodeType}`;
    },
    "embedded-entry-inline": (node, _) => {
      return `unhandled node_type: ${node.nodeType}`;
    },
    "embedded-asset-block": (node, _) => {
      if (node?.data) {
        const entry = node.data.target;
        try {
          const title = entry.fields.title;
          const url = entry.fields.file.url;
          const markdown = formatImage(title, url);
          return markdown;
        } catch (err) {
          console.error("Error rendering embedded-asset-block", err);
        }
      }
      return `unhandled node_type: ${node.nodeType}`;
    },
  },
};

// Set NodeHtmlMarkdown to just print out the innerText of the CustomCodeBlocks
const customTranslatorConfigForCodeBlock: TranslatorConfigObject = {
  CustomCodeBlock: {
    postprocess: (ctx) => ctx.node.innerText,
    preserveWhitespace: true,
    surroundingNewlines: 2,
  },
  CustomEmbeddedImage: {
    postprocess: (ctx) => ctx.node.innerText,
    preserveWhitespace: true,
    surroundingNewlines: 2,
  },
};

// Convert the rich text documents from Contentful to Markdown
export function convertRichTextToMarkdown(document: Document): string | undefined {
  const html = documentToHtmlString(document, htmRendererOptions);
  const markdown = NodeHtmlMarkdown.translate(html, {}, customTranslatorConfigForCodeBlock);
  return markdown;
}
