import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site title", type: "string", initialValue: "FETLAB" }),
    defineField({
      name: "heroHeadline",
      title: "Homepage hero headline",
      type: "string",
      initialValue: "Exploring emerging technologies. Addressing complex challenges.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Homepage hero supporting text",
      type: "text",
      rows: 2,
      initialValue:
        "An open multidisciplinary research, innovation, and collaboration platform connecting people, ideas, technologies, and institutions.",
    }),
    defineField({ name: "whatIsFetlab", title: "\"What is FETLAB?\" text", type: "text", rows: 4 }),
    defineField({ name: "mission", title: "Mission statement", type: "text", rows: 3 }),
    defineField({ name: "vision", title: "Vision statement", type: "text", rows: 3 }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
