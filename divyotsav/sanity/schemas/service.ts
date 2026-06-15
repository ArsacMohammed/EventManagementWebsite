const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Wedding", value: "Wedding" },
          { title: "Corporate", value: "Corporate" },
          { title: "Social Function", value: "Social Function" },
          { title: "Luxury Gifting", value: "Luxury Gifting" },
        ],
      },
    },
    { name: "sanskritLabel", title: "Sanskrit Label", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "shortDescription", title: "Short Description", type: "text" },
    { name: "fullDescription", title: "Full Description", type: "text" },
    { name: "designPhilosophy", title: "Design Philosophy", type: "text" },
    { name: "priceFrom", title: "Price From", type: "number" },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "bannerImage", title: "Banner Image", type: "image" },
    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    },
    { name: "timelineTitle", title: "Timeline Title", type: "string" },
    { name: "timelineDescription", title: "Timeline Description", type: "text" },
    { name: "order", title: "Order", type: "number" },
  ],
};

export default service;
