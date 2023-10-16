"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRichTextToMarkdown = void 0;
const rich_text_html_renderer_1 = require("@contentful/rich-text-html-renderer");
const node_html_markdown_1 = require("node-html-markdown");
const formatCodeBlock = (node) => {
    const { content, language } = node;
    const markdown = `<CustomCodeBlock>\`\`\`${language}\n${content}\n\`\`\`</CustomCodeBlock>`;
    return markdown;
};
const htmRendererOptions = {
    renderNode: {
        "embedded-entry-block": (node, _) => {
            if (node === null || node === void 0 ? void 0 : node.data) {
                const entry = node.data.target;
                if (entry.sys.contentType.sys.id === "codeBlock") {
                    const markdown = formatCodeBlock(entry.fields);
                    return markdown;
                }
            }
            return `unhandled node_type: ${node.nodeType}`;
        },
    },
};
// Set NodeHtmlMarkdown to just print out the innerText of the CustomCodeBlocks
const customTranslatorConfigForCodeBlock = {
    CustomCodeBlock: {
        postprocess: (ctx) => ctx.node.innerText,
        preserveWhitespace: true,
        surroundingNewlines: 2,
    },
};
// Convert the rich text documents from Contentful to Markdown
function convertRichTextToMarkdown(document) {
    const html = (0, rich_text_html_renderer_1.documentToHtmlString)(document, htmRendererOptions);
    const markdown = node_html_markdown_1.NodeHtmlMarkdown.translate(html, {}, customTranslatorConfigForCodeBlock);
    return markdown;
}
exports.convertRichTextToMarkdown = convertRichTextToMarkdown;
//# sourceMappingURL=index.js.map