"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LessonCard from './LessonCard';
import LessonSearchFilter from './LessonSearchFilter';

export default function LessonsClient({ lessons, filters, total, userPlan }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [selectedCategory, setSelectedCategory] = useState(filters.category || "all");
    const [selectedType, setSelectedType] = useState(filters.accessType || "all");
    const [page, setPage] = useState(filters.page || 1);

    const router = useRouter();
    const totalPages = Math.ceil(total / 12);

    useEffect(() => {
        const sp = new URLSearchParams();

        if (searchQuery) sp.set('search', searchQuery);
        if (selectedCategory !== 'all') sp.set('category', selectedCategory);
        if (selectedType !== 'all') sp.set('accessType', selectedType);
        if (page > 1) sp.set('page', page);

        router.push(`?${sp.toString()}`);
    }, [router, searchQuery, selectedCategory, selectedType, page]);

    return (
        <div className="flex flex-col gap-6">
            {/* ফিল্টার কম্পোনেন্ট */}
            <LessonSearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />

            {/* টোটাল রেজাল্ট কাউন্ট */}
            <p className="text-xs text-zinc-500">{total} lessons found</p>

            {/* লেসন কার্ড গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                    <LessonCard
                        key={lesson._id}
                        lesson={lesson}
                        userPlan={userPlan}
                    />
                ))}
            </div>

            {/* Pagination UI এখানে আপনার প্রোভাইড করা Pagination কোডটি বসিয়ে দেবেন */}
        </div>
    );
}