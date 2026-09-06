import { defineField, defineType } from "sanity";

export default defineType({
  name: "personCategory",
  title: "Person Category",
  type: "document",
  description:
    "Groups on the People page — e.g. Lab Director, Senior Research Scientist, PhD Student.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Shown as the section heading on the People page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in the People page filter URL.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional line shown under the section heading.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first on the People page.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "order" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `Order: ${subtitle ?? "—"}` }),
  },
});
