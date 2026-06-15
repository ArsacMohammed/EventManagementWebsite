"use client";

import { motion } from "framer-motion";

interface QuoteSpacerProps {
  quote: string;
}

export default function QuoteSpacer({ quote }: QuoteSpacerProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="w-full bg-cream py-24 md:py-32 flex items-center justify-center px-6 border-y border-border/20">
      <div className="max-w-[700px] text-center mx-auto">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          className="font-cormorant text-obsidian italic font-light text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide"
        >
          {quote}
        </motion.p>
      </div>
    </section>
  );
}
