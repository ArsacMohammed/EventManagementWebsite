"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

interface HeroSectionProps {
  videoUrl?: string;
  tagline?: string;
}

export default function HeroSection({ videoUrl, tagline }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

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

  // Stable, high-quality royalty-free cinematic wedding stock video preview URL
  const defaultVideo = "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-bride-and-groom-holding-hands-42290-large.mp4";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-obsidian overflow-hidden select-none">
      
      {/* Background Media - Plays on all screen sizes */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="/images/hero-poster.png"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl || defaultVideo} type="video/mp4" />
      </video>

      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-obsidian/45 z-10" />

      {/* Hero Content - Placed at the bottom of the viewport */}
      <div className="absolute bottom-28 left-0 w-full z-20 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Main Tagline/Heading */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-jost text-cream font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.25em] uppercase mb-8"
          >
            {tagline || "15 YEARS DIVYOTSAV"}
          </motion.h1>

          {/* WATCH NOW Button */}
          <motion.div
            variants={fadeUpVariants}
            className="flex justify-center items-center font-jost"
          >
            <Link
              href="/services"
              className="text-center font-jost text-[10px] uppercase tracking-[0.25em] border border-cream text-cream px-10 py-4.5 hover:bg-cream hover:text-obsidian transition-all duration-500 ease-in-out"
              style={{ borderRadius: "0px" }}
            >
              WATCH NOW
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Play/Pause Control (Bottom Right) */}
      <button
        onClick={togglePlay}
        className="absolute bottom-10 right-6 md:right-12 lg:right-20 z-30 flex items-center justify-center w-12 h-12 border border-cream/50 text-cream hover:border-cream bg-transparent transition-colors duration-300"
        style={{ borderRadius: "0px" }}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

    </section>
  );
}
