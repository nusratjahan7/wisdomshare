"use client";

import { useEffect, useState } from "react";
import LessonCard from "../lessons/LessonCard";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

const FeaturedLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userPlan = user?.plan;

    useEffect(() => {
        fetchFeaturedLessons();
    }, []);

    const fetchFeaturedLessons = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lessons/featured`
            );
            const data = await res.json();
            setLessons(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-10 text-sm text-zinc-500">
                Loading...
            </div>
        );
    }

    return (
        <section className="py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <p className="text-xs tracking-[4px] uppercase text-violet-500 font-semibold">
                        Hand-Picked
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        Featured Life Lessons
                    </h2>

                    <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
                        Curated stories that have moved thousands of readers.
                    </p>
                </motion.div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons.map((lesson) => (
                        <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                            userPlan={userPlan}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedLessons;