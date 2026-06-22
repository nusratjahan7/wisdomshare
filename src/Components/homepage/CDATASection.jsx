"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="w-full py-16 px-4 bg-[#f3f6ff] flex justify-center items-center overflow-hidden">
            {/* Main Animated Card Wrapper */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the block is visible
                transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 15,
                    mass: 0.8
                }}
                className="max-w-5xl w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-3xl px-6 py-12 md:py-16 text-center text-white shadow-xl shadow-indigo-200/50 flex flex-col items-center"
            >
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                    Ready to share your story?
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-purple-100/90 max-w-2xl font-light leading-relaxed mb-8">
                    Your experiences have shaped you. Now let them shape someone else. Join thousands of contributors today.
                </p>

                {/* Action Buttons with smooth micro-interactions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto"
                    >
                        <Link href={'/auth/signup'} className="block text-center w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-purple-700 bg-white hover:bg-purple-50 transition-colors shadow-md">
                            Start Sharing Free
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto"
                    >
                        <Link href={'/pricing'} className="block text-center w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-white border border-white/40 bg-white/5 hover:bg-white/10 transition-colors">
                            See Premium Plans
                        </Link>
                    </motion.div>
                </div>

            </motion.div>
        </section>
    );
}