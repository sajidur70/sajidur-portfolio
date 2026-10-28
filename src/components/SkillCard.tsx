"use client";

import type { MouseEvent } from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { Variants } from "motion/react";
import type { IconType } from "react-icons";
import { FiCode } from "react-icons/fi";
import { FaJava } from "react-icons/fa";
import {
  TbApi,
  TbBinaryTree,
  TbDatabase,
  TbMathFunction,
} from "react-icons/tb";
import {
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiLinux,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

type SkillIcon = {
  icon: IconType;
  color: string; // "" = use the text color
};

// Logo + brand color for each skill name in the data file.
// color "" = use the text color (for black logos, so they also show in dark mode)
const skillIcons: Record<string, SkillIcon> = {
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#1572B6" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { icon: SiExpress, color: "" },
  "REST APIs": { icon: TbApi, color: "#0EA5E9" },
  "JWT Auth": { icon: SiJsonwebtokens, color: "#D63AFF" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Mongoose: { icon: SiMongoose, color: "#880000" },
  SQL: { icon: TbDatabase, color: "#336791" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  Jest: { icon: SiJest, color: "#C21325" },
  Vercel: { icon: SiVercel, color: "" },
  "Data Structures": { icon: TbBinaryTree, color: "#0891B2" },
  Algorithms: { icon: TbMathFunction, color: "#7C3AED" },
  Python: { icon: SiPython, color: "#3776AB" },
  Java: { icon: FaJava, color: "#E76F00" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
};

// Animation for the list: show the children (logos) one after another
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

// Animation for each logo: pop in (small → normal), fade in, spin a little
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -45 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 15 },
  },
};

type SkillCardProps = {
  category: string;
  items: string[];
  index: number; // position of the card, for the delay
};

// One skill category card: 3D flip-in title, pop-in logos, 3D tilt with the mouse.
export default function SkillCard({ category, items, index }: SkillCardProps) {
  const reduceMotion = useReducedMotion();

  // How much the card is tilted (in degrees). useSpring makes it move smoothly.
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  // Tilt the card toward the mouse
  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    // Mouse position inside the card, from -0.5 (left/top) to 0.5 (right/bottom)
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    rotateX.set(-y * 12); // max 6° up/down
    rotateY.set(x * 12); // max 6° left/right
  }

  // Mouse left the card → back to flat
  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    // reducedMotion="user": if the visitor asked for less motion, skip movement (keep fades)
    <MotionConfig reducedMotion="user">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-cyan-500/10 dark:border-slate-800 dark:bg-slate-900"
      >
        {/* 3D flip-in title: starts turned away (rotateX 90°), then turns to face me */}
        <motion.h3
          initial={{ opacity: 0, rotateX: 90 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
          style={{ transformPerspective: 600, transformOrigin: "bottom" }}
          className="mb-5 flex items-center gap-2 text-xl font-bold"
        >
          <span className="h-6 w-1 rounded-full bg-linear-to-b from-cyan-500 to-blue-500" />
          {category}
        </motion.h3>

        {/* Logos: pop in one after another */}
        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          {items.map((name) => {
            const skill = skillIcons[name] ?? { icon: FiCode, color: "" };
            const Icon = skill.icon;
            return (
              <motion.li
                key={name}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.1 }}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <Icon
                  className="h-5 w-5"
                  style={skill.color ? { color: skill.color } : undefined}
                  aria-hidden="true"
                />
                {name}
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </MotionConfig>
  );
}
