"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header
        className="absolute top-0 left-0 w-full z-50 bg-transparent py-8 border-transparent"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col items-center px-6 md:px-12 lg:px-20 space-y-4">
          {/* Logo / Company Title */}
          <Link href="/" className="select-none flex flex-col items-center group">
            <span className="font-jost text-3xl md:text-4xl text-cream tracking-[0.3em] uppercase font-light transition-colors group-hover:text-gold duration-300">
              DIVYOTSAV
            </span>
          </Link>

          {/* Centered Desktop Nav Links */}
          <nav className="hidden md:flex items-center justify-center space-x-10 lg:space-x-14">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-jost text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                    isActive ? "text-gold" : "text-cream hover:text-gold"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="md:hidden absolute top-8 right-6 flex flex-col justify-between w-6 h-4 group z-50 focus:outline-none"
          >
            <span
              className={`h-[1px] w-full bg-cream transition-all duration-300 ${
                isMenuOpen ? "transform rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`h-[1px] w-full bg-cream transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1px] w-full bg-cream transition-all duration-300 ${
                isMenuOpen ? "transform -rotate-45 translate-y-[-8px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-obsidian text-cream z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center space-y-8 text-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-jost text-lg uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-cream hover:text-gold"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-6">
            <Link
              href="/contact?type=Book"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block font-jost text-sm uppercase tracking-[0.2em] border border-gold px-10 py-4 text-cream transition-all duration-300 hover:bg-gold hover:text-obsidian"
              style={{ borderRadius: "0px" }}
            >
              Book Event
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
