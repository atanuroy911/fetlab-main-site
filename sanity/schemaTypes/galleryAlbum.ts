import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "galleryAlbum",
  title: "Gallery Album",
  type: "document",
  description: "A set of photos from an event, visit, workshop, or field trip.",
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
      name: "date",
      title: "Date",
      type: "date",
      description: "When these photos were taken. Albums are listed newest first.",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Shown on the album page and in link previews.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. ULAB, Dhaka",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Shown on the gallery index. Defaults to the first photo if empty.",
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description:
                "Describe the photo for screen readers and for when the image fails to load.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional caption shown under the photo.",
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "relatedGroup",
      title: "Related research group",
      type: "reference",
      to: [{ type: "researchGroup" }],
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Turn off to hide this album without deleting it.",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Date, new first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "coverImage" },
  },
});
