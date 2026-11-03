"use client";

import { motion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Gentle fade-up when an element scrolls into view.
// Visitors who ask their system for reduced motion get no animation.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
