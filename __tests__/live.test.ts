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

let contentfulProj: any;
let projContent: Record<string, Object | undefined> = {
  slogan: undefined,
  description: undefined,
  features: undefined,
  configure: undefined,
  usage: undefined,
  lessonsLearned: undefined,
  reflection: undefined,
  authors: undefined,
  custom: undefined,
};

describe("Contentful Project", () => {
  beforeAll(async () => {
    contentfulProj = await client.getEntry(process.env.CONTENTFUL_TEST_PROJ_ID as string);
    projContent.slogan = contentfulProj.fields.slogan;
    projContent.description = contentfulProj.fields.description;
    projContent.features = contentfulProj.fields.features;
    projContent.configure = contentfulProj.fields.configure;
    projContent.usage = contentfulProj.fields.usage;
    projContent.lessonsLearned = contentfulProj.fields.lessonsLearned;
    projContent.reflection = contentfulProj.fields.reflection;
    projContent.authors = contentfulProj.fields.authors;
    projContent.custom = contentfulProj.fields.custom;
  });
  it("should be defined", async () => {
    expect(contentfulProj).toBeDefined();
  });
  it("should have a slogan", async () => {
    expect(projContent.slogan).toBeDefined();
  });
  it("should have a description", async () => {
    expect(projContent.description).toBeDefined();
  });
  it("should have features", async () => {
    expect(projContent.features).toBeDefined();
  });
  it("should have configure", async () => {
    expect(projContent.configure).toBeDefined();
  });
  it("should have usage", async () => {
    expect(projContent.usage).toBeDefined();
  });
  it("should have lessons learned", async () => {
    expect(projContent.lessonsLearned).toBeDefined();
  });
  it("should have reflection", async () => {
    expect(projContent.reflection).toBeDefined();
  });
  it("should have authors", async () => {
    expect(projContent.authors).toBeDefined();
  });
  it("should have custom", async () => {
    expect(projContent.custom).toBeDefined();
  });
});

describe("convertRichTextToMarkdown", () => {
  it("should return a usage rich text document with an embedded code block", async () => {
    const myProj = await client.getEntry(process.env.CONTENTFUL_TEST_PROJ_ID as string);
    const usage = myProj.fields.usage;
    const usageMarkdown = convertRichTextToMarkdown(usage as any);
    // Write to readme.md
    if (typeof usageMarkdown === "string" && WRITE_TO_FILE) {
      fs.writeFileSync("./TEST_CODE_README.md", usageMarkdown);
    }
    expect(usageMarkdown).toMatchSnapshot();
  });
  it("should return a custom rich text document with an embedded image", async () => {
    const myProj = await client.getEntry(process.env.CONTENTFUL_TEST_PROJ_ID as string);
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

const example = {
  customEmbeddedImage: {
    title: "Error Affirmations Jest Reporter Screenshot 1",
    url: "//images.ctfassets.net/l329ngjcm8m3/1ryCjATuECJw1xJGJlXHT3/bd6615876fa65a77a8423ff31aaf9de6/Jest_Example_Default.png",
  },
};
