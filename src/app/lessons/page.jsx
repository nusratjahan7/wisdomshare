import LessonsClient from '@/Components/lessons/LessonsClient';
import { getLessons } from '@/lib/api/lessons';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';


const BrowseLessonsPage = async ({ searchParams }) => {

    const session = await auth.api.getSession({ headers: await headers() });
    const userPlan = session?.user?.plan || "user_free";

    const filters = await searchParams;
    const querySearch = new URLSearchParams(filters);
    const queryString = querySearch.toString();


    const { lessons, total } = await getLessons(queryString);

    return (
        <div className="pt-25 px-6 bg-background min-h-screen text-white">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 py-16 px-4 mb-6 text-center rounded-2xl shadow-xl border border-violet-500/20">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                        Life Lessons Library
                    </h1>
                    <p className="text-zinc-200/90 max-w-xl mx-auto text-xs md:text-sm font-medium leading-relaxed">
                        Thousands of real stories, hard-won insights, and transformative experiences await.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pb-16">
                <LessonsClient
                    filters={filters}
                    lessons={lessons || []}
                    total={total || 0}
                    userPlan={userPlan}
                />
            </div>
        </div>
    );
};

export default BrowseLessonsPage;