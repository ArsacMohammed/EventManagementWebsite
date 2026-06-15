"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Weddings",
    eventDate: "",
    message: "",
    botcheck: "",
  });

  const [status, setStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.botcheck) {
      setStatus("SUCCESS"); // Fail silently to confuse spam bots
      return;
    }

    setStatus("LOADING");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("SUCCESS");
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "Weddings",
          eventDate: "",
          message: "",
          botcheck: "",
        });
      } else {
        setStatus("ERROR");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("ERROR");
      setErrorMessage("Network error. Please try again later.");
    }
  };

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

  const contactCards = [
    { title: "Phone", value: "+91 98765 43210", link: "tel:+919876543210" },
    { title: "Email", value: "hello@divyotsav.com", link: "mailto:hello@divyotsav.com" },
    { title: "Instagram", value: "@divyotsav", link: "https://instagram.com/divyotsav" },
    { title: "Consultation Hours", value: "Mon–Sat · 10:00 AM – 7:00 PM IST", link: null },
  ];

  return (
    <main className="min-h-screen bg-cream text-obsidian pt-32 pb-24 font-jost">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Editorial Hero Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex flex-col items-center space-y-4"
          >
            <div className="flex items-center space-x-2">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="font-jost text-xs uppercase tracking-[0.2em] text-gold">
                Connect With Us
              </span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-wide text-obsidian max-w-3xl leading-tight pt-2">
              Let&apos;s Begin Your Story
            </h1>
            <p className="font-cormorant italic text-gold text-lg md:text-xl font-light">
              &ldquo;Every great celebration starts with a conversation.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20 items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="border border-border-custom bg-cream p-8 md:p-12"
            style={{ borderRadius: "0px" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              
              {/* Web3Forms Honeypot */}
              <input
                type="text"
                name="botcheck"
                value={formData.botcheck}
                onChange={handleChange}
                className="hidden"
              />

              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-gold font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border border-border-custom px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-obsidian"
                  style={{ borderRadius: "0px" }}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email & Phone side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-gold font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent border border-border-custom px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-obsidian"
                    style={{ borderRadius: "0px" }}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="text-xs uppercase tracking-widest text-gold font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-transparent border border-border-custom px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-obsidian"
                    style={{ borderRadius: "0px" }}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Event Type & Date side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="eventType" className="text-xs uppercase tracking-widest text-gold font-medium">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="bg-transparent border border-border-custom px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-obsidian"
                    style={{ borderRadius: "0px" }}
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Corporate Events">Corporate Events</option>
                    <option value="Social Functions">Social Functions</option>
                    <option value="Luxury Gifting">Luxury Gifting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="eventDate" className="text-xs uppercase tracking-widest text-gold font-medium">
                    Desired Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="bg-transparent border border-border-custom px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-obsidian"
                    style={{ borderRadius: "0px" }}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-gold font-medium">
                  Your Vision
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-transparent border border-border-custom px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-obsidian resize-none"
                  style={{ borderRadius: "0px" }}
                  placeholder="Tell us about the celebration you invoke..."
                />
              </div>

              {/* Button & Submission States */}
              <div>
                <button
                  type="submit"
                  disabled={status === "LOADING"}
                  className="w-full text-center inline-block font-jost text-xs uppercase tracking-[0.2em] border border-gold bg-gold text-obsidian px-10 py-4 transition-all duration-300 hover:bg-transparent hover:text-obsidian disabled:opacity-50"
                  style={{ borderRadius: "0px" }}
                >
                  {status === "LOADING" ? "Sending..." : "Send Enquiry"}
                </button>
              </div>

              {status === "SUCCESS" && (
                <div className="text-xs text-emerald-600 uppercase tracking-widest mt-4 text-center font-medium">
                  ✓ Thank you. Your inquiry has been sent. We will speak soon.
                </div>
              )}

              {status === "ERROR" && (
                <div className="text-xs text-rose-600 uppercase tracking-widest mt-4 text-center font-medium">
                  ✗ Error: {errorMessage}
                </div>
              )}

            </form>
          </motion.div>

          {/* Right Column: Contact Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="flex flex-col space-y-8"
          >
            {/* 2x2 Grid of details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="border border-border-custom p-6 bg-cream flex flex-col space-y-2"
                  style={{ borderRadius: "0px" }}
                >
                  <span className="text-[10px] text-gold uppercase tracking-[0.2em]">
                    {card.title}
                  </span>
                  {card.link ? (
                    <a
                      href={card.link}
                      target={card.link.startsWith("http") ? "_blank" : undefined}
                      rel={card.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-base text-obsidian hover:text-gold transition-colors"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="text-base text-obsidian">{card.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Full width Address Card */}
            <div
              className="border border-border-custom p-8 bg-cream flex flex-col space-y-2"
              style={{ borderRadius: "0px" }}
            >
              <span className="text-[10px] text-gold uppercase tracking-[0.2em]">
                Address
              </span>
              <p className="text-base text-obsidian leading-relaxed">
                108, Sanskriti Heights, Luxury Avenue, Colaba, Mumbai – 400005, Maharashtra, India
              </p>
            </div>
          </motion.div>

        </div>

        {/* Embedded Google Map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="w-full aspect-[21/9] border border-border-custom overflow-hidden"
          style={{ borderRadius: "0px" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.22564251786!2d72.8228514757342!3d18.909249782522775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e8c0e2a39f%3A0xe54cfeb9efcb006c!2sColaba%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718440000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Divyotsav Location Map"
          />
        </motion.div>

      </div>
    </main>
  );
}
