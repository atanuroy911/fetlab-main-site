import { defineField, defineType } from "sanity";

export default defineType({
  name: "researchGroup",
  title: "Research Group / Initiative / Forum",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "shortTitle",
      title: "Short title (for navigation)",
      type: "string",
      description: "Used where space is limited, e.g. cards and nav.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Research Group", value: "group" },
          { title: "Research / Innovation Initiative", value: "initiative" },
          { title: "Community Forum", value: "forum" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "themes",
      title: "Research themes / tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "leaders",
      title: "Group leader(s)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
    }),
    defineField({
      name: "isFeatured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "kind" },
  },
});
