"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress of this section relative to the viewport.
  // "start end" → slide bottom touches viewport bottom (entering from below)
  // "end start" → slide top leaves viewport top (exiting upward)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax scale: image starts slightly zoomed in as the slide enters
  // from below and settles to normal scale when fully in view.
  // Gives the same cinematic push-in feel as sabyasachi.com.
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.05]);

  // Very subtle vertical shift on the image (parallax depth)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // Staggered text reveal variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1] as const, // expo-out for an editorial deceleration
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="snap-section relative w-full flex items-center justify-center bg-obsidian overflow-hidden select-none"
      style={{ height: "100dvh" }}
    >
      {/* Parallax background image — scale + translateY driven by scroll position */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale, y: imageY }}
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

      {/* Slide content — bottom-anchored, staggered fade-up on enter */}
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
