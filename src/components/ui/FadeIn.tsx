"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type FadeInProps = {
  children: ReactNode; // anything React can show: text, elements, components
  delay?: number; // seconds
};

// Wraps any content and fades it in when it scrolls into view.
export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // start: invisible, 40px lower
      whileInView={{ opacity: 1, y: 0 }} // end: visible, normal position
      viewport={{ once: true, amount: 0.2 }} // run once, when 20% is visible
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
