import { defineField, defineType } from "sanity";

export default defineType({
  name: "notice",
  title: "Notice",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Vacancy", value: "vacancy" },
          { title: "Call for Researchers / Students", value: "call" },
          { title: "Announcement", value: "announcement" },
          { title: "Event", value: "event" },
        ],
        layout: "radio",
      },
      initialValue: "announcement",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 2,
      description: "Shown in the notices list and homepage preview.",
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "body",
      title: "Full details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "deadline",
      title: "Deadline (optional)",
      type: "datetime",
      description: "Application / response deadline, if applicable.",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Turn off to hide this notice without deleting it.",
      initialValue: true,
    }),
    defineField({
      name: "relatedGroup",
      title: "Related research group",
      type: "reference",
      to: [{ type: "researchGroup" }],
    }),
    defineField({
      name: "applyLink",
      title: "Apply / contact link",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Published date, new first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "type", active: "isActive" },
    prepare({ title, subtitle, active }) {
      return {
        title,
        subtitle: `${subtitle}${active === false ? " · hidden" : ""}`,
      };
    },
  },
});
