export {};

const { convertRichTextToMarkdown } = require("../src/index");
const { describe, expect, test } = require("@jest/globals");
const { basicRichText, richTextWithList } = require("../mocks/mocks");

describe("convertRichTextToMarkdown should return markdown when passed a: ", () => {
  it("basic rich-text obj", () => {
    const markdown = convertRichTextToMarkdown(basicRichText);

    expect(markdown).toEqual("A classic game of Tic Tac Toe for the Command Line.");
  });
  it("rich-text obj with unordered list", () => {
    const markdown = convertRichTextToMarkdown(richTextWithList);

    expect(markdown).toMatchSnapshot();
  });
});
