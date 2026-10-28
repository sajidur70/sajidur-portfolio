"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { personal } from "@/data/portfolio";
import ThemeToggle from "@/components/ThemeToggle";

type NavLink = {
  label: string;
  href: string;
};

// Links to each section. href="#about" scrolls to the element with id="about".
const links: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  // Is the mobile menu open? Starts closed (false). TS knows it is a boolean.
  const [isOpen, setIsOpen] = useState(false);

  // First name for the logo: "Sajidur Rahman" → "Sajidur"
  const firstName = personal.name.split(" ")[0];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo: goes back to the top */}
        <a href="#home" className="text-xl font-bold">
          {firstName}
          <span className="text-cyan-700 dark:text-cyan-400">.</span>
        </a>

        {/* Desktop: hidden on small screens, shown from md (768px) */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Resume button: only shown when resumeUrl is not empty */}
          {personal.resumeUrl && (
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-cyan-700 px-4 py-1.5 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-slate-950"
            >
              Resume
            </a>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile: theme button + menu button, hidden from md (768px) */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="rounded-md p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu: only shown when isOpen is true */}
      {isOpen && (
        <ul
          id="mobile-menu"
          className="space-y-1 border-t border-slate-200 px-6 py-4 md:hidden dark:border-slate-800"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)} // close the menu after a click
                className="block rounded-md px-3 py-2 font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.label}
              </a>
            </li>
          ))}
          {personal.resumeUrl && (
            <li>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 font-medium text-cyan-700 dark:text-cyan-400"
              >
                Resume
              </a>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
