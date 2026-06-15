"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface GalleryItem {
  title: string;
  image: string;
  category?: string;
}

interface GalleryScrollerProps {
  items?: GalleryItem[];
}

export default function GalleryScroller({ items }: GalleryScrollerProps) {
  const [isPaused, setIsPaused] = useState(false);

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

  const defaultGalleryItems = [
    { id: 1, title: "Royal Wedding Entry", img: "/images/gallery/1.png" },
    { id: 2, title: "Mandap Floral Architecture", img: "/images/gallery/2.png" },
    { id: 3, title: "Heritage Sangeet Night", img: "/images/gallery/3.png" },
    { id: 4, title: "Lantern Pathway Design", img: "/images/gallery/4.png" },
    { id: 5, title: "Corporate Keynote Stage", img: "/images/gallery/5.png" },
    { id: 6, title: "Grand Social Celebration", img: "/images/gallery/6.png" },
    { id: 7, title: "Authentic Ritual Lounge", img: "/images/gallery/7.png" },
  ];

  const galleryItems = items && items.length > 0
    ? items.map((item, idx) => ({
        id: idx + 1,
        title: item.title,
        img: item.image,
      }))
    : defaultGalleryItems;

  return (
    <section className="bg-obsidian py-24 md:py-32 text-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-16 px-6 md:px-12 lg:px-20">
        
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
              Portfolio
            </span>
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light tracking-wide">
            Moments frozen in time.
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scroll Strip */}
      <div
        className="w-full overflow-hidden flex whitespace-nowrap mt-8 select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          animate={{ x: isPaused ? "0%" : ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex space-x-6 pr-6 shrink-0"
        >
          {/* Copy 1 */}
          <div className="flex space-x-6 shrink-0">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="relative w-[280px] sm:w-[350px] aspect-[4/5] overflow-hidden group border border-border-custom/10 hover:border-gold/35 transition-colors duration-500"
                style={{ borderRadius: "0px" }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 280px, 350px"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0 group-hover:brightness-110"
                />
                
                {/* Hover Text Overlay */}
                <div className="absolute inset-0 bg-obsidian/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-10">
                  <h3 className="font-cormorant text-xl md:text-2xl text-cream tracking-wide">
                    {item.title}
                  </h3>
                  <span className="font-jost text-[10px] text-gold uppercase tracking-widest mt-1">
                    Divyotsav Collection
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Copy 2 (duplicate) */}
          <div className="flex space-x-6 shrink-0">
            {galleryItems.map((item) => (
              <div
                key={`dup-${item.id}`}
                className="relative w-[280px] sm:w-[350px] aspect-[4/5] overflow-hidden group border border-border-custom/10 hover:border-gold/35 transition-colors duration-500"
                style={{ borderRadius: "0px" }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 280px, 350px"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0 group-hover:brightness-110"
                />
                
                {/* Hover Text Overlay */}
                <div className="absolute inset-0 bg-obsidian/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-10">
                  <h3 className="font-cormorant text-xl md:text-2xl text-cream tracking-wide">
                    {item.title}
                  </h3>
                  <span className="font-jost text-[10px] text-gold uppercase tracking-widest mt-1">
                    Divyotsav Collection
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer hint */}
      <div className="max-w-[1440px] mx-auto text-center mt-8 px-6">
        <span className="font-jost text-[10px] text-warm-gray uppercase tracking-widest">
          ← Hover to pause · Aesthetic Craftsmanship
        </span>
      </div>
    </section>
  );
}
