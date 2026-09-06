import { defineField, defineType } from "sanity";

export default defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "string" }],
      description: "In citation order, e.g. \"Ashraful Kadir\", \"Atanu Shuvam Roy\".",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(1990).max(2100),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      description: "Journal, conference, or publisher name.",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Journal Article", value: "journal" },
          { title: "Conference Paper", value: "conference" },
          { title: "Preprint", value: "preprint" },
          { title: "Thesis", value: "thesis" },
          { title: "Report", value: "report" },
        ],
      },
      initialValue: "journal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "doiUrl", title: "DOI / paper link", type: "url" }),
    defineField({ name: "pdfUrl", title: "PDF link", type: "url" }),
    defineField({
      name: "tags",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "relatedGroup",
      title: "Related research group",
      type: "reference",
      to: [{ type: "researchGroup" }],
    }),
    defineField({
      name: "isFeatured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Year, newest first",
      name: "yearDesc",
      by: [
        { field: "year", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? String(subtitle) : undefined };
    },
  },
});
