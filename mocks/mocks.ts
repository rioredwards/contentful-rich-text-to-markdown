import { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";

export const basicRichText: Document = {
  data: {},
  content: [
    {
      data: {},
      content: [
        {
          data: {},
          marks: [],
          value: "A classic game of Tic Tac Toe for the Command Line.",
          nodeType: "text",
        },
      ],
      nodeType: BLOCKS.PARAGRAPH,
    },
  ],
  nodeType: BLOCKS.DOCUMENT,
};

export const richTextWithList: Document = {
  data: {},
  content: [
    {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "Designed using OOP principles",
                  nodeType: "text",
                },
              ],
              nodeType: BLOCKS.PARAGRAPH,
            },
          ],
          nodeType: BLOCKS.LIST_ITEM,
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "Intuitive Command Line Interface",
                  nodeType: "text",
                },
              ],
              nodeType: BLOCKS.PARAGRAPH,
            },
          ],
          nodeType: BLOCKS.LIST_ITEM,
        },
      ],
      nodeType: BLOCKS.UL_LIST,
    },
  ],
  nodeType: BLOCKS.DOCUMENT,
};

export const richTextWithCodeBlock: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        { nodeType: "text", value: "1. Download and cd into the project", marks: [], data: {} },
      ],
    },
    {
      nodeType: BLOCKS.EMBEDDED_ENTRY,
      data: {
        target: {
          metadata: { tags: [] },
          sys: {
            space: { sys: { type: "Link", linkType: "Space", id: "l329ngjcm8m3" } },
            id: "6IoowmQ4rIHAP4rHezXIvX",
            type: "Entry",
            createdAt: "2023-10-15T22:36:59.968Z",
            updatedAt: "2023-10-16T04:49:29.650Z",
            environment: { sys: { id: "master", type: "Link", linkType: "Environment" } },
            revision: 5,
            contentType: { sys: { type: "Link", linkType: "ContentType", id: "codeBlock" } },
            locale: "en-US",
          },
          fields: {
            title: "Tic Tac Toe Download",
            content: "git clone https://github.com/rioredwards/Tic-Tac-Toe.git\\ncd Tic-Tac-Toe",
            language: "bash",
          },
        },
      },
      content: [],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "2. Compile source code into binary (executable) file",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.EMBEDDED_ENTRY,
      data: {
        target: {
          metadata: { tags: [] },
          sys: {
            space: { sys: { type: "Link", linkType: "Space", id: "l329ngjcm8m3" } },
            id: "2WVtiGV7KEvIVNDJoEe50d",
            type: "Entry",
            createdAt: "2023-10-16T04:44:29.573Z",
            updatedAt: "2023-10-16T04:44:29.573Z",
            environment: { sys: { id: "master", type: "Link", linkType: "Environment" } },
            revision: 1,
            contentType: { sys: { type: "Link", linkType: "ContentType", id: "codeBlock" } },
            locale: "en-US",
          },
          fields: { title: "Tic Tac Toe Compile Into Binary", content: "make", language: "bash" },
        },
      },
      content: [],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [{ nodeType: "text", value: "3. Run the executable file", marks: [], data: {} }],
    },
    {
      nodeType: BLOCKS.EMBEDDED_ENTRY,
      data: {
        target: {
          metadata: { tags: [] },
          sys: {
            space: { sys: { type: "Link", linkType: "Space", id: "l329ngjcm8m3" } },
            id: "Vv8gPIT5uLr3353UjiGBt",
            type: "Entry",
            createdAt: "2023-10-16T04:45:22.572Z",
            updatedAt: "2023-10-16T04:45:22.572Z",
            environment: { sys: { id: "master", type: "Link", linkType: "Environment" } },
            revision: 1,
            contentType: { sys: { type: "Link", linkType: "ContentType", id: "codeBlock" } },
            locale: "en-US",
          },
          fields: { title: "Tic Tac Toe Run Executable", content: "./main", language: "bash" },
        },
      },
      content: [],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [{ nodeType: "text", value: "", marks: [], data: {} }],
    },
  ],
};
