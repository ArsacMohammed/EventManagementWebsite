"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData } from "@/lib/servicesData";
import { CMSService } from "@/lib/sanity/types";

interface ServicesCatalogProps {
  initialServices: CMSService[];
}

export default function ServicesCatalog({ initialServices }: ServicesCatalogProps) {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Wedding", "Corporate", "Social Function", "Luxury Gifting"];

  const services = initialServices && initialServices.length > 0 ? initialServices : servicesData;

  const filteredServices = filter === "All"
    ? services
    : services.filter(s => s.category === filter);

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
    <div className="w-full">
      {/* Editorial Hero Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="flex flex-col items-center space-y-4"
        >
          <span className="font-devanagari text-gold text-sm tracking-[0.2em] uppercase">
            दिव्योत्सव • OUR OFFERINGS
          </span>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-wide text-obsidian max-w-3xl leading-tight">
            We Invoke Divine Celebrations.
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-xl font-light leading-relaxed">
            Every ritual is a design, every gathering is an installation. Browse our catalog of luxury bespoke events.
          </p>
        </motion.div>
      </div>

      {/* Filter Section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-12 flex justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="flex flex-wrap gap-3 justify-center"
        >
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? "border border-gold text-gold bg-transparent"
                    : "border border-border-custom text-warm-gray hover:text-obsidian hover:border-obsidian bg-transparent"
                }`}
                style={{ borderRadius: "0px" }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Service Card Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-28">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {filteredServices.map((service) => (
            <motion.div
              layout
              key={service.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariants}
              className="border border-border-custom bg-cream p-8 md:p-10 flex flex-col justify-between h-[400px] hover:border-gold transition-colors duration-300"
              style={{ borderRadius: "0px" }}
            >
              <div className="flex flex-col space-y-4">
                <span className="font-devanagari text-gold text-xs block">
                  {service.sanskritLabel}
                </span>
                <h3 className="font-cormorant text-2xl md:text-3xl font-light text-obsidian">
                  {service.title}
                </h3>
                <p className="text-warm-gray text-sm font-light leading-relaxed max-w-[280px]">
                  {service.shortDescription}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-border-custom/35">
                <span className="text-xs uppercase tracking-widest text-gold">
                  Starting ₹{service.priceFrom.toLocaleString("en-IN")}
                </span>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-xs text-obsidian uppercase tracking-widest hover:text-gold transition-colors duration-300 font-medium"
                >
                  <span>Explore</span>
                  <svg className="w-3.5 h-3.5 ml-1.5 stroke-current fill-none" viewBox="0 0 12 12">
                    <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.5" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Cultural Significance Alternating Timeline */}
      <div className="bg-cream-dark py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-border-custom/20">
        <div className="max-w-[1440px] mx-auto flex flex-col space-y-20">
          
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="flex flex-col items-start space-y-4"
          >
            <div className="flex items-center space-x-2">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="font-jost text-xs uppercase tracking-[0.2em] text-gold">
                Deep Roots
              </span>
            </div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light tracking-wide text-obsidian">
              Cultural Significance
            </h2>
          </motion.div>

          {/* Timeline entries */}
          <div className="flex flex-col space-y-16 md:space-y-24">
            {services.map((service, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={service.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUpVariants}
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 md:gap-16 lg:gap-24`}
                >
                  {/* Timeline Index */}
                  <div className="flex flex-col items-start min-w-[60px] font-cormorant text-5xl text-gold/30 font-light select-none">
                    0{idx + 1}
                  </div>

                  {/* Content block */}
                  <div className="flex-1 flex flex-col space-y-4 max-w-xl">
                    <span className="font-devanagari text-gold text-xs tracking-wider">
                      {service.sanskritLabel}
                    </span>
                    <h3 className="font-cormorant text-2xl md:text-3xl font-light text-obsidian">
                      {service.timelineTitle}
                    </h3>
                    <p className="text-warm-gray text-sm md:text-base font-light leading-relaxed">
                      {service.timelineDescription}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
