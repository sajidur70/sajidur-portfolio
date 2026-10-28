"use client";

import { useState } from "react";
import { FiZap } from "react-icons/fi";
import type { Timeline } from "animejs";

type Effect = {
  id: string; // "" = no effect. Matches body[data-fx="..."] in globals.css
  name: string;
};

// Hero effects. The animations themselves are in globals.css (body[data-fx="..."]).
const effects: Effect[] = [
  { id: "", name: "None" },
  { id: "glow", name: "Glow" },
  { id: "bounce", name: "Bounce" },
  { id: "draw", name: "Draw" },
];

// The running "Draw" animation, so it can be stopped when another effect is chosen
let drawTimeline: Timeline | null = null;

// "Draw": anime.js draws the outline of each letter of my name (DrawnName.tsx),
// fills it in, holds, then erases it, and repeats.
async function startDraw() {
  // Load anime.js only when someone picks "Draw", so normal visitors never download it
  const { createTimeline, stagger, svg } = await import("animejs");
  // The visitor may have picked another effect while anime.js was loading
  if (document.body.getAttribute("data-fx") !== "draw") return;

  const paths = document.querySelectorAll(".hero-name-draw path");
  // createDrawable adds a "draw" property: "0 1" = the whole line is visible
  const drawables = svg.createDrawable(paths);
  // The circle line around my photo
  const ring = svg.createDrawable(".hero-photo-draw path");

  drawTimeline = createTimeline({ loop: true, loopDelay: 500 })
    // 1. Draw each letter's outline, one after another
    .add(drawables, {
      draw: ["0 0", "0 1"],
      duration: 1400,
      delay: stagger(90),
      ease: "inOutQuad",
    })
    // ...and at the same time (position 0 = the start) draw the line around my photo
    .add(ring, { draw: ["0 0", "0 1"], duration: 2400, ease: "inOutSine" }, 0)
    // 2. Fill the letters in
    .add(paths, { fillOpacity: [0, 1], duration: 600, ease: "outQuad" })
    // 3. Hold for 1.5s, then remove the fill...
    .add(paths, { fillOpacity: 0, duration: 400 }, "+=1500")
    // ...and at the same time ("<") erase the outlines
    .add(
      drawables,
      { draw: ["0 1", "1 1"], duration: 900, delay: stagger(60), ease: "inOutQuad" },
      "<",
    )
    // ...and erase the photo line too, continuing around the circle
    .add(ring, { draw: ["0 1", "1 1"], duration: 1200, ease: "inOutSine" }, "<");
}

function stopDraw() {
  if (drawTimeline) {
    drawTimeline.revert(); // stops it and removes the styles anime.js added
    drawTimeline = null;
  }
}

// Puts the effect on <body data-fx="...">.
// Removing it first and re-adding it restarts the animation, even when
// the visitor taps the same effect again.
function applyEffect(id: string) {
  const body = document.body;
  stopDraw();
  body.removeAttribute("data-fx");
  if (!id) return;
  body.getBoundingClientRect(); // makes the browser notice the removal before re-adding
  body.setAttribute("data-fx", id);
  if (id === "draw") startDraw();
}

// A row of buttons under my photo: tap one to animate my name, title and photo.
export default function EffectPicker() {
  const [active, setActive] = useState("");

  function choose(id: string) {
    applyEffect(id);
    setActive(id);
  }

  return (
    // motion-reduce:hidden = visitors who asked for less motion don't see it
    <div className="mt-6 flex max-w-xs flex-col items-center gap-2 motion-reduce:hidden">
      <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
        <FiZap aria-hidden="true" className="text-cyan-700 dark:text-cyan-400" />
        Tap to try an effect
      </p>
      <div role="group" aria-label="Hero effects" className="flex flex-wrap justify-center gap-1.5">
        {effects.map((effect) => (
          <button
            key={effect.name}
            type="button"
            onClick={() => choose(effect.id)}
            aria-pressed={active === effect.id}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              active === effect.id
                ? "border-cyan-700 bg-cyan-700 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                : "border-slate-300 hover:border-cyan-700 hover:text-cyan-700 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
            }`}
          >
            {effect.name}
          </button>
        ))}
      </div>
    </div>
  );
}
