import { Document } from "@contentful/rich-text-types";
import convertRichTextToMarkdown from "../src/index";

const mockDocument: any = {
  data: {},
  content: [
    {
      data: {},
      content: [
        {
          data: {},
          marks: [],
          value: "Level-Up your code with ",
          nodeType: "text",
        },
        {
          data: {},
          marks: [
            {
              type: "bold",
            },
          ],
          value: "Code Quest",
          nodeType: "text",
        },
        {
          data: {},
          marks: [],
          value: "!",
          nodeType: "text",
        },
      ],
      nodeType: "paragraph",
    },
  ],
  nodeType: "document",
};

describe("convertRichTextToMarkdown: ", () => {
  it("should return markdown when passed a Contentful document object", () => {
    const markdown = convertRichTextToMarkdown(mockDocument);

    expect(markdown).toEqual("Level-Up your code with **Code Quest**!");
  });
});
