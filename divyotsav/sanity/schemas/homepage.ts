const homepage = {
  name: "homepage",
  title: "Homepage Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Homepage Layout",
      readOnly: true,
    },
    {
      name: "sections",
      title: "Slides & Quotes",
      description: "Manage the sequence of cinematic slides and quotes on the homepage",
      type: "array",
      of: [
        {
          name: "cinematicSlide",
          title: "Cinematic Slide",
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "subtitle", title: "Subtitle", type: "string" },
            { name: "image", title: "Background Image", type: "image", options: { hotspot: true } },
            { name: "buttonText", title: "Button Text", type: "string" },
            { name: "buttonLink", title: "Button Link", type: "string" },
            { name: "altText", title: "Alt Text", type: "string" },
          ],
          preview: {
            select: {
              title: "heading",
              subtitle: "subtitle",
              media: "image",
            },
            prepare(selection: any) {
              const { title, subtitle, media } = selection;
              return {
                title: title || "Untitled Cinematic Slide",
                subtitle: subtitle || "Cinematic Slide",
                media,
              };
            },
          },
        },
        {
          name: "quoteSpacer",
          title: "Quote Spacer",
          type: "object",
          fields: [
            { name: "quote", title: "Quote Content", type: "text", rows: 3 },
          ],
          preview: {
            select: {
              quote: "quote",
            },
            prepare(selection: any) {
              const { quote } = selection;
              return {
                title: quote ? `Quote: "${quote.substring(0, 50)}..."` : "Empty Quote Spacer",
                subtitle: "Quote Section",
              };
            },
          },
        },
      ],
    },
  ],
};

export default homepage;
