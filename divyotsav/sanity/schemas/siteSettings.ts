const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "heroVideoUrl", title: "Hero Video File", type: "file" },
    { name: "whatsappNumber", title: "WhatsApp Number", type: "string" },
    { name: "instagramHandle", title: "Instagram Handle", type: "string" },
    { name: "facebookUrl", title: "Facebook URL", type: "url" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "address", title: "Address", type: "text" },
    { name: "consultationHours", title: "Consultation Hours", type: "string" },
    { name: "googleMapsUrl", title: "Google Maps Embed URL", type: "text", description: "The source URL inside the Google Maps iframe code (starts with https://www.google.com/maps/embed...)" },
    { name: "metaTitle", title: "Meta Title", type: "string" },
    { name: "metaDescription", title: "Meta Description", type: "text" },
  ],
};

export default siteSettings;
