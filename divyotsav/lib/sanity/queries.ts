export const allServicesQuery = `*[_type == "service"] | order(order asc) {
  title,
  "slug": slug.current,
  category,
  sanskritLabel,
  tagline,
  shortDescription,
  fullDescription,
  designPhilosophy,
  priceFrom,
  features,
  "bannerImage": bannerImage.asset->url,
  "galleryImages": galleryImages[].asset->url,
  timelineTitle,
  timelineDescription,
  order
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  category,
  sanskritLabel,
  tagline,
  shortDescription,
  fullDescription,
  designPhilosophy,
  priceFrom,
  features,
  "bannerImage": bannerImage.asset->url,
  "galleryImages": galleryImages[].asset->url,
  timelineTitle,
  timelineDescription
}`;

export const allTestimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  clientName,
  eventType,
  eventDate,
  rating,
  quote
}`;

export const allGalleryItemsQuery = `*[_type == "galleryItem"] | order(order asc) {
  title,
  "image": image.asset->url,
  category
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  tagline,
  "heroVideoUrl": heroVideoUrl.asset->url,
  whatsappNumber,
  instagramHandle,
  facebookUrl,
  email,
  phone,
  address,
  consultationHours,
  googleMapsUrl,
  metaTitle,
  metaDescription
}`;

export const homepageQuery = `*[_type == "homepage"][0] {
  sections[] {
    _type,
    _type == "cinematicSlide" => {
      heading,
      subtitle,
      "image": image.asset->url,
      buttonText,
      buttonLink,
      altText
    },
    _type == "quoteSpacer" => {
      quote
    }
  }
}`;
