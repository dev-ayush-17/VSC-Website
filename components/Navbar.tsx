"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Menu, X, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      id="main-navbar"
    >
      <div className="navbar__container">
        <Link href="/" className="navbar__logo" id="nav-logo">
          <Image
            src="/logo.png"
            alt="VSC Logo"
            width={45}
            height={45}
            className="navbar__logo-img"
          />
          <div className="navbar__logo-text">
            <span className="navbar__logo-title">VSC</span>
            <span className="navbar__logo-subtitle">NIT Patna</span>
          </div>
        </Link>

        <div className="navbar__links-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__link ${
                pathname === link.href ? "navbar__link--active" : ""
              }`}
              id={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar__actions">
          <button
            onClick={toggleTheme}
            className="navbar__theme-toggle"
            id="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link href="/events" className="navbar__cta" id="nav-join-btn">
            Join Us
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar__hamburger"
            id="nav-hamburger"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${isOpen ? "navbar__mobile--open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar__mobile-link ${
              pathname === link.href ? "navbar__link--active" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/events"
          className="navbar__cta navbar__cta--mobile"
          onClick={() => setIsOpen(false)}
        >
          Join Us
        </Link>
      </div>
    </nav>
  );
}
