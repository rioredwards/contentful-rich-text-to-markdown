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

let contentfulProj: any = undefined;
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
let markdownContent: string = "";

describe("Contentful Project", () => {
  beforeAll(async () => await gatherProjContent());
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
  beforeAll(async () => await gatherProjContent());
  afterAll(() => {
    writeProjContentToFile();
  });
  it("should convert normal text", () => {
    const sloganMarkdown = convertRichTextToMarkdown(projContent.slogan);
    markdownContent += sloganMarkdown;
    const expectedSlogan = "This is a test slogan";
    expect(sloganMarkdown).toBe(expectedSlogan);
  });
  it("should convert styled text", () => {
    const descriptionMarkdown = convertRichTextToMarkdown(projContent.description);
    markdownContent += descriptionMarkdown;
    // prettier ignore next 4 lines
    const expectedDescription = `**This is a paragraph in bold.**

_This is a paragraph in italics._

**_This is a paragraph in italics and bold._**

\`This is some inline code.\``;
    expect(descriptionMarkdown).toBe(expectedDescription);
  });
  it("should convert unordered lists", () => {
    const featuresMarkdown = convertRichTextToMarkdown(projContent.features);
    markdownContent += featuresMarkdown;
    // prettier ignore next 2 lines
    const expectedFeatures = `* Item 1
* Item 2`;
    expect(featuresMarkdown).toBe(expectedFeatures);
  });
  it("should convert ordered lists", () => {
    const configureMarkdown = convertRichTextToMarkdown(projContent.configure);
    markdownContent += configureMarkdown;
    // prettier ignore next 2 lines
    const expectedConfigure = `1. Item 1
2. Item 2`;
    expect(configureMarkdown).toBe(expectedConfigure);
  });
});

// Write to all resulting markdown to the TEST_README.md file
function writeProjContentToFile() {
  if (WRITE_TO_FILE === true && markdownContent !== "") {
    fs.writeFileSync("./TEST_README.md", markdownContent);
  }
}

const example = {
  customEmbeddedImage: {
    title: "Error Affirmations Jest Reporter Screenshot 1",
    url: "//images.ctfassets.net/l329ngjcm8m3/1ryCjATuECJw1xJGJlXHT3/bd6615876fa65a77a8423ff31aaf9de6/Jest_Example_Default.png",
  },
};

async function gatherProjContent() {
  if (contentfulProj !== undefined) return;
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
}
