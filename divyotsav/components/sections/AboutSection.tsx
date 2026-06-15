"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
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

  return (
    <section className="bg-cream py-24 md:py-32 px-6 md:px-12 lg:px-20 text-obsidian overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Image with border trick */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="relative w-full aspect-[3/4] max-w-[500px] mx-auto group"
        >
          {/* Subtle gold border accent bottom-left corner */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-gold pointer-events-none" />
          
          <div className="w-full h-full relative overflow-hidden" style={{ borderRadius: "0px" }}>
            <Image
              src="/images/about-bride.png"
              alt="Indian Bride - Editorial Representation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Column: Narrative content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex flex-col items-start space-y-8"
        >
          {/* Section Label */}
          <div className="flex items-center space-x-2">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="font-jost text-xs uppercase tracking-[0.2em] text-gold">
              Our Story
            </span>
          </div>

          <h2 className="font-cormorant text-4xl md:text-5xl font-light leading-tight">
            Divyotsav is born of a sacred vision.
          </h2>

          <div className="flex flex-col space-y-6 text-warm-gray font-light text-base md:text-lg max-w-xl font-jost leading-relaxed">
            <p>
              We believe in spaces where ancient geometry and timeless cultural rituals meet modern design excellence. Every detail is curated to create sensory depth.
            </p>
            <p>
              From cinematic lighting installations to hand-forged brass details and meticulously planned guest flows, our team shapes environments that reflect your heritage with quiet, restrained luxury.
            </p>
          </div>

          {/* EST 2011 badge */}
          <div className="border border-gold px-6 py-2 text-gold text-xs uppercase tracking-widest font-jost" style={{ borderRadius: "0px" }}>
            EST. 2011
          </div>
        </motion.div>
      </div>
    </section>
  );
}
