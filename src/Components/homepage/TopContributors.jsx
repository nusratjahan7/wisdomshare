"use client";

import { topContributor } from '@/lib/api/user';
import React, { useEffect, useState } from 'react';


export default function TopContributors() {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributors = async () => {
            try {

                const data = await topContributor();
                if (data) {
                    setContributors(data);
                }
            } catch (error) {
                console.error("Failed to load top contributors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributors();
    }, []);

    if (loading) return <p className="text-center p-10 text-sm text-zinc-500">Loading Top Contributors...</p>;

    return (
        <div className="py-12 bg-white text-center">

            <span className="text-[10px] font-bold text-indigo-600 tracking-widest uppercase">This Week</span>
            <h2 className="text-3xl font-extrabold text-zinc-900 mt-1">Top Contributors</h2>
            <p className="text-zinc-500 text-xs mt-2 mb-10">The voices behind our most-loved lessons.</p>


            <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto px-4">

                {contributors && contributors.length > 0 ? (
                    contributors.map((item, index) => (
                        <div

                            key={item._id?.toString() || index}
                            className="bg-white border border-zinc-100 p-6 rounded-2xl w-64 shadow-xs relative flex flex-col items-center group transition-all duration-300 hover:shadow-md"
                        >

                            <div className={`absolute top-5 right-5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm
                    ${index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-zinc-400' : 'bg-amber-700'}`}
                            >
                                {index + 1}
                            </div>

                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-100 group-hover:border-indigo-100 transition-colors">
                                <img

                                    src={item.image || item.userImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                                    alt={item.name || "Contributor"}
                                    className="w-full h-full object-cover"
                                />
                            </div>


                            <h3 className="font-bold text-sm text-zinc-900 mt-4">{item.name || "Anonymous"}</h3>
                            <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{item.title || "Resilience & Growth"}</p>

                            <div className="mt-4 px-3 py-1 rounded-full bg-indigo-50/70 text-indigo-600 text-[10px] font-bold tracking-wide">
                                {item.lessonCount || 0} lessons
                            </div>
                        </div>
                    ))
                ) : (

                    <p className="text-zinc-400 text-xs py-4">No top contributors found active this week.</p>
                )}
            </div>
        </div>
    );
}