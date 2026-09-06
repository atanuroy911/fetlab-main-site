import { defineField, defineType } from "sanity";

/**
 * Inline image for rich-text bodies. Alt text is required — without it the
 * image is invisible to screen readers and to anyone whose image fails to load.
 */
export default defineType({
  name: "bodyImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "Describe what the image shows. Leave the caption for extra context — alt text stands in for the image itself.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional. Shown under the image.",
    }),
  ],
  preview: {
    select: { media: "asset", title: "alt", subtitle: "caption" },
  },
});
