"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { CMSService } from "@/lib/sanity/types";

interface ServicesBentoProps {
  services?: CMSService[];
}

export default function ServicesBento({ services }: ServicesBentoProps) {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

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

  const bentoCards = [
    {
      title: "Weddings",
      sanskrit: "विवाह (Vivah)",
      desc: "Sacred Unions, Timeless Elegance",
      slug: "weddings",
      cols: "lg:col-span-2",
    },
    {
      title: "Corporate Events",
      sanskrit: "आयोजन (Aayojan)",
      desc: "Boardroom Precision, Grand Celebration",
      slug: "corporate-events",
      cols: "lg:col-span-1",
    },
    {
      title: "Social Functions",
      sanskrit: "सामुदायिक उत्सव",
      desc: "Community Bonded by Tradition",
      slug: "social-functions",
      cols: "lg:col-span-1",
    },
    {
      title: "Luxury Gifting",
      sanskrit: "उपहार (Upahaar)",
      desc: "Curated Tokens of Devotion",
      slug: "luxury-gifting",
      cols: "lg:col-span-2",
    },
  ];

  const cards = services && services.length > 0
    ? services.map((s, idx) => ({
        title: s.title,
        sanskrit: s.sanskritLabel,
        desc: s.shortDescription || s.tagline,
        slug: s.slug,
        cols: idx % 4 === 0 || idx % 4 === 3 ? "lg:col-span-2" : "lg:col-span-1",
      }))
    : bentoCards;

  const marqueeText = [
    "500+ events curated",
    "15+ years of excellence",
    "royal weddings",
    "corporate galas",
    "luxury gifting",
    "social celebrations",
    "pan india",
  ];

  return (
    <section className="bg-obsidian py-24 md:py-32 px-6 md:px-12 lg:px-20 text-cream overflow-hidden">
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
              What We Invoke
            </span>
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light tracking-wide">
            Our Sacred Craft
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 font-jost">
          {cards.map((card) => (
            <motion.div
              key={card.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariants}
              className={`group relative border border-border-custom/20 bg-obsidian p-8 md:p-12 transition-all duration-300 hover:border-gold hover:-translate-y-1 ${card.cols}`}
              style={{ borderRadius: "0px" }}
            >
              <div className="flex flex-col h-full justify-between space-y-8">
                <div>
                  <span className="font-devanagari text-gold text-xs block mb-2">
                    {card.sanskrit}
                  </span>
                  <h3 className="font-cormorant text-2xl md:text-3xl font-light text-cream mb-4">
                    {card.title}
                  </h3>
                  <p className="text-warm-gray text-sm font-light leading-relaxed max-w-[280px]">
                    {card.desc}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/services/${card.slug}`}
                    className="inline-flex items-center text-xs text-gold uppercase tracking-widest hover:text-cream transition-colors duration-300"
                  >
                    <span>Explore</span>
                    <svg className="w-3 h-3 ml-2 stroke-current fill-none" viewBox="0 0 12 12">
                      <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Link */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-center pt-4"
        >
          <Link
            href="/services"
            className="inline-flex items-center text-xs text-gold uppercase tracking-[0.2em] border-b border-gold/40 pb-1 hover:border-gold hover:text-cream transition-colors duration-300"
          >
            Explore All Our Services
          </Link>
        </motion.div>

        {/* Infinite Marquee */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
          className="overflow-hidden flex whitespace-nowrap w-full border-t border-b border-gold/10 py-8 cursor-default"
        >
          <motion.div
            animate={{ x: isMarqueePaused ? "0%" : ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            className="flex space-x-12 text-[10px] uppercase tracking-[0.25em] text-cream/30"
          >
            {/* 1st copy */}
            <div className="flex space-x-12 shrink-0">
              {marqueeText.map((t, idx) => (
                <span key={idx} className="flex items-center space-x-12">
                  <span>{t}</span>
                  <span className="text-gold">•</span>
                </span>
              ))}
            </div>
            {/* 2nd copy */}
            <div className="flex space-x-12 shrink-0">
              {marqueeText.map((t, idx) => (
                <span key={`dup-${idx}`} className="flex items-center space-x-12">
                  <span>{t}</span>
                  <span className="text-gold">•</span>
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
