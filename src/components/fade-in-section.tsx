"use client"

import React from "react" 
import { motion } from "framer-motion"

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}       // start faded and shifted down
      whileInView={{ opacity: 1, y: 0 }}   // animate in when in view
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}            // animate only once
    >
      {children}
    </motion.div>
  )
}

export default FadeInSection;
