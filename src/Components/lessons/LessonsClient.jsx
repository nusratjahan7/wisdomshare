"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LessonCard from './LessonCard';
import LessonSearchFilter from './LessonSearchFilter';
import { Pagination } from '@heroui/react';

export default function LessonsClient({ lessons = [], filters, total = 0, userPlan }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [selectedCategory, setSelectedCategory] = useState(filters.category || "all");
    const [selectedType, setSelectedType] = useState(filters.accessType || "all");
    const [page, setPage] = useState(filters.page || 1);

    const router = useRouter();
    const totalItems = total;
    const itemsPerPage = 12;
    const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));


    const getPageNumbers = () => {
        const pages = [];


        if (totalPages <= 1) return [1];

        pages.push(1);
        if (page > 3) {
            pages.push("ellipsis-start");
        }


        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {

            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        if (page < totalPages - 2) {
            pages.push("ellipsis-end");
        }

        if (!pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        return pages;
    }

    const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);


    useEffect(() => {
        setPage(1);
    }, [searchQuery, selectedCategory, selectedType]);


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
            <LessonSearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />

            <p className="text-xs text-zinc-500">{total} lessons found</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                    <LessonCard
                        key={lesson._id}
                        lesson={lesson}
                        userPlan={userPlan}
                    />
                ))}
            </div>

            <Pagination className="w-full mt-4">
                <Pagination.Summary>
                    Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>
                <Pagination.Content>
                    <Pagination.Item>
                        <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                        </Pagination.Previous>
                    </Pagination.Item>

                    {getPageNumbers().map((p, i) =>
                        p.toString().includes("ellipsis") ? (
                            <Pagination.Item key={`ellipsis-${i}`}>
                                <Pagination.Ellipsis />
                            </Pagination.Item>
                        ) : (
                            <Pagination.Item key={p}>
                                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        )
                    )}

                    <Pagination.Item>
                        <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                            <span>Next</span>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Pagination.Item>
                </Pagination.Content>
            </Pagination>
        </div>
    );
}