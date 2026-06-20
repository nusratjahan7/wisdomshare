"use client";

import React from 'react';

const CATEGORIES = ["Career", "Resilience", "Mindfulness", "Relationships", "Boundaries"];
const ACCESS_TYPES = ["Free", "Premium"];

export default function LessonSearchFilter({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType
}) {
    const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedType !== "all";

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedType("all");
    };

    return (
        <div className="w-full flex flex-col gap-2 mb-4">
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">

                <div className="relative w-full sm:flex-grow">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-400">
                        {/* Magnifier Icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search lessons..."
                        className="w-full bg-white text-zinc-800 placeholder:text-zinc-400 border border-zinc-100/80 focus:outline-none rounded-full h-11 pl-11 pr-4 text-sm shadow-xs transition-all"
                    />
                </div>


                <div className="flex gap-2 w-full sm:w-auto shrink-0">

                    <div className="relative w-full sm:w-32">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-white text-zinc-700 border border-zinc-100/80 focus:outline-none rounded-full h-11 px-4 pr-8 text-xs font-medium cursor-pointer appearance-none shadow-xs transition-all"
                        >
                            <option value="all">All</option>
                            {CATEGORIES.map(c => (
                                <option key={c} value={c.toLowerCase()}>{c}</option>
                            ))}
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-zinc-400">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </div>


                    <div className="relative w-full sm:w-32">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full bg-white text-zinc-700 border border-zinc-100/80 focus:outline-none rounded-full h-11 px-4 pr-8 text-xs font-medium cursor-pointer appearance-none shadow-xs transition-all"
                        >
                            <option value="all">All</option>
                            {ACCESS_TYPES.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-zinc-400">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </div>
                </div>
            </div>


            {hasActiveFilters && (
                <div className="flex justify-start pl-2">
                    <button
                        onClick={handleReset}
                        className="text-xs font-medium text-zinc-500 hover:text-purple-400 transition-colors flex items-center gap-1.5 pt-1"
                    >
                        ✕ Clear active filters
                    </button>
                </div>
            )}
        </div>
    );
}