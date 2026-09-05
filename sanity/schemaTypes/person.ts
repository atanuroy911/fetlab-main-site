import { defineField, defineType } from "sanity";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role at FETLAB",
      type: "string",
      description: "e.g. Founder & Director, Founder / Core Leadership, Group Leader, Student Researcher",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "affiliation",
      title: "External affiliation",
      type: "string",
      description: "e.g. Assistant Professor, Dept. of CSE, ULAB",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Founder & Leadership", value: "leadership" },
          { title: "Core Team", value: "core" },
          { title: "Researcher / Faculty", value: "researcher" },
          { title: "Student Researcher", value: "student" },
          { title: "Collaborator", value: "collaborator" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Short bio", type: "text", rows: 3 }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "website", title: "Website / profile link", type: "url" }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first within a category.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
