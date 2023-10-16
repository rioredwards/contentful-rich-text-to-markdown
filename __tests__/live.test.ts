// These tests use the live Contentful API to test the integration with the Contentful Rich Text API.
const { createClient } = require("contentful");
require("dotenv/config");
const fs = require("fs");
const { convertRichTextToMarkdown } = require("../src/index");

const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  space: process.env.CONTENTFUL_SPACE_ID as string,
});

describe("Contentful Rich Text API", () => {
  it("should return a rich text document", async () => {
    const myProj = await client.getEntry(process.env.CONTENTFUL_PROJ_ID as string);
    expect(myProj).toBeDefined();
  });
  it("should return a usage rich text document with an embedded code block", async () => {
    const myProj = await client.getEntry(process.env.CONTENTFUL_PROJ_ID as string);
    const usage = myProj.fields.usage;
    const usageMarkdown = convertRichTextToMarkdown(usage as any);
    // Write to readme.md
    if (typeof usageMarkdown === "string") fs.writeFileSync("./TEST_README.md", usageMarkdown);

    expect(usageMarkdown).toMatchSnapshot();
  });
});
