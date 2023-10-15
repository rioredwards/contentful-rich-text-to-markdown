// These tests use the live Contentful API to test the integration with the Contentful Rich Text API.
import { createClient } from "contentful";
import "dotenv/config";

const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  space: process.env.CONTENTFUL_SPACE_ID as string,
});

describe("Contentful Rich Text API", () => {
  it("should return a rich text document", async () => {
    const myProj = await client.getEntry(process.env.CONTENTFUL_PROJ_ID as string);
    expect(myProj).toBeDefined();
  });
});
