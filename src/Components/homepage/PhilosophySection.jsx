"use client";

import React from "react";
import { Globe, Zap, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const featuresData = [
    {
        id: 1,
        title: "Learn From Real Experience",
        description: "Skip theory. Every lesson here is lived, tested, and hard-won by real people navigating real life.",
        icon: Globe,
    },
    {
        id: 2,
        title: "Accelerate Your Growth",
        description: "Compress decades of wisdom into hours. Apply proven insights to your own challenges immediately.",
        icon: Zap,
    },
    {
        id: 3,
        title: "Join a Thoughtful Community",
        description: "Connect with thousands of reflective people who believe that sharing stories creates real change.",
        icon: Users,
    },
    {
        id: 4,
        title: "Safe & Authentic Space",
        description: "Moderated, respectful, and trauma-informed. We protect both contributors and readers equally.",
        icon: Shield,
    },
];

// Stagger container animation
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12, // Staggers the card entries seamlessly
        },
    },
};

// Individual card animation variant
const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
        },
    },
};

const PhilosophySection = () => {
    return (
        <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-[#f3f6ff] to-[#fcfdff] flex flex-col items-center overflow-hidden">
            {/* Header Content Animates smoothly on its own */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-3xl mb-16"
            >
                <span className="text-xs font-bold tracking-widest text-purple-600 uppercase block mb-3">
                    The Philosophy
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Why Learning From Life Matters
                </h2>
                <p className="text-slate-500 font-medium text-base md:text-lg mb-6">
                    Books give you knowledge. Life gives you wisdom. We bridge the gap.
                </p>
                {/* Decorative Bottom Line */}
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mx-auto" />
            </motion.div>

            {/* Grid Layout for Cards with Staggered Scroll-In Effect */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }} // Triggers when 15% of the grid structure appears
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full"
            >
                {featuresData.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                        <motion.div
                            key={feature.id}
                            variants={cardVariants}
                            whileHover={{ y: -5 }} // Subtle pop upward on active hover state
                            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-indigo-100/40 hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
                        >
                            {/* Icon Container wrapper */}
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-5">
                                <IconComponent size={22} className="stroke-[2.2]" />
                            </div>

                            {/* Card Details */}
                            <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-normal">
                                {feature.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default PhilosophySection;