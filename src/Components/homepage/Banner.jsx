"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slidesData = [
    {
        id: 1,
        badge: "Community Wisdom Platform",
        heading: "Every Life Is\na Masterclass",
        description: "Discover real wisdom from real people. Share your journey. Inspire the world.",
        bgImage: "/assets/hero1.jpg",
    },
    {
        id: 2,
        badge: "Shared Experiences",
        heading: "Your Story Can\nChange a Life",
        description: "One shared lesson can transform a stranger's entire perspective. Start sharing today.",
        bgImage: "/assets/hero2.jpg",
    },
    {
        id: 3,
        badge: "Grow Together",
        heading: "Wisdom Worth\nMore Than Gold",
        description: "The most valuable lessons in life are never taught in classrooms. Find them here",
        bgImage: "/assets/hero3.jpg",
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Banner = () => {
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted) {
        return <div className="w-full h-[85vh] sm:h-[90vh] bg-black" />;
    }


    return (
        <div className="relative w-full h-[85vh] sm:h-[90vh] bg-black overflow-hidden group">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect={"fade"}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                pagination={{
                    clickable: true,
                    el: ".custom-pagination",
                }}
                className="w-full h-full"
            >
                {slidesData.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
                        {({ isActive }) => (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-5000 ease-out"
                                    style={{
                                        backgroundImage: `url(${slide.bgImage})`,
                                        transform: isActive ? "scale(1.05)" : "scale(1)"
                                    }}
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-purple-900/60 via-indigo-900/50 to-purple-900/60 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-black/40" />

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={{
                                                visible: { transition: { staggerChildren: 0.2 } }
                                            }}
                                            className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center"
                                        >
                                            <motion.div
                                                variants={fadeInUp}
                                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-medium mb-6 uppercase tracking-wider"
                                            >
                                                <span className="text-amber-400">★</span> {slide.badge}
                                            </motion.div>

                                            <motion.h1
                                                variants={fadeInUp}
                                                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight whitespace-pre-line mb-6 drop-shadow-md"
                                            >
                                                {slide.heading}
                                            </motion.h1>

                                            <motion.p
                                                variants={fadeInUp}
                                                className="text-base sm:text-lg md:text-xl text-gray-200/90 max-w-2xl font-light mb-10 leading-relaxed drop-shadow"
                                            >
                                                {slide.description}
                                            </motion.p>

                                            <motion.div
                                                variants={fadeInUp}
                                                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                                            >
                                                <button className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-sm text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-purple-900/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                                                    Explore Lessons <ArrowRight size={16} />
                                                </button>
                                                <button className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-sm text-white border border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                                                    Join Community <Users size={16} />
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/10 hover:bg-black/40 text-white/70 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto cursor-pointer">
                <ChevronLeft size={20} />
            </button>

            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/10 hover:bg-black/40 text-white/70 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto cursor-pointer">
                <ChevronRight size={20} />
            </button>

            <div className="custom-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2" />

            <style jsx global>{`
                .custom-pagination .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.4) !important;
                    opacity: 1 !important;
                    width: 8px;
                    height: 8px;
                    transition: all 0.3s ease;
                }
                .custom-pagination .swiper-pagination-bullet-active {
                    background: #ffffff !important;
                    width: 24px !important;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
};

export default Banner;