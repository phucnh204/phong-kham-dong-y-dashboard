"use client";
import { motion } from "framer-motion";
import React from "react";

// Section motion wrapper
export const MotionSection = ({ children, className = "", ...props }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={className}
    {...props}
  >
    {children}
  </motion.section>
);

// Simple fade in wrapper
export const MotionFadeIn = ({ children, className = "", ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Staggered container (cho list items)
export const MotionStaggerContainer = ({
  children,
  className = "",
  ...props
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.15 },
      },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Item với variants truyền thống
export const MotionItem = ({
  children,
  className = "",
  delay = 0,
  ...props
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { delay } },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
