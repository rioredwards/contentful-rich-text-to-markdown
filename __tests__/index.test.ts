export {};

const { convertRichTextToMarkdown } = require("../src/index");
const { describe, expect } = require("@jest/globals");
const { basicRichText, richTextWithList, richTextWithCodeBlock } = require("../mocks/mocks");

describe("convertRichTextToMarkdown should return markdown when passed a: ", () => {
  it("basic rich-text obj", () => {
    const markdown = convertRichTextToMarkdown(basicRichText);

    expect(markdown).toEqual("A classic game of Tic Tac Toe for the Command Line.");
  });
  it("rich-text obj with unordered list", () => {
    const markdown = convertRichTextToMarkdown(richTextWithList);

    expect(markdown).toMatchSnapshot();
  });
  it("rich-text obj with unordered list", () => {
    const markdown = convertRichTextToMarkdown(richTextWithList);

    expect(markdown).toMatchSnapshot();
  });
  it("rich-text obj with code block", () => {
    const markdown = convertRichTextToMarkdown(richTextWithCodeBlock);

    expect(markdown).toMatchSnapshot();
  });
});
