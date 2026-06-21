"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LessonCard({ lesson, userPlan }) {
    const router = useRouter();
    const isPremiumLesson = lesson.accessType === "Premium";
    const isFeatured = lesson.isFeatured || false;
    const hasPremiumAccess = userPlan === "user_premium";

    console.log("Lesson Data Structure:", lesson);

    const savesCount = lesson.totalSaves || lesson.saveCount || (lesson.savedBy ? lesson.savedBy.length : 0) || 0;
    const likesCount = lesson.totalLikes || 0;


    const handleCardClick = () => {
        if (isPremiumLesson && !hasPremiumAccess) {
            router.push('/pricing');
        } else {
            router.push(`/lessons/${lesson._id}`);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative bg-white border border-zinc-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 flex flex-col h-full shadow-xs"
        >
            {/* Image & Overlay Layer */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-50">
                <img
                    src={lesson.image}
                    alt={lesson.title}
                    className={`w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ${isPremiumLesson && !hasPremiumAccess ? 'blur-[3px] saturate-70 select-none' : ''}`}
                />

                {!isPremiumLesson && isFeatured && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        ★ Featured
                    </div>
                )}

                {isPremiumLesson && (
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        🛡 Premium
                    </div>
                )}

                {isPremiumLesson && !hasPremiumAccess && (
                    <div className="absolute inset-0 bg-black/15 flex flex-col items-center justify-center text-white p-4">
                        <div className="bg-zinc-900/70 p-2 rounded-full border border-zinc-800/50 mb-1.5 backdrop-blur-xs">
                            <svg className="w-4 h-4 text-zinc-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <span className="text-[11px] font-semibold text-white/90 bg-zinc-900/40 px-3 py-1 rounded-full backdrop-blur-xs">Upgrade to read</span>
                    </div>
                )}
            </div>

            {/* Content Layer */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                        🛡️ {lesson.category}
                    </span>
                    <span className="text-[10px] text-fuchsia-500 font-semibold px-2 py-0.5 rounded-md bg-fuchsia-50">
                        {lesson.emotionalTone}
                    </span>
                </div>

                <h3 className="text-sm font-bold text-zinc-900 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200">
                    {lesson.title}
                </h3>
                <h4 className="text-[11px] font-semibold text-indigo-500/90 mt-0.5 line-clamp-1">
                    {lesson.subtitle}
                </h4>

                <p className="text-[11px] text-zinc-500 mt-2 line-clamp-2 leading-relaxed flex-grow">
                    {lesson.shortDescription}
                </p>

                {/* Footer Metadata Layer */}
                <div className="flex items-center justify-between pt-3 mt-4 border-t border-zinc-100 text-zinc-400 text-[10px]">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-zinc-200 overflow-hidden border border-zinc-100">
                            {lesson.userImage ? (
                                <img src={lesson.userImage} alt={lesson.username} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-zinc-300 to-zinc-400" />
                            )}
                        </div>
                        <span className="text-zinc-600 font-semibold text-[11px] capitalize">{lesson.username}</span>
                    </div>


                    <div className="flex items-center gap-2.5 font-medium text-zinc-500">
                        {/* Saves Count */}
                        <span className="flex items-center gap-1 hover:text-zinc-700 transition-colors">
                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            {savesCount}
                        </span>

                        {/* Likes Count */}
                        <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                            <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {likesCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}