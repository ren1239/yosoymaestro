export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title of Art Piece",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug of Art Piece",
      options: {
        source: "title",
      },
    },
    {
      name: "titleImage",
      type: "image",
      title: "Title Image",
    },
    {
      name: "smallDescription",
      type: "text",
      title: "Small Description",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [{ type: "block" }],
    },
    {
      name: "price",
      type: "number",
      title: "Set the Price",
    },
  ],
};
