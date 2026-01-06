import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'dealer',
  title: 'Dealer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Dealer Name',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'province',
      title: 'Province',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'object',
      fields: [
        { name: 'id', title: 'Indonesian', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
    },
  },
});
