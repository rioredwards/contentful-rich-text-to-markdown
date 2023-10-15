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
