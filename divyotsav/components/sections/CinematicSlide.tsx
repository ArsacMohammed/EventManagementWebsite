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
  // Ken Burns: image starts zoomed-in and settles to natural scale when the
  // section enters the viewport. Uses whileInView (IntersectionObserver) so
  // it fires ONCE on entry — no continuous scroll listeners, no jank.
  const imageVariants = {
    hidden: { scale: 1.08, opacity: 0.85 },
    visible: {
      scale: 1.0,
      opacity: 1,
      transition: {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1] as const, // expo-out — cinematic deceleration
      },
    },
  };

  // Staggered text reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      className="snap-section relative w-full flex items-center justify-center bg-obsidian overflow-hidden select-none"
      style={{ height: "100dvh" }}
    >
      {/* Ken Burns background image — GPU-composited via will-change: transform.
          Scale animates on IntersectionObserver entry, NOT on every scroll frame. */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "0px" }}
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src={imageSrc}
            alt={altText || heading}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
        </motion.div>
      </div>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-obsidian/35 z-10" />

      {/* Slide content — bottom-anchored, staggered fade-up on section enter */}
      <div className="absolute bottom-20 md:bottom-28 left-0 w-full z-20 flex flex-col items-center justify-center text-center px-6 safe-b">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Sanskrit subtitle / tagline */}
          {subtitle && (
            <motion.p
              variants={fadeUpVariants}
              className="font-jost text-cream/80 font-light text-[10px] md:text-xs tracking-[0.25em] uppercase mb-5"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Main heading */}
          <motion.h2
            variants={fadeUpVariants}
            className="font-cormorant text-cream font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] uppercase mb-8 leading-tight"
          >
            {heading}
          </motion.h2>

          {/* Outlined CTA button */}
          {buttonText && (
            <motion.div
              variants={fadeUpVariants}
              className="flex justify-center items-center"
            >
              <Link
                href={buttonLink}
                className="font-jost text-[10px] md:text-xs uppercase tracking-[0.28em] border border-cream text-cream px-10 py-4 hover:bg-cream hover:text-obsidian transition-colors duration-500"
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
