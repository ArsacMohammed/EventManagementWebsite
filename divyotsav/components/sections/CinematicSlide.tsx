"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CinematicSlideProps {
  imageSrc: string;
  heading: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  priority?: boolean;
  altText?: string;
}

export default function CinematicSlide({
  imageSrc,
  heading,
  subtitle,
  buttonText = "EXPLORE",
  buttonLink = "/services",
  priority = false,
  altText,
}: CinematicSlideProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 25 },
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
    <section
      className="relative w-full flex items-center justify-center bg-obsidian overflow-hidden select-none"
      style={{ height: "100dvh" }}
    >
      {/* Background Media - Standard next/image with absolute fill */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt={altText || heading}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Subtle overlay to enhance text readability */}
      <div className="absolute inset-0 bg-obsidian/40 z-10" />

      {/* Slide Content overlay - Centered at the bottom */}
      <div className="absolute bottom-20 md:bottom-28 left-0 w-full z-20 flex flex-col items-center justify-center text-center px-6 safe-b">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Sanskrit Tagline or Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeUpVariants}
              className="font-jost text-cream/90 font-light text-xs md:text-sm tracking-[0.2em] uppercase mb-4"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Main Slide Title */}
          <motion.h2
            variants={fadeUpVariants}
            className="font-cormorant text-cream font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] uppercase mb-8 leading-tight"
          >
            {heading}
          </motion.h2>

          {/* Outlined Action Button */}
          {buttonText && (
            <motion.div
              variants={fadeUpVariants}
              className="flex justify-center items-center font-jost"
            >
              <Link
                href={buttonLink}
                className="text-center font-jost text-[10px] md:text-xs uppercase tracking-[0.25em] border border-cream text-cream px-10 py-4 hover:bg-cream hover:text-obsidian transition-all duration-500 ease-in-out"
                style={{ borderRadius: "0px" }}
              >
                {buttonText}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
