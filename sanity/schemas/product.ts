import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'object',
      fields: [
        { name: 'id', title: 'Indonesian', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '4T Engine Oil', value: '4t' },
          { title: 'MATIC Oil', value: 'matic' },
          { title: 'Specialty', value: 'specialty' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'id', title: 'Indonesian', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({
      name: 'viscosity',
      title: 'Viscosity',
      type: 'string',
      description: 'e.g., 10W-40, 5W-40',
    }),
    defineField({
      name: 'apiStandard',
      title: 'API Standard',
      type: 'string',
      description: 'e.g., API SN',
    }),
    defineField({
      name: 'jasoStandard',
      title: 'JASO Standard',
      type: 'string',
      description: 'e.g., JASO MA2, JASO MB',
    }),
    defineField({
      name: 'volume',
      title: 'Volume (ml)',
      type: 'number',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'object',
      fields: [
        {
          name: 'id',
          title: 'Indonesian',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'recommended',
      title: 'Recommended For',
      type: 'object',
      fields: [
        {
          name: 'id',
          title: 'Indonesian',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'category',
      media: 'image',
    },
  },
});
