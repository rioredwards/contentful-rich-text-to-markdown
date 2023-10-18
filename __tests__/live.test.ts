// These tests use the live Contentful API to test the integration with the Contentful Rich Text API.
const { createClient } = require("contentful");
require("dotenv/config");
const fs = require("fs");
const { convertRichTextToMarkdown } = require("../src/index");

const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  space: process.env.CONTENTFUL_SPACE_ID as string,
});

const WRITE_TO_FILE = process.env.WRITE_TO_FILE === "true";

describe("Contentful Rich Text API", () => {
  it("should return a rich text document", async () => {
    const myProj = await client.getEntry(process.env.CONTENTFUL_PROJ_ID_TIC_TAC_TOE as string);
    expect(myProj).toBeDefined();
  });
  it("should return a usage rich text document with an embedded code block", async () => {
    const myProj = await client.getEntry(process.env.CONTENTFUL_PROJ_ID_TIC_TAC_TOE as string);
    const usage = myProj.fields.usage;
    const usageMarkdown = convertRichTextToMarkdown(usage as any);
    // Write to readme.md
    if (typeof usageMarkdown === "string" && WRITE_TO_FILE) {
      fs.writeFileSync("./TEST_CODE_README.md", usageMarkdown);
    }
    expect(usageMarkdown).toMatchSnapshot();
  });
  it("should return a custom rich text document with an embedded image", async () => {
    const myProj = await client.getEntry(
      process.env.CONTENTFUL_PROJ_ID_ERROR_AFFIRMATIONS as string
    );
    const custom = myProj.fields.custom;
    const customMarkdown = convertRichTextToMarkdown(custom as any);
    // Write to readme.md
    if (typeof customMarkdown === "string" && WRITE_TO_FILE) {
      fs.writeFileSync("./TEST_IMG_README.md", customMarkdown);
    }

    const imageRegex = new RegExp(
      /!\[.*\]\(https:\/\/images\.ctfassets\.net\/.*\/.*\/.*\/.*\.png\)/
    );

    expect(imageRegex.test(customMarkdown)).toBe(true);
  });
});
