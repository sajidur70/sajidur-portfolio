"use client";

import { useEffect, useSyncExternalStore } from "react";

type Palette = {
  id: string; // "" = the default (Graphite)
  name: string;
  swatch: string; // Tailwind gradient classes for the small preview circle
};

// Dark mode background palettes. The gradients themselves are in globals.css
// (body[data-bg="..."]). "swatch" is only the small preview circle on each button:
// Tailwind gradient color classes, written out in full so Tailwind finds them.
const palettes: Palette[] = [
  {
    id: "",
    name: "Graphite",
    swatch: "from-neutral-950 to-zinc-700",
  },
  {
    id: "midnight",
    name: "Midnight",
    swatch: "from-zinc-950 to-slate-800",
  },
  {
    id: "ocean",
    name: "Ocean",
    swatch: "from-slate-950 to-cyan-700",
  },
  {
    id: "space",
    name: "Space",
    swatch: "from-slate-950 to-indigo-700",
  },
  {
    id: "purple",
    name: "Purple",
    swatch: "from-zinc-950 to-purple-700",
  },
  {
    id: "aurora",
    name: "Aurora",
    swatch: "from-cyan-700 to-emerald-700",
  },
];

// Where the visitor's choice is saved, so it stays after a reload
const STORAGE_KEY = "bg-palette";
const EVENT = "palette-change";

// The chosen palette. null = not read from localStorage yet.
let current: string | null = null;

function getPalette(): string {
  if (current === null) {
    try {
      current = localStorage.getItem(STORAGE_KEY) || "";
      // A palette that was removed (e.g. old "graphite") → use the default
      if (!palettes.some((palette) => palette.id === current)) current = "";
    } catch {
      current = ""; // Private mode or blocked storage: use the default
    }
  }
  return current;
}

function setPalette(id: string): void {
  current = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Can't save: the palette still changes, it just isn't remembered
  }
  window.dispatchEvent(new Event(EVENT)); // tell React the value changed
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

// A bar at the bottom-left (only in dark mode) to choose the background palette.
export default function PalettePicker() {
  // useSyncExternalStore: reads a value that lives outside React (localStorage).
  // The 3rd function is for the server, which has no localStorage → default "".
  const active = useSyncExternalStore(subscribe, getPalette, () => "");

  // Put the palette on <body data-bg="..."> so globals.css picks the gradient
  useEffect(() => {
    if (active) document.body.setAttribute("data-bg", active);
    else document.body.removeAttribute("data-bg");
  }, [active]);

  return (
    // "hidden dark:flex": palettes only change the dark background, so hide in light mode
    <div
      role="group"
      aria-label="Background palette"
      className="fixed bottom-4 left-4 z-40 hidden gap-1 rounded-xl border border-slate-700 bg-slate-900/90 p-1.5 text-xs text-slate-100 shadow-xl backdrop-blur dark:flex"
    >
      {palettes.map((palette) => (
        <button
          key={palette.name}
          type="button"
          onClick={() => setPalette(palette.id)}
          aria-label={`${palette.name} background`}
          aria-pressed={active === palette.id}
          title={palette.name}
          className={`flex items-center gap-1.5 rounded-md p-1.5 transition-colors sm:px-2 ${
            active === palette.id
              ? "bg-slate-700 text-cyan-400"
              : "hover:bg-slate-800"
          }`}
        >
          <span
            className={`h-4 w-4 shrink-0 rounded-full border border-slate-500 bg-linear-135 ${palette.swatch}`}
          />
          {/* Names only from sm (640px): on phones the bar shows just the circles */}
          <span className="hidden sm:inline">{palette.name}</span>
        </button>
      ))}
    </div>
  );
}
