"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
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

  const stats = [
    { num: "500+", label: "Events Curated" },
    { num: "15+", label: "Years of Excellence" },
    { num: "50+", label: "Destinations" },
    { num: "∞", label: "Smiles Sparked" },
  ];

  return (
    <section className="bg-cream-dark py-16 md:py-20 px-6 md:px-12 lg:px-20 text-obsidian overflow-hidden border-t border-b border-border-custom/30">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center text-center"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariants}
              className={`flex flex-col items-center justify-center space-y-2 relative ${
                idx > 0 ? "md:before:absolute md:before:left-0 md:before:top-1/4 md:before:h-1/2 md:before:w-[1px] md:before:bg-gold/30" : ""
              }`}
            >
              <span className="font-cormorant text-5xl md:text-7xl font-light tracking-wide text-gold">
                {stat.num}
              </span>
              <span className="font-jost text-[10px] md:text-xs uppercase tracking-[0.2em] text-warm-gray">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
