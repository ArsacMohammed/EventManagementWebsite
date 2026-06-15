const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "clientName", title: "Client Name", type: "string" },
    { name: "eventType", title: "Event Type", type: "string" },
    { name: "eventDate", title: "Event Date", type: "date" },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    { name: "quote", title: "Quote", type: "text" },
    { name: "order", title: "Order", type: "number" },
  ],
};

export default testimonial;
