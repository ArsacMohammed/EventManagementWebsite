"use client";

import { motion } from "framer-motion";

interface TestimonialItem {
  clientName: string;
  eventType: string;
  rating?: number;
  quote: string;
}

interface TestimonialsProps {
  testimonials?: TestimonialItem[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const defaultTestimonials = [
    {
      name: "Rohan & Anjali",
      event: "Royal Palace Wedding",
      quote: "The entire event felt like a dream. The visual depth, the meticulous planning of custom guest flows, and the grand floral mandap architecture left everyone in absolute awe.",
    },
    {
      name: "Amit Sharma",
      event: "TechCorp Annual Gala",
      quote: "Flawless execution under tight timelines. Divyotsav combined courtroom precision with pure design grandeur. A benchmark corporate celebration that our team will talk about for years.",
    },
    {
      name: "Mrs. Kapoor & Family",
      event: "Diwali Mega Utsav",
      quote: "The authenticity of the rituals was beautifully preserved while introducing contemporary luxury installations. The custom favor hampers carried the true soul of celebration.",
    },
    {
      name: "Dr. Verma",
      event: "Silver Anniversary Party",
      quote: "Our silver anniversary was a masterclass in details. The hand-crafted brass favors, lantern paths, and heritage music lounges made it intimate yet incredibly grand.",
    },
  ];

  const displayTestimonials = testimonials && testimonials.length > 0
    ? testimonials.map((t) => ({
        name: t.clientName,
        event: t.eventType,
        quote: t.quote,
      }))
    : defaultTestimonials;

  return (
    <section className="bg-cream py-24 md:py-32 px-6 md:px-12 lg:px-20 text-obsidian overflow-hidden border-t border-border-custom/20">
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col items-start space-y-4"
        >
          <div className="flex items-center space-x-2">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="font-jost text-xs uppercase tracking-[0.2em] text-gold">
              Reflections
            </span>
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light tracking-wide">
            What Our Clients Feel
          </h2>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {displayTestimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariants}
              className="border border-border-custom bg-cream p-8 md:p-12 flex flex-col justify-between space-y-8 hover:border-gold transition-colors duration-300"
              style={{ borderRadius: "0px" }}
            >
              <div className="flex flex-col space-y-4">
                {/* 5 Stars */}
                <div className="flex space-x-1 text-gold text-sm select-none">
                  {"★".repeat(5)}
                </div>
                <blockquote className="font-cormorant text-lg md:text-xl italic font-light text-obsidian leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>
              <div className="flex flex-col font-jost text-xs tracking-widest uppercase">
                <cite className="font-medium text-obsidian not-italic">{item.name}</cite>
                <span className="text-warm-gray mt-1 text-[10px]">{item.event}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
