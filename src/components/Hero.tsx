import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import { FiBookOpen, FiCode, FiMapPin } from "react-icons/fi";
import { personal, highlights } from "@/data/portfolio";
import type { HighlightIcon } from "@/types/portfolio";
import SocialLinks from "@/components/ui/SocialLinks";
import EffectPicker from "@/components/EffectPicker";
import DrawnName from "@/components/DrawnName";

// Which icon to show for each highlight in the data file.
// Record<HighlightIcon, IconType> = TS forces me to set an icon for EVERY HighlightIcon.
const highlightIcons: Record<HighlightIcon, IconType> = {
  education: FiBookOpen,
  code: FiCode,
  location: FiMapPin,
};

// Same style for the 2nd and 3rd buttons
const outlineButton =
  "rounded-full border border-slate-300 px-6 py-3 font-medium transition hover:scale-105 hover:border-cyan-700 hover:text-cyan-700 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:text-cyan-400";

type RevealProps = {
  delay?: number; // seconds
  children: ReactNode;
};

// Hero animation in pure CSS (see "fade-up" in globals.css).
// It starts at the first paint, without waiting for JavaScript, so the text shows fast.
// motion-reduce:animate-none = no animation if the visitor asked for less motion.
function Reveal({ delay = 0, children }: RevealProps) {
  return (
    <div
      className="animate-fade-up motion-reduce:animate-none"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// The first screen visitors see: who I am, what I do, how to reach me.
export default function Hero() {
  // Initials for the circle: "Sajidur Rahman" → ["Sajidur", "Rahman"] → ["S", "R"] → "SR"
  const initials = personal.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  // My name split into letters, so effects (like bounce) can move each letter.
  // "Sajidur Rahman" → [[{S,0},{a,1},...], [{R,7},...]]. i = position, for the delay.
  let letterIndex = 0;
  const nameWords = personal.name
    .split(" ")
    .map((word) => [...word].map((letter) => ({ letter, i: letterIndex++ })));

  return (
    <section
      id="home"
      className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-12 px-6 pt-24 pb-16 md:flex-row md:justify-between"
    >
      {/* Left: text. Each part fades in a little after the one before (delay) */}
      <div className="max-w-xl text-center md:text-left">
        {/* "Open to work" badge with a pulsing green dot */}
        {personal.availability && (
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {personal.availability}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-cyan-700 dark:text-cyan-400">
            Hi, my name is
          </p>
          {/* aria-label: screen readers read the full name, not letter by letter */}
          <h1
            aria-label={personal.name}
            className="hero-name mt-2 text-4xl font-bold tracking-tight sm:text-6xl"
          >
            <span className="hero-name-text">
              {nameWords.map((word, w) => (
                <Fragment key={w}>
                  {w > 0 && " "}
                  {/* whitespace-nowrap: a word never breaks in the middle */}
                  <span className="inline-block whitespace-nowrap">
                    {word.map(({ letter, i }) => (
                      <span
                        key={i}
                        className="hero-letter inline-block"
                        // --i is a CSS variable. TS doesn't know custom "--" keys, so I tell it
                        // this object is a CSSProperties ("as" = type assertion)
                        style={{ "--i": i } as CSSProperties}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                </Fragment>
              ))}
            </span>
            {/* The same name as SVG outlines, only shown for the "Draw" effect */}
            <DrawnName />
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          {/* Gradient text: a gradient background, clipped to the letters */}
          <p className="hero-title mt-3 bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl dark:from-cyan-400 dark:to-blue-400">
            {personal.title}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {personal.intro}
          </p>
        </Reveal>

        {/* Quick facts: CSE Graduate · 500+ LeetCode · Location */}
        <Reveal delay={0.4}>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600 md:justify-start dark:text-slate-400">
            {highlights.map((item) => {
              const Icon = highlightIcons[item.icon];
              return (
                <li key={item.text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cyan-700 dark:text-cyan-400" />
                  {item.text}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#projects"
              className="rounded-full bg-cyan-700 px-6 py-3 font-medium text-white transition hover:scale-105 hover:bg-cyan-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              View Projects
            </a>
            <a href="#contact" className={outlineButton}>
              Contact Me
            </a>
            {/* Resume button: only shown when resumeUrl is not empty */}
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineButton}
              >
                Resume
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <SocialLinks className="mt-8 justify-center md:justify-start" />
        </Reveal>
      </div>

      {/* Right: my photo. Below it: buttons to try different effects on my name, title and photo */}
      <Reveal delay={0.3}>
        <div className="flex flex-col items-center">
          <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
            {/* Soft glowing gradient behind the photo */}
            <div className="hero-halo absolute inset-0 animate-pulse rounded-full bg-linear-to-br from-cyan-400 to-blue-600 opacity-30 blur-3xl" />
            {/* group: lets children react when this wrapper is hovered (group-hover:).
                Hover: the photo tilts a little and a "Hello!" chat bubble pops in */}
            <div className="group relative cursor-pointer transition-transform duration-200 hover:-rotate-2 hover:scale-105">
              {/* Gradient ring: a gradient circle with padding, the photo sits inside */}
              <div className="hero-photo relative h-56 w-56 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 p-1 sm:h-72 sm:w-72">
                {personal.photo ? (
                  <Image
                    src={personal.photo}
                    alt={`Photo of ${personal.name}`}
                    width={500}
                    height={500}
                    priority
                    sizes="(min-width: 640px) 288px, 224px"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  // No photo yet → show my initials
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white font-mono text-5xl font-bold text-cyan-700 dark:bg-slate-900 dark:text-cyan-400">
                    {initials}
                  </div>
                )}
              </div>

              {/* "Draw" effect: a circle line around my photo, drawn by anime.js.
                  Hidden unless the Draw effect is on. -inset-3 = a bit bigger than the photo.
                  The path is 2 half circles, starting at the top, going clockwise */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="hero-photo-draw pointer-events-none absolute -inset-3 text-cyan-700 dark:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              >
                <path d="M50 2 a48 48 0 1 1 0 96 a48 48 0 1 1 0 -96" />
              </svg>

              {/* Chat bubble: rounded box, with a sharp bottom-left corner (rounded-bl-sm)
                  like a message tail pointing at me. scale-0 = hidden until hover.
                  origin-bottom-left = it grows out of that corner */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 -right-6 z-10 origin-bottom-left scale-0 rounded-2xl rounded-bl-sm bg-cyan-700 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-100 dark:bg-cyan-400 dark:text-slate-950"
              >
                Hello! 👋
              </span>
            </div>
          </div>
          <EffectPicker />
        </div>
      </Reveal>
    </section>
  );
}
