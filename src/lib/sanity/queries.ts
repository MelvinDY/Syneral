import { groq } from 'next-sanity';

export const productsQuery = groq`
  *[_type == "product"] | order(order asc) {
    _id,
    name,
    slug,
    category,
    image,
    description,
    viscosity,
    apiStandard,
    jasoStandard,
    volume,
    features,
    recommended,
    isFeatured
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && isFeatured == true] | order(order asc) {
    _id,
    name,
    slug,
    category,
    image,
    description,
    viscosity,
    apiStandard,
    jasoStandard,
    volume
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    category,
    image,
    description,
    viscosity,
    apiStandard,
    jasoStandard,
    volume,
    features,
    recommended
  }
`;

export const dealersQuery = groq`
  *[_type == "dealer" && isActive == true] | order(city asc) {
    _id,
    name,
    address,
    city,
    province,
    coordinates,
    phone,
    whatsapp,
    operatingHours
  }
`;

export const promotionsQuery = groq`
  *[_type == "promotion" && isActive == true] | order(endDate desc) {
    _id,
    title,
    slug,
    image,
    description,
    startDate,
    endDate
  }
`;

export const activePromotionsQuery = groq`
  *[_type == "promotion" && isActive == true && endDate > now()] | order(endDate asc) {
    _id,
    title,
    slug,
    image,
    description,
    startDate,
    endDate
  }
`;

export const promotionBySlugQuery = groq`
  *[_type == "promotion" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    image,
    description,
    terms,
    startDate,
    endDate
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    logo,
    companyName,
    tagline,
    contact,
    address,
    operatingHours,
    social
  }
`;
